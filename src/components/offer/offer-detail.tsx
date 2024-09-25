import React, { useMemo } from "react";
import { Offer } from "../../content/content";
import ArrowRightIcon from "../icons/arrow-right-icon";
import { Pill } from "./pill";
import { allowedOfferPathsWithImagesAllowed } from "../../content/allowed-offers-images";
import { LikeButton } from "../buttons/like-button.tsx";
import { TrackedAnchorLink } from "../anchor-link/tracked-anchor-link.tsx";
import { useLanguage } from "../../hooks/use-language.tsx";
import { useI18n } from "../../i18n/use-i18n.tsx";

interface OfferDetailProps {
	offer: Offer;
}

const OfferDetail: React.FC<OfferDetailProps> = ({ offer }) => {
	const language = useLanguage();
	const i18n = useI18n(language);

	const MAGIC_CUTOFF_LIMIT = 165;

	const cutoffDescription = useMemo(() => {
		if (offer.providerDescription.length > MAGIC_CUTOFF_LIMIT) {
			return offer.providerDescription.slice(0, MAGIC_CUTOFF_LIMIT) + "...";
		}
		return offer.providerDescription;
	}, [offer.providerDescription]);

	return (
		<TrackedAnchorLink
			className={`w-full hover:bg-berlin-grey-light text-left hover:cursor-pointer bg-white px-3`}
			href={offer.path}
		>
			<div className="flex flex-row py-4 mx-2 lg:mx-0 gap-4">
				<div
					// This is for demonstration purposes only, we randomly select some offers to show the placeholder images
					// TODO: remove this and use the actual images as soon as they are available
					className={`min-w-[140px] ${allowedOfferPathsWithImagesAllowed.includes(offer.path) ? "hidden md:block" : "hidden"}`}
				>
					<img
						src="/images/placeholder.jpg"
						alt="Offer image"
						className="w-[140px] h-[140px] object-cover"
					/>
					<span className="text-xs">© Bildcopyright</span>
				</div>

				<div className="w-full flex flex-col gap-4">
					<div className="flex flex-row justify-between items-start gap-4">
						<h1 className="font-bold text-xl flex flex-row items-center h-full">
							{offer.provider}
						</h1>
						<div className="min-w-[43px] flex justify-center">
							<LikeButton offer={offer} />
						</div>
					</div>
					{offer.isFree && (
						<div className="flex flex-row gap-2 flex-wrap">
							<Pill title={i18n["filter.freeEntry"]} />
						</div>
					)}
					<div
						className={`break-words text-left cusor-default pr-0 md:pr-[59px]`}
					>
						{cutoffDescription}
					</div>
					<div className="flex flex-row w-full justify-start text-primary-blue">
						<div className="flex flex-row gap-2 items-center">
							<div>mehr Infos</div>
							<ArrowRightIcon color={"text-primary-red"}></ArrowRightIcon>
						</div>
					</div>
				</div>
			</div>
			<div className="border-b border-berlin-grey-light w-full"></div>
		</TrackedAnchorLink>
	);
};

export default OfferDetail;
