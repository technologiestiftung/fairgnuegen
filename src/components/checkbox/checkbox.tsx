import React from "react";

interface CheckBoxProps {
	id: string;
	title: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ id, title }) => {
	return (
		<div className="flex flex-row items-center gap-2 py-2 text-xl font-bold">
			<input type="checkbox" id={id} name={id} value="Bike" />
			<label htmlFor={id}>{title}</label>
		</div>
	);
};

export default CheckBox;
