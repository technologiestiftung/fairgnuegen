import { TrackedAnchorLink } from "~/components/anchor-link/tracked-anchor-link";
import { useLocation, useSearchParams } from "react-router";
import { type Language } from "~/components/header/language-select/types";
import { useEffect, useState } from "react";

type LanguageAnchorProps = {
	language: Language;
};

export function LanguageAnchor({ language }: LanguageAnchorProps) {
	const location = useLocation();
	const [searchParams] = useSearchParams();

	const [href, setHref] = useState("");

	useEffect(() => {
		setHref(
			getHref({
				currentHref: location.pathname,
				currentSearchParams: searchParams,
				targetLanguage: language,
			}),
		);
	}, [language, location, searchParams]);

	return (
		<TrackedAnchorLink
			className="flex gap-x-2 w-full text-left px-2 py-1 items-center"
			href={href}
		>
			<span className="flex text-[11px] size-6 font-bold bg-berlin-pink justify-center items-center">
				{language.code}
			</span>
			<span className="text-base hover:underline">{language.label}</span>
		</TrackedAnchorLink>
	);
}

function getHref({
	currentHref,
	currentSearchParams,
	targetLanguage,
}: {
	currentHref: string;
	currentSearchParams: URLSearchParams;
	targetLanguage: { code: string; label: string };
}) {
	const filterOptions = getFilterOptions(currentSearchParams);

	const isDefaultLanguage = targetLanguage.code === "de";
	if (isDefaultLanguage) {
		const currentHrefWithoutLanguagePrefix = removeLanguagePrefix(currentHref);
		return `${currentHrefWithoutLanguagePrefix}${filterOptions}`;
	}

	const href = `${currentHref}${filterOptions}`;

	const hasLanguagePrefix = href.includes(`/${targetLanguage.code}/`);
	if (!hasLanguagePrefix) {
		return `/${targetLanguage.code}${href}`;
	}

	return href;
}

function removeLanguagePrefix(currentHref: string) {
	return currentHref.replace(/\/[a-zA-Z]{2}\//, "/");
}

function getFilterOptions(searchParams: URLSearchParams) {
	return searchParams.toString() ? `?${searchParams.toString()}` : "";
}
