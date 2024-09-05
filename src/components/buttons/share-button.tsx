import React, { useState } from "react";
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
	return (
		<div className="relative w-fit">
			<button
				className="opacity-100 hover:opacity-50 flex justify-center items-center text-primary-blue"
				onClick={() => {
					setShowOverlay(!showOverlay);
				}}
			>
				<div className="flex flex-row gap-1 items-center">
					<ShareIcon></ShareIcon>
				</div>
			</button>
			{showOverlay && (
				<div className="flex flex-col gap-4 absolute right-0 top-full py-4 px-6 bg-white border w-fit mt-2">
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
							await navigator.clipboard.writeText(getURL());
						}}
					>
						<ShareLinkIcon></ShareLinkIcon>
						<div>Link teilen</div>
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
		</div>
	);
};

export default ShareButton;
