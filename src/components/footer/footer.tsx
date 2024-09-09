import { Informationen } from "./informationen";
import { SocialMedia } from "./social-media";
import { ArrowUpIcon } from "../icons/arrow-up-icon";
import { BerlinLogoWhite } from "../icons/berlin-logo-white";
import { FooterColumn } from "./footer-column";

const lowerFooterColumns = [
	{
		title: "Service",
		links: [
			{
				label: "Service-App",
				href: "https://service.berlin.de/app/",
			},
			{
				label: "Termin vereinbaren",
				href: "https://service.berlin.de/terminvereinbarung/",
			},
			{
				label: "Bürgertelefon 115",
				href: "https://service.berlin.de/buergertelefon/",
			},
			{
				label: "Notdienste",
				href: "https://www.berlin.de/polizei/service/so-erreichen-sie-uns/artikel.532842.php",
			},
			{
				label: "Gewerbeservice",
				href: "https://www.berlin.de/ea/",
			},
		],
	},
	{
		title: "Behörden",
		links: [
			{
				label: "Behörden A-Z",
				href: "https://service.berlin.de/behoerden/",
			},
			{
				label: "Senatsverwaltungen",
				href: "https://service.berlin.de/senatsverwaltungen/",
			},
			{
				label: "Bezirksämter",
				href: "https://service.berlin.de/bezirksaemter/",
			},
			{
				label: "Bürgerämter",
				href: "https://service.berlin.de/standorte/buergeraemter/",
			},
			{
				label: "Jobcenter",
				href: "https://service.berlin.de/jobcenter/",
			},
			{
				label: "Einwanderungsamt",
				href: "https://www.berlin.de/einwanderung/",
			},
		],
	},
	{
		title: "Politik & Verwaltung",
		links: [
			{
				label: "Landesregierung",
				href: "https://www.berlin.de/rbmskzl/regierende-buergermeisterin/senat/",
			},
			{
				label: "Karriere im Land Berlin",
				href: "https://www.berlin.de/karriereportal/",
			},
			{
				label: "Bürgerbeteiligung",
				href: "https://mein.berlin.de/",
			},
			{
				label: "Open Data",
				href: "https://daten.berlin.de/",
			},
			{
				label: "Vergaben",
				href: "https://www.berlin.de/vergabeplattform/",
			},
			{
				label: "Ehrenamt",
				href: "https://www.berlin.de/buergeraktiv/",
			},
		],
	},
	{
		title: "Aktuelles",
		links: [
			{
				label: "Sofortprogramm des Senats",
				href: "https://www.berlin.de/rbmskzl/politik/sofortprogramm/",
			},
			{
				label: "Ukraine",
				href: "https://www.berlin.de/ukraine/",
			},
			{
				label: "Energiekrise",
				href: "https://www.berlin.de/energie/",
			},
			{
				label: "Pressemitteilungen",
				href: "https://www.berlin.de/presse/",
			},
			{
				label: "Polizeimeldungen",
				href: "https://www.berlin.de/polizei/polizeimeldungen/",
			},
			{
				label: "Veranstaltungen",
				href: "https://www.berlin.de/land/kalender/",
			},
		],
	},
	{
		title: "Themen",
		links: [
			{
				label: "Gemeinsam Digital",
				href: "https://gemeinsamdigital.berlin.de/",
			},
			{
				label: "Grundsteuer",
				href: "https://berlin.de/grundsteuer",
			},
			{
				label: "Mobilitätswende",
				href: "https://www.berlin.de/sen/uvk/verkehr/mobilitaetswende/verkehr-888873.php",
			},
			{
				label: "Moderne Verwaltung",
				href: "https://www.berlin.de/moderne-verwaltung/",
			},
			{
				label: "Berliner Mauer",
				href: "https://www.berlin.de/mauer/",
			},
		],
	},
	{
		title: "Weitere Informationen",
		links: [
			{
				label: "Kultur & Ausgehen",
				href: "https://www.berlin.de/kultur-und-tickets/",
			},
			{
				label: "Tourismus",
				href: "https://www.berlin.de/tourismus/",
			},
			{
				label: "Wirtschaft",
				href: "https://www.berlin.de/wirtschaft/",
			},
			{
				label: "Stadtleben",
				href: "https://www.berlin.de/special/",
			},
			{
				label: "BerlinFinder",
				href: "https://www.berlin.de/adressen/",
			},
			{
				label: "Stadtplan",
				href: "https://www.berlin.de/stadtplan/",
			},
		],
	},
];

export function Footer() {
	return (
		<footer>
			<div className="flex items-start justify-between w-full bg-berlin-grey-light p-6">
				<div className="flex flex-col desktop:flex-row w-full gap-x-10 gap-y-10">
					<Informationen />

					<div className="flex justify-between w-full">
						<SocialMedia />
						<button
							className="flex gap-x-1 p-1"
							onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						>
							zum Seitenanfang <ArrowUpIcon className="bg-berlin-green" />
						</button>
					</div>
				</div>
			</div>

			<div className="flex flex-col p-6 bg-berlin-grey-dark text-white">
				<div>
					<a href="https://www.berlin.de" title="Zur Startseite von Berlin.de">
						<BerlinLogoWhite />
					</a>
				</div>
				<div className="flex flex-col desktop:flex-row justify-between gap-x-16 gap-y-8 pl-28 pb-16 pt-10">
					{lowerFooterColumns.map((column) => (
						<FooterColumn
							key={column.title}
							title={column.title}
							links={column.links}
						/>
					))}
				</div>
				<div className="pl-28 pb-44 pt-6">
					Berlin.de ist ein Angebot des Landes Berlin.
				</div>
			</div>
		</footer>
	);
}
