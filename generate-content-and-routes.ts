import fs from "fs";
import slugify from "slugify";
import { useI18n } from "./src/i18n/use-i18n";

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
			district,
			isFree,
			category,
			targetGroups,
			x,
			y,
			language,
			identifierToBeSlugified,
		] = row.split(";");

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
