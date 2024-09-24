import { useFreeOffersOnly } from "../../hooks/use-free-offers-only";
import { TrackedAnchorLink } from "../anchor-link/tracked-anchor-link.tsx";
import { Breadcrumbs } from "./breadcumbs";
import { LanguageSelect } from "./language-select";
import { SidebarButtons } from "./sidebar-buttons/sidebar-buttons";

export function Header() {
	const { isShowingFreeOffersOnly } = useFreeOffersOnly();

	const navLinks = [
		{
			href: "/",
			label: "Startseite",
		},
		{
			href: `/map/?free=${isShowingFreeOffersOnly ? "true" : "false"}`,
			label: "Kartenansicht",
		},
		{
			href: "/favorites/",
			label: "Favoriten",
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
				<a
					href="/"
					className="hidden desktop:flex flex-col justify-center px-7 h-24"
				>
					<span className="font-bold">
						Fairgnügen • Berlin fair und günstig erleben
					</span>
				</a>

				<a
					href="/"
					className="flex desktop:hidden flex-col justify-center px-7 h-24"
				>
					<span className="font-bold text-2xl">Fairgnügen</span>
					<span className="text-sm">Berlin fair und günstig erleben</span>
				</a>

				<div className="flex items-center gap-x-[30px]">
					<nav className="hidden desktop:block">
						<ul className="flex justify-center gap-x-[30px]">
							{navLinks.map((link) => (
								<li key={link.href}>
									<TrackedAnchorLink
										href={link.href}
										className="hover:underline"
										additionalTrackingContext="(header nav link)"
									>
										{link.label}
									</TrackedAnchorLink>
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
