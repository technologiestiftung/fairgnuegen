import { useEffect, useRef } from "react";
import { Layout } from "../../layout/layout";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useFilteredAndSortedOffers } from "../../hooks/use-filtered-and-sorted-offers";

export default function Index() {
	const { filteredAndSortedOffers } = useFilteredAndSortedOffers();
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
		map.current = initMap;
	}, []);

	useEffect(() => {
		if (filteredAndSortedOffers && map.current) {
			filteredAndSortedOffers.forEach((offer) => {
				const popup = new maplibregl.Popup({ offset: 25, closeButton: false })
					.setHTML(`
		<div class="bg-white p-2 rounded-lg">
		  <h1 class="text-lg">${offer.provider}</h1>
		  <p class="text-sm">${offer.providerDescription}</p>
		</div>
	  `);

				new maplibregl.Marker()
					.setLngLat([offer.x, offer.y])
					.addTo(map.current)
					.setPopup(popup);
			});
		}
	}, [filteredAndSortedOffers, map]);

	return (
		<Layout>
			<div id="map" className="w-full h-[500px]" ref={mapRef}></div>
		</Layout>
	);
}
