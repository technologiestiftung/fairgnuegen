import { useEffect, useState } from "react";
import { offers } from "../content/content";
import { categoryMap, getCategory } from "../content/categories";
import { useSearchParams } from "react-router-dom";

export function useFilteredAndSortedOffers() {
	/**
	 * the loading state is used to prevent the UI from flickering
	 * when filters from the URL-Query are applied on page load
	 */
	const [isLoading, setIsLoading] = useState(true);

	const [searchParams] = useSearchParams();

	const category = getCategory(searchParams.get("category"));
	const search = searchParams.get("search");
	const showFreeOffersOnly = searchParams.get("free") === "true";
	const sortAscending = (searchParams.get("sort") ?? "asc") === "asc";

	const [filteredAndSortedOffers, setFilteredAndSortedOffers] =
		useState(offers);

	useEffect(() => {
		setIsLoading(false);

		const filtered = offers
			.filter(
				(o) =>
					category === "all" || o.category.includes(categoryMap[category].name),
			)
			.filter(
				(o) =>
					!search || o.provider.toLowerCase().includes(search.toLowerCase()),
			)
			.filter((o) => !showFreeOffersOnly || o.isFree);

		const filteredAndSorted = filtered.sort((a, b) => {
			if (sortAscending) {
				return a.provider.localeCompare(b.provider);
			}
			return b.provider.localeCompare(a.provider);
		});

		setFilteredAndSortedOffers(filteredAndSorted);
	}, [category, search, showFreeOffersOnly, sortAscending]);

	return { filteredAndSortedOffers, search, isLoading };
}
