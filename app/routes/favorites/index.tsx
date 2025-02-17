import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { offers } from "~/content/content.ts";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";
import { useFavoritesStore } from "~/store/favorites-store.ts";
import BackButton from "~/components/buttons/back-button";
import OfferDetail from "~/components/offer/offer-detail";

export default function Index() {
	const language = useLanguage();
	const i18n = useI18n(language);

	const [searchParams] = useSearchParams();
	const sortAscending = searchParams.get("sort") === "asc";

	const favorites = useFavoritesStore((state) => state.favorites);

	const filteredOffers = useMemo(() => {
		const filtered = offers
			.filter((offer) => favorites.includes(offer.slug))
			.filter((offer) => offer.language === language);
		const sorted = filtered.sort((a, b) => {
			if (sortAscending) {
				return a.provider.localeCompare(b.provider);
			}
			return b.provider.localeCompare(a.provider);
		});

		return sorted;
	}, [offers, favorites, sortAscending]);

	return (
		<>
			<div>
				<div
					className={`w-full bg-primary-blue flex flex-row justify-center items-center text-[#ffffff] p-3 mb-10 font-bold text-xl`}
				>
					{i18n["menuItem.favorites"]}
				</div>

				<div className="max-w-[980px] mx-auto flex flex-col">
					<div className="mx-4 lg:mx-0 flex flex-row items-center gap-2 py-3">
						<p className="text-md text-berlin-grey-dark">
							{filteredOffers.length} {i18n["allOffers.offersFound"]}
						</p>
					</div>

					<div className="flex flex-col mb-5 mx-4 lg:mx-0">
						{filteredOffers.map((offer, idx) => (
							<OfferDetail
								isVisible={true}
								offer={offer}
								key={`${idx}-${offer.provider}`}
							/>
						))}
					</div>
					<div className="mb-10 px-5 lg:px-0">
						<BackButton title={i18n["return"]}></BackButton>
					</div>
				</div>
			</div>
		</>
	);
}
