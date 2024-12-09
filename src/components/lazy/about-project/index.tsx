import { useLanguage } from "../../../hooks/use-language";
import { useI18n } from "../../../i18n/use-i18n";
import { LocalizedTrackedAnchorLink } from "../../anchor-link/localized-tracked-anchor-link";
import { LogoBar } from "../../logo-bar/logo-bar";

export default function AboutProject() {
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<div className="max-w-[980px] mx-auto pt-[3rem] pb-24 px-4">
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

			<LogoBar />
		</div>
	);
}
