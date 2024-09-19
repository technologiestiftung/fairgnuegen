import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useMemo, useRef, useState } from "react";
import OfferPopup from "../../components/offer/offer-popup";
import { useMap } from "../../hooks/use-map";
import { useMapInteraction } from "../../hooks/use-map-interaction";
import { Layout } from "../../layout/layout";
import FreeOffersCheckbox from "../../components/checkbox/free-offers-checkbox";
import ShowListButton from "../../components/buttons/show-list-button";
import FilterButton from "../../components/buttons/filter-button";
import MapLegend from "../../components/map/map-legend";

export default function Index() {
	const { mapRef, isMapLoading } = useMap();
	const { selectedOffer } = useMapInteraction(mapRef);
	const popupRef = useRef<HTMLDivElement | null>(null);
	const [topAnchor, setTopAnchor] = useState(0);
	const [windowHeight, setWindowHeight] = useState(window.innerWidth);

	const mapHeight = useMemo(() => {
		const header = document.getElementById("header");
		const mapLegend = document.getElementById("map-legend");
		const headerHeight = header ? header.clientHeight : 0;
		const mapLegendHeight = mapLegend ? mapLegend.clientHeight : 0;
		return window.innerHeight - headerHeight - mapLegendHeight;
	}, [
		document.getElementById("header"),
		document.getElementById("map-legend"),
		windowHeight,
	]);

	useEffect(() => {
		if (popupRef.current) {
			const mapVerticalBaseline = mapHeight / 2;
			const iconOffset = 30;
			setTopAnchor(
				mapVerticalBaseline - popupRef.current.clientHeight - iconOffset,
			);
		}
	}, [selectedOffer, popupRef, mapHeight]);

	useEffect(() => {
		const handleResize = () => {
			setWindowHeight(window.innerHeight);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<Layout>
			<div className="grid grid-cols-1 grid-rows-1 relative">
				<div
					id="map"
					className={`row-start-1 col-start-1 w-full`}
					style={{
						height: `${mapHeight}px`,
					}}
				/>
				{selectedOffer && (
					<div id="mobile-popup" className="block md:hidden">
						<OfferPopup offer={selectedOffer} />
					</div>
				)}

				{selectedOffer && (
					<div
						className={`hidden md:block absolute left-0 right-0 w-[90vw] sm:w-[500px] mx-auto`}
						ref={popupRef}
						style={{
							top: `${topAnchor}px`,
						}}
					>
						<OfferPopup offer={selectedOffer} />
					</div>
				)}

				{isMapLoading && (
					<div
						id="map"
						className="row-start-1 col-start-1 w-full h-full flex flex-row items-center justify-center "
					>
						Kartenansicht wird geladen...
					</div>
				)}
			</div>

			<div
				id="map-legend"
				className="flex flex-col gap-4 py-4 lg:flex-row lg:justify-between px-4 lg:p-4"
			>
				<div className="hidden lg:flex">
					<MapLegend></MapLegend>
				</div>

				<div className="hidden lg:flex flex-row gap-4 items-center justify-end">
					<FreeOffersCheckbox></FreeOffersCheckbox>
					<FilterButton></FilterButton>
					<ShowListButton></ShowListButton>
				</div>

				<div className="flex lg:hidden lg:opacity-0">
					<FreeOffersCheckbox></FreeOffersCheckbox>
				</div>

				<div className="flex lg:hidden lg:opacity-0 flex-row gap-4">
					<ShowListButton></ShowListButton>
					<FilterButton></FilterButton>
				</div>

				<div className="flex lg:hidden">
					<MapLegend></MapLegend>
				</div>
			</div>
		</Layout>
	);
}
