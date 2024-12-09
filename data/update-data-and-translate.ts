/* eslint-disable no-console */
import { fetchDataAndAugment } from "./fetch-and-augment-data-from-api";
import { Offer } from "./src/content/content";
import fs from "fs";

const API_KEY = process.env.OPENAI_API_KEY;

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

interface FoundOffer {
	isIdentical: boolean;
	offerDe: Offer | undefined;
	offerEn: Offer | undefined;
}
function existsIdenticallyInData(
	offer: Offer,
	existingData: Offer[],
): FoundOffer {
	const foundDe = existingData.find((row) => {
		return row.id === offer.id;
	});
	if (!foundDe) {
		return {
			isIdentical: false,
			offerDe: undefined,
			offerEn: undefined,
		};
	}
	const isIdentical = JSON.stringify(offer) === JSON.stringify(foundDe);
	const foundEn = existingData.find((row) => {
		return row.id === `${offer.id}_en`;
	});

	if (isIdentical) {
		return {
			isIdentical: true,
			offerDe: foundDe,
			offerEn: foundEn,
		};
	}

	return {
		isIdentical: false,
		offerDe: undefined,
		offerEn: undefined,
	};
}

async function generateTranslations() {
	const apiData = await fetchDataAndAugment();
	const resultingData: Offer[] = [];
	const existingData: Offer[] = JSON.parse(fs.readFileSync(filePath, "utf8"));

	for (const [_, row] of apiData.entries()) {
		const existsIdentically = existsIdenticallyInData(row, existingData);

		if (
			existsIdentically.isIdentical &&
			existsIdentically.offerDe &&
			existsIdentically.offerEn
		) {
			console.info(`exists: [${row.provider}]`);

			resultingData.push(existsIdentically.offerDe);
			resultingData.push(existsIdentically.offerEn);
			continue;
		}

		resultingData.push(row);

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
			x,
			y,
			slug,
		} = row;

		console.log(`translating: [${provider}]`);

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
			x,
			y,
			language: "en",
			slug,
			path: slug,
		};

		resultingData.push(translatedEntry);
	}

	fs.writeFileSync(filePath, JSON.stringify(resultingData), {
		flush: true,
	});
}

generateTranslations().catch(console.error);
