import { Offer } from "./src/content/content";
import fs from "fs";
import { fetchData } from "./pull-data-from-api";

const API_KEY = process.env.OPENAI_API_KEY;
const TARGET_LANGUAGE = "en";

if (!API_KEY || API_KEY === "") {
	throw new Error("OPENAI_API_KEY must be defined");
}

const filePath = "./berlinpass_data.json";

async function translate(json: string): Promise<{
	provider: string;
	providerDescription: string;
	offerDescription: string;
	offerInformation: string;
}> {
	const response = await fetch("https://api.openai.com/v1/chat/completions", {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${API_KEY}`,
		},
		method: "POST",
		body: JSON.stringify({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "system",
					content:
						"Translate the following json to English and only return json as response, DO NOT use semicolons.",
				},
				{
					role: "user",
					content: json,
				},
			],
		}),
	});

	const body = await response.json();

	const translation = JSON.parse(body.choices[0].message.content);
	return translation;
}

function hasTranslation({
	targetLanguage,
	targetSlug,
	initialData,
}: {
	targetLanguage: string;
	targetSlug: string;
	initialData: Offer[];
}): boolean {
	return initialData.some((row: Offer) => {
		const { language, slug } = row;
		return targetLanguage === language && targetSlug === slug;
	});
}

async function generateTranslations() {
	const existingData: Offer[] = JSON.parse(fs.readFileSync(filePath, "utf8"));
	const apiData = await fetchData();
	const combinedData: Offer[] = existingData;

	for (const [index, row] of apiData.entries()) {
		console.log(`Processing row ${index + 1} of ${apiData.length}`);
		combinedData.push(row);

		const { language, slug } = row;

		const isTranslation = language === TARGET_LANGUAGE;
		const hasExistingTranslation = hasTranslation({
			targetSlug: slug,
			targetLanguage: TARGET_LANGUAGE,
			initialData: apiData,
		});

		if (isTranslation || hasExistingTranslation) {
			continue;
		}

		const {
			provider,
			providerDescription,
			offerDescription,
			offerInformation,
			website,
			address,
			zipCodeAndCity,
			district,
			isFree,
			category,
			targetGroups,
			x,
			y,
		} = row;

		console.log(`Translating ${provider}...`);

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
		console.log(`Success: ${translatedProvider}`);

		const translatedEntry = {
			provider: translatedProvider,
			providerDescription: translatedProviderDescription,
			offerDescription: translatedOfferDescription,
			offerInformation: translatedOfferInformation,
			website,
			address,
			zipCodeAndCity,
			district,
			isFree,
			category,
			targetGroups,
			x,
			y,
			language: "en",
			slug,
			path: slug,
		};

		combinedData.push(translatedEntry);
		// fs.writeFileSync(filePath, combinedData.join("\r\n"), { flush: true });
	}

	console.log(
		`done! existingData: ${existingData.length}, combinedData: ${combinedData.length}, apiData: ${apiData.length}`,
	);
}

generateTranslations().catch(console.error);
