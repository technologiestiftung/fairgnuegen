import { Breadcrumbs } from "./breadcumbs";
import { LanguageSelect } from "./language-select/language-select";
import { SidebarButtons } from "./sidebar-buttons/sidebar-buttons";
import { useFreeOffersOnly } from "../../hooks/use-free-offers-only";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";
import { LocalizedTrackedAnchorLink } from "../anchor-link/localized-tracked-anchor-link";

export function Header() {
	const language = useLanguage();
	const i18n = useI18n(language);

	const { isShowingFreeOffersOnly } = useFreeOffersOnly();

	const navLinks = [
		{
			href: "/",
			label: i18n["menuItem.homepage"],
		},
		{
			href: `/map/?free=${isShowingFreeOffersOnly ? "true" : "false"}`,
			label: i18n["menuItem.map"],
		},
		{
			href: "/favorites/",
			label: i18n["menuItem.favorites"],
		},
	];

	return (
		<header
			id="header"
			className={`sticky top-0 z-[20] bg-white text-xl leading-[122.2%] tracking-[0.3px]`}
		>
			<div className={`"h-11 border-b py-[0.25em] px-6 `}>
				<div className={`opacity-1 motion-safe:transition-opacity`}>
					<a href="https://www.berlin.de">
						<img
							title="Zur Startseite"
							src="/images/logo_berlin_m_srgb.svg"
							alt="Link zu www.berlin.de"
							className="w-[100px]"
						/>
					</a>
				</div>
			</div>

			<div className="flex justify-between items-center">
				<LocalizedTrackedAnchorLink
					href="/"
					className="flex flex-col justify-center pl-7 pr-3 h-24 text-base sm:text-[20px]"
				>
					<span>{i18n["header.title"]}</span>
					<span className="font-bold">{i18n["header.caption"]}</span>
				</LocalizedTrackedAnchorLink>

				<div className="flex items-center gap-x-[30px]">
					<nav className="hidden desktop:block">
						<ul className="flex justify-center gap-x-[30px]">
							{navLinks.map((link) => (
								<li key={link.href}>
									<LocalizedTrackedAnchorLink
										href={link.href}
										className="hover:underline"
										additionalTrackingContext="(header nav link)"
									>
										{link.label}
									</LocalizedTrackedAnchorLink>
								</li>
							))}
						</ul>
					</nav>

					<SidebarButtons />
				</div>
			</div>

			<div className="flex justify-between bg-berlin-grey-light text-berlin-grey shadow-lg pl-7 pr-9">
				<Breadcrumbs />
				<LanguageSelect />
			</div>
		</header>
	);
}
