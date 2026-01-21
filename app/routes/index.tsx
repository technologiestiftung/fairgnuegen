import { useLanguage } from "~/hooks/use-language";
import { useI18n } from "~/i18n/use-i18n.tsx";
import { TrackedAnchorLink } from "~/components/anchor-link/tracked-anchor-link.tsx";
import LinkIcon from "~/components/icons/link-icon.tsx";
import SearchBar from "~/components/search-bar/search-bar.tsx";
import FreeOffersCheckbox from "~/components/checkbox/free-offers-checkbox.tsx";
import { categoryMap } from "~/content/categories.ts";
import { CategoryHeroCard } from "~/components/categories/category-hero-card.tsx";
import { ShowAllOffersTeaser } from "~/components/show-all-offers-teaser/show-all-offers-teaser.tsx";
import { FeedbackForm } from "~/components/feedback-form/feedback-form.tsx";
import { InfoBox } from "~/components/info-box/info-box.tsx";
import { LogoBar } from "~/components/logo-bar/logo-bar.tsx";

export default function Index() {
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<>
			{/* upper section - intro, search, category cards */}
			<div className="max-w-[980px] flex flex-col mx-auto">
				{/* intro and search section */}
				<div className="px-4 lg:px-0">
					<h1 className="text-[27px] font-bold w-full flex flex-row justify-center my-7 text-center">
						{i18n["home.h1"]}
					</h1>

					<p className="mb-7">
						{i18n["home.p1"]}{" "}
						<TrackedAnchorLink
							href={
								"https://www.berlin.de/sen/soziales/soziale-sicherung/bn-berlin-ticket-s/angebote-faq-1524266.php"
							}
							className=""
							target="_blank"
							rel="noreferrer"
						>
							<span className="inline-flex gap-1 items-center text-link-blue hover:underline">
								{i18n["home.linkEligible"]}
								<LinkIcon />
							</span>
						</TrackedAnchorLink>
					</p>

					<h2 className="text-[22px] font-bold w-full flex flex-row justify-left mb-5">
						{i18n["home.h2"]}
					</h2>

					<div className="flex flex-col gap-3 mb-5">
						<SearchBar postSubmit={() => {}} />
						<FreeOffersCheckbox id={"free-only"} />
					</div>
				</div>

				{/* category cards */}
				<h2 className="text-[22px] font-bold mb-4 mt-7 px-4 lg:px-0">
					{i18n["categories.teaser"]}
				</h2>
				<div className="w-full mb-12 flex flex-wrap md:flex-nowrap justify-between gap-y-16 sm:gap-x-3 md:gap-x-4 lg:gap-x-5 sm:px-4 lg:px-0">
					{Object.entries(categoryMap)
						.filter(([, category]) => category.isRenderedInCategoryCards)
						.map(([key, category]) => (
							<CategoryHeroCard
								key={key}
								identifier={key}
								category={category}
							/>
						))}
				</div>
			</div>

			{/* all offers teaser */}
			<div className="w-full py-4 md:py-0">
				<div className="max-w-[980px] flex flex-col mx-auto">
					<ShowAllOffersTeaser />
				</div>
			</div>

			{/* lower section - feedback form, info box, logo bar */}
			<div className="max-w-[980px] flex flex-col mx-auto">
				<FeedbackForm />
				<InfoBox maxWidth="max-w-[980px]"></InfoBox>
				<LogoBar />
			</div>
		</>
	);
}
