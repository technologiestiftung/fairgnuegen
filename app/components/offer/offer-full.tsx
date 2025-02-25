import React from "react";
import { allowedOfferPathsWithImagesAllowed } from "~/content/allowed-offers-images.ts";
import { type Offer } from "~/content/content.ts";
import { LikeButton } from "~/components/buttons/like-button.tsx";
import ShareButton from "~/components/buttons/share-button";
import LinkIcon from "~/components/icons/link-icon";
import OfferTags from "~/components/offer/offer-tags";
import CopyToClipboardButton from "~/components/buttons/copy-to-clipboard-button";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";

interface OfferFullProps {
	offer: Offer;
}

const OfferFull: React.FC<OfferFullProps> = ({ offer }) => {
	const language = useLanguage();
	const i18n = useI18n(language);

	const fullAddress = `${offer.provider}, ${offer.addressWithHouseNumber}, ${offer.cityWithZip}`;

	return (
		<div className="w-full">
			<div className="flex flex-row pb-4 slg0 gap-4">
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
				<div className="w-full max-w-[980px] flex flex-col gap-4 mx-4 lg:mx-0">
					<div className="hidden sm:flex flex-col gap-2">
						<h3 className="font-bold text-2xl">{offer.provider}</h3>
					</div>
					<div className="flex flex-row gap-2 justify-between sm:hidden">
						<div className="flex flex-col gap-2">
							<h3 className="font-bold text-2xl ">{offer.provider}</h3>
							<OfferTags offer={offer} />
						</div>
						<div className="flex flex-col gap-2">
							<LikeButton offer={offer} />
							<ShareButton offer={offer} />
						</div>
					</div>

					<div className="hidden sm:flex">
						<OfferTags offer={offer} />
					</div>
					{offer.offerDescription && (
						<p className={`break-words text-left`}>
							{offer.offerDescription} <br></br>
						</p>
					)}
					{offer.providerDescription && (
						<p className={`break-words text-left`}>
							{offer.providerDescription} <br></br>
						</p>
					)}
					<a
						href={offer.website}
						className="text-link-blue hover:underline flex flex-row items-start gap-1"
						target="_blank"
						rel="noreferrer"
					>
						<div>{i18n["offer.linkToWebsite"]}</div>
						<LinkIcon></LinkIcon>
					</a>
				</div>
				<div className="hidden max-w-[20%] w-full sm:flex flex-row md:justify-end justify-center items-start gap-2">
					<LikeButton offer={offer} />
					<ShareButton offer={offer} />
				</div>
			</div>
			<div className="border-b-2 border-[#dddddd] w-full"></div>
			<div className="py-4 flex flex-col gap-2 mx-4 lg:mx-0">
				<h2 className="text-lg font-bold">{i18n["offer.discountDetails"]}</h2>
				<p>{offer.offerInformation}</p>
			</div>
			<div className="border-b-2 border-[#dddddd] w-full"></div>
			<div className="py-4 flex flex-col gap-2 mx-4 lg:mx-0">
				<h2 className="text-lg font-bold">{i18n["offer.location"]}</h2>
				<div>
					<p>{offer.provider}</p>
					<p>{offer.addressWithHouseNumber}</p>
					<p>{offer.cityWithZip}</p>
				</div>
				<div className="flex flex-row items-center w-full">
					<CopyToClipboardButton text={fullAddress} />
				</div>
			</div>
		</div>
	);
};

export default OfferFull;
