import React, { useState } from "react";
import ShareFacebookIcon from "../icons/share-facebook-icon";
import ShareIcon from "../icons/share-icon";
import ShareLinkIcon from "../icons/share-link-icon";
import ShareMailIcon from "../icons/share-mail-icon";
import ShareWhatsappIcon from "../icons/share-whatsapp-icon";

const ShareButton: React.FC = () => {
	const shareText = "Entdecke günstige Angebote in Berlin!";
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
						href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
						target="_blank"
						rel="noreferrer"
					>
						<ShareFacebookIcon></ShareFacebookIcon>
						<div>Facebook</div>
					</a>

					<button
						className="flex flex-row items-center gap-2"
						onClick={async () => {
							await navigator.clipboard.writeText(window.location.href);
						}}
					>
						<ShareLinkIcon></ShareLinkIcon>
						<div>Link teilen</div>
					</button>

					<a
						className="flex flex-row items-center gap-2"
						href={`mailto:?subject=${shareText}&body=${shareText} ${window.location.href}`}
						target="_blank"
						rel="noreferrer"
					>
						<ShareMailIcon></ShareMailIcon>
						<div>E-Mail</div>
					</a>

					<a
						className="flex flex-row items-center gap-2"
						href={`https://api.whatsapp.com/send?text=${shareText} ${window.location.href}`}
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
