import React from "react";
import ArrowLeftIcon from "../icons/arrow-left-icon";

interface BackButtonProps {
	title: string;
}

const BackButton: React.FC<BackButtonProps> = ({ title }) => {
	return (
		<button
			className="px-3 py-1 border-black border-2 opacity-100 hover:opacity-50 flex justify-center items-center text-black w-60 h-[43px]"
			onClick={() => {
				if (window.location.pathname === "/all-offers/") {
					window.location.href = "/";
					return;
				}
				window.history.back();
			}}
		>
			<div className="col-start-1 row-start-1 flex flex-row gap-2 items-center">
				<ArrowLeftIcon></ArrowLeftIcon>
				<div>{title}</div>
			</div>
		</button>
	);
};

export default BackButton;
