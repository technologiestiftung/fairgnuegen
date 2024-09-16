import { useEffect, useRef, useState } from "react";
import { Layout } from "../../layout/layout";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useFilteredAndSortedOffers } from "../../hooks/use-filtered-and-sorted-offers";

export default function Index() {
	const { geojson } = useFilteredAndSortedOffers();
	const mapRef = useRef<HTMLDivElement>(null);
	const map = useRef<maplibregl.Map | null>(null);
	const [isLoading, setIsLoading] = useState(true);

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

			initMap.on("mouseenter", "unclustered-point", () => {
				initMap.getCanvas().style.cursor = "pointer";
			});
			initMap.on("mouseleave", "unclustered-point", () => {
				initMap.getCanvas().style.cursor = "";
			});

			initMap.on("click", "unclustered-point", (e) => {
				if (!e.features) {
					return;
				}

				//@ts-expect-error coordinates is not null
				const coordinates = e.features[0].geometry.coordinates.slice();
				const title = e.features[0].properties.title;

				// Ensure that if the map is zoomed out such that
				// multiple copies of the feature are visible, the
				// popup appears over the copy being pointed to.
				while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
					coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
				}

				new maplibregl.Popup({ closeButton: false })
					.setLngLat(coordinates)
					.setHTML(`${title}`)
					.addTo(initMap);
			});

			setIsLoading(false);
		});

		map.current = initMap;
	}, []);

	return (
		<Layout>
			<div className="grid grid-cols-1 grid-rows-1">
				<div
					id="map"
					className="row-start-1 col-start-1 w-full h-[500px]"
					ref={mapRef}
				/>
				{isLoading && (
					<div
						id="map"
						className="row-start-1 col-start-1 w-full h-full flex flex-row items-center justify-center "
						ref={mapRef}
					>
						Kartenansicht wird geladen...
					</div>
				)}
			</div>
		</Layout>
	);
}
