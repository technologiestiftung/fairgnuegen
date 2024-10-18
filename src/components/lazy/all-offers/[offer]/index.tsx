import { useLocation } from "react-router-dom";
import BackButton from "../../../buttons/back-button";
import OfferFull from "../../../offer/offer-full";
import { content } from "../../../../content/content";
import { useLanguage } from "../../../../hooks/use-language";
import { useI18n } from "../../../../i18n/use-i18n";

export default function Index() {
	const language = useLanguage();
	const i18n = useI18n(language);
	const location = useLocation();
	const offer = content[location.pathname].offer;

	if (!offer) {
		return <div>Offer not found</div>;
	}

	return (
		<>
			<div className="max-w-3xl mx-auto flex flex-col my-[40px]">
				<div>
					<OfferFull offer={offer}></OfferFull>
					<div className="px-4 lg:px-0 pt-4 flex w-full md:justify-end justify-start">
						<BackButton title={i18n["return"]}></BackButton>
					</div>
				</div>
			</div>
		</>
	);
}
