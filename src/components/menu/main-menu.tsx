import React, { useState } from "react";
import { categoryMap } from "../../content/categories";
import { DrawerRight } from "../drawer/drawer-right";
import { ChevronDown } from "../icons/chevron-down";
import { ChevronUp } from "../icons/chevron-up";
import CloseIcon from "../icons/close-icon";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";
import { LocalizedTrackedAnchorLink } from "../anchor-link/localized-tracked-anchor-link";
import LinkIcon from "../icons/link-icon";
import { useLocation } from "react-router-dom";

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
	const location = useLocation();
	const i18n = useI18n(language);

	const links: MenuItem[] = [
		{
			title: i18n["menuItem.homepage"],
			subItems: Object.entries(categoryMap)
				.filter(([key]) => key !== "all")
				.map(([key, category]) => ({
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
			link: "/about-project/",
		},
	];

	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const currentLocation = `${location.pathname}${location.search}`;

	return (
		<DrawerRight isOpen={isOpen} close={close}>
			<nav className="flex flex-col text-base ">
				<div className="flex flex-row items-center justify-between px-3 pt-[0.95rem] pb-[1.5rem] lg:px-6 lg:pt-[1.45rem] lg:pb-[2.5rem]">
					<p className="text-[1.375rem] leading-[1.182rem] font-bold">
						{i18n["sidebar.menu"]}
					</p>
					<button onClick={close} className="pr-4">
						<CloseIcon />
					</button>
				</div>
				{links.map((link) => (
					<React.Fragment key={link.link}>
						{link.isExternalLink && (
							<a
								href={link.link}
								className="flex items-center gap-x-1 text-link-blue hover:underline py-[1rem] lg:py-[1.175rem] px-3 lg:px-6 border-b"
								target="_blank"
								rel="noreferrer"
							>
								{link.title}
								<LinkIcon />
							</a>
						)}

						{!link.isExternalLink && link.subItems.length === 0 && (
							<LocalizedTrackedAnchorLink
								href={link.link}
								additionalTrackingContext={"(drawer menu)"}
								className="py-[1rem] lg:py-[1.175rem] px-3 lg:px-6 border-b hover:underline"
							>
								{link.title}
							</LocalizedTrackedAnchorLink>
						)}

						{!link.isExternalLink && link.subItems.length > 0 && (
							<>
								<div
									className={`hover:cursor-pointer py-[0.8rem] lg:py-[1rem] border-b border-t hover:underline`}
								>
									<div className="w-full flex flex-row justify-between items-center">
										<a
											href={link.link}
											className={`${currentLocation === link.link && "font-bold"} w-full px-3 lg:px-7`}
										>
											{link.title}
										</a>
										<button
											className="border-l border-l-black py-2 pr-5 pl-4"
											onClick={() => {
												if (selectedCategory === link.title) {
													setSelectedCategory(null);
												} else {
													setSelectedCategory(link.title);
												}
											}}
										>
											{selectedCategory === link.title ? (
												<ChevronUp className="size-[0.9rem]" />
											) : (
												<ChevronDown className="size-[0.9rem]" />
											)}
										</button>
									</div>
								</div>

								{selectedCategory === link.title && (
									<ul className="flex flex-col border-b">
										{link.subItems.map((subItem, index) => {
											const isLast = index === link.subItems.length - 1;
											const isCurrentLocation =
												currentLocation === subItem.link;
											return (
												<li
													key={subItem.title}
													className="flex flex-col w-full"
												>
													<LocalizedTrackedAnchorLink
														key={subItem.link}
														href={subItem.link}
														additionalTrackingContext={"(drawer menu)"}
														className={`
														pl-8 lg:pl-11 py-4 lg:py-[1.19rem] bg-berlin-grey-light hover:underline 
														${!isLast && "border-b"} 
														${isCurrentLocation && "font-bold"}`}
													>
														{subItem.title}
													</LocalizedTrackedAnchorLink>
												</li>
											);
										})}
									</ul>
								)}
							</>
						)}
					</React.Fragment>
				))}
			</nav>
		</DrawerRight>
	);
};

export default MainMenu;
