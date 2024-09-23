import React, { useState } from "react";
import SearchIcon from "../icons/search-icon";
import StartSearchIcon from "../icons/start-search-icon";
import ClearIcon from "../icons/clear-icon";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useUpdateSearchParam from "../../hooks/use-update-search-params";
import { trackSiteSearch } from "../../analytics/matomo";

const SearchBar: React.FC = () => {
	const { updateSearchParam } = useUpdateSearchParam();
	const [searchParams] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();
	const [search, setSearch] = useState(searchParams.get("search") ?? "");
	const [hasFocus, setHasFocus] = useState(false);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();

				trackSiteSearch({
					searchTerm: search,
				});

				if (!location.pathname.includes("/all-offers/")) {
					searchParams.set("search", search);
					navigate(`/all-offers/?${searchParams.toString()}`);
					return;
				}

				updateSearchParam("search", search);
			}}
			className="group grid grid-cols-1 grid-rows-1 items-center z-[10]"
		>
			<input
				value={search}
				type="text"
				className="relative pl-8 pr-20 row-start-1 col-start-1 w-full h-[42px] border-2 border-black px-4 focus:outline-none focus:border-focus-blue focus:shadow-default rounded-none placeholder-[#9D9D9C]"
				placeholder="Suchbegriff eingeben"
				onChange={(e) => setSearch(e.target.value)}
				onFocus={() => {
					setHasFocus(true);
				}}
				onBlur={() => {
					setHasFocus(false);
				}}
			></input>
			<div className="relative row-start-1 col-start-1 pl-2 pointer-events-none">
				<SearchIcon></SearchIcon>
			</div>
			<div className="relative row-start-1 col-start-1 w-full h-full flex flex-row gap-2 justify-end pointer-events-none">
				<button
					type="button"
					className="pointer-events-auto"
					onClick={(e) => {
						e.preventDefault();
						setSearch("");
					}}
				>
					<ClearIcon></ClearIcon>
				</button>
				<button
					type="submit"
					className={`w-fit pointer-events-auto border-l-2 pl-2 pr-2 ${hasFocus ? "border-focus-blue" : " border-l-black"} hover:bg-berlin-grey-light border-2 border-black`}
				>
					<StartSearchIcon></StartSearchIcon>
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
