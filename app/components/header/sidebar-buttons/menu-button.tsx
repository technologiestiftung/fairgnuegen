import { useState } from "react";
import { BarsIcon } from "~/components/icons/bars-icon.tsx";
import MainMenu from "~/components/menu/main-menu";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";

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
			<MainMenu isOpen={isOpen} close={() => setIsOpen(false)}></MainMenu>
		</>
	);
}
