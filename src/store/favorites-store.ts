import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Offer } from "../content/content";

interface FavoritesState {
	favorites: string[];
	addFavorite: (offer: Offer) => void;
	removeFavorite: (offer: Offer) => void;
	toggleFavorite: (offer: Offer) => void;
	isFavorite: (offer: Offer) => boolean;
	getKey: (offer: Offer) => string;
}

export const useFavoritesStore = create<FavoritesState>()(
	persist(
		(set, get) => ({
			favorites: [],

			addFavorite: (offer) =>
				set((state) => ({
					favorites: state.favorites.includes(get().getKey(offer))
						? state.favorites
						: [...state.favorites, get().getKey(offer)],
				})),

			removeFavorite: (offer) =>
				set((state) => ({
					favorites: state.favorites.filter(
						(item) => item !== get().getKey(offer),
					),
				})),

			toggleFavorite: (offer) => {
				if (get().isFavorite(offer)) {
					get().removeFavorite(offer);
					return;
				}

				get().addFavorite(offer);
			},

			isFavorite: (offer) => get().favorites.includes(get().getKey(offer)),

			getKey: (offer) => offer.path.split("/").slice(-2)[0],
		}),
		{
			name: "favorites-storage",
		},
	),
);
