import { useLocation } from "react-router-dom";
import { content } from "../../../content/content";
import { Layout } from "../../../layout/layout";

export default function Index() {
	const location = useLocation();

	const offer = content[location.pathname].offer;

	if (!offer) {
		return <h1>Offer not found</h1>;
	}

	return (
		<Layout>
			<div>{JSON.stringify(offer)}</div>
		</Layout>
	);
}
