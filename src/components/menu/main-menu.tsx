import React, { useState } from "react";
import { categoryMap } from "../../content/categories";
import { Drawer } from "../drawer/drawer";
import { ChevronDown } from "../icons/chevron-down";
import { ChevronUp } from "../icons/chevron-up";
import CloseIcon from "../icons/close-icon";
import { TrackedAnchorLink } from "../anchor-link/tracked-anchor-link";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";

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
			title: i18n["menuItem.hompage"],
			subItems: Object.entries(categoryMap).map(([key, category]) => ({
				title: i18n[category.name],
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
			title: i18n["menuItem.senat"],
			subItems: [],
			isExternalLink: true,
			link: "https://www.berlin.de/sen/asgiva/",
		},
		{
			title: i18n["menuItem.press"],
			subItems: [],
			isExternalLink: true,
			link: "https://www.berlin.de/sen/asgiva/presse/",
		},
		{
			title: i18n["menuItem.contact"],
			subItems: [],
			isExternalLink: true,
			link: "https://www.berlin.de/sen/asgiva/ueber-uns/formular.541467.php",
		},
		{
			title: i18n["menuItem.management"],
			subItems: [],
			isExternalLink: true,
			link: "https://www.berlin.de/sen/asgiva/ueber-uns/leitung/",
		},
		{
			title: i18n["menuItem.twitter"],
			subItems: [],
			isExternalLink: true,
			link: "https://twitter.com/SenIAS_Berlin",
		},
		{
			title: i18n["menuItem.youtube"],
			subItems: [],
			isExternalLink: true,
			link: "https://www.youtube.com/c/SenIASBerlin",
		},
		{
			title: i18n["menuItem.instagram"],
			subItems: [],
			isExternalLink: true,
			link: "https://www.instagram.com/SenIAS_berlin",
		},
	];

	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	return (
		<Drawer isOpen={isOpen} close={() => close()}>
			<div className="flex flex-col text-base ">
				<div className="flex flex-row items-center justify-between mb-6 mt-4 px-6 py-4">
					<p className="text-2xl font-bold">Menü</p>
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
							<TrackedAnchorLink
								href={link.link}
								additionalTrackingContext={"(drawer menu)"}
								className="hover:bg-berlin-grey-light py-4 px-6 border-b"
							>
								{link.title}
							</TrackedAnchorLink>
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
											<TrackedAnchorLink
												key={subItem.link}
												href={subItem.link}
												additionalTrackingContext={"(drawer menu)"}
												className="px-12 py-4 bg-berlin-grey-light hover:bg-berlin-grey-medium"
											>
												{subItem.title}
											</TrackedAnchorLink>
										))}
									</div>
								)}
							</>
						)}
					</React.Fragment>
				))}
			</div>
		</Drawer>
	);
};

export default MainMenu;
