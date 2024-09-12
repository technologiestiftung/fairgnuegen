import React, { useEffect, useState } from "react";
import { categoryMap } from "../../content/categories";
import { DrawerLeft } from "../drawer/drawer-left";
import { ChevronDown } from "../icons/chevron-down";
import { ChevronUp } from "../icons/chevron-up";
import CloseIcon from "../icons/close-icon";
import FilterIcon from "../icons/filter-icon";
import useUpdateSearchParam from "../../hooks/use-update-search-params";
import { useCategories } from "../../hooks/use-categories";
import { useDistricts } from "../../hooks/use-districts";
import { useTargetAudiences } from "../../hooks/use-target-audiences";
import { districtsMap } from "../../content/districts";
import { targetAudiencesMap } from "../../content/target-audiences";
import ShowFilteredButton from "./show-filtered-button";
import ShowAllButton from "./show-all-button";
import ResetFilterButton from "./reset-filter-button";

interface FilterRowOption {
	title: string;
	subtitle?: string;
	value: string;
}

interface FilterRow {
	title: string;
	urlKey: string;
	options: FilterRowOption[];
}

export type FilterIdentifier = "target_audience" | "category" | "district";

export type FilterDetails = {
	values: string[];
};

export type FilterMap = {
	[K in FilterIdentifier]: FilterDetails;
};

const FilterButton: React.FC = () => {
	const { updateManySearchParams } = useUpdateSearchParam();
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [isOpen, setIsOpen] = React.useState(false);

	const { categories } = useCategories();
	const { districts } = useDistricts();
	const { targetAudiences } = useTargetAudiences();

	const [selectedFilters, setSelectedFilters] = useState<FilterMap>({
		target_audience: { values: [] },
		category: { values: categories },
		district: { values: [] },
	} as FilterMap);

	useEffect(() => {
		setSelectedFilters({
			["category"]: {
				values: categories,
			},
			["district"]: {
				values: districts,
			},
			["target_audience"]: {
				values: targetAudiences,
			},
		});
	}, [categories, districts, targetAudiences, setSelectedFilters]);

	const filterRows: FilterRow[] = [
		{
			title: "Für wen ist das Angebot?",
			options: Object.entries(targetAudiencesMap).map(
				([key, targetAudience]) => ({
					title: targetAudience.label,
					value: key,
				}),
			),
			urlKey: "target_audience",
		},
		{
			title: "Welche Kategorien interessieren dich?",
			options: Object.entries(categoryMap)
				.filter((c) => c[1].isRenderedInCategoryCards)
				.map(([key, category]) => ({
					title: category.name,
					subtitle: category.description,
					value: key,
				})),
			urlKey: "category",
		},
		{
			title: "Wo suchst du Angebote?",
			options: Object.entries(districtsMap).map(([key, district]) => ({
				title: district,
				value: key,
			})),
			urlKey: "district",
		},
	];

	const onResetFilters = () => {
		const searchParams = updateManySearchParams(
			Object.entries(selectedFilters).map(([key]) => {
				return {
					key,
					value: "",
				};
			}),
		);
		if (window.location.pathname !== "/all-offers/") {
			window.location.href = "/all-offers/?" + searchParams;
			return;
		}
		setIsOpen(false);
	};

	const onSubmitFilters = () => {
		const searchParams = updateManySearchParams(
			Object.entries(selectedFilters).map(([key, value]) => {
				return {
					key,
					value: value.values.join(","),
				};
			}),
		);
		if (window.location.pathname !== "/all-offers/") {
			window.location.href = "/all-offers/?" + searchParams;
			return;
		}
		setIsOpen(false);
	};

	const toggleFilterOption = (
		filterRow: FilterRow,
		filterRowOption: FilterRowOption,
	) => {
		setSelectedFilters({
			...selectedFilters,
			[filterRow.urlKey]: {
				values: selectedFilters[
					filterRow.urlKey as FilterIdentifier
				].values.includes(filterRowOption.value)
					? selectedFilters[filterRow.urlKey as FilterIdentifier].values.filter(
							(v) => v !== filterRowOption.value,
						)
					: selectedFilters[filterRow.urlKey as FilterIdentifier].values.concat(
							[filterRowOption.value],
						),
			},
		});
	};

	return (
		<div className="">
			<button
				className="px-3 py-1 border-black border opacity-100 hover:opacity-50 flex justify-center items-center text-primary-blue"
				onClick={() => {
					setIsOpen(true);
				}}
			>
				<div className="flex flex-row gap-1 items-center">
					<FilterIcon></FilterIcon>
					<div>Filter</div>
				</div>
			</button>

			<DrawerLeft isOpen={isOpen} close={() => setIsOpen(false)}>
				<div className="flex flex-col text-base ">
					<div className="flex flex-row items-center justify-between mb-6 mt-4 px-6 py-4 shadow-lg">
						<p className="text-2xl font-bold">Filter</p>
						<button onClick={() => setIsOpen(false)}>
							<CloseIcon></CloseIcon>
						</button>
					</div>
					<div className="text-xl font-bold px-6 py-4">
						Filtere Angebote nach Zielgruppe, Interesse und Bezirk.
					</div>
					<div className="py-4">
						{filterRows.map((filterRow) => (
							<div key={filterRow.title} className="">
								<div
									key={filterRow.title}
									className={`hover:bg-berlin-grey-light hover:cursor-pointer py-4 border-b px-6 text-lg font-bold`}
								>
									<div
										className="flex flex-row justify-between items-center"
										onClick={() => {
											if (selectedCategories.includes(filterRow.title)) {
												setSelectedCategories(
													selectedCategories.filter(
														(v) => v !== filterRow.title,
													),
												);
											} else {
												setSelectedCategories(
													selectedCategories.concat([filterRow.title]),
												);
											}
										}}
									>
										<div>{filterRow.title}</div>
										{selectedCategories.includes(filterRow.title) ? (
											<ChevronUp></ChevronUp>
										) : (
											<ChevronDown></ChevronDown>
										)}
									</div>
								</div>
								<div className="pb-6">
									{selectedCategories.includes(filterRow.title) &&
										filterRow.options.map((subItem) => (
											<div
												key={subItem.title}
												className="px-6 flex flex-row items-start gap-2 py-2 text-lg"
											>
												<input
													className="mt-2"
													type="checkbox"
													id={subItem.title}
													name={subItem.value}
													value={subItem.value}
													onChange={() => {
														toggleFilterOption(filterRow, subItem);
													}}
													checked={selectedFilters[
														filterRow.urlKey as FilterIdentifier
													].values.includes(subItem.value)}
												/>
												<label htmlFor={subItem.title}>
													{subItem.subtitle ? (
														<div>
															<span className="font-bold">
																{subItem.title} {"> "}
															</span>
															<span>{subItem.subtitle}</span>
														</div>
													) : (
														<span className="">{subItem.title}</span>
													)}
												</label>
											</div>
										))}
								</div>
							</div>
						))}
					</div>
					<div className="px-6 py-4 flex flex-row justify-between items-center">
						<ResetFilterButton onClick={onResetFilters}></ResetFilterButton>
						<ShowFilteredButton onClick={onSubmitFilters}></ShowFilteredButton>
					</div>
				</div>
			</DrawerLeft>
		</div>
	);
};

export default FilterButton;
