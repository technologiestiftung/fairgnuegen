import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";
import { LocalizedTrackedAnchorLink } from "~/components/anchor-link/localized-tracked-anchor-link.tsx";
import { TrackedAnchorLink } from "~/components/anchor-link/tracked-anchor-link.tsx";
import { LogoBar } from "~/components/logo-bar/logo-bar.tsx";

export default function Index() {
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
			<p className="mb-[1rem]">
				{i18n["aboutProject.p3.part.1"]}
				<TrackedAnchorLink
					href={i18n["aboutProject.p3.dataPortalLink"]}
					className="text-link-blue hover:underline"
					target="_blank"
				>
					{i18n["aboutProject.p3.dataPortalLinkLabel"]}
				</TrackedAnchorLink>
				{i18n["aboutProject.p3.part.2"]}
				<TrackedAnchorLink
					href={i18n["aboutProject.p3.githubLink"]}
					className="text-link-blue hover:underline"
					target="_blank"
				>
					{i18n["aboutProject.p3.githubLinkLabel"]}
				</TrackedAnchorLink>
				{i18n["aboutProject.p3.part.3"]}
			</p>
			<p className="mb-[1rem]">{i18n["aboutProject.p4"]}</p>
			<p className="mb-[1rem]">{i18n["aboutProject.p5"]}</p>

			<LogoBar />
		</div>
	);
}
