import { useLanguage } from "../../hooks/use-language.tsx";
import { useI18n } from "../../i18n/use-i18n.tsx";
import { ArrowUpIcon } from "../icons/arrow-up-icon.tsx";

export function ScrollToTopButton() {
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<button
			className="flex gap-x-2 p-2 w-48"
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
		>
			{i18n["toTheTop"]} <ArrowUpIcon className="bg-berlin-green" />
		</button>
	);
}
