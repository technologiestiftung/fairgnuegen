import React, { useMemo } from "react";
import { Offer } from "../../content/content";
import { useFavoritesStore } from "../../store/favorites-store";
import ArrowRightIcon from "../icons/arrow-right-icon";
import LikeIcon from "../icons/like-icon";
import { Pill } from "./pill";

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
			<div className="flex flex-row pb-2 pt-8 mx-4 lg:mx-0 gap-2">
				{/* This acts as a placeholder for when we want to introduce images. We hide it for now. */}
				<div className="hidden">
					<img
						src="/images/placeholder.jpg"
						alt="Offer image"
						className="w-20 h-20 object-cover"
					/>
					<span className="text-xs">Bildcopyright</span>
				</div>

				<div className="w-[90%] max-w-[90%] flex flex-col gap-4 px-2">
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
							<ArrowRightIcon></ArrowRightIcon>
						</a>
					</div>
				</div>
				<div className="max-w-[10%] w-full flex justify-center">
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
