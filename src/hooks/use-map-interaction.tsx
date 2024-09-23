import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MutableRefObject, useEffect, useState } from "react";
import { Offer } from "../content/content";

export function useMapInteraction(
	map: MutableRefObject<maplibregl.Map | null>,
) {
	const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

	useEffect(() => {
		if (!map.current) {
			return;
		}

		if (!map.current.isStyleLoaded()) {
			return;
		}

		if (selectedOffer) {
			map.current.setLayoutProperty("unclustered-point", "icon-size", [
				"interpolate",
				["linear"],
				["zoom"],
				0,
				["match", ["get", "id"], selectedOffer.path, 0.15, 0.1],
				12,
				["match", ["get", "id"], selectedOffer.path, 0.75, 0.5],
				22,
				["match", ["get", "id"], selectedOffer.path, 1.5, 1.0],
			]);
			return;
		}

		map.current.setLayoutProperty("unclustered-point", "icon-size", [
			"interpolate",
			["linear"],
			["zoom"],
			0,
			0.1,
			12,
			0.5,
			22,
			1.0,
		]);
	}, [map, selectedOffer]);

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

			map.current.easeTo({
				// @ts-expect-error coordinates is not null
				center: e.features[0].geometry.coordinates,
				zoom: 15,
			});
		});

		map.current.on("click", (e) => {
			if (!map.current) {
				return;
			}
			const features = map.current.queryRenderedFeatures(e.point, {
				layers: ["unclustered-point"],
			});
			if (!features || features.length === 0) {
				setSelectedOffer(null);
				return;
			}
		});

		if (window.innerWidth > 768) {
			map.current.on("dragstart", () => {
				if (!map.current) {
					return;
				}
				setSelectedOffer(null);
			});
		}
	}, []);

	return { selectedOffer };
}
