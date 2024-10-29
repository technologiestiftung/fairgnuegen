// import { useLanguage } from "../../../hooks/use-language";
// import { useI18n } from "../../../i18n/use-i18n";
import { LocalizedTrackedAnchorLink } from "../../anchor-link/localized-tracked-anchor-link";

export default function AccessibilityStatement() {
	// const language = useLanguage();
	// const i18n = useI18n(language);

	return (
		<div className="max-w-[800px] mx-auto pt-[3rem] pb-24 px-4">
			<h1 className="text-[27px] leading-[31px] font-bold mb-[1.3rem]">
				{/* {i18n["aboutProject.title"]} */}
				Erklärung zur Barrierefreiheit
			</h1>
			<p className="mb-[1rem]">
				Diese Barrierefreiheitserklärung bezieht sich auf die Subdomain {""}
				<LocalizedTrackedAnchorLink
					href={"/"}
					className="text-link-blue hover:underline"
					additionalTrackingContext={"(link Barrierefreiheit)"}
				>
					{/* {i18n["aboutProject.p2.part.mapLinkLabel"]} */}
					fairgnuegen.berlin.de
				</LocalizedTrackedAnchorLink>
				. Sie gilt nicht für andere Seiten auf {""}
				<a
					className="text-link-blue hover:underline"
					href="https://www.berlin.de/"
				>
					berlin.de
				</a>
				, für die andere Barrierefreiheitserklärungen gelten. Diese Anwendung
				wird betrieben durch die Technologiestiftung Berlin (
				<LocalizedTrackedAnchorLink
					href={"/"}
					className="text-link-blue hover:underline"
					additionalTrackingContext={"(link About Project)"}
				>
					mehr zum Projekt
				</LocalizedTrackedAnchorLink>
				). Sämtliche andere Inhalte werden technisch betrieben von der
				BerlinOnline Stadtportal GmbH & Co. KG.
			</p>
			<h2 className="text-xl font-bold w-full flex flex-row mb-4">
				Wie barrierefrei ist das Angebot?
			</h2>
			<h2 className="text-xl font-bold w-full flex flex-row mb-4">
				Welche Bereiche sind nicht barrierefrei?
			</h2>
			<h2 className="text-xl font-bold w-full flex flex-row mb-4">
				Feedback und Kontakt
			</h2>
		</div>
	);
}
