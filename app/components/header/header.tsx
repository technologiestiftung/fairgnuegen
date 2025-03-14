import { Breadcrumbs } from "~/components/header/breadcumbs";
import { LanguageSelect } from "~/components/header/language-select/language-select.tsx";
import { SidebarButtons } from "~/components/header/sidebar-buttons/sidebar-buttons.tsx";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";
import { LocalizedTrackedAnchorLink } from "~/components/anchor-link/localized-tracked-anchor-link.tsx";

export function Header() {
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<header
			id="header"
			className={`sticky top-0 z-[20] bg-white text-xl leading-[122.2%] tracking-[0.3px]`}
		>
			<div className={`"h-11 border-b py-[0.25em] px-4`}>
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
					className="flex flex-col justify-center px-4 h-[86px] text-base sm:text-[20px]"
				>
					<span>{i18n["header.title"]}</span>
					<span className="font-bold">{i18n["header.caption"]}</span>
				</LocalizedTrackedAnchorLink>

				<div className="flex items-center gap-x-[30px]">
					<SidebarButtons />
				</div>
			</div>

			<div className="bg-berlin-grey-light shadow-inner px-4 lg:px-0">
				<div className="flex justify-between max-w-[980px] mx-auto">
					<Breadcrumbs />
					<LanguageSelect />
				</div>
			</div>
		</header>
	);
}
