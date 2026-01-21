import React, { useMemo } from "react";
import { type Offer } from "~/content/types";
import ArrowRightIcon from "~/components/icons/arrow-right-icon";
import { Pill } from "~/components/offer/pill";
import { LikeButton } from "~/components/buttons/like-button";
import { getCategoryDetailsFromName } from "~/content/categories";
import { useLanguage } from "~/hooks/use-language";
import { useI18n } from "~/i18n/use-i18n";
import { LocalizedTrackedAnchorLink } from "~/components/anchor-link/localized-tracked-anchor-link";

interface OfferPopupProps {
	offer: Offer;
}

const OfferPopup: React.FC<OfferPopupProps> = ({ offer }) => {
	const language = useLanguage();
	const i18n = useI18n(language);

	const MAGIC_CUTOFF_LIMIT = 80;

	const cutoffDescription = useMemo(() => {
		if (offer.providerDescription.length > MAGIC_CUTOFF_LIMIT) {
			return offer.providerDescription.slice(0, MAGIC_CUTOFF_LIMIT) + "...";
		}
		return offer.providerDescription;
	}, [offer.providerDescription]);

	return (
		<LocalizedTrackedAnchorLink href={offer.path}>
			<div className="w-full hover:bg-berlin-grey-light text-left hover:cursor-pointer bg-white md:shadow-default-black py-4 border-b md:border-0 flex flex-row gap-2">
				<div className="w-full flex flex-col gap-4 px-4">
					<div className="w-full flex flex-row justify-between gap-4">
						<div className="h-fit flex flex-col gap-2">
							<h3 className="font-bold text-xl flex flex-row items-center h-full">
								{offer.provider}
							</h3>
							<div className="w-fit flex flex-row items-center gap-2">
								<Pill
									title={offer.category}
									backgroundColor={
										getCategoryDetailsFromName(offer.category)?.color
									}
								/>

								{offer.isFree && (
									<div className="flex flex-row gap-2 flex-wrap">
										<Pill title={i18n["filter.freeEntry"]} />
									</div>
								)}
							</div>
						</div>
						<div className="min-w-[43px] flex justify-center">
							<LikeButton offer={offer} />
						</div>
					</div>

					<div className={`break-words text-left cursor-default`}>
						{cutoffDescription}
					</div>
					<div className="flex flex-row w-full justify-end text-primary-blue">
						<div className="flex flex-row gap-2 items-center">
							<div>mehr Infos</div>
							<ArrowRightIcon color={"text-primary-red"}></ArrowRightIcon>
						</div>
					</div>
				</div>
			</div>
		</LocalizedTrackedAnchorLink>
	);
};

export default OfferPopup;
