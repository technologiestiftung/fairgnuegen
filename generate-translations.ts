/* eslint-disable no-console */
import fs from "fs";

const API_KEY = process.env.OPENAI_API_KEY;
const TARGET_LANGUAGE = "en";

if (!API_KEY || API_KEY === "") {
	throw new Error("OPENAI_API_KEY must be defined");
}

const filePath = "./20240717_Berlinpass-Daten.csv";

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

function parseRow(row: string): {
	provider: string;
	providerDescription: string;
	offerDescription: string;
	offerInformation: string;
	website: string;
	address: string;
	city: string;
	zip: string;
	district: string;
	isFree: string;
	category: string;
	targetGroups: string;
	x: string;
	y: string;
	language: string;
	slug: string;
} {
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
		slug,
	] = row.split(";");

	return {
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
		slug,
	};
}

function hasTranslation({
	targetLanguage,
	targetSlug,
	initialData,
}: {
	targetLanguage: string;
	targetSlug: string;
	initialData: string[];
}): boolean {
	return initialData.some((row: string) => {
		const { language, slug } = parseRow(row);
		return targetLanguage === language && targetSlug === slug;
	});
}

async function generateTranslations() {
	const csvData = fs.readFileSync(filePath, "utf-8").split("\r\n");
	const headers = csvData[0];
	const initialData = csvData.slice(1);

	const postTranslations = [headers];

	for (const [index, row] of initialData.entries()) {
		console.log(`Processing row ${index + 1} of ${initialData.length}`);
		postTranslations.push(row);

		const offer = parseRow(row);
		const { language, slug } = offer;

		const isTranslation = language === TARGET_LANGUAGE;
		const hasExistingTranslation = hasTranslation({
			targetSlug: slug,
			targetLanguage: TARGET_LANGUAGE,
			initialData,
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
			city,
			zip,
			district,
			isFree,
			category,
			targetGroups,
			x,
			y,
		} = offer;

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

		const translatedRow = [
			translatedProvider.replace(";", ","),
			translatedProviderDescription.replace(";", ","),
			translatedOfferDescription.replace(";", ","),
			translatedOfferInformation.replace(";", ","),
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
			"en",
			slug,
		].join(";");

		postTranslations.push(translatedRow);
		fs.writeFileSync(filePath, postTranslations.join("\r\n"), { flush: true });
	}

	console.log("done!");
}

generateTranslations().catch(console.error);
