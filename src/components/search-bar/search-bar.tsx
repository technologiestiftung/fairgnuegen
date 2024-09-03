import React, { useState } from "react";
import SearchIcon from "../icons/search-icon";
import StartSearchIcon from "../icons/start-search-icon";
import ClearIcon from "../icons/clear-icon";

interface SearchBarProps {
	value: string;
	onSearch: (search: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ value, onSearch }) => {
	const [search, setSearch] = useState(value);
	return (
		<form
			action=""
			onSubmit={(e) => {
				e.preventDefault();
				onSearch(search);
			}}
			className="grid grid-cols-1 grid-rows-1 items-center"
		>
			<input
				value={search}
				type="text"
				className="relative pl-8 row-start-1 col-start-1 w-full h-[42px] border-2 border-black px-4 focus:outline-none focus:border-focus-blue focus:shadow-lg"
				placeholder="Suche Dein Angebot"
				onChange={(e) => setSearch(e.target.value)}
			></input>
			<div className="relative row-start-1 col-start-1 pl-2 pointer-events-none">
				<SearchIcon></SearchIcon>
			</div>
			<button className="relative row-start-1 col-start-1 w-full flex flex-row justify-end pr-2 pointer-events-none">
				<button
					className="w-fit pointer-events-auto"
					onClick={() => {
						setSearch("");
						onSearch("");
					}}
				>
					{search !== "" && <ClearIcon></ClearIcon>}
					{search === "" && <StartSearchIcon></StartSearchIcon>}
				</button>
			</button>
		</form>
	);
};

export default SearchBar;
