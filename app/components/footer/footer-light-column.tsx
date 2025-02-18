import { Collapsible } from "~/components/collapsible/collapsible.tsx";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";
import { LocalizedTrackedAnchorLink } from "~/components/anchor-link/localized-tracked-anchor-link.tsx";

type FooterColumnProps = {
	title: string;
	links: {
		label: string;
		href: string;
	}[];
	openByDefault?: boolean;
};

export function FooterLightColumn({
	title,
	links,
	openByDefault = false,
}: FooterColumnProps) {
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<>
			{/* Mobile */}
			<div className="flex flex-col desktop:hidden">
				<Collapsible
					title={i18n[title]}
					isDefaultOpen={openByDefault}
					titleClassNames="text-lg"
				>
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
			<div className="hidden desktop:flex flex-col gap-3.5 min-w-[12svw] ml-[3svw]">
				<div className="font-bold flex justify-between items-center">
					<span>{i18n[title]}</span>
				</div>
				<ul className="flex flex-col gap-2.5 bg-inherit">
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
		</>
	);
}
