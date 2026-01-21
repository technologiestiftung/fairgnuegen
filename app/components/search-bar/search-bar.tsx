import React, { useState } from "react";
import SearchIcon from "~/components/icons/search-icon";
import StartSearchIcon from "~/components/icons/start-search-icon";
import ClearIcon from "~/components/icons/clear-icon";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import useUpdateSearchParam from "~/hooks/use-update-search-params";
import { trackSiteSearch } from "~/analytics/matomo.ts";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";
import { useUpdateSearchInput } from "~/hooks/use-update-search-input.tsx";

const SearchBar: React.FC<{ postSubmit: () => void }> = ({ postSubmit }) => {
	const { updateSearchParam } = useUpdateSearchParam();
	const [searchParams] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();
	const searchURLQueryValue = searchParams.get("search") ?? "";
	const [searchInputValue, setSearchInputValue] = useState(searchURLQueryValue);
	const [hasFocus, setHasFocus] = useState(false);

	const language = useLanguage();
	const i18n = useI18n(language);

	useUpdateSearchInput({
		searchURLQueryValue,
		searchInputValue,
		setSearchInputValue,
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();

				trackSiteSearch({
					searchTerm: searchInputValue,
				});

				postSubmit();

				if (!location.pathname.includes("/all-offers/")) {
					searchParams.set("search", searchInputValue);
					const languagePrefix = language === "de" ? "" : `/${language}`;
					navigate(`${languagePrefix}/all-offers/?${searchParams.toString()}`);
					return;
				}

				updateSearchParam("search", searchInputValue);
			}}
			className="group grid grid-cols-1 grid-rows-1 items-center z-[10]"
		>
			<input
				value={searchInputValue}
				type="text"
				name="search"
				className="relative pl-10 pr-20 placeholder-berlin-grey row-start-1 col-start-1 w-full h-[47px] border-2 border-black px-4 focus:outline-none focus:border-focus-blue focus:shadow-default rounded-none"
				placeholder={i18n["searchbar.placeholder"]}
				onChange={(e) => setSearchInputValue(e.target.value)}
				onFocus={() => {
					setHasFocus(true);
				}}
				onBlur={() => {
					setHasFocus(false);
				}}
			></input>
			<div className="relative row-start-1 col-start-1 pl-3 pointer-events-none">
				<SearchIcon />
			</div>
			<div className="relative row-start-1 col-start-1 w-full h-full flex flex-row gap-2 justify-end pointer-events-none">
				<button
					type="button"
					className={`${searchInputValue === "" ? "hidden" : ""} pointer-events-auto p-1.5`}
					onClick={(e) => {
						e.preventDefault();
						setSearchInputValue("");
					}}
					aria-label={i18n["button.name.clear"]}
				>
					<ClearIcon />
				</button>
				<button
					type="submit"
					aria-label={i18n["button.name.submit"]}
					className={`w-fit pointer-events-auto border-l-0 pl-2 pr-2.5 ${hasFocus ? "border-focus-blue" : " border-l-black"} border-2 border-black`}
				>
					<StartSearchIcon />
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
