import React from "react";

import { DrawerRight } from "../drawer/drawer-right";
import CloseIcon from "../icons/close-icon";
import { EasyLanguageIcon } from "../icons/easy-language-icon";
import { HandsIcon } from "../icons/hands-icon";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";

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
					<button onClick={() => close()}>
						<CloseIcon></CloseIcon>
					</button>
				</div>

				<div className="flex flex-row gap-2 items-center ">
					<EasyLanguageIcon />
					<a
						href="https://www.berlin.de/sen/soziales/leichte-sprache/"
						className="text-blue-600 hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						{i18n["accessibilityMenu.easyLanguage"]}
					</a>
				</div>

				<div className="flex flex-row gap-2 items-center mb-4">
					<HandsIcon />
					<a
						href="https://www.berlin.de/sen/soziales/gebaerdensprache/"
						className="text-blue-600 hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						{i18n["accessibilityMenu.dgs"]}
					</a>
				</div>

				<div>
					<p className="font-bold">
						{i18n["accessibilityMenu.barrierefreiheit.question"]}
					</p>
					<a
						href="https://www.berlin.de/wir-ueber-uns/8100503-4219174-erklaerung-zur-barrierefreiheit.html"
						className="text-blue-600 hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						{i18n["accessibilityMenu.barrierefreiheit"]}
					</a>
				</div>

				<div>
					<p className="font-bold">
						{i18n["accessibilityMenu.contact.question"]}
					</p>
					<a
						className="text-link-blue hover:underline"
						href="https://www.berlin.de/wir-ueber-uns/8100503-4219174-erklaerung-zur-barrierefreiheit.html#hansprechperson"
						target="_blank"
						rel="noreferrer"
					>
						{i18n["accessibilityMenu.contact"]}
					</a>
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
