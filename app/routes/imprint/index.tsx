import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";
import Markdown from "react-markdown";

export default function Index() {
	const language = useLanguage();
	const i18n = useI18n(language);
	return (
		<div className="max-w-[980px] flex flex-col mx-auto px-4 lg:px-0">
			<Markdown className={"markdown-container"}>{i18n["imprint"]}</Markdown>
		</div>
	);
}
