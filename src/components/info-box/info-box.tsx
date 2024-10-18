import React from "react";
import LinkIcon from "../icons/link-icon";
import RocketIconLarge from "../icons/rocket-icon-large";
import { TrackedAnchorLink } from "../anchor-link/tracked-anchor-link.tsx";
import { useLanguage } from "../../hooks/use-language.tsx";
import { useI18n } from "../../i18n/use-i18n.tsx";

interface InfoBoxProps {
	showProviderHint: boolean;
	maxWidth: string;
}

export const InfoBox: React.FC<InfoBoxProps> = ({
	showProviderHint,
	maxWidth,
}) => {
	const language = useLanguage();
	const i18n = useI18n(language);
	return (
		<div className="w-full py-10 bg-berlin-light-green flex flex-col gap-8 px-4 lg:px-0">
			<div
				className={`${maxWidth} mx-auto flex flex-row justify-center items-center`}
			>
				<div className="grid grid-rows-1 grid-cols-1">
					<div className="row-start-1 col-start-1 p-8 bg-white flex flex-col gap-4">
						<h1 className="font-bold text-lg">{i18n["infobox.title"]}</h1>

						<p>
							{i18n["infobox.content"]}{" "}
							<TrackedAnchorLink
								href={
									"https://www.berlin.de/sen/soziales/soziale-sicherung/bn-berlin-ticket-s/"
								}
								className=""
								target="_blank"
								rel="noreferrer"
							>
								<span className="inline-flex gap-1 items-center text-link-blue hover:underline">
									{i18n["infobox.link"]}
									<LinkIcon />
								</span>
							</TrackedAnchorLink>
						</p>
					</div>
					<div className="pointer-events-none row-start-1 col-start-1 w-[50%] border-t-4 border-b-4 border-l-4 border-berlin-pink"></div>
					<div className="pointer-events-none row-start-1 col-start-1 ml-[50%] w-[50%] border-t-4 border-b-4 border-r-4 border-berlin-green"></div>
				</div>
			</div>
			{showProviderHint && (
				<div
					className={`${maxWidth} flex flex-col mx-auto justify-center items-center`}
				>
					<div className="border-4 border-berlin-green p-8 flex flex-row gap-8 items-center break-words">
						<div className="min-w-8">
							<RocketIconLarge></RocketIconLarge>
						</div>

						<div>
							{i18n["infobox.providerHint"]}
							<br />
							<TrackedAnchorLink
								href="mailto:berechtigungsnachweis@jugendkulturservice.de"
								className="text-link-blue hover:underline"
							>
								{i18n["infobox.contact"]}
							</TrackedAnchorLink>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
