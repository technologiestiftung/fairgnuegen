import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
	type RefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { type Offer } from "~/content/content.ts";

interface PopupPosition {
	x: number;
	y: number;
}

export function useMapInteraction(map: RefObject<maplibregl.Map | null>) {
	const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
	const [selectedOfferPosition, setSelectedOfferPosition] =
		useState<PopupPosition | null>();
	const selectedOfferRef = useRef(selectedOffer);

	const trackSelectedOfferPosition = useCallback(() => {
		if (!map.current) {
			return;
		}
		if (!selectedOfferRef.current) {
			return;
		}

		const selectedFeature = map.current.queryRenderedFeatures({
			layers: ["unclustered-point"],
			filter: ["==", "id", selectedOfferRef.current.path],
		})[0];

		if (!selectedFeature) {
			setSelectedOffer(null);
			setSelectedOfferPosition(null);
			return;
		}

		const pixelPosition = map.current.project(
			// @ts-expect-error coordinates is not null
			selectedFeature.geometry.coordinates,
		);

		setSelectedOfferPosition({ x: pixelPosition.x, y: pixelPosition.y });
	}, [
		map.current,
		selectedOfferRef,
		setSelectedOffer,
		setSelectedOfferPosition,
	]);

	useEffect(() => {
		selectedOfferRef.current = selectedOffer;
	}, [selectedOffer]);

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

			const pixelPosition = map.current.project(
				// @ts-expect-error coordinates is not null
				e.features[0].geometry.coordinates,
			);
			setSelectedOfferPosition({ x: pixelPosition.x, y: pixelPosition.y });

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
			map.current.on("drag", () => {
				trackSelectedOfferPosition();
			});
		}

		map.current.on("zoom", () => {
			trackSelectedOfferPosition();
		});

		map.current.on("move", () => {
			trackSelectedOfferPosition();
		});
	}, []);

	return { selectedOffer, selectedOfferPosition };
}
