import React from "react";
import ArrowLeftIcon from "../icons/arrow-left-icon";

interface BackButtonProps {
	onClick: () => void;
}
const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
	return (
		<button
			className="px-3 py-1 border-black border opacity-100 hover:opacity-50 flex justify-center items-center text-primary-blue w-60 h-11"
			onClick={onClick}
		>
			<div className="col-start-1 row-start-1 flex flex-row gap-2 items-center">
				<ArrowLeftIcon></ArrowLeftIcon>
				<div>Zurück</div>
			</div>
		</button>
	);
};

export default BackButton;
