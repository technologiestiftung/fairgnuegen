import React from "react";

interface CheckBoxProps {
	id: string;
	title: string;
	checked: boolean;
	onCheck: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ id, title, checked, onCheck }) => {
	return (
		<div className="flex flex-row items-center gap-2 py-2 text-lg font-bold">
			<input
				type="checkbox"
				id={id}
				name={id}
				value="Bike"
				onChange={onCheck}
				checked={checked}
			/>
			<label htmlFor={id}>{title}</label>
		</div>
	);
};

export default CheckBox;
