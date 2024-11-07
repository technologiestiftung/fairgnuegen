import { useLanguage } from "../../../hooks/use-language";
import { useI18n } from "../../../i18n/use-i18n";
import { LocalizedTrackedAnchorLink } from "../../anchor-link/localized-tracked-anchor-link";

export default function AccessibilityStatement() {
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<div className="max-w-[800px] mx-auto pt-[3rem] pb-24 px-4">
			<h1 className="text-[27px] leading-[31px] font-bold mb-[1.3rem]">
				{i18n["accessibilityStatement.title"]}
			</h1>

			<div className="gap-4 flex flex-col">
				<p className="mb-4">
					{i18n["accessibilityStatement.intro.p1"]}
					<LocalizedTrackedAnchorLink
						href={"/"}
						className="text-link-blue hover:underline"
						additionalTrackingContext={"(link Barrierefreiheit)"}
					>
						{i18n["accessibilityStatement.intro.homeLink"]}
					</LocalizedTrackedAnchorLink>
					{i18n["accessibilityStatement.intro.p2"]}
					<LocalizedTrackedAnchorLink
						href={"/about-project/"}
						className="text-link-blue hover:underline"
						additionalTrackingContext={"(link About Project)"}
					>
						{i18n["accessibilityStatement.intro.aboutProjectLinkLabel"]}
					</LocalizedTrackedAnchorLink>

					{i18n["accessibilityStatement.intro.p3"]}
				</p>

				<div>
					<h2 className="text-xl font-bold w-full flex flex-row mb-4">
						{i18n["accessibilityStatement.howAccessible"]}
					</h2>
					<p className="mb-4">
						{i18n["accessibilityStatement.howAccessible.p1"]}
					</p>
				</div>

				<div>
					<h2 className="text-xl font-bold w-full flex flex-row mb-4">
						{i18n["accessibilityStatement.notAccessible"]}
					</h2>
					{i18n["accessibilityStatement.notAccessible.p1"]
						.split("\n")
						.map((line) => (
							<p className="mb-2">{line}</p>
						))}
					<p className="mb-4"></p>
				</div>

				<div>
					<h2 className="text-xl font-bold w-full flex flex-row mb-4">
						{i18n["accessibilityStatement.feedback"]}
					</h2>
					<p className="mb-4">{i18n["accessibilityStatement.feedback.p1"]}</p>
					<p className="mb-4">{i18n["accessibilityStatement.feedback.mail"]}</p>
				</div>

				<div>
					<h2 className="text-xl font-bold w-full flex flex-row mb-4">
						{i18n["accessibilityStatement.arbitration"]}
					</h2>
					{i18n["accessibilityStatement.arbitration.p1"]
						.split("\n")
						.map((line) => (
							<p className="mb-4">{line}</p>
						))}
					{i18n["accessibilityStatement.arbitration.p2"]
						.split("\n")
						.map((line) => (
							<p className="">{line}</p>
						))}
					<p className="my-4">
						{i18n["accessibilityStatement.arbitration.mail"]}
					</p>

					<a
						className="text-link-blue hover:underline"
						target="_blank"
						rel="noreferrer"
						href="https://www.behindertenbeauftragter.de/DE/SchlichtungsstelleBGG/Antrag/Online-Formular/schlichtung1_node.html"
					>
						{i18n["accessibilityStatement.arbitration.linkText"]}
					</a>

					<div className="mt-4">
						{i18n["accessibilityStatement.arbitration.p3"]
							.split("\n")
							.map((line) => (
								<p className="">{line}</p>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
