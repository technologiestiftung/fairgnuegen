import { useState } from "react";
import { SearchIconLarge } from "../../icons/search-icon-large";
import SearchMenu from "../../menu/search-menu";

export function SearchButton() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				className="flex flex-col items-center text-[11px]"
				onClick={() => setIsOpen(true)}
			>
				<SearchIconLarge />
				Suche
			</button>
			<SearchMenu isOpen={isOpen} close={() => setIsOpen(false)}></SearchMenu>
		</>
	);
}
