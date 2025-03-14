import React from "react";
import { getCategoryDetailsFromName } from "~/content/categories.ts";
import { type Offer } from "~/content/content.ts";
import { Pill } from "~/components/offer/pill";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";

interface OfferTagsProps {
	offer: Offer;
}

const OfferTags: React.FC<OfferTagsProps> = ({ offer }) => {
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<div className="w-full">
			<div className="flex flex-row gap-2 flex-wrap">
				<Pill
					title={offer.category}
					backgroundColor={getCategoryDetailsFromName(offer.category)?.color}
				/>

				{offer.isFree && <Pill title={i18n["filter.freeEntry"]} />}

				{offer.targetGroups.map((t) => (
					<Pill title={t} key={t} />
				))}
			</div>
		</div>
	);
};

export default OfferTags;
