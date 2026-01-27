import React from "react";
import { useLanguage } from "~/hooks/use-language";
import Markdown from "react-markdown";
import { useI18n } from "~/i18n/use-i18n";

export default function PrivacyNote() {
	const language = useLanguage();
	const i18n = useI18n(language);

	const anchorLink = (
		props: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
			href?: string;
		},
	) => {
		const { href, children } = props;
		const isExternal = href?.startsWith("http");
		return (
			<a
				className={`
                  hover:cursor-pointer hover:underline text-[#0047D3]
                  focus-visible:outline focus-visible:outline-3 
                  focus-visible:outline-berlin-blue 
                  focus-visible:outline-offset-0 
                  focus-visible:shadow-default-button-focus-shadow
                `}
				href={href}
				target={isExternal ? "_blank" : undefined}
				rel={isExternal ? "noopener noreferrer" : undefined}
			>
				{children}
			</a>
		);
	};

	if (language === "en") {
		return (
			<div className="max-w-[980px] flex flex-col mx-auto px-4 lg:px-0">
				<h1 className="text-2xl font-bold w-full flex flex-row my-8">
					Data Privacy
				</h1>
				<p className="mb-8">
					Please refer to the{" "}
					{anchorLink({ href: "/privacy-note/", children: "German version" })}.
				</p>
			</div>
		);
	}

	return (
		<div className="max-w-[980px] flex flex-col mx-auto px-4 lg:px-0 pb-8">
			<Markdown
				className={"markdown-container"}
				components={{
					a: anchorLink,
				}}
			>
				{i18n["privacy-note"]}
			</Markdown>
		</div>
	);
}
