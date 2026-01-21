import fs from "fs";
import slugify from "slugify";
import { useI18n } from "~/i18n/use-i18n";
import { type ContentItem } from "./utils";

const filePath = "./data/fairgnuegen_data.json";
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

function sortContentByProvider(content: Record<string, ContentItem>) {
	const sortedContent = Object.entries(content).sort(
		([, firstContentItem], [, secondContentItem]) => {
			const firstProvider = firstContentItem.offer.provider;
			const secondProvider = secondContentItem.offer.provider;
			return firstProvider.localeCompare(secondProvider);
		},
	);
	return Object.fromEntries(sortedContent);
}

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
	const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8")) as {
		id: string;
		provider: string;
		providerDescription: string;
		offerDescription: string;
		offerInformation: string;
		website: string;
		addressWithHouseNumber: string;
		cityWithZip: string;
		district: string;
		isFree: boolean;
		category: string;
		targetGroups: string[];
		lon: number;
		lat: number;
		language: string;
		identifierToBeSlugified: string;
		path: string;
		slug: string;
	}[];

	const processedContent: Record<string, ContentItem> = {};
	const processedRoutes: string[] = [];

	jsonData.forEach((row) => {
		const {
			id,
			provider,
			providerDescription,
			offerDescription,
			offerInformation,
			website,
			addressWithHouseNumber,
			cityWithZip,
			district,
			isFree,
			category,
			targetGroups,
			lon,
			lat,
			language,
			slug: identifierToBeSlugified,
		} = row;

		const { path, slug } = generatePath({
			slug: identifierToBeSlugified,
			language,
		});

		const t = useI18n(language);

		const cleanedCategory =
			category === "Bildung & Beratung" ? "bildung_beratung" : category;

		const breadcrumbs = [
			{
				href: "/",
				label: t["home.title"],
			},
			{
				href: `/all-offers/?category=${cleanedCategory.toLowerCase()}`,
				label: t[`categories.${cleanedCategory.toLowerCase()}.name`],
			},
			{
				href: path,
				label: provider,
			},
		];

		const content = {
			breadcrumbs,
			offer: {
				id: id,
				language,
				path: path,
				provider,
				providerDescription,
				offerDescription,
				offerInformation,
				website,
				addressWithHouseNumber,
				cityWithZip,
				district,
				isFree: isFree,
				category,
				targetGroups: targetGroups,
				lon: lon,
				lat: lat,
				slug,
			},
		};

		processedContent[path] = content;
		processedRoutes.push(path);
	});
	const sortedContent = sortContentByProvider(processedContent);

	fs.writeFileSync(
		"./app/content/detail-pages-content.ts",
		`export const detailPagesContent = ${JSON.stringify(sortedContent, null, 2)};`,
		"utf-8",
	);

	fs.writeFileSync(
		"./react-router.config.ts",
		`
import type { Config } from "@react-router/dev/config";

export default {
\tasync prerender() {
\t\treturn [
\t\t\t"/",
\t\t\t"/en/",
\t\t\t"/all-offers/",
\t\t\t"/en/all-offers/",
\t\t\t"/favorites/",
\t\t\t"/en/favorites/",
\t\t\t"/map/",
\t\t\t"/en/map/",
\t\t\t"/imprint/",
\t\t\t"/en/imprint/",
\t\t\t"/privacy-note/",
\t\t\t"/en/privacy-note/",
\t\t\t"/about-project/",
\t\t\t"/en/about-project/",
\t\t\t"/accessibility-statement/",
\t\t\t"/en/accessibility-statement/",
${processedRoutes.map((route) => `\t\t\t"${route}",`).join("\n")}
\t\t];
\t},
} satisfies Config;

`,
		"utf-8",
	);
} catch (error) {
	console.error("Error reading JSON file:", error);
}
