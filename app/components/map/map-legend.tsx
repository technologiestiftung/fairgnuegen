import React from "react";
import { Pill } from "~/components/offer/pill.tsx";
import { categoryMap } from "~/content/categories.ts";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";

const MapLegend: React.FC = () => {
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
			<div>{i18n["categories.title"]}</div>
			<div className="flex flex-row items-center gap-2">
				{Object.entries(categoryMap)
					.filter((c) => c[1].isRenderedInCategoryCards)
					.map((c) => (
						<Pill
							title={
								i18n[`${c[1].i18nKey}.name_short`] ??
								i18n[`${c[1].i18nKey}.name`]
							}
							key={c[0]}
							backgroundColor={c[1].color}
							textSize="text-xs md:text-base"
						></Pill>
					))}
			</div>
		</div>
	);
};

export default MapLegend;
