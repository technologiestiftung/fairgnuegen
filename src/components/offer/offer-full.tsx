import React, { useState } from "react";
import { allowedOfferPathsWithImagesAllowed } from "../../content/allowed-offers-images";
import { getCategoryDetailsFromName } from "../../content/categories";
import { Offer } from "../../content/content";
import { useFavoritesStore } from "../../store/favorites-store";
import RouteButton from "../buttons/route-button";
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
			<div className="flex flex-row pb-2 slg0 gap-4">
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
					<div className="flex flex-col gap-2">
						<h1 className="font-bold text-2xl">{offer.provider}</h1>
					</div>

					<div className="flex flex-row gap-2 flex-wrap">
						<Pill
							title={offer.category}
							backgroundColor={
								getCategoryDetailsFromName(offer.category)?.color
							}
							textColor={getCategoryDetailsFromName(offer.category)?.textColor}
						/>

						{offer.isFree && <Pill title={"Freier Eintritt"} />}

						{offer.targetGroups.map((t) => (
							<Pill title={t} key={t} />
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
			<div className="py-4 flex flex-col gap-2 mx-4 lg:mx-0">
				<h2 className="text-lg font-bold">Ermäßigung</h2>
				<p>{offer.offerInformation}</p>
			</div>
			<div className="border-b-2 border-[#dddddd] w-full"></div>
			<div className="py-8 flex flex-col gap-2 mx-4 lg:mx-0">
				<h2 className="text-lg font-bold">Ort</h2>
				<div>
					<p>{offer.provider}</p>
					<p>{offer.address}</p>
					<p>
						{offer.zip} {offer.city}
					</p>
				</div>
				<RouteButton
					onClick={() => {
						// This should open Apple Maps on iOS and Google Maps on Android
						// https://stackoverflow.com/questions/18739436/create-a-link-that-opens-the-appropriate-map-app-on-any-device-with-directions
						window.location.href = `http://maps.apple.com/?ll=${offer.y},${offer.x}&q=${encodeURIComponent(offer.provider)}`;
					}}
				></RouteButton>
			</div>
			<div className="border-b-2 border-[#dddddd] w-full"></div>
		</div>
	);
};

export default OfferFull;
