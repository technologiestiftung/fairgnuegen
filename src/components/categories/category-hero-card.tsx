import React from "react";
import { CategoryDetails } from "../../content/categories";
import { ResponsivePicture } from "../responsive-picture/responsive-picture";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";
import { LocalizedTrackedAnchorLink } from "../anchor-link/localized-tracked-anchor-link";
import ArrowRightLinkIcon from "../icons/arrow-right-link-icon";
import ImageArrowIcon from "../icons/image-arrow-icon";

interface CategoryHeroCardProps {
	identifier: string;
	category: CategoryDetails;
}

export const CategoryHeroCard: React.FC<CategoryHeroCardProps> = ({
	identifier,
	category,
}) => {
	const language = useLanguage();
	const i18n = useI18n(language);

	const localizedName = i18n[`${category.i18nKey}.name`];
	const localizedDescription = i18n[`${category.i18nKey}.description`];

	return (
		<LocalizedTrackedAnchorLink
			className="w-full sm:w-[49%] md:w-[24%] flex flex-col gap-4"
			additionalTrackingContext="(category hero card)"
			href={`/all-offers/?category=${identifier}`}
		>
			<div className="flex flex-col gap-2 relative">
				<ResponsivePicture
					src={category.image}
					alt={localizedName}
					loading={"lazy"}
					className="object-cover aspect-[4/3]"
				/>
				<div className="absolute top-0 right-0">
					<ImageArrowIcon />
				</div>
				<p className="text-[11px] text-berlin-grey">© Unsplash</p>
			</div>

			<div className="flex flex-col justify-between">
				<div className="text-[17px] font-bold mb-1.5">{localizedName}</div>
				<p className="leading-6">{localizedDescription}</p>
				<div className="text-link-blue text-left flex flex-row items-center justify-start gap-1 hover:underline">
					<div>{i18n["discover"]}</div>
					<ArrowRightLinkIcon color={"text-link-blue"}></ArrowRightLinkIcon>
				</div>
			</div>
		</LocalizedTrackedAnchorLink>
	);
};
