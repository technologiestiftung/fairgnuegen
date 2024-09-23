import { useMemo } from "react";
import BackButton from "../../components/buttons/back-button";
import OfferDetail from "../../components/offer/offer-detail";
import { offers } from "../../content/content";
import { Layout } from "../../layout/layout";
import { useFavoritesStore } from "../../store/favorites-store";
import FilterButton from "../../components/buttons/filter-button";
import SortButton from "../../components/buttons/sort-button";
import { useSearchParams } from "react-router-dom";
import RocketIcon from "../../components/icons/rocket-icon";
import { InfoBox } from "../../components/info-box/info-box";

export default function Index() {
	const [searchParams] = useSearchParams();
	const sortAscending = searchParams.get("sort") === "asc";

	const favorites = useFavoritesStore((state) => state.favorites);

	const filteredOffers = useMemo(() => {
		const filtered = offers.filter((offer) => {
			return favorites.includes(offer.path.split("/").slice(-2)[0]);
		});
		const sorted = filtered.sort((a, b) => {
			if (sortAscending) {
				return a.provider.localeCompare(b.provider);
			}
			return b.provider.localeCompare(a.provider);
		});

		return sorted;
	}, [offers, favorites, sortAscending]);

	return (
		<Layout>
			<div>
				<div
					className={`w-full bg-primary-blue flex flex-row justify-center items-center text-[#ffffff] p-3 mb-10 font-bold text-xl`}
				>
					Favoriten
				</div>

				<div className="max-w-3xl mx-auto flex flex-col">
					<div className="flex flex-row w-full justify-between mb-6 px-4 lg:px-0">
						<SortButton></SortButton>
						<FilterButton></FilterButton>
					</div>

					<div className="mx-4 lg:mx-0 flex flex-row items-center gap-2 py-3">
						<RocketIcon></RocketIcon>
						<p className="text-md text-primary-blue">
							{filteredOffers.length} Angebote gefunden
						</p>
					</div>

					<div className="w-full border-b border-separator mb-5"></div>
					<div className="flex flex-col pt-4 mb-5">
						{filteredOffers.map((offer, idx) => (
							<OfferDetail offer={offer} key={`${idx}-${offer.provider}`} />
						))}
					</div>
					<div className="mb-10 px-5 lg:px-0">
						<BackButton></BackButton>
					</div>
				</div>
			</div>
			<InfoBox showProviderHint={false} maxWidth="max-w-3xl"></InfoBox>
		</Layout>
	);
}
