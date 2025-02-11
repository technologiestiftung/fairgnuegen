import { useState } from "react";
import { BarsIcon } from "../../icons/bars-icon";
import MainMenu from "../../menu/main-menu";
import { useLanguage } from "../../../hooks/use-language";
import { useI18n } from "../../../i18n/use-i18n";

export function MenuButton() {
	const language = useLanguage();
	const i18n = useI18n(language);

	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				className="flex flex-col items-center text-[11px] gap-1 leading-3"
				onClick={() => setIsOpen(true)}
			>
				<BarsIcon />
				{i18n["sidebar.menu"]}
			</button>
			{isOpen && (
				<MainMenu isOpen={isOpen} close={() => setIsOpen(false)}></MainMenu>
			)}
		</>
	);
}
