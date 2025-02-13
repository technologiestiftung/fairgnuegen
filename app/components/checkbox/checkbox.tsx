import React from "react";

interface CheckboxProps {
	id: string;
	label: React.ReactNode;
	isChecked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
	id,
	label,
	isChecked,
	onChange,
}) => {
	return (
		<label
			className="flex flex-row items-center font-bold cursor-pointer"
			htmlFor={id}
		>
			<input
				type="checkbox"
				id={id}
				checked={isChecked}
				onChange={onChange}
				className="size-4 mr-2 "
			/>
			<span className="w-fit">{label}</span>
		</label>
	);
};

export default Checkbox;
