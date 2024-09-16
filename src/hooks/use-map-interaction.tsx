import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MutableRefObject, useEffect } from "react";

export function useMapInteraction(
	map: MutableRefObject<maplibregl.Map | null>,
) {
	useEffect(() => {
		if (!map.current) {
			return;
		}

		map.current.on("mouseenter", "unclustered-point", () => {
			if (!map.current) {
				return;
			}
			map.current.getCanvas().style.cursor = "pointer";
		});

		map.current.on("mouseleave", "unclustered-point", () => {
			if (!map.current) {
				return;
			}
			map.current.getCanvas().style.cursor = "";
		});

		map.current.on("click", "unclustered-point", (e) => {
			if (!map.current) {
				return;
			}

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
				.addTo(map.current);
		});
	}, []);
}
