import React, { useState } from "react";

interface RouteButtonProps {
	text: string;
}

const CopyToClipboardButton: React.FC<RouteButtonProps> = ({ text }) => {
	const [showLinkCopied, setShowLinkCopied] = useState(false);

	const onClick = async () => {
		setShowLinkCopied(true);
		await navigator.clipboard.writeText(text);
		setTimeout(() => {
			setShowLinkCopied(false);
		}, 1000);
	};

	return (
		<div className="relative w-full">
			<button
				className="px-4 py-2 border-black w-fit border-2 opacity-100 hover:opacity-50 flex justify-center items-center text-black h-[43px]"
				onClick={onClick}
			>
				<span className="flex flex-row gap-1 items-center">
					Adresse kopieren
				</span>
			</button>
			{showLinkCopied && (
				<div className="absolute top-0 left-0 py-2 h-[43px] px-4 w-fit border-2 border-primary-blue bg-primary-blue text-white">
					Die Adresse wurde kopiert!
				</div>
			)}
		</div>
	);
};

export default CopyToClipboardButton;
