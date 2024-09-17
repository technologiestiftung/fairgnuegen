import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import OfferPopup from "../../components/offer/offer-popup";
import { useMap } from "../../hooks/use-map";
import { useMapInteraction } from "../../hooks/use-map-interaction";
import { Layout } from "../../layout/layout";
import FreeOffersCheckbox from "../../components/checkbox/free-offers-checkbox";
import ShowListButton from "../../components/buttons/show-list-button";

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
				<div id="map" className="row-start-1 col-start-1 w-full h-[600px]" />

				{selectedOffer && (
					<div
						className={`absolute left-0 right-0 w-[500px] mx-auto`}
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
			<div className="max-w-3xl mx-auto flex flex-col my-4">
				<div className="flex flex-row justify-between">
					<ShowListButton></ShowListButton>
					<FreeOffersCheckbox></FreeOffersCheckbox>
				</div>
			</div>
		</Layout>
	);
}
