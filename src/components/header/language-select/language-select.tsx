import { useRef, useState } from "react";
import { ChevronDown } from "../../icons/chevron-down";
import { useCloseOnClickOutside } from "../hooks/use-close-on-click-outside";
import { useLanguage } from "../../../hooks/use-language";
import { LanguageAnchor } from "./language-anchor";
import { Language } from "./types.ts";
import { ChevronUp } from "../../icons/chevron-up";
import { useI18n } from "../../../i18n/use-i18n.tsx";

export function LanguageSelect() {
	const currentLanguage = useLanguage();
	const i18n = useI18n(currentLanguage);
	const [isOpen, setIsOpen] = useState(false);
	const languageSelectRef = useRef<HTMLDivElement>(null);

	const languages: Language[] = [
		{ code: "de", label: "Deutsch" },
		{ code: "en", label: "English" },
		// { code: "tr", label: "Türkçe" },
		// { code: "ru", label: "Русский" },
		// { code: "ar", label: "العربية" },
	];

	useCloseOnClickOutside(languageSelectRef, setIsOpen);

	return (
		<>
			<div className="relative text-black z-[10]" ref={languageSelectRef}>
				<button
					className="flex items-center"
					onClick={() => setIsOpen(!isOpen)}
					aria-label={
						isOpen ? i18n["button.name.collapse"] : i18n["button.name.expand"]
					}
					aria-expanded={isOpen}
				>
					<span className="flex text-[11px] font-bold bg-berlin-pink size-6 justify-center items-center">
						{currentLanguage}
					</span>
					<span className="flex size-8 justify-center items-center pointer-events-none">
						{isOpen ? (
							<ChevronUp className="text-berlin-green" />
						) : (
							<ChevronDown className="text-berlin-green" />
						)}
					</span>
				</button>

				<div
					className={`${isOpen ? "block" : "hidden"} absolute top-8 right-0 bg-white shadow-lg`}
				>
					<ul>
						{languages.map((language) => (
							<li key={language.code}>
								<LanguageAnchor language={language} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
