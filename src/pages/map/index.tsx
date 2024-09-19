import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
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

	const mapVerticalBaseline = 600 / 2;
	const iconOffset = 30;

	useEffect(() => {
		if (popupRef.current) {
			setTopAnchor(
				mapVerticalBaseline - popupRef.current.clientHeight - iconOffset,
			);
		}
	}, [selectedOffer, popupRef]);

	return (
		<Layout>
			<div className="grid grid-cols-1 grid-rows-1 relative">
				<div
					id="map"
					className="row-start-1 col-start-1 w-full h-[40vh] md:h-[70vh]"
				/>
				{selectedOffer && (
					<div className="block md:hidden">
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

			<div className="flex flex-col gap-4 py-8 md:flex-row md:justify-between px-4 md:p-4">
				<div className="hidden md:flex">
					<MapLegend></MapLegend>
				</div>

				<div className="hidden md:flex flex-row gap-4 items-center justify-end">
					<FreeOffersCheckbox></FreeOffersCheckbox>
					<FilterButton></FilterButton>
					<ShowListButton></ShowListButton>
				</div>

				<div className="flex md:hidden md:opacity-0">
					<FreeOffersCheckbox></FreeOffersCheckbox>
				</div>

				<div className="flex md:hidden md:opacity-0 flex-row gap-4">
					<ShowListButton></ShowListButton>
					<FilterButton></FilterButton>
				</div>

				<div className="flex md:hidden">
					<MapLegend></MapLegend>
				</div>
			</div>
		</Layout>
	);
}
