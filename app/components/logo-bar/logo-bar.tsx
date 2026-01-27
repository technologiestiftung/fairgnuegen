import React from "react";
import { TrackedAnchorLink } from "~/components/anchor-link/tracked-anchor-link";
import { useLanguage } from "~/hooks/use-language";
import { useI18n } from "~/i18n/use-i18n";

export const LogoBar: React.FC = () => {
	const language = useLanguage();
	const i18n = useI18n(language);

	const logos = [
		{
			src: i18n["aboutProject.logos.citylab.src"],
			label: i18n["aboutProject.logos.citylab.label"],
			alt: i18n["aboutProject.logos.citylab.alt"],
			href: i18n["aboutProject.logos.citylab.href"],
		},
		{
			src: i18n["aboutProject.logos.tsb.src"],
			label: i18n["aboutProject.logos.tsb.label"],
			alt: i18n["aboutProject.logos.tsb.alt"],
			href: i18n["aboutProject.logos.tsb.href"],
		},
		{
			src: i18n["aboutProject.logos.senasgiva.src"],
			label: i18n["aboutProject.logos.senasgiva.label"],
			alt: i18n["aboutProject.logos.senasgiva.alt"],
			href: i18n["aboutProject.logos.senasgiva.href"],
		},
		{
			src: i18n["aboutProject.logos.senatskanzlei.src"],
			label: i18n["aboutProject.logos.senatskanzlei.label"],
			alt: i18n["aboutProject.logos.senatskanzlei.alt"],
			href: i18n["aboutProject.logos.senatskanzlei.href"],
		},
	];

	return (
		<div
			className={`w-full flex gap-y-10 md:gap-x-5 lg:gap-x-10 flex-col md:flex-row mt-10 mb-16  justify-start md:justify-between px-4 lg:px-0 items-start`}
		>
			{logos.map(({ src, label, alt, href }) => (
				<TrackedAnchorLink href={href} key={src} className="flex flex-col">
					<p className="text-left pb-5">{label}</p>
					<img
						src={`${src}`}
						alt={alt}
						className="min-w-[120px] max-w-[180px] max-h-[100px] min-h-[60px]"
					/>
				</TrackedAnchorLink>
			))}
		</div>
	);
};
