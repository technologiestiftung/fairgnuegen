import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { useFilteredAndSortedOffers } from "./use-filtered-and-sorted-offers";

export function useMap() {
	const [isMapLoading, setIsMapLoading] = useState(true);
	const { filteredAndSortedOffersAsGeojson } = useFilteredAndSortedOffers();
	const mapRef = useRef<maplibregl.Map | null>(null);

	useEffect(() => {
		const initMap = new maplibregl.Map({
			container: "map",
			style: "/map_style.json",
			center: [13.404954, 52.520008],
			zoom: 11,
		});

		initMap.on("load", async () => {
			const markers = [
				{ path: "/marker_culture.png", name: "culture_marker" },
				{ path: "/marker_education.png", name: "education_marker" },
				{ path: "/marker_leisure.png", name: "leisure_marker" },
				{ path: "/marker_sport.png", name: "sport_marker" },
				{ path: "/marker_backup.png", name: "backup_marker" },
			];
			markers.forEach(async (marker) => {
				const markerData = await initMap.loadImage(marker.path);
				initMap.addImage(marker.name, markerData.data);
			});

			initMap.addSource("markers", {
				type: "geojson",
				data: filteredAndSortedOffersAsGeojson,
				cluster: false,
				promoteId: "id",
			});

			initMap.addLayer({
				id: "unclustered-point",
				type: "symbol",
				source: "markers",
				layout: {
					"icon-allow-overlap": true,
					"icon-ignore-placement": true,
					"icon-image": [
						"match",
						["get", "category", ["get", "offer", ["properties"]]],
						// Kultur
						"Kultur",
						"culture_marker",
						//Sport
						"Sport",
						"sport_marker",
						//Freizeit
						"Freizeit",
						"leisure_marker",
						// Bildung & Beratung
						"Bildung & Beratung",
						"education_marker",
						//Backup
						"backup_marker",
					],
					"icon-size": [
						"interpolate",
						["linear"],
						["zoom"],
						0,
						0.1, // At zoom level 0, the icon size is 0.1 (10% of its original size)
						12,
						0.5, // At zoom level 12, the icon size is 0.5 (50% of its original size)
						22,
						1, // At zoom level 22, the icon size is 1 (100% of its original size)
					],
				},
			});

			initMap.addControl(
				new maplibregl.GeolocateControl({
					positionOptions: {
						enableHighAccuracy: true,
					},
					trackUserLocation: true,
				}),
				"bottom-left",
			);

			setIsMapLoading(false);
		});

		mapRef.current = initMap;
	}, []);

	useEffect(() => {
		if (!mapRef.current) {
			return;
		}
		const source = mapRef.current.getSource(
			"markers",
		) as maplibregl.GeoJSONSource;
		if (source && !isMapLoading) {
			source.setData(filteredAndSortedOffersAsGeojson);
		}
	}, [mapRef, filteredAndSortedOffersAsGeojson, isMapLoading]);

	return {
		mapRef,
		isMapLoading,
	};
}
