import React, { useMemo } from "react";
import { Offer } from "../../content/content";
import ArrowRightIcon from "../icons/arrow-right-icon";
import { Pill } from "./pill";
import { LikeButton } from "../buttons/like-button";
import { getCategoryDetailsFromName } from "../../content/categories";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";

interface OfferPopupProps {
	offer: Offer;
}

const OfferPopup: React.FC<OfferPopupProps> = ({ offer }) => {
	const language = useLanguage();
	const i18n = useI18n(language);

	const navigate = useNavigate();

	const MAGIC_CUTOFF_LIMIT = 80;

	const cutoffDescription = useMemo(() => {
		if (offer.providerDescription.length > MAGIC_CUTOFF_LIMIT) {
			return offer.providerDescription.slice(0, MAGIC_CUTOFF_LIMIT) + "...";
		}
		return offer.providerDescription;
	}, [offer.providerDescription]);

	return (
		<div
			className={`w-full hover:bg-berlin-grey-light text-left hover:cursor-pointer bg-white md:shadow-default py-4 border-b md:border-0`}
			onClick={() => {
				navigate(offer.path);
			}}
		>
			<div className="flex flex-row gap-2">
				<div className="w-full flex flex-col gap-4 px-4">
					<div className="w-full flex flex-row justify-between gap-4">
						<div className="h-fit flex flex-col gap-2">
							<div className="w-fit flex flex-row items-center gap-2">
								<Pill
									title={offer.category}
									backgroundColor={
										getCategoryDetailsFromName(offer.category)?.color
									}
									textColor={
										getCategoryDetailsFromName(offer.category)?.textColor
									}
								/>

								{offer.isFree && (
									<div className="flex flex-row gap-2 flex-wrap">
										<Pill title={i18n["filter.freeEntry"]} />
									</div>
								)}
							</div>
							<h1 className="font-bold text-xl flex flex-row items-center h-full">
								{offer.provider}
							</h1>
						</div>
						<div className="min-w-[43px] flex justify-center">
							<LikeButton offer={offer} />
						</div>
					</div>

					<div className={`break-words text-left cursor-default`}>
						{cutoffDescription}
					</div>
					<div className="flex flex-row w-full justify-end text-primary-blue">
						<a className="flex flex-row gap-2 items-center" href={offer.path}>
							<div>mehr Infos</div>
							<ArrowRightIcon color={"text-primary-red"}></ArrowRightIcon>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OfferPopup;
