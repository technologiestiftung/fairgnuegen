import React from "react";
import MapIcon from "../icons/map-icon";

interface ShowMapButtonProps {}
const ShowMapButton: React.FC<ShowMapButtonProps> = () => {
	return (
		<button
			className="px-3 py-1 border-black border opacity-100 hover:opacity-50 flex justify-center items-center text-primary-blue"
			onClick={() => {}}
		>
			<div className="flex flex-row gap-2 items-center">
				<MapIcon></MapIcon>
				<div>Kartenansicht</div>
			</div>
		</button>
	);
};

export default ShowMapButton;
