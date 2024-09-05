import { useMemo } from "react";
import BackButton from "../../components/buttons/back-button";
import OfferDetail from "../../components/offer/offer-detail";
import { offers } from "../../content/content";
import { Layout } from "../../layout/layout";
import { useFavoritesStore } from "../../store/favorites-store";

export default function Index() {
	const favorites = useFavoritesStore((state) => state.favorites);

	const filteredOffers = useMemo(() => {
		const filtered = offers.filter((offer) => {
			return favorites.includes(offer.path.split("/").slice(-2)[0]);
		});

		return filtered;
	}, [offers, favorites]);

	return (
		<Layout>
			<div>
				<div
					className={`w-full bg-primary-blue flex flex-row justify-center items-center text-[#ffffff] p-3 mb-10 font-bold text-xl`}
				>
					Favoriten
				</div>

				<div className="max-w-3xl mx-auto flex flex-col">
					<div className="w-full border-b border-separator mb-5"></div>
					<div className="flex flex-col gap-8 pt-4 mb-5">
						{filteredOffers.map((offer, idx) => (
							<OfferDetail offer={offer} key={`${idx}-${offer.provider}`} />
						))}
					</div>
					<BackButton></BackButton>
				</div>
			</div>
		</Layout>
	);
}
