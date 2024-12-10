import { districts } from "./geojson/bezirksgrenzen";
import * as turf from "@turf/turf";

export function findDistrict(lat: number, lon: number) {
	for (const { properties, geometry } of districts.features) {
		const point = turf.point([lon, lat]);
		const polygon = turf.multiPolygon(geometry.coordinates);

		const isOfferInDistrict = turf.booleanPointInPolygon(point, polygon);

		if (isOfferInDistrict) {
			return properties.Gemeinde_name;
		}
	}
	return null;
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
		const orderedGeoCoordinates = geoCoordinates.sort((a, b) => {
			return a.place_id - b.place_id;
		});
		if (orderedGeoCoordinates.length === 0) {
			return { lat: null, lon: null }; // Return null to handle missing coordinates gracefully
		}
		const { lat, lon } = orderedGeoCoordinates[0];
		return { lat, lon };
	} catch {
		return { lat: null, lon: null }; // Return null to handle missing coordinates gracefully
	}
}
