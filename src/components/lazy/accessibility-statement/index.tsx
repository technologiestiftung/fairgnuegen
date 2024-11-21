import Markdown from "react-markdown";
import { useLanguage } from "../../../hooks/use-language";
import { useI18n } from "../../../i18n/use-i18n";

export default function AccessibilityStatement() {
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<div className="max-w-[980px] mx-auto pt-[3rem] pb-24 px-4 scroll-smooth">
			<h1 className="text-[27px] leading-[31px] font-bold mb-[1.3rem]">
				{i18n["accessibilityStatement.title"]}
			</h1>

			<Markdown className={"markdown-container"}>
				{i18n["accessibility-statement"]}
			</Markdown>

			<div id="accessibility-contact">
				<Markdown className={"markdown-container"}>
					{i18n["accessibility-statement.contact"]}
				</Markdown>
			</div>
		</div>
	);
}
