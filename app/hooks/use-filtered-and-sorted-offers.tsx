import { type GeoJSON } from "geojson";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { offers } from "~/content/content.ts";
import { useCategories } from "~/hooks/use-categories.tsx";
import { useDistricts } from "~/hooks/use-districts.tsx";
import { useTargetAudiences } from "~/hooks/use-target-audiences.tsx";
import { useLanguage } from "~/hooks/use-language.tsx";

export function useFilteredAndSortedOffers() {
	/**
	 * the loading state is used to prevent the UI from flickering
	 * when filters from the URL-Query are applied on page load
	 */
	const [isLoading, setIsLoading] = useState(true);

	const [searchParams] = useSearchParams();

	const search = searchParams.get("search");
	const showFreeOffersOnly = searchParams.get("free") === "true";
	const sortAscending = (searchParams.get("sort") ?? "asc") === "asc";

	const { category, categories, categoriesDetails } = useCategories();
	const { districts, districtValues } = useDistricts();
	const { targetAudiences, targetAudienceValues } = useTargetAudiences();

	const language = useLanguage();

	const [filteredAndSortedOffers, setFilteredAndSortedOffers] =
		useState(offers);

	useEffect(() => {
		setIsLoading(false);
		const filtered = offers
			.filter((offer) => offer.language === language)
			.filter(
				(o) =>
					categories.length === 0 ||
					categoriesDetails.map((c) => c.name).includes(o.category),
			)
			.filter(
				(o) =>
					!search || o.provider.toLowerCase().includes(search.toLowerCase()),
			)
			.filter((o) => !showFreeOffersOnly || o.isFree)
			.filter(
				(o) =>
					districts.length === 0 ||
					(o.district && districtValues.includes(o.district)),
			)
			.filter(
				(o) =>
					targetAudiences.length === 0 ||
					targetAudienceValues
						.map((t) => t.valueInData)
						.some((item) => o.targetGroups.includes(item)),
			);

		const filteredAndSorted = filtered.sort((a, b) => {
			if (sortAscending) {
				return a.provider.localeCompare(b.provider);
			}
			return b.provider.localeCompare(a.provider);
		});

		setFilteredAndSortedOffers(filteredAndSorted);
	}, [
		category,
		search,
		showFreeOffersOnly,
		sortAscending,
		districts,
		targetAudiences,
		categories,
	]);

	const filteredAndSortedOffersAsGeojson = useMemo(() => {
		const features = filteredAndSortedOffers.map((offer) => {
			return {
				type: "Feature",
				properties: {
					id: offer.path,
					offer: offer,
				},
				geometry: {
					type: "Point",
					coordinates: [offer.lon, offer.lat],
				},
			};
		});
		return {
			type: "FeatureCollection",
			features: features,
		} as GeoJSON;
	}, [filteredAndSortedOffers]);

	return {
		filteredAndSortedOffers,
		search,
		isLoading,
		filteredAndSortedOffersAsGeojson,
	};
}
