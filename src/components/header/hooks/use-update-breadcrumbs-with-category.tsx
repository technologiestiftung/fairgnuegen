import React, { useEffect } from "react";
import { categoryMap, getCategory } from "../../../content/categories.ts";
import { Breadcrumb, content } from "../../../content/content.ts";
import { useLocation, useSearchParams } from "react-router-dom";

export function useUpdateBreadcrumbsWithCategory() {
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const { breadcrumbs: defaultBreadcrumbs } = content[location.pathname];

	const [updatedBreadcrumbs, setUpdatedBreadcrumbs] = React.useState<
		Breadcrumb[] | undefined
	>(defaultBreadcrumbs);

	const category = getCategory(searchParams.get("category"));

	useEffect(() => {
		const updatedBreadcrumbsWithCategory = defaultBreadcrumbs?.map(
			(breadcrumb) => {
				if (breadcrumb.label !== "Alle Angebote") {
					return breadcrumb;
				}

				const { name } = categoryMap[category];

				return {
					...breadcrumb,
					label: name,
				};
			},
		);

		setUpdatedBreadcrumbs(updatedBreadcrumbsWithCategory);
	}, [searchParams]);

	return [updatedBreadcrumbs];
}
