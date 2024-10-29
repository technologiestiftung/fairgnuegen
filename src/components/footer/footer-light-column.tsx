import { Collapsible } from "../collapsible/collapsible";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";
import { LocalizedTrackedAnchorLink } from "../anchor-link/localized-tracked-anchor-link";

type FooterColumnProps = {
	title: string;
	links: {
		label: string;
		href: string;
	}[];
};

export function FooterLightColumn({ title, links }: FooterColumnProps) {
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<>
			{/* Mobile */}
			<div className="flex flex-col desktop:hidden">
				<Collapsible title={i18n[title]}>
					<ul className="flex flex-col">
						{links.map((link) => (
							<li key={link.href}>
								<LocalizedTrackedAnchorLink
									href={link.href}
									additionalTrackingContext={"(footer)"}
									className={`flex hover:underline pl-7 gap-x-1.5 py-4 ${title === "upperFooter.socialMedia" ? "flex-row" : "flex-row-reverse  justify-end"}`}
								>
									{i18n[link.label]}
								</LocalizedTrackedAnchorLink>
							</li>
						))}
					</ul>
				</Collapsible>
			</div>

			{/* Desktop */}
			<div>
				<div className="hidden desktop:flex flex-col gap-3.5">
					<div className="font-bold flex justify-between items-center">
						<span className="text-lg">{i18n[title]}</span>
					</div>
					<ul className="flex flex-col gap-3.5 bg-inherit">
						{links.map((link) => (
							<li key={link.href}>
								<LocalizedTrackedAnchorLink
									href={link.href}
									additionalTrackingContext={"(footer)"}
									className={`flex  hover:underline gap-1.5 ${title === "upperFooter.socialMedia" ? "flex-row" : "flex-row-reverse justify-end"}`}
								>
									{i18n[link.label]}
								</LocalizedTrackedAnchorLink>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
