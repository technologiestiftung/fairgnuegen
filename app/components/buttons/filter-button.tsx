import React, { useMemo } from "react";
import FilterMenu from "~/components/menu/filter-menu";
import FilterIcon from "~/components/icons/filter-icon";
import { useCategories } from "~/hooks/use-categories";
import { useDistricts } from "~/hooks/use-districts";
import { useTargetAudiences } from "~/hooks/use-target-audiences";
import { useFreeOffersOnly } from "~/hooks/use-free-offers-only";
import { trackInteraction } from "~/analytics/matomo";
import { useLanguage } from "~/hooks/use-language";
import { useI18n } from "~/i18n/use-i18n";
import { Button } from "~/components/buttons/button";

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
			<Button
				className={`
					relative px-3 py-1 border-black border-2 opacity-100 hover:opacity-50 
					flex justify-center items-center text-black h-[43px]
				`}
				onClick={() => {
					setIsOpen(true);
					trackInteraction({
						eventAction: "button click",
						eventName: `toggle filter drawer menu (from: ${window.location.pathname})`,
					});
				}}
			>
				<span className="flex flex-row gap-2 items-center">
					<FilterIcon></FilterIcon>
					<span>{i18n["filter.title"]}</span>
				</span>
				{numActiveFilters > 0 && (
					<span className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-berlin-green flex flex-row items-center justify-center text-black font-bold">
						{numActiveFilters}
					</span>
				)}
			</Button>
			<FilterMenu isOpen={isOpen} close={() => setIsOpen(false)} />
		</>
	);
};

export default FilterButton;
