import React from "react";
import { Offer } from "../../content/content";
import ArrowRightIcon from "../icons/arrow-right-icon";
import LikeIcon from "../icons/like-icon";

interface OfferDetailProps {
	offer: Offer;
}

const OfferDetail: React.FC<OfferDetailProps> = ({ offer }) => {
	return (
		<div className="flex flex-row border-b-2 border-[#dddddd] pb-2">
			<div className="w-[90%] max-w-[90%] flex flex-col gap-4">
				<div className="max-w-[90%] flex flex-col gap-2">
					<h1 className="font-bold text-xl">{offer.provider}</h1>
				</div>
				<div className="flex flex-row gap-2 flex-wrap max-w-[90%]">
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
					{offer.targetGroups.length === 4 && (
						<div className="px-3 py-1 rounded-full border-primary-blue border-2 text-primary-blue">
							Für alle
						</div>
					)}
					{offer.targetGroups.length < 4 &&
						offer.targetGroups.map((t) => (
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
			<div className="max-w-[10%] w-full flex justify-center">
				<LikeIcon isSelected={false}></LikeIcon>
			</div>
		</div>
	);
};

export default OfferDetail;
