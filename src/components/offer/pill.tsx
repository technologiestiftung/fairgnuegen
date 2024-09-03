import React from "react";

interface PillProp {
	title: string;
}

export const Pill: React.FC<PillProp> = ({ title }) => {
	return (
		<div className="px-3 py-1 rounded-full border-primary-blue border-2 text-primary-blue text-sm">
			{title}
		</div>
	);
};
