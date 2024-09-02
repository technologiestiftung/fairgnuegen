import React, { useState } from "react";

interface SearchBarProps {
	onSearch: (search: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [search, setSearch] = useState("");
	return (
		<form
			action=""
			onSubmit={(e) => {
				e.preventDefault();
				onSearch(search);
			}}
		>
			<input
				type="text"
				className="w-full h-[42px] border-2 border-black px-4"
				placeholder="Suche Dein Angebot"
				onChange={(e) => setSearch(e.target.value)}
			></input>
		</form>
	);
};

export default SearchBar;
