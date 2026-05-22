import { LocalizedTrackedAnchorLink } from "~/components/anchor-link/localized-tracked-anchor-link";
import { useLanguage } from "~/hooks/use-language";
import { useI18n } from "~/i18n/use-i18n";

export default function NotFound() {
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<main className="container mx-auto px-4 py-16">
			<div className="max-w-2xl mx-auto text-center">
				<h1 className="text-3xl font-bold mb-8">{i18n["404.h1"]}</h1>
				<h2 className="text-2xl font-bold mb-6 text-berlin-green">
					{i18n["404.h2"]}
				</h2>
				<p className="text-base mb-10 text-balance">{i18n["404.p"]}</p>
				<LocalizedTrackedAnchorLink
					href={"/"}
					className={`inline-block text-link-blue justify-center items-center w-fit h-[43px] hover:underline`}
				>
					{i18n["404.link.label"]}
				</LocalizedTrackedAnchorLink>
			</div>
		</main>
	);
}
