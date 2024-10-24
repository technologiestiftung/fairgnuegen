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

try {
	const csvData = fs.readFileSync(filePath, "utf-8");
	const data = csvData.split("\r\n").slice(1);

	const processedContent: Record<string, object> = {};
	const processedRoutes: { path: string; page: string }[] = [];

	data.forEach((row) => {
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

		const district = findDistrict({
			x: Number(x.replace(",", ".")),
			y: Number(y.replace(",", ".")),
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
				x: parseFloat(x.replace(",", ".")),
				y: parseFloat(y.replace(",", ".")),
				slug,
			},
		};

		processedContent[path] = content;
		processedRoutes.push({
			path,
			page: "./pages/all-offers/[offer]/index.tsx",
		});
	});

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
