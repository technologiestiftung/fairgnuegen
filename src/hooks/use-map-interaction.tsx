import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MutableRefObject, useEffect, useState } from "react";

export function useMapInteraction(
	map: MutableRefObject<maplibregl.Map | null>,
) {
	const [selectedOffer, setSelectedOffer] = useState(null);

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
				setSelectedOffer(null);
				return;
			}

			if (!e.features) {
				setSelectedOffer(null);
				return;
			}

			if (e.features.length === 0) {
				setSelectedOffer(null);
				return;
			}

			const offer = JSON.parse(e.features[0].properties.offer);
			setSelectedOffer(offer);
		});
	}, []);

	return { selectedOffer };
}
