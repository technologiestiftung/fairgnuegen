import { categoryMap } from "~/content/categories.ts";
import { offers } from "~/content/content.ts";
import { useCategories } from "~/hooks/use-categories.tsx";
import { useDistricts } from "~/hooks/use-districts.tsx";
import { useFilteredAndSortedOffers } from "~/hooks/use-filtered-and-sorted-offers.tsx";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useTargetAudiences } from "~/hooks/use-target-audiences.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";
import BackButton from "~/components/buttons/back-button";
import FilterButton from "~/components/buttons/filter-button";
import ShowMapButton from "~/components/buttons/show-map-button";
import { CategoryCard } from "~/components/categories/category-card";
import FreeOffersCheckbox from "~/components/checkbox/free-offers-checkbox";
import OfferDetail from "~/components/offer/offer-detail";
import { ResponsivePicture } from "~/components/responsive-picture/responsive-picture.tsx";
import SearchBar from "~/components/search-bar/search-bar";

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
		<>
			<div className={isLoading ? "invisible" : "visible"}>
				{categoryDetail && (
					<ResponsivePicture
						src={categoryDetail.image}
						alt={i18n[`${categoryDetail.i18nKey}.imageAltText`]}
						loading={"eager"}
						className="hidden sm:block w-full h-[448px] object-cover"
					/>
				)}
				<div
					className={`w-full ${categoryDetail?.color ?? "bg-primary-blue"} flex flex-row justify-center items-center text-[#ffffff] p-3 mb-10 font-bold text-xl`}
				>
					{categoryDetail
						? i18n[`${categoryDetail.i18nKey}.name`]
						: i18n["allOffers.title"]}
				</div>

				<div className="max-w-[980px] mx-auto flex flex-col">
					<div className="mx-4 lg:mx-0">
						<div className="flex flex-col gap-2 mb-10">
							<SearchBar />
							<FreeOffersCheckbox id={"free-only"} />
						</div>
						<div className="flex flex-row w-full justify-between mb-6">
							<FilterButton />
							<ShowMapButton />
						</div>
						<div className="flex flex-row items-center gap-2 py-3">
							<p className="text-md text-berlin-grey-dark">
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
					<div className="flex flex-col mb-5 mx-4 lg:mx-0">
						{offers.map((offer, idx) => (
							<OfferDetail
								isVisible={filteredAndSortedOffers.some(
									({ slug }) =>
										slug === offer.slug && offer.language === language,
								)}
								offer={offer}
								key={`${idx}-${offer.provider}`}
							/>
						))}
					</div>
					<div className="px-4 lg:px-0 pt-4 flex w-full justify-start">
						<BackButton title={i18n["returnToHome"]} />
					</div>

					<div className="my-8 sm:mx-4 lg:mx-0">
						<div className="text-xl font-bold my-6 mx-4 sm:mx-0">
							{!category || category === "all"
								? i18n["allOffers.discoverCategories"]
								: i18n["allOffers.discoverFurtherCategories"]}
						</div>
						<div
							className={`w-full grid  gap-x-5 gap-y-10 grid-cols-1 grid-rows-4 sm:grid-cols-4 sm:grid-rows-1`}
						>
							{Object.entries(categoryMap)
								.filter(([key]) => {
									if (!category || category === "all") {
										return key !== "all";
									}
									return key !== category;
								})
								.map(([key, c]) => (
									<CategoryCard key={key} identifier={key} category={c} />
								))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
