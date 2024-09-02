import React from "react";
import { Offer } from "../../content/content";
import ArrowRightIcon from "../icons/arrow-right-icon";

interface OfferDetailProps {
	offer: Offer;
}

const OfferDetail: React.FC<OfferDetailProps> = ({ offer }) => {
	return (
		<div className="flex flex-col gap-2 border-b-2 border-[#dddddd] pb-2">
			<h1 className="font-bold text-xl">{offer.provider}</h1>
			<div className="flex flex-row gap-2">
				<div className="px-3 py-1 rounded-full border-primary-blue border-2 text-primary-blue">
					{offer.isFree ? "Freier Eintritt" : "Ermäßigter Eintritt"}
				</div>
				{offer.category.map((c) => (
					<div
						className="px-3 py-1 rounded-full border-primary-blue border-2 text-primary-blue"
						key={c}
					>
						{c}
					</div>
				))}
				{offer.targetGroups.map((t) => (
					<div
						className="px-3 py-1 rounded-full border-primary-blue border-2 text-primary-blue"
						key={t}
					>
						{t}
					</div>
				))}
			</div>
			<div>{offer.providerDescription}</div>
			<div className="flex flex-row w-full justify-end text-primary-blue">
				<a className="flex flex-row gap-2 items-center" href={offer.path}>
					<div>mehr Infos</div>
					<ArrowRightIcon></ArrowRightIcon>
				</a>
			</div>
		</div>
	);
};

export default OfferDetail;
