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
			className="px-3 py-1 border-black border opacity-100 hover:opacity-50 flex justify-center items-center text-primary-blue"
			onClick={onOrderChange}
		>
			<div className="flex flex-row gap-1 items-center">
				<SortIcon ascending={ascending}></SortIcon>
				<div>Sortieren</div>
			</div>
		</button>
	);
};

export default FilterButton;
