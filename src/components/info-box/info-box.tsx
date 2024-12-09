import React from "react";
import LinkIcon from "../icons/link-icon";
import { TrackedAnchorLink } from "../anchor-link/tracked-anchor-link.tsx";
import { useLanguage } from "../../hooks/use-language.tsx";
import { useI18n } from "../../i18n/use-i18n.tsx";

interface InfoBoxProps {
	maxWidth: string;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ maxWidth }) => {
	const language = useLanguage();
	const i18n = useI18n(language);
	return (
		<div className="w-full mb-16 flex flex-col gap-8 px-4 lg:px-0">
			<div
				className={`${maxWidth} mx-auto flex flex-row justify-center items-center`}
			>
				<div className="grid grid-rows-1 grid-cols-1">
					<div className="row-start-1 col-start-1 p-10">
						{i18n["infobox.providerHint.part.1"]}{" "}
						<TrackedAnchorLink
							href={
								"https://www.berlin.de/sen/soziales/soziale-sicherung/bn-berlin-ticket-s/angebote/neuer-eintrag/formular.1495570.php"
							}
							className="text-link-blue hover:underline inline-flex gap-1 items-center"
						>
							{i18n["infobox.providerHint.formLinkLabel"]}
							<LinkIcon />
						</TrackedAnchorLink>
						{i18n["infobox.providerHint.part.2"]}
						<TrackedAnchorLink
							href="mailto:fairgnuegen@jugendkulturservice.de"
							className="text-link-blue hover:underline inline-flex gap-1 items-center"
						>
							{i18n["infobox.contact"]}
							<LinkIcon />
						</TrackedAnchorLink>
						.
					</div>
					<div className="pointer-events-none row-start-1 col-start-1 w-[50%] border-t-4 border-b-4 border-l-4 border-berlin-green"></div>
					<div className="pointer-events-none row-start-1 col-start-1 ml-[50%] w-[50%] border-t-4 border-b-4 border-r-4 border-berlin-pink"></div>
				</div>
			</div>
		</div>
	);
};
