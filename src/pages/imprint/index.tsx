import { Suspense } from "react";
import { Layout } from "../../layout/layout";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";
import Markdown from "react-markdown";

export default function Imprint() {
	const language = useLanguage();
	const i18n = useI18n(language);
	return (
		<Layout>
			<Suspense fallback={<div className="w-svw h-svh" />}>
				<div className="max-w-[980px] flex flex-col mx-auto px-4 lg:px-0">
					<Markdown className={"markdown-container"}>
						{i18n["imprint"]}
					</Markdown>
				</div>
			</Suspense>
		</Layout>
	);
}
