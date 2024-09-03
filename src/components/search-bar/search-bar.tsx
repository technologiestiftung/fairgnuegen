import React, { useState } from "react";
import SearchIcon from "../icons/search-icon";
import StartSearchIcon from "../icons/start-search-icon";

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
				className="pl-8 row-start-1 col-start-1 w-full h-[42px] border-2 border-black px-4"
				placeholder="Suche Dein Angebot"
				onChange={(e) => setSearch(e.target.value)}
			></input>
			<div className="row-start-1 col-start-1 pl-2 pointer-events-none">
				<SearchIcon></SearchIcon>
			</div>
			<div className="row-start-1 col-start-1 w-full flex flex-row justify-end pr-2 pointer-events-none">
				<StartSearchIcon></StartSearchIcon>
			</div>
		</form>
	);
};

export default SearchBar;
