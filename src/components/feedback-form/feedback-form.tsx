import React from "react";
import { TrackedAnchorLink } from "../anchor-link/tracked-anchor-link";
import LinkIcon from "../icons/link-icon";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";

export const FeedbackForm: React.FC = () => {
	const language = useLanguage();
	const i18n = useI18n(language);
	return (
		<div className="py-4 flex flex-col gap-5  px-4 lg:px-0 mt-10 mb-5">
			<h2 className="text-[22px] font-bold w-full flex flex-row justify-left">
				{i18n["feedback.title"]}
			</h2>
			<div className={`flex flex-row justify-start gap-1 `}>
				<div>{i18n["feedback.hint"]}</div>
				<div className="min-w-[30%]">
					<TrackedAnchorLink
						href={
							"https://citylabberlin.typeform.com/to/kCdnCgvC?product_id=fairgnuegen"
						}
						className="text-link-blue flex flex-row items-center gap-1 hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						<span>{i18n["feedback.link"]}</span>
						<LinkIcon></LinkIcon>
					</TrackedAnchorLink>
				</div>
			</div>
		</div>
	);
};
