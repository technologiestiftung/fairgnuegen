import { HandsIcon } from "../icons/hands-icon";
import { EasyLanguageIcon } from "../icons/easy-language-icon";
import { SquareArrowIcon } from "../icons/square-arrow-icon";
import { ScrollToTopButton } from "../buttons/scroll-to-top-button";
import { FooterLightColumn } from "./footer-light-column";

const upperFooterColumns = [
	{
		title: "upperFooter.info",
		links: [
			{
				label: "upperFooter.info.impressum",
				icon: "",
				href: "/impressum",
			},
			{
				label: "upperFooter.info.contact",
				icon: "",
				href: "/kontakt",
			},
			{
				label: "upperFooter.info.dataprivacy",
				icon: "",
				href: "/datenschutz",
			},
			{
				label: "upperFooter.info.accessibility",
				icon: "",
				href: "/erklärung",
			},
			{
				label: "upperFooter.info.accessibility",
				icon: <HandsIcon />,
				href: "/dgs",
			},
			{
				label: "upperFooter.info.easyLanguage",
				icon: <EasyLanguageIcon />,
				href: "/leichte-sprache",
			},
		],
	},
	{
		title: "upperFooter.socialMedia",
		links: [
			{
				label: "upperFooter.socialMedia.instagram",
				icon: <SquareArrowIcon />,
				href: "/instagram",
			},
			{
				label: "upperFooter.socialMedia.linkedin",
				icon: <SquareArrowIcon />,
				href: "/linkedin",
			},
		],
	},
];

export function Footer() {
	return (
		<div>
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

			<div
				suppressHydrationWarning={true}
				dangerouslySetInnerHTML={{ __html: "<!-- placeholder footer -->" }}
			></div>
		</div>
	);
}
