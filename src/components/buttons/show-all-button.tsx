import React from "react";
import { useSearchParams } from "react-router-dom";
import ArrowRightIcon from "../icons/arrow-right-icon";
import { LocalizedTrackedAnchorLink } from "../anchor-link/localized-tracked-anchor-link";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";

const ShowAllButton: React.FC = () => {
	const [searchParams] = useSearchParams();
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<LocalizedTrackedAnchorLink
			className="h-[43px] border-black border-2 opacity-100 flex justify-center items-center w-[250px]"
			href={`/all-offers/?${searchParams.toString()}`}
		>
			<div className="flex flex-row justify-end items-center h-full w-full hover:bg-berlin-grey-light">
				<div className="w-[207px] flex flex-row items-center justify-center font-normal">
					{i18n["button.showAllOffers"]}
				</div>
				<div className="h-full bg-primary-red w-[43px] flex flex-row items-center justify-center border-l-black border-l-2">
					<ArrowRightIcon color="text-white"></ArrowRightIcon>
				</div>
			</div>
		</LocalizedTrackedAnchorLink>
	);
};

export default ShowAllButton;
