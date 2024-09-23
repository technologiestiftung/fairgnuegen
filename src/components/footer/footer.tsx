import { BerlinLogoWhite } from "../icons/berlin-logo-white";
import { FooterDarkColumn } from "./footer-dark-column";
import { ScrollToTopButton } from "../buttons/scroll-to-top-button";
import { FooterLightColumn } from "./footer-light-column.tsx";
import { HandsIcon } from "../icons/hands-icon.tsx";
import { EasyLanguageIcon } from "../icons/easy-language-icon.tsx";
import { SquareArrowIcon } from "../icons/square-arrow-icon.tsx";

const upperFooterColumns = [
	{
		title: "Informationen",
		links: [
			{
				label: "Impressum",
				href: "/impressum",
			},
			{
				label: "Kontakt",
				href: "/kontakt",
			},
			{
				label: "Datenschutzerklärung",
				href: "/datenschutz",
			},
			{
				label: "Erklärung zur Barrierefreiheit",
				href: "/erklärung",
			},
			{
				label: (
					<>
						<HandsIcon /> DGS
					</>
				),
				href: "/dgs",
			},
			{
				label: (
					<>
						<EasyLanguageIcon /> Leichte Sprache
					</>
				),
				href: "/leichte-sprache",
			},
		],
	},
	{
		title: "Social Media",
		links: [
			{
				label: (
					<>
						Instagram <SquareArrowIcon />
					</>
				),
				href: "/instagram",
			},
			{
				label: (
					<>
						LinkedIn <SquareArrowIcon />{" "}
					</>
				),
				href: "/linkedin",
			},
		],
	},
];
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
			<div className="flex items-start justify-between w-full bg-berlin-grey-light desktop:p-6">
				<div className="flex flex-col desktop:flex-row w-full desktop:gap-x-10">
					<div className="desktop:hidden self-end">
						<ScrollToTopButton />
					</div>

					{upperFooterColumns.map((column) => (
						<FooterLightColumn
							key={column.title}
							title={column.title}
							links={column.links}
						/>
					))}
				</div>
				<div className="hidden desktop:block">
					<ScrollToTopButton />
				</div>
			</div>

			<div className="flex flex-col pt-6 desktop:p-6 bg-berlin-grey-dark text-white">
				<div className="pl-3 desktop:pl-0">
					<a href="https://www.berlin.de" title="Zur Startseite von Berlin.de">
						<BerlinLogoWhite />
					</a>
				</div>
				<div className="flex flex-col desktop:flex-row justify-between gap-x-16 border-b-[0.5px] desktop:border-b-0 desktop:gap-y-8 desktop:pl-28 desktop:pb-16 pt-7 desktop:pt-10">
					{lowerFooterColumns.map((column) => (
						<FooterDarkColumn
							key={column.title}
							title={column.title}
							links={column.links}
						/>
					))}
				</div>
				<div className="pl-4 desktop:pl-28 pb-20 pt-6">
					Berlin.de ist ein Angebot des Landes Berlin.
				</div>
			</div>
		</footer>
	);
}
