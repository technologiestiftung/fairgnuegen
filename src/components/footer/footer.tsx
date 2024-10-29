import { BerlinLogoWhite } from "../icons/berlin-logo-white";
import { FooterDarkColumn } from "./footer-dark-column";
import { ScrollToTopButton } from "../buttons/scroll-to-top-button";
import { FooterLightColumn } from "./footer-light-column.tsx";
import { useLanguage } from "../../hooks/use-language.tsx";
import { useI18n } from "../../i18n/use-i18n.tsx";

const upperFooterColumns = [
	{
		title: "upperFooter.fairfun",
		links: [
			{
				label: "upperFooter.fairfun.about",
				href: "/about-project/",
			},
			{
				label: "upperFooter.fairfun.impressum",
				href: "/imprint/",
			},
			{
				label: "upperFooter.fairfun.dataprivacy",
				href: "/privacy-note/",
			},
			{
				label: "upperFooter.fairfun.accessibility",
				href: "/dgs/",
			},
		],
	},
	{
		title: "upperFooter.content",
		links: [
			{
				label: "upperFooter.content.offer",
				href: "/all-offers/",
			},
			{
				label: "upperFooter.content.culture",
				href: "/all-offers/?category=kultur",
			},
			{
				label: "upperFooter.content.sport",
				href: "/all-offers/?category=sport",
			},
			{
				label: "upperFooter.content.education",
				href: "/all-offers/?category=bildung_beratung",
			},
			{
				label: "upperFooter.content.freetime",
				href: "/all-offers/?category=freizeit",
			},
			{
				label: "upperFooter.content.map",
				href: "/map/",
			},
		],
	},
];

const lowerFooterColumns = [
	{
		title: "lowerFooter.service",
		links: [
			{
				label: "lowerFooter.service.serviceapp",
				href: "https://service.berlin.de/app/",
			},
			{
				label: "lowerFooter.service.appointment",
				href: "https://service.berlin.de/terminvereinbarung/",
			},
			{
				label: "lowerFooter.service.phone",
				href: "https://service.berlin.de/buergertelefon/",
			},
			{
				label: "lowerFooter.service.emergency",
				href: "https://www.berlin.de/polizei/service/so-erreichen-sie-uns/artikel.532842.php",
			},
			{
				label: "lowerFooter.service.commercial",
				href: "https://www.berlin.de/ea/",
			},
		],
	},
	{
		title: "lowerFooter.authorities",
		links: [
			{
				label: "lowerFooter.authorities.az",
				href: "https://service.berlin.de/behoerden/",
			},
			{
				label: "lowerFooter.authorities.senat",
				href: "https://service.berlin.de/senatsverwaltungen/",
			},
			{
				label: "lowerFooter.authorities.districOffices",
				href: "https://service.berlin.de/bezirksaemter/",
			},
			{
				label: "lowerFooter.authorities.civilOffices",
				href: "https://service.berlin.de/standorte/buergeraemter/",
			},
			{
				label: "lowerFooter.authorities.jobcenter",
				href: "https://service.berlin.de/jobcenter/",
			},
			{
				label: "lowerFooter",
				href: "https://www.berlin.de/einwanderung/",
			},
		],
	},
	{
		title: "lowerFooter.politics",
		links: [
			{
				label: "lowerFooter.politics.government",
				href: "https://www.berlin.de/rbmskzl/regierende-buergermeisterin/senat/",
			},
			{
				label: "lowerFooter.politics.career",
				href: "https://www.berlin.de/karriereportal/",
			},
			{
				label: "lowerFooter.politics.participation",
				href: "https://mein.berlin.de/",
			},
			{
				label: "lowerFooter.politics.openData",
				href: "https://daten.berlin.de/",
			},
			{
				label: "lowerFooter.politics.allocation",
				href: "https://www.berlin.de/vergabeplattform/",
			},
			{
				label: "lowerFooter.politics.volunteering",
				href: "https://www.berlin.de/buergeraktiv/",
			},
		],
	},
	{
		title: "lowerFooter.news",
		links: [
			{
				label: "lowerFooter.news.program",
				href: "https://www.berlin.de/rbmskzl/politik/sofortprogramm/",
			},
			{
				label: "lowerFooter.news.ukraine",
				href: "https://www.berlin.de/ukraine/",
			},
			{
				label: "lowerFooter.news.energy",
				href: "https://www.berlin.de/energie/",
			},
			{
				label: "lowerFooter.news.press",
				href: "https://www.berlin.de/presse/",
			},
			{
				label: "lowerFooter.news.police",
				href: "https://www.berlin.de/polizei/polizeimeldungen/",
			},
			{
				label: "lowerFooter.news.events",
				href: "https://www.berlin.de/land/kalender/",
			},
		],
	},
	{
		title: "lowerFooter.topics",
		links: [
			{
				label: "lowerFooter.topics.digital",
				href: "https://gemeinsamdigital.berlin.de/",
			},
			{
				label: "lowerFooter.topics.propertyTax",
				href: "https://berlin.de/grundsteuer",
			},
			{
				label: "lowerFooter.topics.mobility",
				href: "https://www.berlin.de/sen/uvk/verkehr/mobilitaetswende/verkehr-888873.php",
			},
			{
				label: "lowerFooter.topics.administration",
				href: "https://www.berlin.de/moderne-verwaltung/",
			},
			{
				label: "lowerFooter.topics.wall",
				href: "https://www.berlin.de/mauer/",
			},
		],
	},
	{
		title: "lowerFooter.moreInfo",
		links: [
			{
				label: "lowerFooter.moreInfo.kultur",
				href: "https://www.berlin.de/kultur-und-tickets/",
			},
			{
				label: "lowerFooter.moreInfo.tourism",
				href: "https://www.berlin.de/tourismus/",
			},
			{
				label: "lowerFooter.moreInfo.economy",
				href: "https://www.berlin.de/wirtschaft/",
			},
			{
				label: "lowerFooter.moreInfo.cityLife",
				href: "https://www.berlin.de/special/",
			},
			{
				label: "lowerFooter.moreInfo.finder",
				href: "https://www.berlin.de/adressen/",
			},
			{
				label: "lowerFooter.moreInfo.map",
				href: "https://www.berlin.de/stadtplan/",
			},
		],
	},
];

export function Footer() {
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<footer>
			<div className="flex items-start justify-between w-full bg-berlin-grey-light desktop:p-6">
				<div className="flex flex-col desktop:flex-row w-full desktop:gap-x-10 desktop:pl-28">
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
					{i18n["lowerFooter.note"]}
				</div>
			</div>
		</footer>
	);
}
