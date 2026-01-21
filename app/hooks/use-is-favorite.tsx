import { useEffect, useState } from "react";
import { type Offer } from "~/content/types";
import { useFavoritesStore } from "~/store/favorites-store";

export function useIsFavorite(offer: Offer) {
	const { favorites, isFavorite: isFavoriteInLocalStorage } =
		useFavoritesStore();
	const [isFavorite, setIsFavorite] = useState(false);

	/**
	 * This is checked in a use-effect hook to prevent mismatch during hydration.
	 * During build time, all offers are not favorites. In the browser, they might be.
	 * Therefore, we use a useEffect hook + state to check this and update e.g.
	 * the style of the like button accordingly.
	 */
	useEffect(() => {
		if (isFavoriteInLocalStorage(offer)) {
			setIsFavorite(true);
			return;
		}

		setIsFavorite(false);
	}, [offer, favorites]);

	return isFavorite;
}
