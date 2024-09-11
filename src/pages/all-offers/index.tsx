import BackButton from "../../components/buttons/back-button";
import FilterButton from "../../components/buttons/filter-button";
import SortButton from "../../components/buttons/sort-button";
import FreeOffersCheckbox from "../../components/checkbox/free-offers-checkbox";
import RocketIcon from "../../components/icons/rocket-icon";
import OfferDetail from "../../components/offer/offer-detail";
import SearchBar from "../../components/search-bar/search-bar";
import { Layout } from "../../layout/layout";
import { useFilteredAndSortedOffers } from "../../hooks/use-filtered-and-sorted-offers";
import { useCategory } from "../../hooks/use-category";
import { CategoryCard } from "../../components/categories/category-card";
import { categoryMap } from "../../content/categories";

export default function Index() {
	const { category, categoryDetails } = useCategory();
	const filteredSortedOffers = useFilteredAndSortedOffers();

	return (
		<Layout>
			<div>
				{category !== "all" && (
					<img
						src={categoryDetails.image}
						alt={categoryDetails.name}
						className="hidden sm:block w-full h-[300px] object-cover"
					/>
				)}
				<div
					className={`w-full ${categoryDetails.color ?? "bg-primary-blue"} flex flex-row justify-center items-center text-[#ffffff] p-3 mb-10 font-bold text-xl`}
				>
					{category !== "all" ? categoryDetails.name : "Alle Angebote"}
				</div>

				<div className="max-w-3xl mx-auto flex flex-col">
					<div className="mx-4 lg:mx-0">
						<div className="flex flex-col mb-10">
							<SearchBar />
							<FreeOffersCheckbox />
						</div>
						<div className="flex flex-row w-full justify-between mb-6">
							<SortButton></SortButton>
							<FilterButton></FilterButton>
						</div>
						<div className="flex flex-row items-center gap-2 py-3">
							<RocketIcon></RocketIcon>
							<p className="text-md text-primary-blue">
								{filteredSortedOffers.length} Angebote gefunden
								{category !== "all" && ` für "${categoryDetails.name}"`}
							</p>
						</div>
					</div>
					<div className="w-full border-b border-separator mb-5"></div>
					<div className="flex flex-col gap-8 pt-4 mb-5">
						{filteredSortedOffers.map((offer, idx) => (
							<OfferDetail
								offer={offer}
								key={`${idx}-${offer.provider}`}
							></OfferDetail>
						))}
					</div>
					<BackButton></BackButton>
					<div className="my-8 mx-4 lg:mx-0">
						<div className="text-xl font-bold my-6">
							{category === "all"
								? "Entdecke die Kategorien"
								: "Entdecke weitere Kategorien"}
						</div>
						<div
							className={`w-full grid ${category === "all" ? "grid-cols-1 sm:grid-cols-4 grid-rows-4 sm:grid-rows-1" : "grid-cols-1 sm:grid-cols-3  grid-rows-3  sm:grid-rows-1 "} gap-4`}
						>
							{Object.entries(categoryMap)
								.filter(
									([key, c]) => c.isRenderedInCategoryCards && key !== category,
								)
								.map(([key, c]) => (
									<CategoryCard key={key} identifier={key} category={c} />
								))}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
