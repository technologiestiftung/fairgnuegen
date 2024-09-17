import React from "react";
import ListIcon from "../icons/list-icon";

interface ShowListButtonProps {}
const ShowListButton: React.FC<ShowListButtonProps> = () => {
	return (
		<button
			className="px-3 py-1 border-black border-2 opacity-100 hover:opacity-50 flex justify-center items-center text-black h-[43px]"
			onClick={() => {
				window.location.href = "/all-offers/";
			}}
		>
			<div className="flex flex-row gap-2 items-center">
				<ListIcon></ListIcon>
				<div>Listenansicht</div>
			</div>
		</button>
	);
};

export default ShowListButton;
