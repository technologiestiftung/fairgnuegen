import React, { useEffect, useRef, useState } from "react";
import ShareFacebookIcon from "../icons/share-facebook-icon";
import ShareIcon from "../icons/share-icon";
import ShareLinkIcon from "../icons/share-link-icon";
import ShareMailIcon from "../icons/share-mail-icon";
import ShareWhatsappIcon from "../icons/share-whatsapp-icon";

const ShareButton: React.FC = () => {
	const getURL = () => window.location.href;
	const shareTitle = () => "Fairgnügen • Berlin fair und günstig erleben";
	const shareBody = () =>
		`${window.location.href} *Angebote sind nur mit dem Berechtigungsnachweis nutzbar.`;

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

	return (
		<div className="relative">
			<button
				ref={buttonRef}
				className="opacity-100 hover:opacity-50 flex justify-center items-center text-primary-blue"
				onClick={() => {
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
					<a
						className="flex flex-row items-center gap-2 border-primary-blue"
						// No custom share text for Facebook, the data will be fetched from the open graph meta tags of the link that is shared
						href={`https://www.facebook.com/sharer/sharer.php?u=${getURL()}`}
						target="_blank"
						rel="noreferrer"
					>
						<ShareFacebookIcon></ShareFacebookIcon>
						<div>Facebook</div>
					</a>

					<button
						className="flex flex-row items-center gap-2"
						onClick={async () => {
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

					<a
						className="flex flex-row items-center gap-2"
						href={`mailto:?subject=${shareTitle()}&body=${shareBody()}`}
						target="_blank"
						rel="noreferrer"
					>
						<ShareMailIcon></ShareMailIcon>
						<div>E-Mail</div>
					</a>

					<a
						className="flex flex-row items-center gap-2"
						href={`https://api.whatsapp.com/send?text=${shareTitle()} ${shareBody()}`}
						target="_blank"
						rel="noreferrer"
					>
						<ShareWhatsappIcon></ShareWhatsappIcon>
						<div>Whatsapp</div>
					</a>
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
