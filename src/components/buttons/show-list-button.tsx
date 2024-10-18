import React from "react";
import ListIcon from "../icons/list-icon";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";
import { LocalizedTrackedAnchorLink } from "../anchor-link/localized-tracked-anchor-link";

interface ShowListButtonProps {}
const ShowListButton: React.FC<ShowListButtonProps> = () => {
	const language = useLanguage();
	const i18n = useI18n(language);

	const [searchParams] = useSearchParams();

	return (
		<LocalizedTrackedAnchorLink
			className="px-3 py-1 border-black border-2 opacity-100 hover:opacity-50 flex justify-center items-center text-black h-[43px]"
			additionalTrackingContext={"(button Listenansicht)"}
			href={`/all-offers/?${searchParams.toString()}`}
		>
			<div className="flex flex-row gap-2 items-center">
				<ListIcon />
				<div>{i18n["listView"]}</div>
			</div>
		</LocalizedTrackedAnchorLink>
	);
};

export default ShowListButton;
