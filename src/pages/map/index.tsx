import "maplibre-gl/dist/maplibre-gl.css";
import { useRef } from "react";
import { useMap } from "../../hooks/use-map";
import { Layout } from "../../layout/layout";

export default function Index() {
	const mapRef = useRef<HTMLDivElement>(null);
	const { isMapLoading } = useMap();

	return (
		<Layout>
			<div className="grid grid-cols-1 grid-rows-1">
				<div
					id="map"
					className="row-start-1 col-start-1 w-full h-[500px]"
					ref={mapRef}
				/>
				{isMapLoading && (
					<div
						id="map"
						className="row-start-1 col-start-1 w-full h-full flex flex-row items-center justify-center "
						ref={mapRef}
					>
						Kartenansicht wird geladen...
					</div>
				)}
			</div>
		</Layout>
	);
}
