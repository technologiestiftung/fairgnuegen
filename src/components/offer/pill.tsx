import React from "react";

interface PillProp {
	title: string;
	backgroundColor?: string;
	textColor?: string;
}

export const Pill: React.FC<PillProp> = ({
	title,
	backgroundColor,
	textColor,
}) => {
	return (
		<div
			className={`text-xs md:text-base px-3 py-1 rounded-full ${!backgroundColor && "border-primary-blue border-2"} ${textColor ?? "text-primary-blue"} text-sm ${backgroundColor} flex text-center items-center`}
		>
			{title}
		</div>
	);
};
