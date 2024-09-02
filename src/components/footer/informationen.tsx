import { HandsIcon } from "../icons/hands-icon";
import { EasyLanguageIcon } from "../icons/easy-language-icon";

export function Informationen() {
	const links = [
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
	];

	return (
		<div className="flex flex-col gap-3.5">
			<span className="font-bold">Information</span>
			<ul className="flex flex-col gap-3.5">
				{links.map((link) => (
					<li key={link.href}>
						<a href={link.href} className="flex gap-1.5 hover:underline">
							{link.label}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
