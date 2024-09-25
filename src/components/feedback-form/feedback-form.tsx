import React from "react";
import { TrackedAnchorLink } from "../anchor-link/tracked-anchor-link";
import LinkIcon from "../icons/link-icon";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";

export const FeedbackForm: React.FC = () => {
	const language = useLanguage();
	const i18n = useI18n(language);
	return (
		<div className="py-4 bg-berlin-light-green flex flex-col gap-8 px-8 mb-4 text-sm">
			<div className={`flex flex-row justify-between items-center gap-2`}>
				<div>{i18n["feedback.hint"]}</div>
				<div className="min-w-[30%]">
					<TrackedAnchorLink
						href={
							"https://citylabberlin.typeform.com/to/kCdnCgvC?product_id=fairgnuegen"
						}
						className="text-link-blue flex flex-row items-center gap-1 justify-start md:justify-end hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						<span className="w-min sm:w-auto">{i18n["feedback.link"]}</span>
						<LinkIcon></LinkIcon>
					</TrackedAnchorLink>
				</div>
			</div>
		</div>
	);
};
