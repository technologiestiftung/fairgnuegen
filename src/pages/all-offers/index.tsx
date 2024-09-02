import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterButton from "../../components/buttons/filter-button";
import SortButton from "../../components/buttons/sort-button";
import Checkbox from "../../components/checkbox/checkbox";
import RocketIcon from "../../components/icons/rocket-icon";
import OfferDetail from "../../components/offer/offer-detail";
import SearchBar from "../../components/search-bar/search-bar";
import { offers } from "../../content/content";
import { Layout } from "../../layout/layout";

export default function Index() {
	const [searchParams, setSearchParams] = useSearchParams();
	const category = searchParams.get("category");
	const [search, setSearch] = useState(searchParams.get("search"));
	const [showFreeOffersOnly, setShowFreeOffersOnly] = useState(false);
	const [sortAscending, setSortAscending] = useState(
		(searchParams.get("sort") ?? "asc") === "asc",
	);

	const filteredOffers = useMemo(() => {
		const filtered = offers
			.filter((o) => !category || o.category.includes(category))
			.filter(
				(o) =>
					!search || o.provider.toLowerCase().includes(search.toLowerCase()),
			)
			.filter((o) => !showFreeOffersOnly || o.isFree);
		const sorted = filtered.sort((a, b) => {
			if (sortAscending) {
				return a.provider.localeCompare(b.provider);
			}
			return b.provider.localeCompare(a.provider);
		});
		return sorted;
	}, [category, search, showFreeOffersOnly, sortAscending]);

	return (
		<Layout>
			<div className="max-w-2xl mx-auto flex flex-col">
				<div className="mx-4 sm:mx-0">
					<div className="flex flex-col mb-4">
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
					<div className="flex flex-row w-full justify-between py-3">
						<SortButton
							ascending={sortAscending}
							onOrderChange={() => {
								setSortAscending(!sortAscending);
							}}
						></SortButton>
						<FilterButton></FilterButton>
					</div>
					<div className="flex flex-row items-center gap-2 py-3">
						<RocketIcon></RocketIcon>
						<p className="text-md text-primary-blue">
							{filteredOffers.length} Angebote gefunden
						</p>
					</div>
				</div>

				<div className="w-full border-b border-[#999999]"></div>

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
