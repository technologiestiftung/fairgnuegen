import React from "react";
import { TrackedAnchorLink } from "../anchor-link/tracked-anchor-link";
import LinkIcon from "../icons/link-icon";

export const FeedbackForm: React.FC = () => {
	return (
		<div className="py-4 bg-berlin-light-green flex flex-col gap-8 px-8 mb-4 text-sm">
			<div className={`flex flex-row justify-between items-center gap-2`}>
				<div>
					Wie gefällt dir Fairgnügen? Beantworte uns gerne ein paar Fragen.
				</div>
				<div className="min-w-[30%]">
					<TrackedAnchorLink
						href={
							"https://citylabberlin.typeform.com/to/kCdnCgvC?product_id=fairgnuegen"
						}
						className="text-link-blue flex flex-row items-center gap-1 justify-start md:justify-end hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						<span className="w-min sm:w-auto">Hier Feedback geben</span>
						<LinkIcon></LinkIcon>
					</TrackedAnchorLink>
				</div>
			</div>
		</div>
	);
};
