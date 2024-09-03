import React from "react";
import Checkbox from "../components/checkbox/checkbox";
import SearchBar from "../components/search-bar/search-bar";
import { Layout } from "../layout/layout";
import ShowAllButton from "../components/buttons/show-all-button";
import ArrowRightIcon from "../components/icons/arrow-right-icon";

interface HeroCardProps {
	title: string;
	description: string;
	image: string;
	color: string;
}

export const HeroCard: React.FC<HeroCardProps> = ({
	title,
	description,
	image,
	color,
}) => {
	return (
		<div className="h-56 flex flex-row gap-0 shadow-xl w-full border">
			<div className={`${color} h-full w-[5%]`}></div>
			<div className="w-[45%]">
				<img src={image} alt="" className="object-cover h-full w-full" />
			</div>
			<div className="flex flex-col justify-between p-4 w-[50%]">
				<div className="text-xl font-bold">{title}</div>
				<div>{description}</div>
				<button className="text-primary-blue text-left flex flex-row items-center justify-start gap-2">
					<div>entdecken</div>
					<ArrowRightIcon></ArrowRightIcon>
				</button>
			</div>
		</div>
	);
};

export default function Index() {
	return (
		<Layout>
			<div className="max-w-4xl flex flex-col mx-auto">
				<div className="px-4 sm:px-0">
					<h1 className="text-2xl font-bold w-full flex flex-row justify-center my-8 text-center">
						Was möchtest du unternehmen?
					</h1>
					<SearchBar value="" onSearch={() => {}}></SearchBar>
					<Checkbox
						id={"free-offers-only"}
						title="Freier Entritt"
						checked={true}
						onCheck={() => {}}
					/>
				</div>

				<div className="w-full border-b border-separator mb-12 mt-2"></div>
				<div className="w-full grid grid-cols-1 grid-rows-4 gap-x-8 gap-y-8 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-32 sm:gap-y-16 px-4 sm:px-0">
					<HeroCard
						title="Kultur"
						description="Angebote fürs Museum, Theater, Konzerte und vieles mehr"
						image="kultur.jpg"
						color="bg-culture"
					></HeroCard>
					<HeroCard
						title="Sport"
						description="Angebote um körperlich fit zu bleiben oder den Sport zu feiern"
						image="sport.jpg"
						color="bg-sport"
					></HeroCard>
					<HeroCard
						title="Beratung & Bildung"
						description="Weiterbildungs- und Beratungsangebote"
						image="bildung.jpg"
						color="bg-education"
					></HeroCard>
					<HeroCard
						title="Freizeit"
						description="Angebote fürs Kino, Restaurants, Bars und Aktivitäten an der freien Luft"
						image="freizeit.jpg"
						color="bg-leisure"
					></HeroCard>
				</div>
				<div className="w-full border-b border-separator mb-12 mt-12"></div>
				<div className="w-full flex flex-row justify-end px-4 sm:px-0">
					<ShowAllButton onClick={() => {}}></ShowAllButton>
				</div>
			</div>
		</Layout>
	);
}
