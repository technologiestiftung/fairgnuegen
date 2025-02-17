import { useEffect, useState } from "react";
import { categoryMap, getCategory } from "~/content/categories.ts";
import { type Breadcrumb, content } from "~/content/content.ts";
import { useLocation, useSearchParams } from "react-router";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";

export function useUpdateBreadcrumbsWithCategory() {
	const language = useLanguage();
	const i18n = useI18n(language);

	const location = useLocation();
	const [searchParams] = useSearchParams();
	const { breadcrumbs: defaultBreadcrumbs } = content[location.pathname];

	const [updatedBreadcrumbs, setUpdatedBreadcrumbs] =
		useState<Breadcrumb[]>(defaultBreadcrumbs);

	const category = getCategory(searchParams.get("category"));

	useEffect(() => {
		const updatedBreadcrumbsWithCategory = defaultBreadcrumbs?.map(
			(breadcrumb) => {
				if (breadcrumb.label !== "Alle Angebote") {
					return breadcrumb;
				}

				const { i18nKey } = categoryMap[category];

				return {
					...breadcrumb,
					href: `${breadcrumb.href}?category=${category}`,
					label: i18n[`${i18nKey}.name`],
				};
			},
		);

		setUpdatedBreadcrumbs(updatedBreadcrumbsWithCategory);
	}, [searchParams]);

	return [updatedBreadcrumbs];
}
