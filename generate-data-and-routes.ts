import fs from "fs";
import slugify from "slugify";

const filePath = "./20240717_Berlinpass-Daten.csv";

const generateSlug = (input: string) =>
	slugify(input, {
		replacement: "_",
		remove: /"/g,
		lower: true,
		strict: true,
		locale: "de",
		trim: true,
	});

try {
	const csvData = fs.readFileSync(filePath, "utf-8");
	const data = csvData.split("\r\n").slice(1);

	const processedContent: Record<string, object> = {};
	const processedRoutes: { path: string; page: string }[] = [];

	data.forEach((row, index) => {
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
			categories,
			targetGroups,
			x,
			y,
		] = row.split(";");

		const content = {
			title: provider,
			offer: {
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
				category: categories.split(",").map((category) => category.trim()),
				targetGroups: targetGroups
					.split(",")
					.map((targetGroup) => targetGroup.trim()),
				x: parseFloat(x.replace(",", ".")),
				y: parseFloat(y.replace(",", ".")),
			},
		};

		const slugTitle = generateSlug(`${index}_${provider}`);

		content.offer.category.forEach((topic) => {
			const slugTopic = generateSlug(topic);
			const path = `/${slugTopic}/${slugTitle}/`;

			processedContent[path] = content;
			processedRoutes.push({
				path,
				page: "./pages/[offer]/index.tsx",
			});
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
