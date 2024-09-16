import "maplibre-gl/dist/maplibre-gl.css";
import { useMap } from "../../hooks/use-map";
import { useMapInteraction } from "../../hooks/use-map-interaction";
import { Layout } from "../../layout/layout";

export default function Index() {
	const { mapRef, isMapLoading } = useMap();
	useMapInteraction(mapRef);

	return (
		<Layout>
			<div className="grid grid-cols-1 grid-rows-1">
				<div id="map" className="row-start-1 col-start-1 w-full h-[500px]" />
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
