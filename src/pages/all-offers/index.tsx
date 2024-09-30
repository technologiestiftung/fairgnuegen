import BackButton from "../../components/buttons/back-button";
import FilterButton from "../../components/buttons/filter-button";
import SortButton from "../../components/buttons/sort-button";
import { CategoryCard } from "../../components/categories/category-card";
import FreeOffersCheckbox from "../../components/checkbox/free-offers-checkbox";
import { InfoBox } from "../../components/info-box/info-box";
import OfferDetail from "../../components/offer/offer-detail";
import { ResponsivePicture } from "../../components/responsive-picture/responsive-picture";
import SearchBar from "../../components/search-bar/search-bar";
import { categoryMap } from "../../content/categories";
import { useCategories } from "../../hooks/use-categories";
import { useDistricts } from "../../hooks/use-districts";
import { useFilteredAndSortedOffers } from "../../hooks/use-filtered-and-sorted-offers";
import { useLanguage } from "../../hooks/use-language";
import { useTargetAudiences } from "../../hooks/use-target-audiences";
import { useI18n } from "../../i18n/use-i18n";
import { Layout } from "../../layout/layout";

export default function Index() {
	const language = useLanguage();
	const i18n = useI18n(language);

	const { category, categoryDetail, categories, categoriesDetails } =
		useCategories();
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
						alt={i18n[categoryDetail.name]}
						loading={"eager"}
						className="hidden sm:block w-full h-[300px] object-cover"
					/>
				)}
				<div
					className={`w-full ${categoryDetail?.color ?? "bg-primary-blue"} flex flex-row justify-center items-center text-[#ffffff] p-3 mb-10 font-bold text-xl`}
				>
					{categoryDetail ? i18n[categoryDetail.name] : i18n["allOffers.title"]}
				</div>

				<div className="max-w-3xl mx-auto flex flex-col">
					<div className="mx-4 lg:mx-0">
						<div className="flex flex-col gap-2 mb-10">
							<SearchBar />
							<FreeOffersCheckbox />
						</div>
						<div className="flex flex-row w-full justify-between mb-6">
							<SortButton></SortButton>
							<FilterButton></FilterButton>
						</div>
						<div className="flex flex-row items-center gap-2 py-3">
							<p className="text-md text-berlin-green">
								{filteredAndSortedOffers.length} {i18n["allOffers.offersFound"]}
								{search !== null &&
									search !== "" &&
									` ${i18n["allOffers.for"]} "${search}"`}
								{categories.length > 0 &&
									` ${i18n["allOffers.in"]} "${categoriesDetails.map((c) => i18n[`${c.i18nKey}.name`]).join(", ")}"`}
								{districts.length > 0 &&
									` ${i18n["allOffers.in"]} "${districtValues.join(", ")}"`}
								{targetAudiences.length > 0 &&
									` ${i18n["allOffers.for"]} "${targetAudienceValues.map((t) => i18n[t.label]).join(", ")}"`}
							</p>
						</div>
					</div>
					<div className="w-full border-b border-separator mb-5"></div>
					<div className="flex flex-col pt-4 mb-5">
						{filteredAndSortedOffers.map((offer, idx) => (
							<OfferDetail offer={offer} key={`${idx}-${offer.provider}`} />
						))}
					</div>
					<div className="px-4 lg:px-0 pt-4 flex w-full md:justify-end justify-start">
						<BackButton title={i18n["returnToHome"]}></BackButton>
					</div>

					<div className="my-8 mx-4 md:mx-2 lg:mx-0">
						<div className="text-xl font-bold my-6">
							{!category || category === "all"
								? i18n["allOffers.discoverCategories"]
								: i18n["allOffers.discoverFurtherCategories"]}
						</div>
						<div
							className={`w-full grid gap-4 ${category === "all" ? "grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2" : "grid-rows-3 grid-cols-1 sm:grid-cols-2 sm:grid-rows-2"}`}
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
