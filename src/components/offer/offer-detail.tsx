import React, { useMemo } from "react";
import { Offer } from "../../content/content";
import { useFavoritesStore } from "../../store/favorites-store";
import ArrowRightIcon from "../icons/arrow-right-icon";
import LikeIcon from "../icons/like-icon";
import { Pill } from "./pill";
import { allowedOfferPathsWithImagesAllowed } from "../../content/allowed-offers-images";

interface OfferDetailProps {
	offer: Offer;
}

const OfferDetail: React.FC<OfferDetailProps> = ({ offer }) => {
	const [isFavorite, addFavorite, removeFavorite] = useFavoritesStore(
		(state) => [state.isFavorite, state.addFavorite, state.removeFavorite],
	);

	const MAGIC_CUTOFF_LIMIT = 165;

	const cutoffDescription = useMemo(() => {
		if (offer.providerDescription.length > MAGIC_CUTOFF_LIMIT) {
			return offer.providerDescription.slice(0, MAGIC_CUTOFF_LIMIT) + "...";
		}
		return offer.providerDescription;
	}, [offer.providerDescription]);

	return (
		<div
			className="w-full hover:bg-berlin-grey-light text-left hover:cursor-pointer"
			onClick={() => {
				window.location.href = offer.path;
			}}
		>
			<div className="flex flex-row py-4 mx-4 lg:mx-0 gap-4">
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

				<div className="w-full flex flex-col gap-4 px-2">
					<div className="flex flex-col gap-2">
						<h1 className="font-bold text-xl">{offer.provider}</h1>
					</div>
					{offer.isFree && (
						<div className="flex flex-row gap-2 flex-wrap">
							<Pill title={"Freier Eintritt"} />
						</div>
					)}
					<div className={`break-words text-left cusor-default`}>
						{cutoffDescription}
					</div>
					<div className="flex flex-row w-full justify-end text-primary-blue">
						<a className="flex flex-row gap-2 items-center" href={offer.path}>
							<div>mehr Infos</div>
							<ArrowRightIcon color={"text-primary-red"}></ArrowRightIcon>
						</a>
					</div>
				</div>
				<div className="min-w-[43px] flex justify-center">
					<button
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
							if (isFavorite(offer)) {
								removeFavorite(offer);
							} else {
								addFavorite(offer);
							}
						}}
					>
						<LikeIcon isSelected={isFavorite(offer)}></LikeIcon>
					</button>
				</div>
			</div>
			<div className="border-b border-separator w-full"></div>
		</div>
	);
};

export default OfferDetail;
