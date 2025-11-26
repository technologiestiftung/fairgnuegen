import React, { useMemo } from "react";
import { type Offer } from "~/content/content.ts";
import ArrowRightLinkIcon from "~/components/icons/arrow-right-link-icon";
import { Pill } from "~/components/offer/pill";
import { allowedOfferPathsWithImagesAllowed } from "~/content/allowed-offers-images.ts";
import { LikeButton } from "~/components/buttons/like-button.tsx";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";
import { LocalizedTrackedAnchorLink } from "~/components/anchor-link/localized-tracked-anchor-link.tsx";

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
		<LocalizedTrackedAnchorLink
			className={`flex items-center w-full bg-berlin-grey-light hover:bg-berlin-grey-hover relative text-left hover:cursor-pointer mb-6 pl-[18px] pr-11 `}
			href={offer.path}
		>
			<div className="flex flex-row py-6 md:py-11 gap-4 h-fit">
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

				<div className="w-full h-fit flex flex-col gap-4">
					<div className="flex flex-row justify-between items-start gap-4">
						<h3 className="font-bold text-[22px] flex flex-row items-center h-full">
							{offer.provider}
						</h3>
					</div>
					{offer.isFree && (
						<div className="flex flex-row flex-wrap">
							<Pill title={i18n["filter.freeEntry"]} />
						</div>
					)}
					<div className={`break-words text-left pr-0 md:pr-[59px]`}>
						{cutoffDescription}
					</div>
					<div className="flex flex-row w-full justify-start text-link-blue hover:underline">
						<div className="flex flex-row gap-[5px] items-center">
							<div>{i18n["moreInfo"]}</div>
							<ArrowRightLinkIcon color={"text-link-blue"}></ArrowRightLinkIcon>
						</div>
					</div>
				</div>
			</div>

			<div className="min-w-[43px] absolute top-0 right-0 justify-center">
				<LikeButton offer={offer} />
			</div>
		</LocalizedTrackedAnchorLink>
	);
};

export default OfferDetail;
