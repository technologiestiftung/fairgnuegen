import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { type CategoryIdentifier, categoryMap } from "~/content/categories.ts";

export function useCategories() {
	const [searchParams] = useSearchParams();
	const [categories, setCategories] = useState<CategoryIdentifier[]>([]);

	useEffect(() => {
		const rawCategory = searchParams.get("category");
		const parsedCategories = rawCategory ? rawCategory.split(",") : [];
		setCategories(parsedCategories as CategoryIdentifier[]);
	}, [searchParams]);

	return {
		category: categories.length === 1 ? categories[0] : null,
		categoryDetail:
			categories.length === 1 ? categoryMap[categories[0]] : categoryMap["all"],
		categories,
		categoriesDetails: categories.map((category) => categoryMap[category]),
	};
}
