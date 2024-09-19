import LikeIcon from "../icons/like-icon";
import { Offer } from "../../content/content";
import { useFavoritesStore } from "../../store/favorites-store";
import { useIsFavorite } from "../../hooks/use-is-favorite";
import { trackInteraction } from "../../analytics/matomo.ts";

export function LikeButton({ offer }: { offer: Offer }) {
	const { toggleFavorite } = useFavoritesStore();
	const isFavorite = useIsFavorite(offer);

	return (
		<button
			onClick={(e) => {
				e.stopPropagation();
				e.preventDefault();
				trackInteraction({
					eventAction: "button click",
					eventName: `${isFavorite ? "unliked" : "liked"} favorite ${offer.provider} (from: ${window.location.pathname})`,
				});
				toggleFavorite(offer);
			}}
		>
			<LikeIcon isSelected={isFavorite}></LikeIcon>
		</button>
	);
}
