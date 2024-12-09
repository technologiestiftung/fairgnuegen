import { districts } from "./geojson/bezirksgrenzen";
import * as turf from "@turf/turf";

export function findDistrict(lon: number, lat: number) {
	for (const { properties, geometry } of districts.features) {
		const point = turf.point([lon, lat]);
		const polygon = turf.multiPolygon(geometry.coordinates);

		const isOfferInDistrict = turf.booleanPointInPolygon(point, polygon);

		if (isOfferInDistrict) {
			return properties.Gemeinde_name;
		}
	}
	return "";
}

export async function fetchGeoCoordinates(fullAddress: string) {
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
		const mostImportantGeoCoordinates = geoCoordinates.sort((a, b) => {
			return b.importance - a.importance;
		});
		if (mostImportantGeoCoordinates.length === 0) {
			return { lat: "", lon: "" }; // Return null to handle missing coordinates gracefully
		}

		const { lat, lon } = mostImportantGeoCoordinates[0];
		return { lat, lon };
	} catch {
		return { lat: "", lon: "" }; // Return null to handle missing coordinates gracefully
	}
}
