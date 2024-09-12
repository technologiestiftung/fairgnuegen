import React from "react";
import ArrowRightIcon from "../icons/arrow-right-icon";

interface ShowFilteredButtonProps {
	onClick: () => void;
}

const ShowFilteredButton: React.FC<ShowFilteredButtonProps> = ({ onClick }) => {
	return (
		<button
			className="h-10 border-black border opacity-100 flex justify-center items-center w-fit"
			onClick={onClick}
		>
			<div className="flex flex-row justify-end items-center h-full w-full hover:bg-berlin-grey-light">
				<div className="w-[80%] flex flex-row items-center justify-center px-2">
					Angebote zeigen
				</div>
				<div className="h-full bg-primary-red w-[50px] flex flex-row items-center justify-center">
					<ArrowRightIcon color="text-white"></ArrowRightIcon>
				</div>
			</div>
		</button>
	);
};

export default ShowFilteredButton;
