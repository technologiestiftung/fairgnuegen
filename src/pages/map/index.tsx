import { useEffect, useRef } from "react";
import { Layout } from "../../layout/layout";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function Index() {
	const mapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const map = new maplibregl.Map({
			container: "map", // container id
			style:
				"https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_col.json", // style URL
			center: [13.404954, 52.520008], // starting position [lng, lat]
			zoom: 15, // starting zoom
		});

		const popup = new maplibregl.Popup({ offset: 25 }).setHTML(`
    <div class="bg-white border-2 border-black p-4 rounded-lg">
      <h1 class="text-lg text-blue-600">Custom Popup</h1>
      <p class="text-sm text-gray-500">This is a custom-styled popup using Tailwind CSS.</p>
    </div>
  `);

		let marker = new maplibregl.Marker()
			.setLngLat([13.404954, 52.520008])
			.addTo(map)
			.setPopup(popup);
	}, []);

	return (
		<Layout>
			<div id="map" className="w-full h-[500px]" ref={mapRef}></div>
		</Layout>
	);
}
