import SearchBar from "../search-bar/search-bar";
import FreeOffersCheckbox from "../checkbox/free-offers-checkbox";
import { categoryMap } from "../../content/categories";
import { CategoryHeroCard } from "../categories/category-hero-card";
import ShowAllButton from "../buttons/show-all-button";
import { InfoBox } from "../info-box/info-box";
import { useI18n } from "../../i18n/use-i18n";
import { useLanguage } from "../../hooks/use-language";
import { FeedbackForm } from "../feedback-form/feedback-form";
import { TrackedAnchorLink } from "../anchor-link/tracked-anchor-link";
import LinkIcon from "../icons/link-icon";

export default function LazyHome() {
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<>
			<div className="max-w-[800px] flex flex-col mx-auto">
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

				<div className="w-full border-b border-separator mb-12 "></div>

				<div className="w-full grid grid-cols-1 grid-rows-4 gap-x-8 gap-y-8 md:grid-cols-2 md:grid-rows-2 px-4 lg:px-0 lg:gap-x-16">
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
				<div className="w-full border-b border-separator mb-12 mt-12"></div>
				<div className="w-full flex flex-row justify-end px-4 lg:px-0 mb-12">
					<ShowAllButton />
				</div>

				<InfoBox showProviderHint={true} maxWidth="max-w-[800px]"></InfoBox>
				<FeedbackForm />
			</div>
		</>
	);
}
