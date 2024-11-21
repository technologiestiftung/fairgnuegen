import React from "react";
import { CategoryDetails } from "../../content/categories";
import { ResponsivePicture } from "../responsive-picture/responsive-picture";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";
import { LocalizedTrackedAnchorLink } from "../anchor-link/localized-tracked-anchor-link";
import ImageArrowIcon from "../icons/image-arrow-icon";
import ArrowRightLinkIcon from "../icons/arrow-right-link-icon";

interface CategoryCardProps {
	identifier: string;
	category: CategoryDetails;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
	identifier,
	category,
}) => {
	const language = useLanguage();
	const i18n = useI18n(language);

	const localizedName = i18n[`${category.i18nKey}.name`];
	const href =
		identifier === "all"
			? "/all-offers/"
			: `/all-offers/?category=${identifier}`;

	return (
		<LocalizedTrackedAnchorLink
			className="w-full flex flex-col gap-2"
			href={href}
			additionalTrackingContext={"(category card)"}
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
				<p className="text-[11px] text-berlin-grey mx-4 sm:mx-0">© Unsplash</p>
			</div>

			<div className="flex flex-col justify-between mx-4 sm:mx-0">
				<div className="text-[17px] font-bold mb-1.5">{localizedName}</div>
				<div className="text-link-blue text-left flex flex-row items-center justify-start gap-1 hover:underline">
					<div>{i18n["discover"]}</div>
					<ArrowRightLinkIcon color={"text-link-blue"}></ArrowRightLinkIcon>
				</div>
			</div>
		</LocalizedTrackedAnchorLink>
	);
};
