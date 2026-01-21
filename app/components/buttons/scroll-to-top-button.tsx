import { useLanguage } from "~/hooks/use-language";
import { useI18n } from "~/i18n/use-i18n";
import { ArrowUpIcon } from "~/components/icons/arrow-up-icon";
import { Button } from "~/components/buttons/button";

export function ScrollToTopButton() {
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<Button
			className="flex gap-x-2 p-2 w-48"
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
		>
			{i18n["toTheTop"]} <ArrowUpIcon className="bg-berlin-green" />
		</Button>
	);
}
