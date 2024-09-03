import React, { useMemo, useState } from "react";
import { Offer } from "../../content/content";
import ArrowRightIcon from "../icons/arrow-right-icon";
import LikeIcon from "../icons/like-icon";

interface OfferDetailProps {
	offer: Offer;
}

interface TagProp {
	title: string;
}
const Tag: React.FC<TagProp> = ({ title }) => {
	return (
		<div className="px-3 py-1 rounded-full border-primary-blue border-2 text-primary-blue text-sm">
			{title}
		</div>
	);
};

const OfferDetail: React.FC<OfferDetailProps> = ({ offer }) => {
	const [showFullDescription, setShowFullDescription] = useState(false);

	const MAGIC_CUTOFF_LIMIT = 165;

	const cutoffDescription = useMemo(() => {
		if (showFullDescription) {
			return offer.providerDescription;
		}
		if (offer.providerDescription.length > MAGIC_CUTOFF_LIMIT) {
			return offer.providerDescription.slice(0, MAGIC_CUTOFF_LIMIT) + "...";
		}
		return offer.providerDescription;
	}, [offer.providerDescription, showFullDescription]);

	const descriptionClickable = useMemo(() => {
		return offer.providerDescription.length > MAGIC_CUTOFF_LIMIT;
	}, [offer.providerDescription]);

	return (
		<div className="w-full">
			<div className="flex flex-row pb-2 mx-4 sm:mx-0">
				<div className="w-[90%] max-w-[90%] flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<h1 className="font-bold text-xl">{offer.provider}</h1>
					</div>
					<div className="flex flex-row gap-2 flex-wrap">
						<Tag
							title={offer.isFree ? "Freier Eintritt" : "Ermäßigter Eintritt"}
						/>
					</div>
					<div
						className={`break-words text-left ${descriptionClickable ? "cursor-pointer" : "cusor-default"}`}
						onClick={() => {
							setShowFullDescription(!showFullDescription);
						}}
					>
						{cutoffDescription}
					</div>
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
			<div className="border-b-2 border-[#dddddd] w-full"></div>
		</div>
	);
};

export default OfferDetail;
