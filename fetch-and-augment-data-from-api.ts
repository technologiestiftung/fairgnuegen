import * as turf from "@turf/turf";
import { readFileSync } from "node:fs";
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
	anbieter: string;
	kurzbeschreibung_des_anbieters: string;
	kurzbeschreibung_des_angebots: string;
	informationen_zum_angebot: string;
	website: string;
	strasse_und_hausnummer_des_angebots: string;
	plz_und_ort_des_angebots: string;
	gratis: string;
	kategorie: string;
	zielgruppen: string;
	freigabe: string;
}

export async function fetchData(): Promise<ApiRow[]> {
	const url = "https://www.berlin.de/freedb/open.php/index.json";
	const username = process.env.FREE_DB_USERNAME;
	const password = process.env.FREE_DB_PASSWORD;

	const response = await fetch(url, {
		headers: {
			Authorization:
				"Basic " + Buffer.from(username + ":" + password).toString("base64"),
		},
	});

	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}

	const jsonData = await response.json();
	return jsonData.data.index as ApiRow[];
}

function findDistrict({
	x,
	y,
	provider,
}: {
	x: number;
	y: number;
	provider: string;
}) {
	for (const { properties, geometry } of districtGeojson.features) {
		const point = turf.point([x, y]);
		const polygon = turf.multiPolygon(geometry.coordinates);

		const isOfferInDistrict = turf.booleanPointInPolygon(point, polygon);

		if (isOfferInDistrict) {
			return properties.Gemeinde_name;
		}
	}
	/* eslint-disable-next-line no-console */
	console.info(`No district found for ${provider} ${x}, ${y}`);
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
		console.info("Failed to fetch geo-coordinates:", error);
		return { lat: "", lon: "" }; // Return null to handle missing coordinates gracefully
	}
}

export async function fetchDataAndAugment(): Promise<Offer[]> {
	try {
		const augmentedData: Offer[] = [];

		const data = await fetchData();

		for (const row of data) {
			const {
				anbieter,
				kurzbeschreibung_des_anbieters,
				kurzbeschreibung_des_angebots,
				informationen_zum_angebot,
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
			const district = findDistrict({ x: lon, y: lat, provider: anbieter });

			const isAccepted = freigabe.toLowerCase().includes("ja");

			if (lat !== "" && lon !== "" && district !== "" && isAccepted) {
				const augmentedRow = {
					provider: anbieter,
					providerDescription: kurzbeschreibung_des_anbieters,
					offerDescription: kurzbeschreibung_des_angebots,
					offerInformation: informationen_zum_angebot,
					website,
					addressWithHouseNumber: strasse_und_hausnummer_des_angebots,
					cityWithZip: plz_und_ort_des_angebots,
					district: district,
					isFree: gratis ? gratis.toLowerCase().includes("ja") : false,
					category: kategorie,
					targetGroups: zielgruppen
						.replace("[", "")
						.replace("]", "")
						.replace(/"/g, "")
						.split(","),
					x: lat,
					y: lon,
					language: "de",
					identifierToBeSlugified: anbieter,
					path: "",
					slug: "",
				};

				augmentedData.push(augmentedRow);
			}
		}

		return augmentedData;
	} catch (error) {
		console.error("Error processing data", error);
		return [];
	}
}

fetchDataAndAugment();
