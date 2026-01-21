import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";
import { ArrowUpIcon } from "~/components/icons/arrow-up-icon.tsx";

export function ScrollToTopButton() {
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<button
			className={`
				flex gap-x-2 p-2 w-48
				focus-visible:outline focus-visible:outline-3 
				focus-visible:outline-berlin-blue 
				focus-visible:outline-offset-0 
				focus-visible:shadow-default-button-focus-shadow
			`}
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
		>
			{i18n["toTheTop"]} <ArrowUpIcon className="bg-berlin-green" />
		</button>
	);
}
