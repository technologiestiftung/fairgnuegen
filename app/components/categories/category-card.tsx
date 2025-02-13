import React from "react";
import { type CategoryDetails } from "~/content/categories.ts";
import { ResponsivePicture } from "~/components/responsive-picture/responsive-picture.tsx";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";
import { LocalizedTrackedAnchorLink } from "~/components/anchor-link/localized-tracked-anchor-link.tsx";
import ImageArrowIcon from "~/components/icons/image-arrow-icon";
import ArrowRightLinkIcon from "~/components/icons/arrow-right-link-icon";

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
