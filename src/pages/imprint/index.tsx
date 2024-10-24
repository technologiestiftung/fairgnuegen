import { Suspense } from "react";
import { Layout } from "../../layout/layout";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";

export default function Imprint() {
	const language = useLanguage();
	const i18n = useI18n(language);
	return (
		<Layout>
			<Suspense fallback={<div className="w-svw h-svh" />}>
				<div className="max-w-4xl flex flex-col mx-auto px-4 lg:px-0">
					<h1 className="text-2xl font-bold w-full flex flex-row my-8">
						{i18n["imprint.title"]}
					</h1>
					<h2 className="text-xl font-bold w-full flex flex-row mb-4">
						{i18n["imprint.foundation.title"]}
					</h2>
					<div className="text-lg w-full flex flex-col mb-8">
						{i18n["imprint.foundation.address"].split("\n").map((line) => (
							<p>{line}</p>
						))}
					</div>
					<div className="text-lg w-full flex flex-col mb-8">
						{i18n["imprint.foundation.content"]}
					</div>
					<h2 className="text-xl font-bold w-full flex flex-row mb-4">
						{i18n["imprint.foundation.head.title"]}
					</h2>
					<div className="text-lg w-full flex flex-col mb-8">
						{i18n["imprint.foundation.head.content"]}
					</div>
					<h2 className="text-xl font-bold w-full flex flex-row mb-4">
						{i18n["imprint.disclaimer.title"]}
					</h2>
					<div className="text-lg w-full flex flex-col mb-8">
						{i18n["imprint.disclaimer.content"].split("\n").map((line) => (
							<p className="mb-4">{line}</p>
						))}
					</div>
				</div>
			</Suspense>
		</Layout>
	);
}
