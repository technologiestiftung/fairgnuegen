import { useEffect, useRef } from "react";
import { Layout } from "../../layout/layout";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useFilteredAndSortedOffers } from "../../hooks/use-filtered-and-sorted-offers";

export default function Index() {
	const { geojson } = useFilteredAndSortedOffers();
	const mapRef = useRef<HTMLDivElement>(null);
	const map = useRef<maplibregl.Map | null>(null);

	useEffect(() => {
		const initMap = new maplibregl.Map({
			container: "map",
			style:
				"https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_col.json", // style URL
			center: [13.404954, 52.520008],
			zoom: 11,
		});

		initMap.on("load", () => {
			// Add a new source from our GeoJSON data and
			// set the 'cluster' option to true. GL-JS will
			// add the point_count property to your source data.
			initMap.addSource("markers", {
				type: "geojson",
				// Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
				// from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
				data: geojson,
				cluster: true,
				clusterMaxZoom: 14, // Max zoom to cluster points on
				clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
			});

			initMap.addLayer({
				id: "clusters",
				type: "circle",
				source: "markers",
				filter: ["has", "point_count"],
				paint: {
					// Use step expressions (https://maplibre.org/maplibre-style-spec/#expressions-step)
					// with three steps to implement three types of circles:
					//   * Blue, 20px circles when point count is less than 100
					//   * Yellow, 30px circles when point count is between 100 and 750
					//   * Pink, 40px circles when point count is greater than or equal to 750
					"circle-color": [
						"step",
						["get", "point_count"],
						"#51bbd6",
						100,
						"#f1f075",
						750,
						"#f28cb1",
					],
					"circle-radius": [
						"step",
						["get", "point_count"],
						20,
						100,
						30,
						750,
						40,
					],
				},
			});

			initMap.addLayer({
				id: "cluster-count",
				type: "symbol",
				source: "markers",
				filter: ["has", "point_count"],
				layout: {
					"text-field": "{point_count_abbreviated}",
					"text-font": ["Noto Sans Regular"],
					"text-size": 12,
				},
			});

			initMap.addLayer({
				id: "unclustered-point",
				type: "circle",
				source: "markers",
				filter: ["!", ["has", "point_count"]],
				paint: {
					"circle-color": "#00ff00",
					"circle-radius": 10,
					"circle-stroke-width": 1,
					"circle-stroke-color": "#ffffff",
				},
			});

			// inspect a cluster on click
			initMap.on("click", "clusters", async (e) => {
				const features = initMap.queryRenderedFeatures(e.point, {
					layers: ["clusters"],
				});
				const clusterId = features[0].properties.cluster_id;
				const zoom = await initMap
					.getSource("markers")
					.getClusterExpansionZoom(clusterId);
				initMap.easeTo({
					center: features[0].geometry.coordinates,
					zoom,
				});
			});

			initMap.on("mouseenter", "clusters", () => {
				initMap.getCanvas().style.cursor = "pointer";
			});
			initMap.on("mouseleave", "clusters", () => {
				initMap.getCanvas().style.cursor = "";
			});
			initMap.on("mouseenter", "unclustered-point", () => {
				initMap.getCanvas().style.cursor = "pointer";
			});
			initMap.on("mouseleave", "unclustered-point", () => {
				initMap.getCanvas().style.cursor = "";
			});
		});

		map.current = initMap;
	}, []);

	return (
		<Layout>
			<div id="map" className="w-full h-[500px]" ref={mapRef}></div>
		</Layout>
	);
}
