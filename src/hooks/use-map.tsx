import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { useFilteredAndSortedOffers } from "./use-filtered-and-sorted-offers";

export function useMap() {
	const [isMapLoading, setIsMapLoading] = useState(true);
	const { geojson } = useFilteredAndSortedOffers();
	const mapRef = useRef<maplibregl.Map | null>(null);

	useEffect(() => {
		const initMap = new maplibregl.Map({
			container: "map",
			style:
				"https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_col.json", // style URL
			center: [13.404954, 52.520008],
			zoom: 11,
		});

		initMap.on("load", async () => {
			const cultureMarkerData = await initMap.loadImage("/marker_culture.png");
			initMap.addImage("culture_marker", cultureMarkerData.data);

			const educationMarkerData = await initMap.loadImage(
				"/marker_education.png",
			);
			initMap.addImage("education_marker", educationMarkerData.data);

			const leisureMarkerData = await initMap.loadImage("/marker_leisure.png");
			initMap.addImage("leisure_marker", leisureMarkerData.data);

			const sportMarkerData = await initMap.loadImage("/marker_sport.png");
			initMap.addImage("sport_marker", sportMarkerData.data);

			const backupMarkerData = await initMap.loadImage("/marker_backup.png");
			initMap.addImage("backup_marker", backupMarkerData.data);

			initMap.addSource("markers", {
				type: "geojson",
				// @ts-expect-error geojson is not null
				data: geojson,
				cluster: false,
			});

			initMap.addLayer({
				id: "unclustered-point",
				type: "symbol",
				source: "markers",
				layout: {
					"icon-image": [
						"match",
						["get", "category"],
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

			setIsMapLoading(false);
		});

		mapRef.current = initMap;
	}, []);

	return {
		mapRef,
		isMapLoading,
	};
}
