import { offers } from "../../content/content";
import { Layout } from "../../layout/layout";

export default function Index() {
	return (
		<Layout>
			<h1>All Offers</h1>
			{offers.map((offer) => (
				<div key={offer.provider}>
					<a href={offer.path}>{offer.provider}</a>
				</div>
			))}
		</Layout>
	);
}
