import React from "react";
import SortIcon from "../icons/sort-az";
import { useSearchParams } from "react-router-dom";
import useUpdateSearchParam from "../../hooks/use-update-search-params";

const FilterButton: React.FC = () => {
	const updateSearchParam = useUpdateSearchParam();
	const [searchParams] = useSearchParams();
	const sortAscending = (searchParams.get("sort") ?? "desc") === "asc";
	return (
		<button
			className="px-3 py-1 border-black border opacity-100 hover:opacity-50 flex justify-center items-center text-primary-blue"
			onClick={() => {
				updateSearchParam(
					"sort",
					searchParams.get("sort") === "asc" ? "desc" : "asc",
				);
			}}
		>
			<div className="flex flex-row gap-1 items-center">
				<SortIcon ascending={sortAscending}></SortIcon>
				<div>Sortieren</div>
			</div>
		</button>
	);
};

export default FilterButton;
