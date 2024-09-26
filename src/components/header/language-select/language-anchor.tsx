import { TrackedAnchorLink } from "../../anchor-link/tracked-anchor-link";
import { Location } from "react-router";
import { useLocation, useSearchParams } from "react-router-dom";
import { Language } from "./types";
import { useEffect, useState } from "react";

type LanguageAnchorProps = {
	language: Language;
};

export function LanguageAnchor({ language }: LanguageAnchorProps) {
	const location = useLocation();
	const [searchParams] = useSearchParams();

	const [href, setHref] = useState("");

	useEffect(() => {
		setHref(getHref({ location, searchParams, language }));
	}, [language, location, searchParams]);

	return (
		<TrackedAnchorLink
			className="flex gap-x-2 w-full text-left px-2 py-1 items-center"
			href={href}
		>
			<span className="flex size-8 bg-berlin-pink italic justify-center items-center">
				{language.code}
			</span>
			<span>{language.label}</span>
		</TrackedAnchorLink>
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
		href = `${routeWithoutLanguage}${href}`;
		return href;
	}

	href = `${location.pathname}${href}`;

	if (href.includes(`/${language.code}/`)) {
		return href;
	}

	href = `/${language.code}${href}`;
	return href;
}
