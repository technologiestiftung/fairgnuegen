/* eslint-disable no-console */
import fs from "fs";
import { Offer } from "../src/content/content";
import { fetchDataAndAugment } from "./fetch-and-augment";
import { translateViaOpenAi } from "./translate";
import { existsIdenticallyInData } from "./utils";

async function updateAndTranslateData() {
	const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
	const filePath = "./berlinpass_data.json";

	if (!OPENAI_API_KEY || OPENAI_API_KEY === "") {
		throw new Error("OPENAI_API_KEY must be defined");
	}

	const apiData = await fetchDataAndAugment();
	const resultingData: Offer[] = [];
	const existingData: Offer[] = JSON.parse(fs.readFileSync(filePath, "utf8"));

	const batchSize = 20;
	const numBatches = Math.ceil(apiData.length / batchSize);
	const batches = Array.from({ length: numBatches }, (_, i) =>
		apiData.slice(i * batchSize, i * batchSize + batchSize),
	);

	for (const [index, batch] of batches.entries()) {
		console.log(
			`Processing batch ${index + 1} / ${numBatches} [batch_size=${batch.length}]`,
		);
		const batchResults = await Promise.all(
			batch.flatMap(async (row) => {
				const existsIdentically = existsIdenticallyInData(row, existingData);

				if (
					existsIdentically.isIdentical &&
					existsIdentically.offerDe &&
					existsIdentically.offerEn
				) {
					console.info(`exists: [${row.provider}]`);
					return [existsIdentically.offerDe, existsIdentically.offerEn];
				}

				const {
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
					lat,
					lon,
					slug,
				} = row;

				console.info(`translating: [${provider}]`);

				const {
					provider: translatedProvider,
					providerDescription: translatedProviderDescription,
					offerDescription: translatedOfferDescription,
					offerInformation: translatedOfferInformation,
				} = await translateViaOpenAi(
					JSON.stringify({
						provider,
						providerDescription,
						offerDescription,
						offerInformation,
					}),
					OPENAI_API_KEY,
				);

				const translatedEntry = {
					id: `${row.id}_en`,
					provider: translatedProvider,
					providerDescription: translatedProviderDescription,
					offerDescription: translatedOfferDescription,
					offerInformation: translatedOfferInformation,
					website,
					addressWithHouseNumber,
					cityWithZip,
					district,
					isFree,
					category,
					targetGroups,
					lat,
					lon,
					language: "en",
					slug,
					path: slug,
				};

				return [row, translatedEntry];
			}),
		).catch((e) => {
			console.error(e);
			process.exit(1);
		});
		resultingData.push(...batchResults.flat());
	}

	fs.writeFileSync(filePath, JSON.stringify(resultingData), {
		flush: true,
	});
}

updateAndTranslateData().catch((e) => {
	console.error(e);
	process.exit(1);
});
