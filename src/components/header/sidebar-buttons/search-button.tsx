import { useState } from "react";
import { Drawer } from "../../drawer/drawer";
import { SearchIconLarge } from "../../icons/search-icon-large";

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
			<Drawer isOpen={isOpen} close={() => setIsOpen(false)}>
				Suche
			</Drawer>
		</>
	);
}
