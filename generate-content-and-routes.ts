import fs from "fs";
import slugify from "slugify";
import { useI18n } from "./src/i18n/use-i18n";
import { readFileSync } from "node:fs";
import * as turf from "@turf/turf";

const geojsonFilePath = "./geojson/bezirksgrenzen.geojson";
const districtGeojson = JSON.parse(readFileSync(geojsonFilePath, "utf8"));

const filePath = "./20240717_Berlinpass-Daten.csv";

const existingPaths: string[] = [];

const generateSlug = (input: string) =>
	slugify(input, {
		replacement: "_",
		remove: /"/g,
		lower: true,
		strict: true,
		locale: "de",
		trim: true,
	});

function generatePath({ slug, language }: { slug: string; language: string }) {
	const slugTitle = generateSlug(slug);

	const languageSlug = language === "de" ? "" : `/${language}`;

	const path = `${languageSlug}/all-offers/${slugTitle}/`;

	if (existingPaths.includes(path)) {
		return generatePath({ slug: `${slug}-1`, language });
	}

	existingPaths.push(path);
	return { path, slug: slugTitle };
}

async function fetchGeoCoordinates(fullAddress: string) {
	try {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/search?format=json&q=${fullAddress}`,
			{
				headers: {
					"Content-Type": "application/json",
				},
				method: "GET",
			},
		);

		const geoCoordinates = await response.json();
		if (geoCoordinates.length === 0) {
			throw new Error(`No results found for address: ${fullAddress}`);
		}

		const { lat, lon } = geoCoordinates[0];
		return { lat, lon };
	} catch (error) {
		console.error("Failed to fetch geo-coordinates:", error);
		return { lat: "", lon: "" }; // Return null to handle missing coordinates gracefully
	}
}

async function generateContentAndRoutes() {
	try {
		const csvData = fs.readFileSync(filePath, "utf-8");
		const data = csvData.split("\r\n").slice(1);

		const processedContent: Record<string, object> = {};
		const processedRoutes: { path: string; page: string }[] = [];

		// Array to hold all promises from async operations
		const promises = data.map(async (row) => {
			const [
				provider,
				providerDescription,
				offerDescription,
				offerInformation,
				website,
				address,
				city,
				zip,
				_district,
				isFree,
				category,
				targetGroups,
				x,
				y,
				language,
				identifierToBeSlugified,
				authorised,
			] = row.split(";");

			if (authorised.toLowerCase().trim() !== "ja") {
				return;
			}

			const { path, slug } = generatePath({
				slug: identifierToBeSlugified,
				language,
			});

			const t = useI18n(language);

			const breadcrumbs = [
				{
					href: "/",
					label: t["home.title"],
				},
				{
					href: `/all-offers/?category=${category.toLowerCase()}`,
					label: category,
				},
				{
					href: path,
					label: provider,
				},
			];

			let latitude = y || "";
			let longitude = x || "";

			/*
			 * If no coordinates are provided, we use the address to fetch the coordinates.
			 */
			if (longitude === "" || latitude === "") {
				if (address === "") {
					console.info(
						`Coordinates and address information missing for ${provider}`,
					);
					return;
				}

				const formattedAddress = address.replace(/ /g, "+");
				const formattedCity = city.replace(/ /g, "+");
				const formattedZip = zip.replace(/ /g, "+");

				const fullAddress = `${formattedAddress}%2C+${formattedCity}%2C+${formattedZip}`;

				const { lat, lon } = await fetchGeoCoordinates(fullAddress);
				console.info("Fetched geo-coordinates:", lat, lon, "for", provider);

				latitude = lat;
				longitude = lon;
			}

			const district = findDistrict({
				x: Number(longitude.replace(",", ".")),
				y: Number(latitude.replace(",", ".")),
				provider,
				originalDistrict: _district,
			});

			const content = {
				title: provider,
				breadcrumbs,
				offer: {
					language,
					path: path,
					provider,
					providerDescription,
					offerDescription,
					offerInformation,
					website,
					address,
					city,
					zip: parseInt(zip),
					district,
					originalDistrict: _district,
					isFree: isFree === "ja",
					category,
					targetGroups: targetGroups
						.split(",")
						.map((targetGroup) => targetGroup.trim()),
					x: parseFloat(longitude.replace(",", ".")),
					y: parseFloat(latitude.replace(",", ".")),
					slug,
				},
			};

			processedContent[path] = content;
			processedRoutes.push({
				path,
				page: "./pages/all-offers/[offer]/index.tsx",
			});
		});
		// Wait for all promises to complete
		await Promise.all(promises);

		// Write files only after all async operations are complete
		fs.writeFileSync(
			"./src/content/detail-pages-content.ts",
			`export const detailPagesContent = ${JSON.stringify(processedContent, null, 2)};`,
			"utf-8",
		);

		fs.writeFileSync(
			"./src/routes/detail-pages-routes.ts",
			`export const detailPagesRoutes = ${JSON.stringify(processedRoutes, null, 2)};`,
			"utf-8",
		);
	} catch (error) {
		console.error("Error reading CSV file:", error);
	}
}

generateContentAndRoutes();

function findDistrict({
	x,
	y,
	provider,
	originalDistrict,
}: {
	x: number;
	y: number;
	provider: string;
	originalDistrict: string;
}) {
	for (const { properties, geometry } of districtGeojson.features) {
		const point = turf.point([x, y]);
		const polygon = turf.multiPolygon(geometry.coordinates);

		const isOfferInDistrict = turf.booleanPointInPolygon(point, polygon);

		if (isOfferInDistrict) {
			return properties.Gemeinde_name;
		}
	}
	/* eslint-disable-next-line no-console */
	console.info(
		`No district found for ${provider} ${x}, ${y} in ${originalDistrict}`,
	);
	return "";
}
