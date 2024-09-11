import { Breadcrumbs } from "./breadcumbs";
import { LanguageSelect } from "./language-select";
import { SidebarButtons } from "./sidebar-buttons/sidebar-buttons";

export function Header() {
	const navLinks = [
		{
			href: "/",
			label: "Startseite",
		},
		{
			href: "/map/",
			label: "Kartenansicht",
		},
		{
			href: "/favorites/",
			label: "Favoriten",
		},
	];

	return (
		<header className="sticky top-0 z-[20] bg-white text-xl leading-[122.2%] tracking-[0.3px]">
			<div className="py-1.5 px-7 border-b">
				<a href="https://www.berlin.de">
					<img
						title="Zur Startseite"
						src="/images/logo_berlin_m_srgb.svg"
						alt="Link zu www.berlin.de"
					/>
				</a>
			</div>

			<div className="flex justify-between items-center">
				<a
					href="/"
					className="hidden desktop:flex flex-col justify-center px-7 h-24"
				>
					<span className="font-bold">
						Fairgnügen • Berlin fair und günstig erleben*
					</span>
					<span>*Angebote sind nur mit dem Berechtigungsnachweis nutzbar.</span>
				</a>

				<a
					href="/"
					className="flex desktop:hidden flex-col justify-center px-7 h-24"
				>
					<span className="font-bold text-2xl">Fairgnügen</span>
					<span className="text-sm">Berlin fair und günstig erleben.*</span>
				</a>

				<div className="flex items-center gap-x-[30px]">
					<nav className="hidden desktop:block">
						<ul className="flex justify-center gap-x-[30px]">
							{navLinks.map((link) => (
								<li key={link.href}>
									<a href={link.href} className="hover:underline">
										{link.label}
									</a>
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
