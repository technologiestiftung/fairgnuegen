import React from "react";

interface BackButtonProps {
	onClick: () => void;
}
const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
	return (
		<button
			className="relative px-3 py-1 border-black border opacity-100 hover:opacity-50 grid grid-cols-1 grid-rows-1 items-center w-fit"
			onClick={onClick}
		>
			<div className="col-start-1 row-start-1 flex flex-row gap-1 items-center ">
				<div>Zurück</div>
			</div>
		</button>
	);
};

export default BackButton;
