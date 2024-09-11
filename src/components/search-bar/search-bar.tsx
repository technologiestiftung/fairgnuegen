import React, { useState } from "react";
import SearchIcon from "../icons/search-icon";
import StartSearchIcon from "../icons/start-search-icon";
import ClearIcon from "../icons/clear-icon";
import { useSearchParams } from "react-router-dom";
import useUpdateSearchParam from "../../hooks/use-update-search-params";

interface SearchBarProps {
	onSubmitOverride?: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmitOverride }) => {
	const updateSearchParam = useUpdateSearchParam();
	const [searchParams] = useSearchParams();
	const [search, setSearch] = useState(searchParams.get("search") ?? "");
	const [hasFocus, setHasFocus] = useState(false);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				if (onSubmitOverride) {
					onSubmitOverride(search);
					return;
				}
				updateSearchParam("search", search);
			}}
			className="group grid grid-cols-1 grid-rows-1 items-center z-[10]"
		>
			<input
				value={search}
				type="text"
				className="relative pl-8 pr-20 row-start-1 col-start-1 w-full h-[42px] border-2 border-black px-4 focus:outline-none focus:border-focus-blue focus:shadow-default"
				placeholder="Suche Dein Angebot"
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
			<div className="relative row-start-1 col-start-1 w-full h-full flex flex-row gap-2 justify-end pr-2 pointer-events-none">
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
					className={`w-fit pointer-events-auto border-l-2 pl-2  ${hasFocus ? "border-focus-blue" : " border-l-black"}`}
					onClick={(e) => {
						e.preventDefault();
						if (onSubmitOverride) {
							onSubmitOverride(search);
							return;
						}
						updateSearchParam("search", search);
					}}
				>
					<StartSearchIcon></StartSearchIcon>
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
