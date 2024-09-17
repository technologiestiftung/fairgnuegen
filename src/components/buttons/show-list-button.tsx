import React from "react";
import ListIcon from "../icons/list-icon";
import { useFreeOffersOnly } from "../../hooks/use-free-offers-only";

interface ShowListButtonProps {}
const ShowListButton: React.FC<ShowListButtonProps> = () => {
	const { isShowingFreeOffersOnly } = useFreeOffersOnly();
	return (
		<a
			className="px-3 py-1 border-black border-2 opacity-100 hover:opacity-50 flex justify-center items-center text-black h-[43px]"
			href={`/all-offers/?free=${isShowingFreeOffersOnly ? "true" : "false"}`}
		>
			<div className="flex flex-row gap-2 items-center">
				<ListIcon></ListIcon>
				<div>Listenansicht</div>
			</div>
		</a>
	);
};

export default ShowListButton;
