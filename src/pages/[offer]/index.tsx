import { useLocation } from "react-router-dom";
import BackButton from "../../components/buttons/back-button";
import OfferFull from "../../components/offer/offer-full";
import { content } from "../../content/content";
import { Layout } from "../../layout/layout";

export default function Index() {
	const location = useLocation();
	const offer = content[location.pathname].offer;

	if (!offer) {
		return <div>Offer not found</div>;
	}

	return (
		<Layout>
			<div className="max-w-2xl mx-auto flex flex-col">
				<div className="mx-4 sm:mx-0">
					<OfferFull offer={offer}></OfferFull>
					<BackButton onClick={() => {}}></BackButton>
				</div>
			</div>
		</Layout>
	);
}
