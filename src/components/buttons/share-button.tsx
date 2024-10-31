import React, { useEffect, useMemo, useRef, useState } from "react";
import ShareFacebookIcon from "../icons/share-facebook-icon";
import ShareIcon from "../icons/share-icon";
import ShareLinkIcon from "../icons/share-link-icon";
import ShareMailIcon from "../icons/share-mail-icon";
import ShareWhatsappIcon from "../icons/share-whatsapp-icon";
import { Offer } from "../../content/content";
import { TrackedAnchorLink } from "../anchor-link/tracked-anchor-link";
import { trackInteraction } from "../../analytics/matomo";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";

interface ShareButtonProps {
	offer: Offer;
}

const ShareButton: React.FC<ShareButtonProps> = ({ offer }) => {
	const MAGIC_CUTOFF_LIMIT = 165;

	const getURL = () => window.location.href;
	const shareTitle = () => offer.provider;
	const shareBody = () => `${cutoffDescription} ${window.location.href}`;

	const [showOverlay, setShowOverlay] = useState(false);
	const [showLinkCopied, setShowLinkCopied] = useState(false);

	const buttonRef = useRef<HTMLButtonElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const language = useLanguage();
	const i18n = useI18n(language);

	const handleClickOutside = (event: MouseEvent) => {
		if (
			buttonRef.current &&
			!buttonRef.current.contains(event.target as Node) &&
			overlayRef.current &&
			!overlayRef.current.contains(event.target as Node)
		) {
			setShowOverlay(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const cutoffDescription = useMemo(() => {
		if (offer.providerDescription.length > MAGIC_CUTOFF_LIMIT) {
			return offer.providerDescription.slice(0, MAGIC_CUTOFF_LIMIT) + "...";
		}
		return offer.providerDescription;
	}, [offer]);

	return (
		<div className="relative">
			<button
				ref={buttonRef}
				className="flex justify-center items-center text-primary-blue"
				onClick={() => {
					trackInteraction({
						eventAction: "button click",
						eventName: "button open sharing options",
					});
					setShowOverlay(!showOverlay);
				}}
			>
				<div className="flex flex-row gap-1 items-center size-[44px]">
					<ShareIcon isSelected={showOverlay} />
				</div>
			</button>
			{showOverlay && !showLinkCopied && (
				<div
					className="flex flex-col absolute right-0 top-full bg-white border-[1.5px] border-primary-blue mt-2 w-max"
					ref={overlayRef}
				>
					<button
						className="flex flex-col items-center hover:bg-separator px-4"
						onClick={async () => {
							trackInteraction({
								eventAction: "button click",
								eventName: "sharing: copy link",
							});
							setShowLinkCopied(true);
							await navigator.clipboard.writeText(getURL());
							setTimeout(() => {
								setShowLinkCopied(false);
								setShowOverlay(false);
							}, 1000);
						}}
					>
						<span className="flex items-center gap-2 py-2">
							<ShareLinkIcon />
							<span>{i18n["button.copyLink"]}</span>
						</span>
						<span className="border-b-[1.5px] border-b-separator mx-4 w-full self-center"></span>
					</button>

					<TrackedAnchorLink
						className="flex flex-col hover:bg-separator px-4 -mt-[1.5px] border-t-[1.5px] border-t-transparent"
						href={`https://api.whatsapp.com/send?text=${shareTitle()} ${shareBody()}`}
						target="_blank"
						rel="noreferrer"
					>
						<span className="flex items-center gap-2 py-2">
							<ShareWhatsappIcon />
							<span>Whatsapp</span>
						</span>
						<span className="border-b-[1.5px] border-b-separator mx-4 w-full self-center"></span>
					</TrackedAnchorLink>

					<TrackedAnchorLink
						className="flex flex-col hover:bg-separator px-4 -mt-[1.5px] border-t-[1.5px] border-t-transparent"
						// No custom share text for Facebook, the data will be fetched from the open graph meta tags of the link that is shared
						href={`https://www.facebook.com/sharer/sharer.php?u=${getURL()}`}
						target="_blank"
						rel="noreferrer"
					>
						<span className="flex items-center gap-2 py-2">
							<ShareFacebookIcon />
							<span>Facebook</span>
						</span>
						<span className="border-b-[1.5px] border-b-separator mx-4 w-full self-center"></span>
					</TrackedAnchorLink>

					<TrackedAnchorLink
						className="flex flex-row items-center gap-2 hover:bg-separator py-2 px-4 -mt-[1.5px] border-t-[1.5px] border-t-transparent"
						href={`mailto:?subject=${shareTitle()}&body=${shareBody()}`}
						target="_blank"
						rel="noreferrer"
					>
						<ShareMailIcon />
						<div>E-Mail</div>
					</TrackedAnchorLink>
				</div>
			)}
			{showLinkCopied && (
				<div className="flex flex-col gap-4 absolute right-0 top-full py-2 px-4 border border-primary-blue mt-2 w-max bg-primary-blue text-white">
					<div>{i18n["button.copyLinkCopied"]}</div>
				</div>
			)}
		</div>
	);
};

export default ShareButton;
