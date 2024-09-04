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
		<div className="h-56 flex flex-row gap-0 shadow-xl w-full border">
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
				<a
					href={`/all-offers/?category=${identifier}`}
					className="text-primary-blue text-left flex flex-row items-center justify-start gap-2"
				>
					<div>entdecken</div>
					<ArrowRightIcon></ArrowRightIcon>
				</a>
			</div>
		</div>
	);
};
