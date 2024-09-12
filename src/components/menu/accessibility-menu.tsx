import React from "react";

import { Drawer } from "../drawer/drawer";
import CloseIcon from "../icons/close-icon";

interface AccessibilityMenuProps {
	isOpen: boolean;
	close: () => void;
}

const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({
	isOpen,
	close,
}) => {
	return (
		<Drawer isOpen={isOpen} close={() => close()}>
			<div className="flex flex-col gap-4 px-6 py-4 text-base">
				<div className="flex flex-row items-center justify-between  mb-6 mt-4">
					<p className="text-2xl font-bold">Barrierefreiheit</p>
					<button onClick={() => close()}>
						<CloseIcon></CloseIcon>
					</button>
				</div>

				<div>
					<p className="font-bold">Wie barrierefrei ist diese Webseite?</p>
					<a
						href="https://www.berlin.de/wir-ueber-uns/8100503-4219174-erklaerung-zur-barrierefreiheit.html"
						className="text-blue-600 hover:underline"
					>
						Erklärung zur Barrierefreiheit
					</a>
				</div>

				<div>
					<p className="font-bold">
						Haben Sie Anmerkungen oder Fragen zur Barrierefreiheit dieser
						Webseite?
					</p>
					<a
						className="text-link-blue hover:underline"
						href="https://www.berlin.de/wir-ueber-uns/8100503-4219174-erklaerung-zur-barrierefreiheit.html#hansprechperson"
					>
						Kontakt zur Ansprechperson
					</a>
				</div>

				<div>
					<p className="font-bold">
						Wo gibt es zusätzliche Informationen zur Barrierefreiheit im Land
						Berlin?
					</p>
					<a
						className="text-link-blue hover:underline"
						href="https://www.berlin.de/moderne-verwaltung/barrierefreie-it/anlaufstellen/kompetenzstelle/artikel.988002.php"
					>
						Barrierefreie Informations- und Kommunikationstechnik (IKT)
					</a>
				</div>
			</div>
		</Drawer>
	);
};

export default AccessibilityMenu;
