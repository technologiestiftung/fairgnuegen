import React from "react";
import ArrowRightIcon from "../icons/arrow-right-icon";

interface ShowFilteredButtonProps {
	onClick: () => void;
}

const ShowFilteredButton: React.FC<ShowFilteredButtonProps> = ({ onClick }) => {
	return (
		<button
			className="h-[43px] border-black border-2 opacity-100 flex justify-center items-center w-[250px]"
			onClick={onClick}
		>
			<div className="flex flex-row justify-end items-center h-full w-full hover:bg-berlin-grey-light">
				<div className="w-[207px] flex flex-row items-center justify-center font-normal">
					Angebote zeigen
				</div>
				<div className="h-full bg-primary-red w-[43px] flex flex-row items-center justify-center border-l-black border-l-2">
					<ArrowRightIcon color="text-white"></ArrowRightIcon>
				</div>
			</div>
		</button>
	);
};

export default ShowFilteredButton;
