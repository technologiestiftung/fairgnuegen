import fs from "fs";
import slugify from "slugify";

const filePath = "./src/assets/20240717_Berlinpass-Daten.csv";

try {
	const csvData = fs.readFileSync(filePath, "utf-8");
	const data = csvData.split("\r\n").slice(1);

	const processedRows: Record<string, object> = {};
	const processedRoutes: object[] = [];

	for (const row of data.entries()) {
		const index = row[0];
		const columns = row[1].split(";");

		const content = {
			title: columns[0],
			offer: {
				provider: columns[0],
				providerDescription: columns[1],
				offerDescription: columns[2],
				offerInformation: columns[3],
				website: columns[4],
				address: columns[5],
				city: columns[6],
				zip: parseInt(columns[7]),
				district: columns[8],
				isFree: columns[9] === "ja",
				category: columns[10].split(",").map((category) => category.trim()),
				targetGroups: columns[11]
					.split(",")
					.map((targetGroup) => targetGroup.trim()),
				x: parseFloat(columns[12].replace(",", ".")),
				y: parseFloat(columns[13].replace(",", ".")),
			},
		};

		const slugTitle = slugify(`${index}_${content.offer.provider}`, {
			replacement: "_",
			remove: /"/g,
			lower: true,
			strict: true,
			locale: "de",
			trim: true,
		});

		for (const topic of content.offer.category) {
			const slugTopic = slugify(topic, {
				replacement: "_",
				remove: /"/g,
				lower: true,
				strict: true,
				locale: "de",
				trim: true,
			});

			processedRows[`/${slugTopic}/${slugTitle}/`] = content;

			const path = {
				path: `/${slugTopic}/${slugTitle}/`,
				page: "./pages/[category]/[offer]/index.tsx",
			};

			processedRoutes.push(path);
		}
	}

	const content = `export const detailPagesContent = ${JSON.stringify(
		processedRows,
		null,
		2,
	)};`;
	fs.writeFileSync("./src/content/detail-pages-content.ts", content, "utf-8");

	const routes = `export const detailPagesRoutes = ${JSON.stringify(
		processedRoutes,
		null,
		2,
	)};`;
	fs.writeFileSync("./src/routes/detail-pages-routes.ts", routes, "utf-8");
} catch (error) {
	console.error("Error reading JSON file:", error);
}
