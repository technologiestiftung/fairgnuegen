import { useState } from "react";
import { SearchIconLarge } from "~/components/icons/search-icon-large.tsx";
import SearchMenu from "~/components/menu/search-menu";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";

export function SearchButton() {
	const language = useLanguage();
	const i18n = useI18n(language);

	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				className="flex flex-col items-center text-[11px] gap-1 leading-3"
				onClick={() => setIsOpen(true)}
			>
				<SearchIconLarge />
				{i18n["sidebar.search"]}
			</button>
			<SearchMenu isOpen={isOpen} close={() => setIsOpen(false)}></SearchMenu>
		</>
	);
}
