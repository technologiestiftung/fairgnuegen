import React from "react";

interface PillProp {
	title: string;
	backgroundColor?: string;
	textSize?: string;
}

export const Pill: React.FC<PillProp> = ({
	title,
	backgroundColor,
	textSize,
}) => {
	return (
		<div
			className={`${textSize} px-3 py-1 rounded-full border-black border-[1.5px] text-black text-sm flex flex-row gap-1 text-center items-center`}
		>
			{backgroundColor && (
				<div
					className={`w-3 h-3 min-w-3 min-h-3 rounded-full ${backgroundColor}`}
				/>
			)}
			<div>{title}</div>
		</div>
	);
};
