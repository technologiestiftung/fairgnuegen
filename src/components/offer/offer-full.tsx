import React, { useState } from "react";
import { allowedOfferPathsWithImagesAllowed } from "../../content/allowed-offers-images";
import { Offer } from "../../content/content";
import { LikeButton } from "../buttons/like-button.tsx";
import ShareButton from "../buttons/share-button";
import LinkIcon from "../icons/link-icon";
import OfferTags from "./offer-tags.tsx";
import CopyToClipboardButton from "../buttons/copy-to-clipboard-button.tsx";

interface OfferFullProps {
	offer: Offer;
}

const OfferFull: React.FC<OfferFullProps> = ({ offer }) => {
	const [showFullDescription, setShowFullDescription] = useState(false);

	const fullAddress = `${offer.provider}, ${offer.address}, ${offer.zip} ${offer.city}`;

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
				<div className="w-full sm:w-[80%] sm:max-w-[80%] flex flex-col gap-4 mx-4 lg:mx-0">
					<div className="hidden sm:flex flex-col gap-2">
						<h1 className="font-bold text-2xl">{offer.provider}</h1>
					</div>
					<div className="flex flex-row gap-2 justify-between sm:hidden">
						<div className="flex flex-col gap-2">
							<h1 className="font-bold text-2xl ">{offer.provider}</h1>
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

					<div
						className={`break-words text-left`}
						onClick={() => {
							setShowFullDescription(!showFullDescription);
						}}
					>
						{offer.providerDescription} <br></br>
					</div>
					<a
						href={offer.website}
						className="text-link-blue flex flex-row items-start gap-1"
						target="_blank"
						rel="noreferrer"
					>
						<div>Zur Webseite</div>
						<LinkIcon></LinkIcon>
					</a>
				</div>
				<div className="hidden max-w-[20%] w-full sm:flex flex-row justify-center items-start gap-2">
					<LikeButton offer={offer} />
					<ShareButton offer={offer} />
				</div>
			</div>
			<div className="border-b-2 border-[#dddddd] w-full"></div>
			<div className="py-4 flex flex-col gap-2 mx-4 lg:mx-0">
				<h2 className="text-lg font-bold">Ermäßigung</h2>
				<p>{offer.offerInformation}</p>
			</div>
			<div className="border-b-2 border-[#dddddd] w-full"></div>
			<div className="py-4 flex flex-col gap-2 mx-4 lg:mx-0">
				<h2 className="text-lg font-bold">Ort</h2>
				<div>
					<p>{offer.provider}</p>
					<p>{offer.address}</p>
					<p>
						{offer.zip} {offer.city}
					</p>
				</div>
				<div className="flex flex-row items-center w-full">
					<CopyToClipboardButton text={fullAddress} />
				</div>
			</div>
			<div className="border-b-2 border-[#dddddd] w-full"></div>
		</div>
	);
};

export default OfferFull;
