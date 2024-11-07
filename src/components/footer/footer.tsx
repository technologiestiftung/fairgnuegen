import { HandsIcon } from "../icons/hands-icon";
import { EasyLanguageIcon } from "../icons/easy-language-icon";
import { SquareArrowIcon } from "../icons/square-arrow-icon";
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
				href: "/accessibility-statement/",
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

export function Footer() {
	return (
		<div>
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

			<div
				suppressHydrationWarning={true}
				dangerouslySetInnerHTML={{ __html: "<!-- placeholder footer -->" }}
			></div>
		</div>
	);
}
