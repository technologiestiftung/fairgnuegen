import React from "react";
import { ChevronRight } from "../icons/chevron-right";
import { useUpdateBreadcrumbsWithCategory } from "./hooks/use-update-breadcrumbs-with-category";

export function Breadcrumbs() {
	/**
	 * If a single category is selected, the breadcrumbs needs to show the category name instead of "Alle Angebote".
	 * And categories are read from the URL query parameter "category", which is only available in the client-side.
	 * So we use an effect hook to update the breadcrumbs with the category name when the component is mounted.
	 */
	const [updatedBreadcrumbs] = useUpdateBreadcrumbsWithCategory();

	return (
		<div className="text-sm items-center gap-x-3 flex flex-row">
			{updatedBreadcrumbs?.map(({ label, href }, index) => (
				<React.Fragment key={label}>
					{index > 0 && <ChevronRight />}
					<a
						href={href}
						className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[20vw] sm:max-w-[30vw] md:max-w-[40vw]"
					>
						{label}
					</a>
				</React.Fragment>
			))}
		</div>
	);
}
