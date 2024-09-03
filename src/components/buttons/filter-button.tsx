import React from "react";
import FilterIcon from "../icons/filter-icon";

const FilterButton: React.FC = () => {
	return (
		<button className="px-3 py-1 border-black border opacity-100 hover:opacity-50 flex justify-center items-center text-primary-blue">
			<div className="flex flex-row gap-1 items-center">
				<FilterIcon></FilterIcon>
				<div>Filter</div>
			</div>
		</button>
	);
};

export default FilterButton;
