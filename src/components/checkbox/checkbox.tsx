import React from "react";
import { CheckIcon } from "../icons/check-icon";

interface CheckboxProps {
	label: React.ReactNode;
	isChecked: boolean;
	onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, isChecked, onChange }) => {
	return (
		<div
			className="w-full flex flex-row items-start gap-3 py-2 text-lg font-bold  hover:cursor-pointer"
			onClick={() => {
				onChange();
			}}
		>
			<div
				className={`${!isChecked && "border border-2 border-black"} mt-1 w-5 h-5 min-w-5 min-h-5 flex flex-row items-center justify-center rounded-[2px] ${isChecked ? "bg-focus-blue" : ""}`}
			>
				<CheckIcon></CheckIcon>
			</div>
			{label}
		</div>
	);
};

export default Checkbox;
