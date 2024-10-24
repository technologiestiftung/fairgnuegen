import React, { useState } from "react";
import { categoryMap } from "../../content/categories";
import { DrawerRight } from "../drawer/drawer-right";
import { ChevronDown } from "../icons/chevron-down";
import { ChevronUp } from "../icons/chevron-up";
import CloseIcon from "../icons/close-icon";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";
import { LocalizedTrackedAnchorLink } from "../anchor-link/localized-tracked-anchor-link";

interface MainMenuProps {
	isOpen: boolean;
	close: () => void;
}

interface MenuItem {
	title: string;
	subItems: MenuItem[];
	isExternalLink: boolean;
	link: string;
}

const MainMenu: React.FC<MainMenuProps> = ({ isOpen, close }) => {
	const language = useLanguage();
	const i18n = useI18n(language);

	const links: MenuItem[] = [
		{
			title: i18n["menuItem.homepage"],
			subItems: Object.entries(categoryMap).map(([key, category]) => ({
				title: i18n[`${category.i18nKey}.name`],
				subItems: [],
				isExternalLink: false,
				link: category.isRenderedInCategoryCards
					? `/all-offers/?category=${key}`
					: "/all-offers/",
			})),
			isExternalLink: false,
			link: "/",
		},
		{
			title: i18n["menuItem.map"],
			subItems: [],
			isExternalLink: false,
			link: "/map/",
		},
		{
			title: i18n["menuItem.favorites"],
			subItems: [],
			isExternalLink: false,
			link: "/favorites/",
		},
		{
			title: i18n["menuItem.faq"],
			subItems: [],
			isExternalLink: true,
			link: "https://www.berlin.de/sen/soziales/soziale-sicherung/bn-berlin-ticket-s/bn-berlin-ticket-s-faq-1268079.php",
		},
		{
			title: i18n["menuItem.about"],
			subItems: [],
			isExternalLink: false,
			link: "/about/",
		},
	];

	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	return (
		<DrawerRight isOpen={isOpen} close={() => close()}>
			<div className="flex flex-col text-base ">
				<div className="flex flex-row items-center justify-between mb-6 mt-4 px-6 py-4">
					<p className="text-2xl font-bold">{i18n["sidebar.menu"]}</p>
					<button onClick={() => close()}>
						<CloseIcon></CloseIcon>
					</button>
				</div>
				{links.map((link) => (
					<React.Fragment key={link.link}>
						{link.isExternalLink && (
							<a
								href={link.link}
								className="text-link-blue hover:underline py-4 px-6 border-b"
								target="_blank"
								rel="noreferrer"
							>
								{link.title}
							</a>
						)}

						{!link.isExternalLink && link.subItems.length === 0 && (
							<LocalizedTrackedAnchorLink
								href={link.link}
								additionalTrackingContext={"(drawer menu)"}
								className="hover:bg-berlin-grey-light py-4 px-6 border-b"
							>
								{link.title}
							</LocalizedTrackedAnchorLink>
						)}

						{!link.isExternalLink && link.subItems.length > 0 && (
							<>
								<div
									className={`hover:bg-berlin-grey-light hover:cursor-pointer py-4 px-6 border-b`}
								>
									<div
										className="flex flex-row justify-between items-center"
										onClick={() => {
											if (selectedCategory === link.title) {
												setSelectedCategory(null);
											} else {
												setSelectedCategory(link.title);
											}
										}}
									>
										<div>{link.title}</div>
										{selectedCategory === link.title ? (
											<ChevronUp></ChevronUp>
										) : (
											<ChevronDown></ChevronDown>
										)}
									</div>
								</div>

								{selectedCategory === link.title && (
									<div className="flex flex-col">
										{link.subItems.map((subItem) => (
											<LocalizedTrackedAnchorLink
												key={subItem.link}
												href={subItem.link}
												additionalTrackingContext={"(drawer menu)"}
												className="px-12 py-4 bg-berlin-grey-light hover:bg-berlin-grey-medium"
											>
												{subItem.title}
											</LocalizedTrackedAnchorLink>
										))}
									</div>
								)}
							</>
						)}
					</React.Fragment>
				))}
			</div>
		</DrawerRight>
	);
};

export default MainMenu;
