import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
	favorites: string[];
	addFavorite: (fav: string) => void;
	removeFavorite: (fav: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
	persist(
		(set) => ({
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
		}),
		{
			name: "favorites-storage", // Key for localStorage
			getStorage: () => localStorage, // Use localStorage
		},
	),
);
