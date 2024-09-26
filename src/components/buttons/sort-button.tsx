import React from "react";
import SortIcon from "../icons/sort-az";
import { useSearchParams } from "react-router-dom";
import useUpdateSearchParam from "../../hooks/use-update-search-params";
import { trackInteraction } from "../../analytics/matomo.ts";
import { useLanguage } from "../../hooks/use-language.tsx";
import { useI18n } from "../../i18n/use-i18n.tsx";

const FilterButton: React.FC = () => {
	const language = useLanguage();
	const i18n = useI18n(language);

	const { updateSearchParam } = useUpdateSearchParam();
	const [searchParams] = useSearchParams();
	const sortAscending = (searchParams.get("sort") ?? "asc") === "asc";
	return (
		<button
			className="px-3 py-1 border-black border-2 opacity-100 hover:opacity-50 flex justify-center items-center text-black h-[43px]"
			onClick={() => {
				trackInteraction({
					eventAction: "button click",
					eventName: `toggle sort order (from: ${window.location.pathname})`,
				});
				updateSearchParam(
					"sort",
					(searchParams.get("sort") ?? "asc") === "asc" ? "desc" : "asc",
				);
			}}
		>
			<div className="flex flex-row gap-1 items-center">
				<SortIcon ascending={sortAscending}></SortIcon>
				<div>{i18n["sort"]}</div>
			</div>
		</button>
	);
};

export default FilterButton;
