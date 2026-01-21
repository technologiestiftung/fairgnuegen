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
				className={`
					size-4 mr-2
					focus-visible:outline focus-visible:outline-3 
					focus-visible:outline-berlin-blue 
					focus-visible:outline-offset-0 
					focus-visible:shadow-default-button-focus-shadow
				`}
			/>
			<span className="w-fit">{label}</span>
		</label>
	);
};

export default Checkbox;
