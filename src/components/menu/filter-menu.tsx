import React from "react";
import { useEffect, useState } from "react";
import { categoryMap } from "../../content/categories";
import { districtsMap } from "../../content/districts";
import { targetAudiencesMap } from "../../content/target-audiences";
import { useCategories } from "../../hooks/use-categories";
import { useDistricts } from "../../hooks/use-districts";
import { useTargetAudiences } from "../../hooks/use-target-audiences";
import useUpdateSearchParam from "../../hooks/use-update-search-params";
import ResetFilterButton from "../buttons/reset-filter-button";
import ShowFilteredButton from "../buttons/show-filtered-button";
import Checkbox from "../checkbox/checkbox";
import FreeOffersCheckbox from "../checkbox/free-offers-checkbox";
import { Drawer } from "../drawer/drawer";
import { ChevronDown } from "../icons/chevron-down";
import { ChevronUp } from "../icons/chevron-up";
import CloseIcon from "../icons/close-icon";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/use-i18n";
import { useLanguage } from "../../hooks/use-language";

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

interface FilterMenuProps {
	isOpen: boolean;
	close: () => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ isOpen, close }) => {
	const language = useLanguage();
	const i18n = useI18n(language);

	const navigate = useNavigate();

	const { updateManySearchParams } = useUpdateSearchParam();
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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
			title: i18n["filter.targetAudience"],
			options: Object.entries(targetAudiencesMap).map(
				([key, targetAudience]) => ({
					title: i18n[targetAudience.label],
					value: key,
				}),
			),
			urlKey: "target_audience",
		},
		{
			title: i18n["filter.category"],
			options: Object.entries(categoryMap)
				.filter((c) => c[1].isRenderedInCategoryCards)
				.map(([key, category]) => ({
					title: i18n[`${category.i18nKey}.name`],
					subtitle: i18n[`${category.i18nKey}.description`],
					value: key,
				})),
			urlKey: "category",
		},
		{
			title: i18n["filter.district"],
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
		if (window.location.pathname === "/") {
			navigate("/all-offers/?free=false" + searchParams);
			return;
		}
		close();
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
		if (!window.location.pathname.includes("/all-offers/")) {
			const languagePrefix = language === "de" ? "" : `/${language}`;
			navigate(`${languagePrefix}/all-offers/?${searchParams.toString()}`);
			return;
		}
		close();
	};

	const toggleFilterOption = (
		filterRow: FilterRow,
		filterRowOption: FilterRowOption,
	) => {
		const newFilters = {
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
		};
		setSelectedFilters(newFilters);
		applyFilters(newFilters);
	};

	const applyFilters = (newFilters: FilterMap) => {
		updateManySearchParams(
			Object.entries(newFilters).map(([key, value]) => {
				return {
					key,
					value: value.values.join(","),
				};
			}),
		);
	};

	return (
		<Drawer isOpen={isOpen} close={() => close()}>
			<div className="flex flex-col text-base ">
				<div className="flex flex-row items-center justify-between mb-6 mt-4 px-6 py-4 shadow-lg">
					<p className="text-2xl font-bold">{i18n["filter.title"]}</p>
					<button onClick={() => close()}>
						<CloseIcon></CloseIcon>
					</button>
				</div>
				<div className="text-xl font-bold px-6 py-4">
					{i18n["filter.intro"]}
				</div>
				<div className="py-4">
					<div className="px-6 pb-2">
						<FreeOffersCheckbox></FreeOffersCheckbox>
					</div>

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
												selectedCategories.filter((v) => v !== filterRow.title),
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
							<div>
								{selectedCategories.includes(filterRow.title) &&
									filterRow.options.map((subItem) => (
										<div
											key={subItem.title}
											className="px-6 flex flex-row items-start text-lg mt-2"
										>
											<Checkbox
												id={subItem.title}
												label={
													subItem.subtitle ? (
														<span className="text-normal font-normal">
															<span className="font-bold">
																{subItem.title} {"> "}
															</span>
															<span>{subItem.subtitle}</span>
														</span>
													) : (
														<span className="text-normal font-normal">
															{subItem.title}
														</span>
													)
												}
												isChecked={selectedFilters[
													filterRow.urlKey as FilterIdentifier
												].values.includes(subItem.value)}
												onChange={() => toggleFilterOption(filterRow, subItem)}
											></Checkbox>
										</div>
									))}
							</div>
						</div>
					))}
				</div>
				<div className="w-full flex flex-col gap-8 md:gap-2 justify-end px-4 items-end md:flex-row md:justify-between md:items-center py-8">
					<ResetFilterButton onClick={onResetFilters}></ResetFilterButton>
					<ShowFilteredButton onClick={onSubmitFilters}></ShowFilteredButton>
				</div>
			</div>
		</Drawer>
	);
};

export default FilterMenu;
