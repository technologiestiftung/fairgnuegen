import { useState } from "react";
import { Drawer } from "../../drawer/drawer";
import { AccessibilityIcon } from "../../icons/accessibility-icon";
import CloseIcon from "../../icons/close-icon";

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
				<div className="flex flex-col gap-4 px-6 py-4 text-base">
					<div className="flex flex-row items-center justify-between  mb-6 mt-4">
						<p className="text-2xl font-bold">Barrierefreiheit</p>
						<button onClick={() => setIsOpen(false)}>
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
		</>
	);
}
