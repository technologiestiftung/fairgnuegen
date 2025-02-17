import { useUpdateBreadcrumbsWithCategory } from "~/hooks/use-update-breadcrumbs-with-category.tsx";
import type { Breadcrumb } from "~/content/content.ts";

export function usePageTitle() {
	const [breadcrumbs] = useUpdateBreadcrumbsWithCategory();

	const titleSegments = breadcrumbs.toReversed().map(toTitleSegment);

	titleSegments.push("Berlin.de");

	return titleSegments.join(" - ");
}

function toTitleSegment({ label, optionalTitleLabel }: Breadcrumb) {
	if (!optionalTitleLabel) {
		return label;
	}

	return `${label} - ${optionalTitleLabel}`;
}
