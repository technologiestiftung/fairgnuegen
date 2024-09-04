import React, { useState } from "react";
import Checkbox from "../components/checkbox/checkbox";
import SearchBar from "../components/search-bar/search-bar";
import { Layout } from "../layout/layout";
import ShowAllButton from "../components/buttons/show-all-button";
import ArrowRightIcon from "../components/icons/arrow-right-icon";
import { CategoryDetails, categoryMap } from "../content/categories";

interface HeroCardProps {
	identifier: string;
	category: CategoryDetails;
}

export const HeroCard: React.FC<HeroCardProps> = ({ identifier, category }) => {
	return (
		<div className="h-56 flex flex-row gap-0 shadow-xl w-full border">
			<div className={`${category.color} h-full w-[5%]`}></div>
			<div className="w-[45%]">
				<img
					src={category.image}
					alt=""
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

export default function Index() {
	const [showFreeOffersOnly, setShowFreeOffersOnly] = useState(false);
	return (
		<Layout>
			<div className="max-w-4xl flex flex-col mx-auto">
				<div className="px-4 sm:px-0">
					<h1 className="text-2xl font-bold w-full flex flex-row justify-center my-8 text-center">
						Was möchtest du unternehmen?
					</h1>
					<SearchBar
						value=""
						onSearch={(s) => {
							window.location.href = `/all-offers/?search=${s}&free=${showFreeOffersOnly ? "true" : "false"}`;
						}}
					/>
					<Checkbox
						id={"free-offers-only"}
						title="Freier Entritt"
						checked={showFreeOffersOnly}
						onCheck={() => {
							setShowFreeOffersOnly(!showFreeOffersOnly);
						}}
					/>
				</div>

				<div className="w-full border-b border-separator mb-12 mt-2"></div>
				<div className="w-full grid grid-cols-1 grid-rows-4 gap-x-8 gap-y-8 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-32 sm:gap-y-16 px-4 sm:px-0">
					{Object.entries(categoryMap)
						.filter(([, category]) => category.isRendered)
						.map(([key, category]) => (
							<HeroCard key={key} identifier={key} category={category} />
						))}
				</div>
				<div className="w-full border-b border-separator mb-12 mt-12"></div>
				<div className="w-full flex flex-row justify-end px-4 sm:px-0">
					<ShowAllButton
						onClick={() => {
							window.location.href = "/all-offers/";
						}}
					></ShowAllButton>
				</div>
			</div>
		</Layout>
	);
}
