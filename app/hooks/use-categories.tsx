import { useMemo } from "react";
import { useLocation } from "react-router";
import { type CategoryIdentifier, categoryMap } from "~/content/categories";

export function useCategories() {
	const location = useLocation();

	const categories = useMemo(() => {
		const searchParams = new URLSearchParams(location.search);
		const rawCategory = searchParams.get("category");
		const parsedCategories = rawCategory ? rawCategory.split(",") : [];
		return parsedCategories as CategoryIdentifier[];
	}, [location.search]);

	return {
		category: categories.length === 1 ? categories[0] : null,
		categoryDetail:
			categories.length === 1 ? categoryMap[categories[0]] : categoryMap["all"],
		categories,
		categoriesDetails: categories.map((category) => categoryMap[category]),
	};
}
