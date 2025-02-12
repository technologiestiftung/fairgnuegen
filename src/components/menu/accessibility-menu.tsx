import React from "react";

import { DrawerRight } from "../drawer/drawer-right";
import CloseIcon from "../icons/close-icon";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";
import { LocalizedTrackedAnchorLink } from "../anchor-link/localized-tracked-anchor-link";

interface AccessibilityMenuProps {
	isOpen: boolean;
	close: () => void;
}

const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({
	isOpen,
	close,
}) => {
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<DrawerRight isOpen={isOpen} close={() => close()}>
			<div className="flex flex-col gap-4 px-6 py-4 text-base">
				<div className="flex flex-row items-center justify-between  mb-6 mt-4">
					<p className="text-2xl font-bold">
						{i18n["accessibilityMenu.title"]}
					</p>
					<button
						onClick={() => close()}
						aria-label={i18n["button.name.close"]}
					>
						<CloseIcon />
					</button>
				</div>

				<div>
					<p className="font-bold">
						{i18n["accessibilityMenu.barrierefreiheit.question"]}
					</p>
					<LocalizedTrackedAnchorLink
						href="/accessibility-statement/"
						additionalTrackingContext={"(accessibility menu)"}
						className="text-blue-600 hover:underline"
					>
						{i18n["accessibilityMenu.barrierefreiheit"]}
					</LocalizedTrackedAnchorLink>
				</div>

				<div>
					<p className="font-bold">
						{i18n["accessibilityMenu.contact.question"]}
					</p>
					<LocalizedTrackedAnchorLink
						href="/accessibility-statement/#accessibility-contact"
						additionalTrackingContext={"(accessibility menu)"}
						className="text-blue-600 hover:underline"
					>
						{i18n["accessibilityMenu.contact"]}
					</LocalizedTrackedAnchorLink>
				</div>

				<div>
					<p className="font-bold">
						{i18n["accessibilityMenu.additionalInfo.question"]}
					</p>
					<a
						className="text-link-blue hover:underline"
						href="https://www.berlin.de/moderne-verwaltung/barrierefreie-it/anlaufstellen/kompetenzstelle/artikel.988002.php"
						target="_blank"
						rel="noreferrer"
					>
						{i18n["accessibilityMenu.additionalInfo"]}
					</a>
				</div>
			</div>
		</DrawerRight>
	);
};

export default AccessibilityMenu;
