import React, { useEffect, useMemo, useRef, useState } from "react";
import ShareFacebookIcon from "../icons/share-facebook-icon";
import ShareIcon from "../icons/share-icon";
import ShareLinkIcon from "../icons/share-link-icon";
import ShareMailIcon from "../icons/share-mail-icon";
import ShareWhatsappIcon from "../icons/share-whatsapp-icon";
import { Offer } from "../../content/content";
import { TrackedAnchorLink } from "../anchor-link/tracked-anchor-link.tsx";
import { trackInteraction } from "../../analytics/matomo.ts";

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
				className="opacity-100 hover:opacity-50 flex justify-center items-center text-primary-blue"
				onClick={() => {
					trackInteraction({
						eventAction: "button click",
						eventName: "button open sharing options",
					});
					setShowOverlay(!showOverlay);
				}}
			>
				<div className="flex flex-row gap-1 items-center">
					<ShareIcon isSelected={showOverlay}></ShareIcon>
				</div>
			</button>
			{showOverlay && !showLinkCopied && (
				<div
					className="flex flex-col gap-4 absolute right-0 top-full py-2 px-6 bg-white border mt-2 w-max"
					ref={overlayRef}
				>
					<TrackedAnchorLink
						className="flex flex-row items-center gap-2 border-primary-blue"
						// No custom share text for Facebook, the data will be fetched from the open graph meta tags of the link that is shared
						href={`https://www.facebook.com/sharer/sharer.php?u=${getURL()}`}
						target="_blank"
						rel="noreferrer"
					>
						<ShareFacebookIcon></ShareFacebookIcon>
						<div>Facebook</div>
					</TrackedAnchorLink>

					<button
						className="flex flex-row items-center gap-2"
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
						<ShareLinkIcon></ShareLinkIcon>
						<div>Link kopieren</div>
					</button>

					<TrackedAnchorLink
						className="flex flex-row items-center gap-2"
						href={`mailto:?subject=${shareTitle()}&body=${shareBody()}`}
						target="_blank"
						rel="noreferrer"
					>
						<ShareMailIcon></ShareMailIcon>
						<div>E-Mail</div>
					</TrackedAnchorLink>

					<TrackedAnchorLink
						className="flex flex-row items-center gap-2"
						href={`https://api.whatsapp.com/send?text=${shareTitle()} ${shareBody()}`}
						target="_blank"
						rel="noreferrer"
					>
						<ShareWhatsappIcon></ShareWhatsappIcon>
						<div>Whatsapp</div>
					</TrackedAnchorLink>
				</div>
			)}
			{showLinkCopied && (
				<div className="flex flex-col gap-4 absolute right-0 top-full py-2 px-4 border mt-2 w-max bg-primary-blue text-white">
					<div>Der Link wurde kopiert!</div>
				</div>
			)}
		</div>
	);
};

export default ShareButton;
