import React from "react";
import { CheckIcon } from "../icons/check-icon";

interface CheckboxProps {
	id: string;
	label: React.ReactNode;
	isChecked: boolean;
	onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
	id,
	label,
	isChecked,
	onChange,
}) => {
	return (
		<label
			className="flex flex-row items-center mt-2 text-lg font-bold cursor-pointer"
			htmlFor={id}
		>
			<input
				type="checkbox"
				id={id}
				checked={isChecked}
				onChange={onChange}
				className="appearance-none focus:outline-none peer"
			/>
			<span
				className={`
				 w-5 h-5 flex flex-row items-center justify-center rounded-[2px] 
				 ${!isChecked && "border-2 border-black"} 
				 ${isChecked ? "bg-focus-blue" : ""}
				 peer-focus:outline peer-focus:outline-2 peer-focus:outline-blue-500 peer-focus:outline-offset-0
			 	`}
			>
				<CheckIcon></CheckIcon>
			</span>
			<span className="ml-3 w-fit">{label}</span>
		</label>
	);
};

export default Checkbox;
