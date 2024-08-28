import { useLocation } from "react-router-dom";
import { content, offers } from "../../content/content";
import { Layout } from "../../layout/layout";

export default function Index() {
	const location = useLocation();
	const title = content[location.pathname].title;
	const category = content[location.pathname].category;

	return (
		<Layout>
			<h1>Kategorie</h1>
			<h2>{title}</h2>
			{offers
				.filter((offer) => (offer.category ?? []).find((c) => c === category))
				.map((offer) => (
					<div key={offer.provider}>
						<a href={offer.path}>{offer.provider}</a>
					</div>
				))}
		</Layout>
	);
}
