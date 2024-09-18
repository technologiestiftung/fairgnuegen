import { useEffect, useState } from "react";
import { Offer } from "../content/content";
import { useFavoritesStore } from "../store/favorites-store";

export function useIsFavorite(offer: Offer) {
	const { favorites, isFavorite: isFavoriteInLocalStorage } =
		useFavoritesStore();
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		if (isFavoriteInLocalStorage(offer)) {
			setIsFavorite(true);
			return;
		}

		setIsFavorite(false);
	}, [offer, favorites]);

	return isFavorite;
}
