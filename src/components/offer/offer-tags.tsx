import React from "react";
import { getCategoryDetailsFromName } from "../../content/categories";
import { Offer } from "../../content/content";
import { Pill } from "./pill";

interface OfferTagsProps {
	offer: Offer;
}

const OfferTags: React.FC<OfferTagsProps> = ({ offer }) => {
	return (
		<div className="w-full">
			<div className="flex flex-row gap-2 flex-wrap">
				<Pill
					title={offer.category}
					backgroundColor={getCategoryDetailsFromName(offer.category)?.color}
					textColor={getCategoryDetailsFromName(offer.category)?.textColor}
				/>

				{offer.isFree && <Pill title={"Freier Eintritt"} />}

				{offer.targetGroups.map((t) => (
					<Pill title={t} key={t} />
				))}
			</div>
		</div>
	);
};

export default OfferTags;
