import React, { useMemo } from "react";
import FilterMenu from "../menu/filter-menu";
import FilterIcon from "../icons/filter-icon";
import { useCategories } from "../../hooks/use-categories";
import { useDistricts } from "../../hooks/use-districts";
import { useTargetAudiences } from "../../hooks/use-target-audiences";
import { useFreeOffersOnly } from "../../hooks/use-free-offers-only";

const FilterButton: React.FC = () => {
	const { categories } = useCategories();
	const { districts } = useDistricts();
	const { targetAudiences } = useTargetAudiences();
	const { showFreeOffersOnly } = useFreeOffersOnly();

	const [isOpen, setIsOpen] = React.useState(false);

	const numActiveFilters = useMemo(() => {
		return (
			(categories.length === 0 ? 0 : 1) +
			(districts.length === 0 ? 0 : 1) +
			(targetAudiences.length === 0 ? 0 : 1) +
			(showFreeOffersOnly ? 1 : 0)
		);
	}, [categories, districts, targetAudiences]);

	return (
		<div className="">
			<button
				className="relative px-3 py-1 border-black border-2 opacity-100 hover:opacity-50 flex justify-center items-center text-black h-[43px]"
				onClick={() => {
					setIsOpen(true);
				}}
			>
				<div className="flex flex-row gap-1 items-center">
					<FilterIcon></FilterIcon>
					<div>Filter</div>
				</div>
				{numActiveFilters > 0 && (
					<div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-primary-blue flex flex-row items-center justify-center text-white font-bold">
						{numActiveFilters}
					</div>
				)}
			</button>

			<FilterMenu isOpen={isOpen} close={() => setIsOpen(false)} />
		</div>
	);
};

export default FilterButton;
