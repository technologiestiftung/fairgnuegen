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
			<div className="max-w-3xl mx-auto flex flex-col my-[40px]">
				<div>
					<OfferFull offer={offer}></OfferFull>
					<div className="px-4 lg:px-0 pt-4 flex w-full justify-end sm:justify-start">
						<BackButton></BackButton>
					</div>
				</div>
			</div>
		</Layout>
	);
}
