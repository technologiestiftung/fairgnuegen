import React from "react";
import ArrowRightIcon from "../../components/icons/arrow-right-icon";
import { CategoryDetails } from "../../content/categories";
import { ResponsivePicture } from "../responsive-picture/responsive-picture";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";

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
	return (
		<a
			className="h-56 flex flex-col gap-0 shadow-md w-full border border-berlin-grey-light hover:bg-berlin-grey-light"
			href={`/all-offers/?category=${identifier}`}
		>
			<div className="h-[50%] w-full flex flex-row">
				<div className={`${category.color} w-[5%] h-full`}></div>
				<div className="w-[95%] h-full">
					<ResponsivePicture
						src={category.image}
						alt={i18n[category.name]}
						loading={"lazy"}
						className="object-cover h-full w-full"
					/>
				</div>
			</div>

			<div className="flex flex-col justify-between p-4 h-[50%] w-full">
				<div className="text-xl font-bold">{i18n[category.name]}</div>
				<div className="text-primary-blue text-left flex flex-row items-center justify-start gap-2 hover:underline">
					<div>{i18n["discoverOffers"]}</div>
					<ArrowRightIcon color={"text-primary-red"}></ArrowRightIcon>
				</div>
			</div>
		</a>
	);
};
