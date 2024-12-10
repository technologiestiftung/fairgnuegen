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

export async function geocodeViaNominatim(fullAddress: string) {
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
			return { lat: null, lon: null };
		}
		const { lat, lon } = orderedGeoCoordinates[0];
		return { lat, lon };
	} catch {
		return { lat: null, lon: null };
	}
}

export async function geocodeViaMapbox(fullAddress: string) {
	const token = process.env.MAPBOX_ACCESS_TOKEN;
	try {
		const response = await fetch(
			`https://api.mapbox.com/search/geocode/v6/forward?q=${fullAddress}&access_token=${token}`,
			{
				headers: {
					"Content-Type": "application/json",
				},
				method: "GET",
			},
		);

		const jsonResponse = await response.json();
		const features = jsonResponse.features;
		if (features.length === 0) {
			return { lat: null, lon: null };
		}
		const lon = features[0].geometry.coordinates[0];
		const lat = features[0].geometry.coordinates[1];
		return { lat, lon };
	} catch {
		return { lat: null, lon: null };
	}
}
