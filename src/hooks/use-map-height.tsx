import { useCallback, useEffect, useState } from "react";

export function useMapHeight() {
	const [mapHeight, setMapHeight] = useState(0);

	const calculateMapHeight = useCallback(() => {
		const header = document.getElementById("header");
		const mapLegend = document.getElementById("map-legend");
		const headerHeight = header ? header.clientHeight : 0;
		const mapLegendHeight = mapLegend ? mapLegend.clientHeight : 0;
		setMapHeight(window.innerHeight - headerHeight - mapLegendHeight);
	}, []);

	useEffect(() => {
		const handleResize = () => {
			calculateMapHeight();
		};
		window.addEventListener("resize", handleResize);
		calculateMapHeight();
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return {
		mapHeight,
	};
}
