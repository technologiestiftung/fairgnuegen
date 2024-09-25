import React from "react";
import { useSearchParams } from "react-router-dom";
import MapIcon from "../icons/map-icon";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";
import { LocalizedTrackedAnchorLink } from "../anchor-link/localized-tracked-anchor-link";

interface ShowMapButtonProps {}
const ShowMapButton: React.FC<ShowMapButtonProps> = () => {
	const language = useLanguage();
	const i18n = useI18n(language);

	const [searchParams] = useSearchParams();

	return (
		<LocalizedTrackedAnchorLink
			className="px-3 py-1 border-black border-2 opacity-100 hover:opacity-50 flex justify-center items-center text-black h-[43px]"
			additionalTrackingContext="(button Kartenansicht)"
			href={`/map/?${searchParams.toString()}`}
		>
			<div className="flex flex-row gap-2 items-center">
				<MapIcon></MapIcon>
				<div>{i18n["menuItem.map"]}</div>
			</div>
		</LocalizedTrackedAnchorLink>
	);
};

export default ShowMapButton;
