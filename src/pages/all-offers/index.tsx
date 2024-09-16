import BackButton from "../../components/buttons/back-button";
import FilterButton from "../../components/buttons/filter-button";
import SortButton from "../../components/buttons/sort-button";
import FreeOffersCheckbox from "../../components/checkbox/free-offers-checkbox";
import RocketIcon from "../../components/icons/rocket-icon";
import OfferDetail from "../../components/offer/offer-detail";
import SearchBar from "../../components/search-bar/search-bar";
import { Layout } from "../../layout/layout";
import { useFilteredAndSortedOffers } from "../../hooks/use-filtered-and-sorted-offers";
import { CategoryCard } from "../../components/categories/category-card";
import { categoryMap } from "../../content/categories";
import { InfoBox } from "../../components/info-box/info-box";
import { useCategories } from "../../hooks/use-categories";
import { useDistricts } from "../../hooks/use-districts";
import { useTargetAudiences } from "../../hooks/use-target-audiences";
import { ResponsivePicture } from "../../components/responsive-picture/responsive-picture";

export default function Index() {
	const { category, categoryDetail } = useCategories();
	const { categories, categoriesDetails } = useCategories();
	const { districts, districtValues } = useDistricts();
	const { targetAudiences, targetAudienceValues } = useTargetAudiences();

	const { filteredAndSortedOffers, search, isLoading } =
		useFilteredAndSortedOffers();

	return (
		<Layout>
			<div className={isLoading ? "invisible" : "visible"}>
				{categoryDetail && (
					<ResponsivePicture
						src={categoryDetail.image}
						alt={categoryDetail.name}
						loading={"eager"}
						className="hidden sm:block w-full h-[300px] object-cover"
					/>
				)}
				<div
					className={`w-full ${categoryDetail?.color ?? "bg-primary-blue"} flex flex-row justify-center items-center text-[#ffffff] p-3 mb-10 font-bold text-xl`}
				>
					{categoryDetail ? categoryDetail.name : "Alle Angebote"}
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
							<div className="min-w-6">
								<RocketIcon></RocketIcon>
							</div>
							<p className="text-md text-primary-blue">
								{filteredAndSortedOffers.length} Angebote gefunden
								{search !== null && search !== "" && ` für "${search}"`}
								{categories.length > 0 &&
									` in "${categoriesDetails.map((c) => c.name).join(", ")}"`}
								{districts.length > 0 && ` in "${districtValues.join(", ")}"`}
								{targetAudiences.length > 0 &&
									` für "${targetAudienceValues.map((t) => t.label).join(", ")}"`}
							</p>
						</div>
					</div>
					<div className="w-full border-b border-separator mb-5"></div>
					<div className="flex flex-col pt-4 mb-5">
						{filteredAndSortedOffers.map((offer, idx) => (
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
							className={`w-full grid gap-4 ${category === "all" ? "grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2" : "grid-rows-3 grid-cols-1 sm:grid-cols-3 sm:grid-rows-1"}`}
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
			<InfoBox showProviderHint={false} maxWidth="max-w-3xl"></InfoBox>
		</Layout>
	);
}
