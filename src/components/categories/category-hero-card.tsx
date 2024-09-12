import React from "react";
import ArrowRightIcon from "../../components/icons/arrow-right-icon";
import { CategoryDetails } from "../../content/categories";

interface CategoryHeroCardProps {
	identifier: string;
	category: CategoryDetails;
}

export const CategoryHeroCard: React.FC<CategoryHeroCardProps> = ({
	identifier,
	category,
}) => {
	return (
		<a
			className="h-56 flex flex-row gap-0 shadow-md w-full border border-berlin-grey-light hover:bg-berlin-grey-light"
			href={`/all-offers/?category=${identifier}`}
		>
			<div className={`${category.color} h-full w-[5%]`}></div>
			<div className="w-[45%]">
				<img
					src={category.image}
					alt={category.name}
					className="object-cover h-full w-full"
				/>
			</div>
			<div className="flex flex-col justify-between p-4 w-[50%]">
				<div className="text-xl font-bold">{category.name}</div>
				<div>{category.description}</div>
				<div className="text-primary-blue text-left flex flex-row items-center justify-start gap-2 hover:underline">
					<div>entdecken</div>
					<ArrowRightIcon color={"text-primary-red"}></ArrowRightIcon>
				</div>
			</div>
		</a>
	);
};
