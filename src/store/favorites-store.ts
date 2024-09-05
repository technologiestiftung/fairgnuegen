import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Offer } from "../content/content";

interface FavoritesState {
	favorites: string[];
	addFavorite: (fav: string) => void;
	removeFavorite: (fav: string) => void;
	isFavorite: (offer: Offer) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
	persist(
		(set, get) => ({
			favorites: [],
			addFavorite: (fav) =>
				set((state) => ({
					favorites: state.favorites.includes(fav)
						? state.favorites
						: [...state.favorites, fav],
				})),
			removeFavorite: (fav) =>
				set((state) => ({
					favorites: state.favorites.filter((item) => item !== fav),
				})),
			isFavorite: (offer) =>
				get().favorites.includes(offer.path.split("/").slice(-2)[0]),
		}),
		{
			name: "favorites-storage",
			getStorage: () => localStorage,
		},
	),
);
