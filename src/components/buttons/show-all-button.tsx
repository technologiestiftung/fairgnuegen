import React from "react";
import ArrowRightIcon from "../icons/arrow-right-icon";

interface ShowAllButtonProps {
	onClick: () => void;
}
const ShowAllButton: React.FC<ShowAllButtonProps> = ({ onClick }) => {
	return (
		<button
			className="h-10 px-3 py-1 border-black border opacity-100 hover:opacity-50 flex justify-center items-center w-fit"
			onClick={onClick}
		>
			<div className="flex flex-row gap-2 items-center">
				<div>Alle Angebote zeigen</div>
				<ArrowRightIcon></ArrowRightIcon>
			</div>
		</button>
	);
};

export default ShowAllButton;
