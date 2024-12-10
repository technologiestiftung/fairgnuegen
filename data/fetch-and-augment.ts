/* eslint-disable no-console */
import { Offer } from "../src/content/content";
import { fetchPaginatedData } from "./fetch-data";
import { findDistrict, geocodeViaMapbox } from "./geocode";

export async function fetchDataAndAugment(): Promise<Offer[]> {
	const augmentedData: Offer[] = [];

	const data = await fetchPaginatedData(1, null);

	const batchSize = 20;
	const numBatches = Math.ceil(data.length / batchSize);
	const batches = Array.from({ length: numBatches }, (_, i) =>
		data.slice(i * batchSize, i * batchSize + batchSize),
	);

	for (const [index, batch] of batches.entries()) {
		console.log(
			`Processing batch ${index + 1} / ${numBatches} [batch_size=${batch.length}]`,
		);
		const batchResults = await Promise.all(
			batch.flatMap(async (row) => {
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

				const { lat, lon } = await geocodeViaMapbox(fullAddress);
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
						website: website.trim().startsWith("www")
							? `https://${website.trim()}`
							: website.trim(),
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

					return augmentedRow;
				}
				console.info(
					`skipping: [${providerName}] (one or more properties are incomplete: lat=${lat}, lon=${lon}, district=${district}, isAccepted=${isAccepted}, fullAddress=${fullAddress})`,
				);
				return null;
			}),
		).catch((e) => {
			console.error(e);
			process.exit(1);
		});
		augmentedData.push(...batchResults.filter((row) => row !== null));
	}

	return augmentedData;
}
