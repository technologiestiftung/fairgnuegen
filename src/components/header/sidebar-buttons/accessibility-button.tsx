import { useState } from "react";
import { AccessibilityIcon } from "../../icons/accessibility-icon";
import { Drawer } from "../../drawer/drawer";

export function AccessibilityButton() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				className="flex flex-col items-center text-[11px]"
				onClick={() => setIsOpen(true)}
			>
				<AccessibilityIcon />
				Barrierefrei
			</button>
			<Drawer isOpen={isOpen} close={() => setIsOpen(false)}>
				<div className="p-4 text-base">
					<p className="text-xl font-bold">Barrierefreiheit</p>
					<p className="font-bold">Wie barrierefrei ist diese Webseite?</p>
					<a
						href="https://www.berlin.de/wir-ueber-uns/8100503-4219174-erklaerung-zur-barrierefreiheit.html"
						className="text-blue-600 hover:underline"
					>
						Erklärung zur Barrierefreiheit
					</a>
					<p>
						Haben Sie Anmerkungen oder Fragen zur Barrierefreiheit dieser
						Webseite?
					</p>
					<a href="https://www.berlin.de/wir-ueber-uns/8100503-4219174-erklaerung-zur-barrierefreiheit.html#hansprechperson">
						Kontakt zur Ansprechperson
					</a>
					<p>
						Wo gibt es zusätzliche Informationen zur Barrierefreiheit im Land
						Berlin?
					</p>
					<a href="https://www.berlin.de/moderne-verwaltung/barrierefreie-it/anlaufstellen/kompetenzstelle/artikel.988002.php">
						Barrierefreie Informations- und Kommunikationstechnik (IKT)
					</a>
				</div>
			</Drawer>
		</>
	);
}
