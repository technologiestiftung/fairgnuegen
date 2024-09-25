import { useState } from "react";
import { SearchIconLarge } from "../../icons/search-icon-large";
import SearchMenu from "../../menu/search-menu";
import { useLanguage } from "../../../hooks/use-language";
import { useI18n } from "../../../i18n/use-i18n";

export function SearchButton() {
	const language = useLanguage();
	const i18n = useI18n(language);

	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				className="flex flex-col items-center text-[11px]"
				onClick={() => setIsOpen(true)}
			>
				<SearchIconLarge />
				{i18n["sidebar.search"]}
			</button>
			<SearchMenu isOpen={isOpen} close={() => setIsOpen(false)}></SearchMenu>
		</>
	);
}
