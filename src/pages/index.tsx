import FilterButton from "../components/buttons/filter-button";
import ShowAllButton from "../components/buttons/show-all-button";
import ShowMapButton from "../components/buttons/show-map-button";
import { CategoryHeroCard } from "../components/categories/category-hero-card";
import FreeOffersCheckbox from "../components/checkbox/free-offers-checkbox";
import SearchBar from "../components/search-bar/search-bar";
import { categoryMap } from "../content/categories";
import { Layout } from "../layout/layout";
import { InfoBox } from "../components/info-box/info-box";
import { FeedbackForm } from "../components/feedback-form/feedback-form";

export default function Index() {
	return (
		<Layout>
			<div className="max-w-4xl flex flex-col mx-auto">
				<div className="px-4 lg:px-0">
					<h1 className="text-2xl font-bold w-full flex flex-row justify-center my-8 text-center">
						Was möchtest du unternehmen?
					</h1>
					<div className="flex flex-col gap-2">
						<SearchBar />
						<FreeOffersCheckbox />
					</div>
				</div>

				<div className="w-full border-b border-separator mb-12 mt-2"></div>

				<div className="flex flex-row w-full justify-between mb-10 px-4 lg:px-0">
					<ShowMapButton></ShowMapButton>
					<FilterButton></FilterButton>
				</div>

				<div className="w-full grid grid-cols-1 grid-rows-4 gap-x-8 gap-y-8 md:grid-cols-2 md:grid-rows-2 px-4 lg:px-0 lg:gap-x-16">
					{Object.entries(categoryMap)
						.filter(([, category]) => category.isRenderedInCategoryCards)
						.map(([key, category]) => (
							<CategoryHeroCard
								key={key}
								identifier={key}
								category={category}
							/>
						))}
				</div>
				<div className="w-full border-b border-separator mb-12 mt-12"></div>
				<div className="w-full flex flex-row justify-end px-4 lg:px-0 mb-12">
					<ShowAllButton />
				</div>

				<FeedbackForm />
			</div>
			<InfoBox showProviderHint={true} maxWidth="max-w-4xl"></InfoBox>
		</Layout>
	);
}
