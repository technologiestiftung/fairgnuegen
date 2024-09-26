import { useRef, useState } from "react";
import { ChevronDown } from "../../icons/chevron-down";
import { useCloseOnClickOutside } from "../hooks/use-close-on-click-outside";
import { useLanguage } from "../../../hooks/use-language";
import { LanguageAnchor } from "./language-anchor";
import { Language } from "./types.ts";

export function LanguageSelect() {
	const currentLanguage = useLanguage();
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
				>
					<span className="flex text-sm bg-berlin-pink size-8 justify-center items-center">
						{currentLanguage}
					</span>
					<div className="flex size-8 justify-center items-center">
						<ChevronDown className="text-berlin-green" />
					</div>
				</button>

				<div
					className={`${isOpen ? "block" : "hidden"} absolute top-0 right-0 bg-white shadow-lg text-[18px]`}
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
