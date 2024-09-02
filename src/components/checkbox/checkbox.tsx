import React from "react";

interface CheckBoxProps {
	id: string;
	title: string;
	onCheck: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ id, title, onCheck }) => {
	return (
		<div className="flex flex-row items-center gap-2 py-2 text-xl font-bold">
			<input
				type="checkbox"
				id={id}
				name={id}
				value="Bike"
				onChange={onCheck}
			/>
			<label htmlFor={id}>{title}</label>
		</div>
	);
};

export default CheckBox;
