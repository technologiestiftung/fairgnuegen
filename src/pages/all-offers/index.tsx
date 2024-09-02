import { useSearchParams } from "react-router-dom";
import { offers } from "../../content/content";
import { Layout } from "../../layout/layout";
import SearchBar from "../../components/search-bar/search-bar";
import Checkbox from "../../components/checkbox/checkbox";
import { useMemo, useState } from "react";
import RocketIcon from "../../components/icons/rocket-icon";
import OfferDetail from "../../components/offer/offer-detail";

export default function Index() {
	const [searchParams, setSearchParams] = useSearchParams();
	const category = searchParams.get("category");
	const [search, setSearch] = useState(searchParams.get("search"));
	const [showFreeOffersOnly, setShowFreeOffersOnly] = useState(false);

	const filteredOffers = useMemo(() => {
		return offers
			.filter((o) => !category || o.category.includes(category))
			.filter(
				(o) =>
					!search || o.provider.toLowerCase().includes(search.toLowerCase()),
			)
			.filter((o) => !showFreeOffersOnly || o.isFree);
	}, [category, search, showFreeOffersOnly]);

	return (
		<Layout>
			<div className="max-w-2xl mx-auto flex flex-col">
				<div className="flex flex-col">
					<SearchBar
						onSearch={(s) => {
							setSearch(s);
							setSearchParams({ search: s });
						}}
					/>
					<Checkbox
						id={"free-offers-only"}
						title="Gratisangebote zeigen"
						onCheck={() => setShowFreeOffersOnly(!showFreeOffersOnly)}
					/>
				</div>
				<div className="w-full border-b border-[#dddddd] pt-2"></div>

				<div className="flex flex-row items-center gap-2 py-3">
					<RocketIcon></RocketIcon>
					<p className="text-xl font-bold">
						{filteredOffers.length} Angebote gefunden
					</p>
				</div>
				<div className="w-full border-b border-[#999999]"></div>

				<div className="flex flex-row w-full justify-between py-3">
					<button className="px-3 py-1 border-black border">Sortieren</button>
					<button className="px-3 py-1 border-black border">Filter</button>
				</div>

				<div className="flex flex-col gap-8 pt-4">
					{filteredOffers.map((offer, idx) => (
						<OfferDetail
							offer={offer}
							key={`${idx}-${offer.provider}`}
						></OfferDetail>
					))}
				</div>
			</div>
		</Layout>
	);
}
