import React from "react";
import ArrowRightIcon from "../icons/arrow-right-icon";

interface ShowAllButtonProps {
	onClick: () => void;
}
const ShowAllButton: React.FC<ShowAllButtonProps> = ({ onClick }) => {
	return (
		<button
			className="h-10 border-black border opacity-100 hover:opacity-50 flex justify-center items-center w-[250px]"
			onClick={onClick}
		>
			<div className="flex flex-row justify-end items-center h-full w-full">
				<div className="w-[80%] flex flex-row items-center justify-center">
					Alle Angebote zeigen
				</div>
				<div className="h-full bg-primary-red w-[50px] flex flex-row items-center justify-center">
					<ArrowRightIcon color="text-white"></ArrowRightIcon>
				</div>
			</div>
		</button>
	);
};

export default ShowAllButton;
