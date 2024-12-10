/* eslint-disable no-console */
import { Offer } from "../src/content/content";
import fs from "fs";
import { existsIdenticallyInData } from "./utils";
import { translateViaOpenAi } from "./translate";
import { fetchPaginatedData } from "./fetch-data";
import { fetchGeoCoordinates, findDistrict } from "./geocode";

export async function fetchDataAndAugment(): Promise<Offer[]> {
	try {
		const augmentedData: Offer[] = [];

		const data = await fetchPaginatedData(1, null);

		for (const row of data) {
			const {
				id,
				name_anbieter,
				kurzbeschreibung_des_anbieters,
				kurzbeschreibung_des_angebots,
				art_der_ermaessigung,
				website,
				strasse_und_hausnummer_des_angebots,
				plz_und_ort_des_angebots,
				gratis,
				kategorie,
				zielgruppen,
				freigabe,
			} = row;

			const fullAddress = `${strasse_und_hausnummer_des_angebots}, ${plz_und_ort_des_angebots}`;

			const { lat, lon } = await fetchGeoCoordinates(fullAddress);
			const district =
				lat === null || lon === null ? null : findDistrict(lat, lon);

			const isAccepted = !freigabe.toLowerCase().includes("nein");
			const providerName = name_anbieter.trim();

			if (isAccepted) {
				console.info(`augmented: [${providerName}]`);
				const augmentedRow = {
					id: `${id}`,
					provider: providerName,
					providerDescription: kurzbeschreibung_des_anbieters.trim(),
					offerDescription: kurzbeschreibung_des_angebots.trim(),
					offerInformation: art_der_ermaessigung.trim(),
					website: website.trim(),
					addressWithHouseNumber: strasse_und_hausnummer_des_angebots.trim(),
					cityWithZip: plz_und_ort_des_angebots.trim(),
					district: district ? district.trim() : null,
					isFree: gratis ? gratis.toLowerCase().includes("ja") : false,
					category:
						kategorie.trim().split(",").length > 1
							? kategorie.trim().split(",")[0]
							: kategorie.trim(),
					targetGroups: zielgruppen
						.replace("[", "")
						.replace("]", "")
						.replace(/"/g, "")
						.split(",")
						.map((targetGroup) => targetGroup.trim()),
					lon: lon,
					lat: lat,
					language: "de",
					identifierToBeSlugified: providerName,
					path: "",
					slug: providerName,
				};

				augmentedData.push(augmentedRow);
				continue;
			}

			console.info(
				`skipping: [${providerName}] (one or more properties are incomplete: lat=${lat}, lon=${lon}, district=${district}, isAccepted=${isAccepted}, fullAddress=${fullAddress})`,
			);
		}

		return augmentedData;
	} catch (error) {
		console.error("Error processing data", error);
		return [];
	}
}

async function updateAndTranslateData() {
	const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
	const filePath = "./berlinpass_data.json";

	if (!OPENAI_API_KEY || OPENAI_API_KEY === "") {
		throw new Error("OPENAI_API_KEY must be defined");
	}

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

		resultingData.push(translatedEntry);
	}

	fs.writeFileSync(filePath, JSON.stringify(resultingData), {
		flush: true,
	});
}

updateAndTranslateData().catch(console.error);
