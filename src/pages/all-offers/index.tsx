import { useSearchParams } from "react-router-dom";
import { offers } from "../../content/content";
import { Layout } from "../../layout/layout";

export default function Index() {
	const searchParams = useSearchParams()[0];
	const category = searchParams.get("category");

	return (
		<Layout>
			<h1>All Offers</h1>
			{category && <h2>Category: {category}</h2>}
			{offers
				.filter((o) => !category || o.category.includes(category))
				.map((offer) => (
					<div key={offer.provider}>
						<a href={offer.path}>{offer.provider}</a>
					</div>
				))}
		</Layout>
	);
}
