import { useRef, useState } from "react";
import { Location } from "react-router";
import { ChevronDown } from "../icons/chevron-down";
import { useCloseOnClickOutside } from "./hooks/use-close-on-click-outside";
import { useLanguage } from "../../hooks/use-language";
import { TrackedAnchorLink } from "../anchor-link/tracked-anchor-link";
import { useLocation, useSearchParams } from "react-router-dom";

export function LanguageSelect() {
	const currentLanguage = useLanguage();
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const [isOpen, setIsOpen] = useState(false);
	const languageSelectRef = useRef<HTMLDivElement>(null);

	const languages = [
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
								<TrackedAnchorLink
									className="flex gap-x-2 w-full text-left px-2 py-1 items-center"
									href={getHref({
										location,
										searchParams,
										language,
									})}
								>
									<span className="flex size-8 bg-berlin-pink italic justify-center items-center">
										{language.code}
									</span>
									<span>{language.label}</span>
								</TrackedAnchorLink>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}

function getHref({
	location,
	searchParams,
	language,
}: {
	location: Location;
	searchParams: URLSearchParams;
	language: { code: string; label: string };
}) {
	let href = "";

	if (searchParams.toString() !== "") {
		href = `?${searchParams.toString()}`;
	}

	if (language.code === "de") {
		const routeWithoutLanguage = location.pathname.replace(
			/\/[a-zA-Z]{2}\//,
			"/",
		);
		return `${routeWithoutLanguage}${href}`;
	}

	return `/${language.code}${location.pathname}${href}`;
}
