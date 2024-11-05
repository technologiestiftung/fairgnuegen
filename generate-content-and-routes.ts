import fs from "fs";
import slugify from "slugify";
import { useI18n } from "./src/i18n/use-i18n";
import { readFileSync } from "node:fs";
import * as turf from "@turf/turf";
import { translate } from "./generate-translations";

const geojsonFilePath = "./geojson/bezirksgrenzen.geojson";
const districtGeojson = JSON.parse(readFileSync(geojsonFilePath, "utf8"));

const existingPaths: string[] = [];

if (!process.env.FREE_DB_USERNAME || process.env.FREE_DB_USERNAME === "") {
	throw new Error("env FREE_DB_USERNAME must be defined");
}

if (!process.env.FREE_DB_PASSWORD || process.env.FREE_DB_PASSWORD === "") {
	throw new Error("env FREE_DB_PASSWORD must be defined");
}

async function fetchData() {
	const url = "https://www.berlin.de/freedb/open.php/index.json";
	const username = process.env.FREE_DB_USERNAME;
	const password = process.env.FREE_DB_PASSWORD;

	const response = await fetch(url, {
		headers: {
			Authorization:
				"Basic " + Buffer.from(username + ":" + password).toString("base64"),
		},
	});

	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}

	const jsonData = await response.json();
	return jsonData.data.index;
}

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
		const data = await fetchData();

		const processedContent: Record<string, object> = {};
		const processedRoutes: { path: string; page: string }[] = [];

		// Array to hold all promises from async operations
		const promises = data.map(async (row) => {
			const {
				anbieter: provider,
				kurzbeschreibung_des_anbieters: providerDescription,
				kurzbeschreibung_des_angebots: offerDescription,
				informationen_zum_angebot: offerInformation,
				website,
				strasse_und_hausnummer_des_angebots: addressWithHouseNumber,
				plz_und_ort_des_angebots: cityWithZip,
				_district,
				gratis: isFree,
				kategorie: category,
				zielgruppen: targetGroups,
				anbieter: identifierToBeSlugified,
				freigabe: authorised,
			} = row;

			// TODO: Enable this check
			// if (authorised.toLowerCase().trim() !== "ja") {
			// 	return;
			// }

			const languages = ["de", "en"];

			await Promise.all(
				languages.map(async (language) => {
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

					if (addressWithHouseNumber === "") {
						console.info(
							`Coordinates and address information missing for ${provider}`,
						);
						return;
					}

					const formattedAddress = addressWithHouseNumber.replace(/ /g, "+");
					const formattedCity = cityWithZip.replace(/ /g, "+");

					const fullAddress = `${formattedAddress}%2C+${formattedCity}`;

					const { lat, lon } = await fetchGeoCoordinates(fullAddress);
					console.info("Fetched geo-coordinates:", lat, lon, "for", provider);

					const district = findDistrict({
						x: Number(lon),
						y: Number(lat),
						provider,
						originalDistrict: _district,
					});

					// German content
					const content = {
						title: provider,
						breadcrumbs,
						offer: {
							language: language,
							path: path,
							provider,
							providerDescription,
							offerDescription,
							offerInformation,
							website,
							addressWithHouseNumber,
							cityWithZip: cityWithZip,
							district,
							originalDistrict: _district,
							isFree: isFree === "ja",
							category,
							targetGroups: targetGroups
								.replaceAll("[", "")
								.replaceAll("]", "")
								.replaceAll('"', "")
								.split(",")
								.map((targetGroup) => targetGroup.trim()),
							x: parseFloat(lon),
							y: parseFloat(lat),
							slug,
						},
					};

					if (language === "en") {
						const {
							provider: translatedProvider,
							providerDescription: translatedProviderDescription,
							offerDescription: translatedOfferDescription,
							offerInformation: translatedOfferInformation,
						} = await translate(
							JSON.stringify({
								provider,
								providerDescription,
								offerDescription,
								offerInformation,
							}),
						);

						content.title = translatedProvider;
						content.offer.provider = translatedProvider;
						content.offer.providerDescription = translatedProviderDescription;
						content.offer.offerDescription = translatedOfferDescription;
						content.offer.offerInformation = translatedOfferInformation;
					}

					processedContent[path] = content;
					processedRoutes.push({
						path,
						page: "./pages/all-offers/[offer]/index.tsx",
					});
				}),
			);
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
		console.error("Error processing data", error);
	}
}

generateContentAndRoutes();
