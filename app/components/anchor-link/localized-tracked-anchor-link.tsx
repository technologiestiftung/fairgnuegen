import { type ReactNode } from "react";
import { TrackedAnchorLink } from "~/components/anchor-link/tracked-anchor-link";
import { useLanguage } from "~/hooks/use-language";

type AnchorLinkProps = {
	href: string;
	children: string | ReactNode;
	target?: string;
	rel?: string;
	additionalTrackingContext?: string;
	className?: string;
};

export function LocalizedTrackedAnchorLink({
	href,
	children,
	target,
	rel,
	additionalTrackingContext,
	className,
}: AnchorLinkProps) {
	const language = useLanguage();

	const localizedHref = getLocalizedHref({ href, language });

	return (
		<TrackedAnchorLink
			href={localizedHref}
			target={target}
			rel={rel}
			additionalTrackingContext={additionalTrackingContext}
			className={className}
		>
			{children}
		</TrackedAnchorLink>
	);
}

function getLocalizedHref({
	href,
	language,
}: {
	href: string;
	language: string;
}) {
	if (language === "en" && href.startsWith("/en")) {
		return href;
	}

	const prefix = language === "de" ? "" : `/${language}`;

	return `${prefix}${href}`;
}
