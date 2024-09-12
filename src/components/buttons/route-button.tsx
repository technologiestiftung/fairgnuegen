import React from "react";

interface RouteButtonProps {
	onClick: () => void;
}

const RouteButton: React.FC<RouteButtonProps> = ({ onClick }) => {
	return (
		<div className="">
			<button
				className="px-3 py-1 border-black border-2 opacity-100 hover:opacity-50 flex justify-center items-center text-black h-[43px]"
				onClick={onClick}
			>
				<div className="flex flex-row gap-1 items-center">
					<div>Route planen</div>
				</div>
			</button>
		</div>
	);
};

export default RouteButton;
