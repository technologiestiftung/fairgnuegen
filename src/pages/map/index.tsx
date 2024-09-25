import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import FilterButton from "../../components/buttons/filter-button";
import ShowListButton from "../../components/buttons/show-list-button";
import FreeOffersCheckbox from "../../components/checkbox/free-offers-checkbox";
import MapLegend from "../../components/map/map-legend";
import OfferPopup from "../../components/offer/offer-popup";
import { useMap } from "../../hooks/use-map";
import { useMapHeight } from "../../hooks/use-map-height";
import { useMapInteraction } from "../../hooks/use-map-interaction";
import { Layout } from "../../layout/layout";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";

export default function Index() {
	const language = useLanguage();
	const i18n = useI18n(language);

	const { mapRef, isMapLoading } = useMap();
	const { selectedOffer } = useMapInteraction(mapRef);
	const popupRef = useRef<HTMLDivElement | null>(null);
	const mobilePopupRef = useRef<HTMLDivElement | null>(null);
	const [topAnchor, setTopAnchor] = useState(0);
	const { mapHeight } = useMapHeight();

	useEffect(() => {
		if (popupRef.current) {
			const mapVerticalBaseline = mapHeight / 2;
			const iconOffset = 55;
			setTopAnchor(
				mapVerticalBaseline - popupRef.current.clientHeight - iconOffset,
			);
		}
	}, [selectedOffer, popupRef, mapHeight]);

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
					<div
						id="mobile-popup"
						className="block md:hidden"
						ref={mobilePopupRef}
					>
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
