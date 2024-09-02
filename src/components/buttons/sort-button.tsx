import React from "react";
import SortIcon from "../icons/sort-az";

interface FilterButtonProps {
	ascending: boolean;
	onOrderChange: () => void;
}
const FilterButton: React.FC<FilterButtonProps> = ({
	ascending,
	onOrderChange,
}) => {
	return (
		<button
			className="relative px-3 py-1 border-black border opacity-100 hover:opacity-50 grid grid-cols-1 grid-rows-1 items-center"
			onClick={onOrderChange}
		>
			<div className="col-start-1 row-start-1 flex flex-row gap-1 items-center ">
				<SortIcon ascending={ascending}></SortIcon>
				<div>Sortieren</div>
			</div>
		</button>
	);
};

export default FilterButton;
