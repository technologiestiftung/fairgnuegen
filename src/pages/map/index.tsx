import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import OfferPopup from "../../components/offer/offer-popup";
import { useMap } from "../../hooks/use-map";
import { useMapInteraction } from "../../hooks/use-map-interaction";
import { Layout } from "../../layout/layout";

export default function Index() {
	const { mapRef, isMapLoading } = useMap();
	const { selectedOffer } = useMapInteraction(mapRef);
	const popupRef = useRef<HTMLDivElement | null>(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (popupRef.current) {
			setHeight(popupRef.current.clientHeight);
		}
	}, [selectedOffer, popupRef, popupRef.current]);

	return (
		<Layout>
			<div className="grid grid-cols-1 grid-rows-1 relative">
				<div id="map" className="row-start-1 col-start-1 w-full h-[600px]" />

				{selectedOffer && (
					<div
						className={`absolute left-0 right-0 w-[500px] mx-auto`}
						ref={popupRef}
						style={{
							top: `${600 / 2 - height - 30}px`,
						}}
					>
						<OfferPopup offer={selectedOffer}></OfferPopup>
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
		</Layout>
	);
}
