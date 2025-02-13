import { useLocation } from "react-router";
import BackButton from "~/components/buttons/back-button";
import OfferFull from "~/components/offer/offer-full";
import { content } from "~/content/content.ts";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";

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
			<div className="max-w-[980px] mx-auto flex flex-col my-[40px]">
				<div>
					<OfferFull offer={offer}></OfferFull>
					<div className="px-4 lg:px-0 pt-4 flex w-full">
						<BackButton title={i18n["return"]}></BackButton>
					</div>
				</div>
			</div>
		</>
	);
}
