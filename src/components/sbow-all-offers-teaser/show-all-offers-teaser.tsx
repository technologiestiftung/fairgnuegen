import React from "react";
import { useSearchParams } from "react-router-dom";
import { LocalizedTrackedAnchorLink } from "../anchor-link/localized-tracked-anchor-link";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";
import { ResponsivePicture } from "../responsive-picture/responsive-picture";
import ImageArrowIcon from "../icons/image-arrow-icon";
import ArrowRightLinkIcon from "../icons/arrow-right-link-icon";

export const ShowAllOffersTeaser: React.FC = () => {
	const [searchParams] = useSearchParams();
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<LocalizedTrackedAnchorLink
			href={`/all-offers/?${searchParams.toString()}`}
			className="px-4 lg:px-0 flex flex-col md:flex-row h-fit w-full gap-5"
		>
			<div className="flex flex-col md:w-[40%] w-full relative gap-2 basis-[45%] ">
				<ResponsivePicture
					src="all"
					alt={i18n["Alle Angebote"]}
					loading={"eager"}
					className="object-cover aspect-[4/3]"
				/>
				<p className="text-[11px] text-berlin-grey">© Unsplash</p>
				<div className="absolute top-0 right-0">
					<ImageArrowIcon />
				</div>
			</div>
			<div className="flex flex-col justify-start basis-[55%]">
				<div className="text-[17px] font-bold mb-1.5">
					{i18n["home.allOffersTeaser.title"]}
				</div>
				<p>{i18n["home.allOffersTeaser.description.p1"]}</p>
				<p className="mt-5">{i18n["home.allOffersTeaser.description.p2"]}</p>
				<div className="text-link-blue text-left flex flex-row items-center justify-start gap-1 hover:underline">
					<div>{i18n["discover"]}</div>
					<ArrowRightLinkIcon color={"text-link-blue"}></ArrowRightLinkIcon>
				</div>
			</div>
		</LocalizedTrackedAnchorLink>
	);
};
