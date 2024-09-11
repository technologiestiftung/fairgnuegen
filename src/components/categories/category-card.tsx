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
		<a
			className="h-56 flex flex-col gap-0 shadow-md w-full border border-berlin-grey-light hover:bg-berlin-grey-light"
			href={`/all-offers/?category=${identifier}`}
		>
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
				<div className="text-primary-blue text-left flex flex-row items-center justify-start gap-2 hover:underline">
					<div>Angebote entdecken</div>
					<ArrowRightIcon></ArrowRightIcon>
				</div>
			</div>
		</a>
	);
};
