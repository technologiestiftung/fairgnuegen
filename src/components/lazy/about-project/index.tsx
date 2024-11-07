import { useLanguage } from "../../../hooks/use-language";
import { useI18n } from "../../../i18n/use-i18n";
import { LocalizedTrackedAnchorLink } from "../../anchor-link/localized-tracked-anchor-link";

export default function AboutProject() {
	const language = useLanguage();
	const i18n = useI18n(language);

	const logos = [
		{
			src: i18n["aboutProject.logos.tsb.src"],
			label: i18n["aboutProject.logos.tsb.label"],
			alt: i18n["aboutProject.logos.tsb.alt"],
		},
		{
			src: i18n["aboutProject.logos.citylab.src"],
			label: i18n["aboutProject.logos.citylab.label"],
			alt: i18n["aboutProject.logos.citylab.alt"],
		},
		{
			src: i18n["aboutProject.logos.senatskanzlei.src"],
			label: i18n["aboutProject.logos.senatskanzlei.label"],
			alt: i18n["aboutProject.logos.senatskanzlei.alt"],
		},
		{
			src: i18n["aboutProject.logos.senasgiva.src"],
			label: i18n["aboutProject.logos.senasgiva.label"],
			alt: i18n["aboutProject.logos.senasgiva.alt"],
		},
	];

	return (
		<div className="max-w-[800px] mx-auto pt-[3rem] pb-24 px-4">
			<h1 className="text-[27px] leading-[31px] font-bold mb-[1.3rem]">
				{i18n["aboutProject.title"]}
			</h1>
			<p className="mb-[1rem]">{i18n["aboutProject.p1"]}</p>
			<p className="mb-[1rem]">
				{i18n["aboutProject.p2.part.1"]}
				<LocalizedTrackedAnchorLink
					href={"/map/"}
					className="text-link-blue hover:underline"
				>
					{i18n["aboutProject.p2.part.mapLinkLabel"]}
				</LocalizedTrackedAnchorLink>
				{i18n["aboutProject.p2.part.2"]}
			</p>
			<p className="mb-[1rem]">{i18n["aboutProject.p3"]}</p>
			<p className="mb-[1rem]">{i18n["aboutProject.p4"]}</p>

			<div className="flex flex-wrap gap-y-4 md:flex-row mt-[4rem] gap-x-10">
				{logos.map(({ src, label, alt }) => (
					<div key={src} className="flex flex-col">
						<p className="text-left pb-5">{label}</p>
						<img
							src={`${src}`}
							alt={alt}
							width={150}
							className="w-[150px] h-auto"
						/>
					</div>
				))}
			</div>
		</div>
	);
}
