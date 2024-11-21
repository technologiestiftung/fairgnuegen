import SearchBar from "../search-bar/search-bar";
import FreeOffersCheckbox from "../checkbox/free-offers-checkbox";
import { categoryMap } from "../../content/categories";
import { CategoryHeroCard } from "../categories/category-hero-card";
import { InfoBox } from "../info-box/info-box";
import { useI18n } from "../../i18n/use-i18n";
import { useLanguage } from "../../hooks/use-language";
import { FeedbackForm } from "../feedback-form/feedback-form";
import { TrackedAnchorLink } from "../anchor-link/tracked-anchor-link";
import LinkIcon from "../icons/link-icon";
import { LogoBar } from "../logo-bar/logo-bar";
import { ShowAllOffersTeaser } from "../sbow-all-offers-teaser/show-all-offers-teaser";

export default function LazyHome() {
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<>
			{/* upper section - intro, search, category cards */}
			<div className="max-w-[980px] flex flex-col mx-auto mb-16">
				{/* intro and search section */}
				<div className="px-4 lg:px-0">
					<h1 className="text-[27px] font-bold w-full flex flex-row justify-center my-7 text-center">
						{i18n["home.h1"]}
					</h1>

					<p className="mb-7">
						{i18n["home.p1"]}{" "}
						<TrackedAnchorLink
							href={
								"https://www.berlin.de/sen/soziales/soziale-sicherung/bn-berlin-ticket-s/bn-berlin-ticket-s-faq-1268079.php"
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
						<SearchBar />
						<FreeOffersCheckbox />
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
