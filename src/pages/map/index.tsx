import "maplibre-gl/dist/maplibre-gl.css";
// import OfferDetail from "../../components/offer/offer-detail";
import { useMap } from "../../hooks/use-map";
import { useMapInteraction } from "../../hooks/use-map-interaction";
import { Layout } from "../../layout/layout";

export default function Index() {
	const { mapRef, isMapLoading } = useMap();
	useMapInteraction(mapRef);

	return (
		<Layout>
			<div className="grid grid-cols-1 grid-rows-1 relative">
				<div id="map" className="row-start-1 col-start-1 w-full h-[70vh]" />
				{/* {selectedOffer && (
					<div className="absolute left-0 top-0 w-[500px] p-4 bg-white">
						<OfferDetail offer={selectedOffer}></OfferDetail>
					</div>
				)} */}
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
