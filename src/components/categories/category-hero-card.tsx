import React from "react";
import ArrowRightIcon from "../../components/icons/arrow-right-icon";
import { CategoryDetails } from "../../content/categories";
import { ResponsivePicture } from "../responsive-picture/responsive-picture.tsx";
import { TrackedAnchorLink } from "../anchor-link/tracked-anchor-link.tsx";
import { useLanguage } from "../../hooks/use-language.tsx";
import { useI18n } from "../../i18n/use-i18n.tsx";

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
	return (
		<TrackedAnchorLink
			className="h-56 flex flex-row gap-0 shadow-md w-full border border-berlin-grey-light hover:bg-berlin-grey-light"
			additionalTrackingContext="(category hero card)"
			href={`/all-offers/?category=${identifier}`}
		>
			<div className={`${category.color} h-full w-[5%]`}></div>
			<div className="w-[45%]">
				<ResponsivePicture
					src={category.image}
					alt={i18n[category.name]}
					loading={"lazy"}
					className="object-cover h-full w-full"
				/>
			</div>
			<div className="flex flex-col justify-between p-4 w-[50%]">
				<div className="text-xl font-bold">{i18n[category.name]}</div>
				<div>{i18n[category.description]}</div>
				<div className="text-primary-blue text-left flex flex-row items-center justify-start gap-2 hover:underline">
					<div>{i18n["discover"]}</div>
					<ArrowRightIcon color={"text-primary-red"}></ArrowRightIcon>
				</div>
			</div>
		</TrackedAnchorLink>
	);
};
