import React from "react";
import ListIcon from "../icons/list-icon";
import { TrackedAnchorLink } from "../anchor-link/tracked-anchor-link.tsx";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../../hooks/use-language.tsx";
import { useI18n } from "../../i18n/use-i18n.tsx";

interface ShowListButtonProps {}
const ShowListButton: React.FC<ShowListButtonProps> = () => {
	const language = useLanguage();
	const i18n = useI18n(language);

	const [searchParams] = useSearchParams();

	return (
		<TrackedAnchorLink
			className="px-3 py-1 border-black border-2 opacity-100 hover:opacity-50 flex justify-center items-center text-black h-[43px]"
			additionalTrackingContext={"(button Listenansicht)"}
			href={`/all-offers/?${searchParams.toString()}`}
		>
			<div className="flex flex-row gap-2 items-center">
				<ListIcon></ListIcon>
				<div>{i18n["listView"]}</div>
			</div>
		</TrackedAnchorLink>
	);
};

export default ShowListButton;
