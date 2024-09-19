import React from "react";
import MapIcon from "../icons/map-icon";

interface ShowMapButtonProps {}
const ShowMapButton: React.FC<ShowMapButtonProps> = () => {
	return (
		<a
			className="px-3 py-1 border-black border-2 opacity-100 hover:opacity-50 flex justify-center items-center text-black h-[43px]"
			href="/map/"
		>
			<div className="flex flex-row gap-2 items-center">
				<MapIcon></MapIcon>
				<div>Kartenansicht</div>
			</div>
		</a>
	);
};

export default ShowMapButton;
