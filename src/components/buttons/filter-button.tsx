import React from "react";
import FilterMenu from "../menu/filter-menu";
import FilterIcon from "../icons/filter-icon";

const FilterButton: React.FC = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<div className="">
			<button
				className="px-3 py-1 border-black border-2 opacity-100 hover:opacity-50 flex justify-center items-center text-black h-[43px]"
				onClick={() => {
					setIsOpen(true);
				}}
			>
				<div className="flex flex-row gap-1 items-center">
					<FilterIcon></FilterIcon>
					<div>Filter</div>
				</div>
			</button>

			<FilterMenu isOpen={isOpen} close={() => setIsOpen(false)} />
		</div>
	);
};

export default FilterButton;
