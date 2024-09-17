import { ChevronDown } from "../icons/chevron-down";
import { useRef, useState } from "react";
import { useCloseOnClickOutside } from "./hooks/use-close-on-click-outside";

export function LanguageSelect() {
	const [isOpen, setIsOpen] = useState(false);
	const languageSelectRef = useRef<HTMLDivElement>(null);

	const languages = [
		{ code: "de", label: "Deutsch" },
		{ code: "en", label: "English" },
		{ code: "tr", label: "Türkçe" },
		{ code: "ru", label: "Русский" },
		{ code: "ar", label: "العربية" },
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
						de
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
								<button
									className="flex gap-x-2 w-full text-left px-2 py-1 items-center"
									onClick={() => setIsOpen(false)}
								>
									<span className="flex size-8 bg-berlin-pink italic justify-center items-center">
										{language.code}
									</span>
									<span>{language.label}</span>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
