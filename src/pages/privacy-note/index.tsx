import { Suspense } from "react";
import { useLanguage } from "../../hooks/use-language";
import { Layout } from "../../layout/layout";
import Markdown from "react-markdown";
import { useI18n } from "../../i18n/use-i18n";

export default function PrivacyNote() {
	const language = useLanguage();
	const i18n = useI18n(language);

	const styledLink = (link: string, text: string) => (
		<a
			href={link}
			className="hover:cursor-pointer hover:underline text-[#0047D3]"
		>
			{text}
		</a>
	);

	if (language === "en") {
		return (
			<Layout>
				<Suspense fallback={<div className="w-svw h-svh" />}>
					<div className="max-w-[980px] flex flex-col mx-auto px-4 lg:px-0">
						<h1 className="text-2xl font-bold w-full flex flex-row my-8">
							Data Privacy
						</h1>
						<p className="mb-8">
							Please refer to the{" "}
							{styledLink("/privacy-note/", "German version")}.
						</p>
					</div>
				</Suspense>
			</Layout>
		);
	}

	return (
		<Layout>
			<Suspense fallback={<div className="w-svw h-svh" />}>
				<div className="max-w-[980px] flex flex-col mx-auto px-4 lg:px-0 pb-8">
					<Markdown className={"markdown-container"}>
						{i18n["privacy-note"]}
					</Markdown>
				</div>
			</Suspense>
		</Layout>
	);
}
