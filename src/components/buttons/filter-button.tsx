import React, { useMemo } from "react";
import FilterMenu from "../menu/filter-menu";
import FilterIcon from "../icons/filter-icon";
import { useCategories } from "../../hooks/use-categories";
import { useDistricts } from "../../hooks/use-districts";
import { useTargetAudiences } from "../../hooks/use-target-audiences";
import { useFreeOffersOnly } from "../../hooks/use-free-offers-only";
import { trackInteraction } from "../../analytics/matomo.ts";
import { useLanguage } from "../../hooks/use-language.tsx";
import { useI18n } from "../../i18n/use-i18n.tsx";

const FilterButton: React.FC = () => {
	const language = useLanguage();
	const i18n = useI18n(language);

	const { categories } = useCategories();
	const { districts } = useDistricts();
	const { targetAudiences } = useTargetAudiences();
	const { isShowingFreeOffersOnly } = useFreeOffersOnly();

	const [isOpen, setIsOpen] = React.useState(false);

	const numActiveFilters = useMemo(() => {
		return (
			categories.length +
			districts.length +
			targetAudiences.length +
			(isShowingFreeOffersOnly ? 1 : 0)
		);
	}, [categories, districts, targetAudiences, isShowingFreeOffersOnly]);

	return (
		<>
			<button
				className="relative px-3 py-1 border-black border-2 opacity-100 hover:opacity-50 flex justify-center items-center text-black h-[43px]"
				onClick={() => {
					setIsOpen(true);
					trackInteraction({
						eventAction: "button click",
						eventName: `toggle filter drawer menu (from: ${window.location.pathname})`,
					});
				}}
			>
				<div className="flex flex-row gap-2 items-center">
					<FilterIcon></FilterIcon>
					<div>{i18n["filter.title"]}</div>
				</div>
				{numActiveFilters > 0 && (
					<div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-berlin-green flex flex-row items-center justify-center text-white font-bold">
						{numActiveFilters}
					</div>
				)}
			</button>
			{isOpen && <FilterMenu isOpen={isOpen} close={() => setIsOpen(false)} />}
		</>
	);
};

export default FilterButton;
