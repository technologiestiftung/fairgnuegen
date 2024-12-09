import fs from "fs";
import slugify from "slugify";
import { useI18n } from "./src/i18n/use-i18n";

const filePath = "./data/berlinpass_data.json";

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
	const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

	const processedContent: Record<string, object> = {};
	const processedRoutes: { path: string; page: string }[] = [];

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
			x,
			y,
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
			title: provider,
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
				x: parseFloat(x),
				y: parseFloat(y),
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
	console.error("Error reading JSON file:", error);
}
