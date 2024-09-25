import * as GeoJSON from "geojson";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { offers } from "../content/content";
import { useCategories } from "./use-categories";
import { useDistricts } from "./use-districts";
import { useTargetAudiences } from "./use-target-audiences";
import { useLanguage } from "./use-language.tsx";
import { useI18n } from "../i18n/use-i18n.tsx";

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
	const i18n = useI18n(language);

	const [filteredAndSortedOffers, setFilteredAndSortedOffers] =
		useState(offers);

	useEffect(() => {
		setIsLoading(false);
		const filtered = offers
			.filter((offer) => offer.language === language)
			.filter(
				(o) =>
					categories.length === 0 ||
					categoriesDetails.map((c) => i18n[c.name]).includes(o.category),
			)
			.filter(
				(o) =>
					!search || o.provider.toLowerCase().includes(search.toLowerCase()),
			)
			.filter((o) => !showFreeOffersOnly || o.isFree)
			.filter(
				(o) => districts.length === 0 || districtValues.includes(o.district),
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
					coordinates: [offer.x, offer.y],
				},
			};
		});
		return {
			type: "FeatureCollection",
			features: features,
		} as GeoJSON.GeoJSON;
	}, [filteredAndSortedOffers]);

	return {
		filteredAndSortedOffers,
		search,
		isLoading,
		filteredAndSortedOffersAsGeojson,
	};
}
