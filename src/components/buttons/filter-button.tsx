import React, { useState } from "react";
import { categoryMap } from "../../content/categories";
import { DrawerLeft } from "../drawer/drawer-left";
import { ChevronDown } from "../icons/chevron-down";
import { ChevronUp } from "../icons/chevron-up";
import CloseIcon from "../icons/close-icon";
import FilterIcon from "../icons/filter-icon";
import useUpdateSearchParam from "../../hooks/use-update-search-params";

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
	const [selectedFilters, setSelectedFilters] = useState<FilterMap>({
		target_audience: { values: [] },
		category: { values: [] },
		district: { values: [] },
	} as FilterMap);

	const filterRows: FilterRow[] = [
		{
			title: "Für wen ist das Angebot?",
			options: [
				{ title: "Kinder & Jugendliche", value: "children" },
				{ title: "Erwachsene", value: "adults" },
				{ title: "Familien", value: "family" },
				{ title: "Senior:innen", value: "senior" },
			],
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
			options: [
				{
					title: "Charlottenburg-Wilmersdorf",
					value: "charlottenburg-wilmersdorf",
				},
				{
					title: "Friedrichshain-Kreuzberg",
					value: "friedrichshain-kreuzberg",
				},
				{ title: "Lichtenberg", value: "lichtenberg" },
				{ title: "Marzahn-Hellersdorf", value: "marzahn-hellersdorf" },
				{ title: "Mitte", value: "mitte" },
				{ title: "Neukölln", value: "neukölln" },
				{ title: "Pankow", value: "pankow" },
				{ title: "Reinickendorf", value: "reinickendorf" },
				{ title: "Spandau", value: "spandau" },
				{ title: "Steglitz-Zehlendorf", value: "steglitz-zehlendorf" },
				{ title: "Tempelhof-Schöneberg", value: "tempelhof-schöneberg" },
				{ title: "Treptow-Köpenick", value: "treptow-köpenick" },
			],
			urlKey: "district",
		},
	];

	const onSubmitFilters = () => {
		updateManySearchParams(
			Object.entries(selectedFilters).map(([key, value]) => {
				return {
					key,
					value: value.values.join(","),
				};
			}),
		);
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
														setSelectedFilters({
															...selectedFilters,
															[filterRow.urlKey]: {
																values: selectedFilters[
																	filterRow.urlKey as FilterIdentifier
																].values.includes(subItem.value)
																	? selectedFilters[
																			filterRow.urlKey as FilterIdentifier
																		].values.filter((v) => v !== subItem.value)
																	: selectedFilters[
																			filterRow.urlKey as FilterIdentifier
																		].values.concat([subItem.value]),
															},
														});
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
					<button onClick={onSubmitFilters}>Zeigen</button>
				</div>
			</DrawerLeft>
		</div>
	);
};

export default FilterButton;
