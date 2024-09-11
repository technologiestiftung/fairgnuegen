import { useEffect, useState } from "react";
import {
	CategoryIdentifier,
	categoryMap,
	getCategory,
} from "../content/categories";
import { useSearchParams } from "react-router-dom";

export function useCategory() {
	const [searchParams] = useSearchParams();
	const [category, setCategory] = useState<CategoryIdentifier>("all");

	useEffect(() => {
		setCategory(getCategory(searchParams.get("category")));
	}, [searchParams]);

	return { category, categoryDetails: categoryMap[category] };
}
