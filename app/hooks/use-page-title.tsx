import { useUpdateBreadcrumbsWithCategory } from "~/hooks/use-update-breadcrumbs-with-category";
import type { Breadcrumb } from "~/content/types";

export function usePageTitle() {
	const [breadcrumbs] = useUpdateBreadcrumbsWithCategory();
	const titleSegments = breadcrumbs.reverse().map(toTitleSegment);

	titleSegments.push("Berlin.de");

	return titleSegments.join(" - ");
}

function toTitleSegment({ label, optionalTitleLabel }: Breadcrumb) {
	if (!optionalTitleLabel) {
		return label;
	}

	return `${label} - ${optionalTitleLabel}`;
}
