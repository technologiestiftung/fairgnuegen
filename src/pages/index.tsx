import FilterButton from "../components/buttons/filter-button";
import ShowAllButton from "../components/buttons/show-all-button";
import ShowMapButton from "../components/buttons/show-map-button";
import { CategoryHeroCard } from "../components/categories/category-hero-card";
import FreeOffersCheckbox from "../components/checkbox/free-offers-checkbox";
import SearchBar from "../components/search-bar/search-bar";
import { categoryMap } from "../content/categories";
import { Layout } from "../layout/layout";

export default function Index() {
	return (
		<Layout>
			<div className="max-w-4xl flex flex-col mx-auto">
				<div className="px-4 sm:px-0">
					<h1 className="text-2xl font-bold w-full flex flex-row justify-center my-8 text-center">
						Was möchtest du unternehmen?
					</h1>
					<SearchBar />
					<FreeOffersCheckbox />
				</div>

				<div className="w-full border-b border-separator mb-12 mt-2"></div>

				<div className="flex flex-row w-full justify-between mb-10 px-4 sm:px-0">
					<ShowMapButton></ShowMapButton>
					<FilterButton></FilterButton>
				</div>

				<div className="w-full grid grid-cols-1 grid-rows-4 gap-x-8 gap-y-8 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-32 sm:gap-y-16 px-4 sm:px-0">
					{Object.entries(categoryMap)
						.filter(([, category]) => category.isRendered)
						.map(([key, category]) => (
							<CategoryHeroCard
								key={key}
								identifier={key}
								category={category}
							/>
						))}
				</div>
				<div className="w-full border-b border-separator mb-12 mt-12"></div>
				<div className="w-full flex flex-row justify-end px-4 sm:px-0">
					<ShowAllButton />
				</div>
			</div>
		</Layout>
	);
}
