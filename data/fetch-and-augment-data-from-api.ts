import * as turf from "@turf/turf";
import { backOff } from "exponential-backoff";
import { readFileSync, writeFileSync } from "node:fs";
import { Offer } from "./src/content/content";

const geojsonFilePath = "./geojson/bezirksgrenzen.geojson";
const districtGeojson = JSON.parse(readFileSync(geojsonFilePath, "utf8"));

if (!process.env.FREE_DB_USERNAME || process.env.FREE_DB_USERNAME === "") {
	throw new Error("env FREE_DB_USERNAME must be defined");
}

if (!process.env.FREE_DB_PASSWORD || process.env.FREE_DB_PASSWORD === "") {
	throw new Error("env FREE_DB_PASSWORD must be defined");
}

interface ApiRow {
	id: string;
	name_anbieter: string;
	kurzbeschreibung_des_anbieters: string;
	kurzbeschreibung_des_angebots: string;
	art_der_ermaessigung: string;
	website: string;
	strasse_und_hausnummer_des_angebots: string;
	plz_und_ort_des_angebots: string;
	gratis: string;
	kategorie: string;
	zielgruppen: string;
	freigabe: string;
}

export async function fetchPaginatedData(
	page: number,
	accumulatedData: ApiRow[] | null,
): Promise<ApiRow[]> {
	const url = `https://www.berlin.de/freedb/open.php/index.json?page=${page}`;

	console.log(`fetching: [${url}]`);

	const username = process.env.FREE_DB_USERNAME;
	const password = process.env.FREE_DB_PASSWORD;

	let response = await fetch(url, {
		headers: {
			Authorization:
				"Basic " + Buffer.from(username + ":" + password).toString("base64"),
			page: page.toString(),
		},
	});

	if (response.status === 425) {
		response = await backOff(async () => {
			const newResponse = await fetch(url, {
				headers: {
					Authorization:
						"Basic " +
						Buffer.from(username + ":" + password).toString("base64"),
				},
			});
			if (!newResponse.ok) {
				throw new Error("API is blocking the request due to rate limiting...");
			}
			return newResponse;
		});
	}

	const jsonData = await response.json();
	const data = jsonData.data.index as ApiRow[];

	if (data.length === 0) {
		const filePath = "./accumulatedData.json";
		writeFileSync(filePath, JSON.stringify(accumulatedData, null, 2));
		return accumulatedData || [];
	}

	const newAccumulatedData = accumulatedData
		? accumulatedData.concat(data)
		: data;

	return fetchPaginatedData(page + 1, newAccumulatedData);
}

function findDistrict({ x, y }: { x: number; y: number }) {
	for (const { properties, geometry } of districtGeojson.features) {
		const point = turf.point([x, y]);
		const polygon = turf.multiPolygon(geometry.coordinates);

		const isOfferInDistrict = turf.booleanPointInPolygon(point, polygon);

		if (isOfferInDistrict) {
			return properties.Gemeinde_name;
		}
	}
	return "";
}

async function fetchGeoCoordinates(fullAddress: string) {
	try {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/search?format=json&q=${fullAddress}`,
			{
				headers: {
					"Content-Type": "application/json",
				},
				method: "GET",
			},
		);

		const geoCoordinates = await response.json();
		if (geoCoordinates.length === 0) {
			return { lat: "", lon: "" }; // Return null to handle missing coordinates gracefully
		}

		const { lat, lon } = geoCoordinates[0];
		return { lat, lon };
	} catch (error) {
		return { lat: "", lon: "" }; // Return null to handle missing coordinates gracefully
	}
}

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
			const district = findDistrict({
				x: lon,
				y: lat,
			});

			const isAccepted = !freigabe.toLowerCase().includes("nein");
			const providerName = name_anbieter.trim();

			if (lat !== "" && lon !== "" && district !== "" && isAccepted) {
				console.log(`augmented: [${providerName}]`);
				const augmentedRow = {
					id: `${id}`,
					provider: providerName,
					providerDescription: kurzbeschreibung_des_anbieters.trim(),
					offerDescription: kurzbeschreibung_des_angebots.trim(),
					offerInformation: art_der_ermaessigung.trim(),
					website: website.trim(),
					addressWithHouseNumber: strasse_und_hausnummer_des_angebots.trim(),
					cityWithZip: plz_und_ort_des_angebots.trim(),
					district: district.trim(),
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
					x: lat,
					y: lon,
					language: "de",
					identifierToBeSlugified: providerName,
					path: "",
					slug: providerName,
				};

				augmentedData.push(augmentedRow);
				continue;
			}

			console.log(
				`skipping: [${providerName}] (one or more properties are incomplete: lat=${lat}, lon=${lon}, district=${district}, isAccepted=${isAccepted}, fullAddress=${fullAddress})`,
			);
		}

		return augmentedData;
	} catch (error) {
		console.error("Error processing data", error);
		return [];
	}
}
