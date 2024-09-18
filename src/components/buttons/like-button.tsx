import LikeIcon from "../icons/like-icon";
import { Offer } from "../../content/content";
import { useFavoritesStore } from "../../store/favorites-store";
import { useIsFavorite } from "../../hooks/use-is-favorite";

export function LikeButton({ offer }: { offer: Offer }) {
	const { toggleFavorite } = useFavoritesStore();
	const isFavorite = useIsFavorite(offer);

	return (
		<button
			onClick={(e) => {
				e.stopPropagation();
				e.preventDefault();
				toggleFavorite(offer);
			}}
		>
			<LikeIcon isSelected={isFavorite}></LikeIcon>
		</button>
	);
}
