import React from "react";

interface PillProp {
	title: string;
	backgroundColor?: string;
	textColor?: string;
	textSize?: string;
}

export const Pill: React.FC<PillProp> = ({
	title,
	backgroundColor,
	textColor,
	textSize,
}) => {
	return (
		<div
			className={`${textSize} px-3 py-1 rounded-full ${!backgroundColor && "border-primary-blue border-[1.5px]"} ${textColor ?? "text-primary-blue"} text-sm ${backgroundColor} flex text-center items-center`}
		>
			{title}
		</div>
	);
};
