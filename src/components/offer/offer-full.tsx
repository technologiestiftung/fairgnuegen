import React, { useState } from "react";
import { Offer } from "../../content/content";
import { useFavoritesStore } from "../../store/favorites-store";
import ShareButton from "../buttons/share-button";
import LikeIcon from "../icons/like-icon";
import LinkIcon from "../icons/link-icon";
import { Pill } from "./pill";

interface OfferFullProps {
	offer: Offer;
}

const OfferFull: React.FC<OfferFullProps> = ({ offer }) => {
	const [addFavorite, removeFavorite, isFavorite] = useFavoritesStore(
		(state) => [state.addFavorite, state.removeFavorite, state.isFavorite],
	);

	const [showFullDescription, setShowFullDescription] = useState(false);

	return (
		<div className="w-full">
			<div className="flex flex-row gap-2 w-full justify-end pr-4 pb-4 sm:hidden">
				<LikeIcon isSelected={false} />
				<ShareButton offer={offer} />
			</div>
			<div className="flex flex-row pb-2 sm:mx-0 gap-2">
				{/* This acts as a placeholder for when we want to introduce images. We hide it for now. */}
				<div className="hidden">
					<img
						src="/placeholder-image.jpg"
						alt="Offer image"
						className="w-20 h-20 object-cover"
					/>
					<span className="text-xs">Bildcopyright</span>
				</div>

				<div className="w-full sm:w-[80%] sm:max-w-[80%] flex flex-col gap-4 mx-4 sm:mx-0">
					<div className="flex flex-col gap-2">
						<h1 className="font-bold text-2xl">{offer.provider}</h1>
					</div>

					<div className="flex flex-row gap-2 flex-wrap">
						{offer.isFree && <Pill title={"Freier Eintritt"} />}
						{offer.category.map((c) => (
							<Pill title={c} key={c}></Pill>
						))}
						{offer.targetGroups.map((t) => (
							<Pill title={t} key={t}></Pill>
						))}
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
					<button
						onClick={() => {
							if (isFavorite(offer)) {
								removeFavorite(offer);
							} else {
								addFavorite(offer);
							}
						}}
					>
						<LikeIcon isSelected={isFavorite(offer)}></LikeIcon>
					</button>
					<ShareButton offer={offer} />
				</div>
			</div>
			<div className="border-b-2 border-[#dddddd] w-full"></div>
			<div className="py-4 flex flex-col gap-2 mx-4 sm:mx-0">
				<h2 className="text-lg font-bold">Ermäßigung</h2>
				<p>{offer.offerInformation}</p>
			</div>
			<div className="border-b-2 border-[#dddddd] w-full"></div>
			<div className="py-4 flex flex-col gap-2 mx-4 sm:mx-0">
				<h2 className="text-lg font-bold">Ort</h2>
				<div>
					<p>{offer.provider}</p>
					<p>{offer.address}</p>
					<p>
						{offer.zip} {offer.city}
					</p>
				</div>
			</div>
			<div className="border-b-2 border-[#dddddd] w-full"></div>
		</div>
	);
};

export default OfferFull;
