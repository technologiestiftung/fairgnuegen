import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import FilterButton from "../../buttons/filter-button";
import ShowListButton from "../../buttons/show-list-button";
import FreeOffersCheckbox from "../../checkbox/free-offers-checkbox";
import MapLegend from "../../map/map-legend";
import OfferPopup from "../../offer/offer-popup";
import { useMap } from "../../../hooks/use-map";
import { useMapHeight } from "../../../hooks/use-map-height";
import { useMapInteraction } from "../../../hooks/use-map-interaction";
import { useLanguage } from "../../../hooks/use-language";
import { useI18n } from "../../../i18n/use-i18n";
import { useIconSizeInterpolation } from "../../../hooks/use-icon-size-interpolation";

export default function Index() {
	const language = useLanguage();
	const i18n = useI18n(language);

	const { calculateIconSize } = useIconSizeInterpolation();
	const { mapRef, isMapLoading } = useMap();
	const { selectedOffer, selectedOfferPosition } = useMapInteraction(mapRef);
	const popupRef = useRef<HTMLDivElement | null>(null);
	const mobilePopupRef = useRef<HTMLDivElement | null>(null);
	const [topAnchor, setTopAnchor] = useState(0);
	const { mapHeight } = useMapHeight();

	useEffect(() => {
		if (popupRef.current && selectedOfferPosition) {
			const iconOffset = calculateIconSize(mapRef.current?.getZoom() || 0) * 51;
			setTopAnchor(
				selectedOfferPosition.y -
					popupRef.current.clientHeight -
					iconOffset -
					5,
			);
		}
	}, [selectedOffer, popupRef, mapHeight, selectedOfferPosition, mapRef]);

	useEffect(() => {
		if (mobilePopupRef.current) {
			const divBottom = mobilePopupRef.current.getBoundingClientRect().bottom;
			const windowHeight = window.innerHeight;
			window.scrollBy({
				top: divBottom - windowHeight,
			});
		}
	}, [mobilePopupRef, selectedOffer]);

	return (
		<>
			<div className="grid grid-cols-1 grid-rows-1 relative">
				<div
					id="map"
					className={`row-start-1 col-start-1 w-full`}
					style={{
						height: `${mapHeight}px`,
					}}
				/>
				{selectedOffer && (
					<div
						id="mobile-popup"
						className="block md:hidden"
						ref={mobilePopupRef}
					>
						<OfferPopup offer={selectedOffer} />
					</div>
				)}

				{selectedOffer && selectedOfferPosition && (
					<div
						className={`hidden md:block absolute left-0 right-0 w-[90vw] sm:w-[500px]`}
						ref={popupRef}
						style={{
							top: `${topAnchor}px`,
							left: `${selectedOfferPosition.x - 250}px`,
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
						{i18n["map.loading"]}
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
					<FilterButton></FilterButton>
					<ShowListButton></ShowListButton>
				</div>

				<div className="flex lg:hidden">
					<MapLegend></MapLegend>
				</div>
			</div>
		</>
	);
}
