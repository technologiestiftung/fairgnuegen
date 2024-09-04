import React from "react";
import ArrowRightIcon from "../../components/icons/arrow-right-icon";
import { CategoryDetails } from "../../content/categories";

interface CategoryCardProps {
	identifier: string;
	category: CategoryDetails;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
	identifier,
	category,
}) => {
	return (
		<div className="h-56 flex flex-col gap-0 shadow-xl w-full border">
			<div className="h-[50%] w-full flex flex-row">
				<div className={`${category.color} w-[5%] h-full`}></div>
				<div className="w-[95%] h-full">
					<img
						src={category.image}
						alt={category.name}
						className="object-cover h-full w-full"
					/>
				</div>
			</div>

			<div className="flex flex-col justify-between p-4 h-[50%] w-full">
				<div className="text-xl font-bold">{category.name}</div>
				<a
					href={`/all-offers/?category=${identifier}`}
					className="text-primary-blue text-left flex flex-row items-center justify-start gap-2"
				>
					<div>mehr Infos</div>
					<ArrowRightIcon></ArrowRightIcon>
				</a>
			</div>
		</div>
	);
};
