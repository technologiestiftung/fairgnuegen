import React from "react";
import SortAZIcon from "../icons/sort-az";

const FilterButton: React.FC = () => {
	return (
		<button className="relative px-3 py-1 border-black border opacity-100 hover:opacity-50 grid grid-cols-1 grid-rows-1 items-center">
			<div className="col-start-1 row-start-1 flex flex-row gap-1 items-center ">
				<SortAZIcon></SortAZIcon>
				<div>Sortieren</div>
			</div>
		</button>
	);
};

export default FilterButton;
