import React, { useState } from "react";
import { categoryMap } from "../../content/categories";
import { Drawer } from "../drawer/drawer";
import { ChevronDown } from "../icons/chevron-down";
import { ChevronUp } from "../icons/chevron-up";
import CloseIcon from "../icons/close-icon";
interface MainMenuProps {
	isOpen: boolean;
	close: () => void;
}

interface MenuItem {
	title: string;
	subItems: MenuItem[];
	isExternalLink: boolean;
	link?: string;
}

const MainMenu: React.FC<MainMenuProps> = ({ isOpen, close }) => {
	const links: MenuItem[] = [
		{
			title: "Startseite",
			subItems: Object.entries(categoryMap).map(([key, category]) => ({
				title: category.name,
				subItems: [],
				isExternalLink: false,
				link: `/all-offers/?category=${key}`,
			})),
			isExternalLink: false,
			link: "/",
		},
		{
			title: "Kartenansicht",
			subItems: [],
			isExternalLink: false,
			link: "/map/",
		},
		{
			title: "Favoriten",
			subItems: [],
			isExternalLink: false,
			link: "/favorites/",
		},
		{
			title: "Zur Senatsverwaltung",
			subItems: [],
			isExternalLink: true,
			link: "https://www.berlin.de/sen/asgiva/",
		},
		{
			title: "Presse",
			subItems: [],
			isExternalLink: true,
			link: "https://www.berlin.de/sen/asgiva/presse/",
		},
		{
			title: "Kontakt",
			subItems: [],
			isExternalLink: true,
			link: "https://www.berlin.de/sen/asgiva/ueber-uns/formular.541467.php",
		},
		{
			title: "Leitung",
			subItems: [],
			isExternalLink: true,
			link: "https://www.berlin.de/sen/asgiva/ueber-uns/leitung/",
		},
		{
			title: "Hier twittert die Senatsverwaltung",
			subItems: [],
			isExternalLink: true,
			link: "https://twitter.com/SenIAS_Berlin",
		},
		{
			title: "Hier stellt die Senatsverwaltung ihre Videos ein",
			subItems: [],
			isExternalLink: true,
			link: "https://www.youtube.com/c/SenIASBerlin",
		},
		{
			title: "Hier postet die Senatsverwaltung",
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
				{links.map((link) =>
					link.isExternalLink ? (
						<a
							key={link.title}
							href={link.link}
							className="text-link-blue hover:underline py-4 px-6 border-b"
							target="_blank"
							rel="noreferrer"
						>
							{link.title}
						</a>
					) : (
						<div key={link.title}>
							<div
								className={`hover:bg-berlin-grey-light hover:cursor-pointer py-4 px-6 border-b`}
								onClick={() => {
									if (link.subItems.length === 0) {
										window.location.href = link.link ?? "/";
									}
								}}
							>
								{link.subItems.length > 0 ? (
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
								) : (
									<div>{link.title}</div>
								)}
							</div>
							{selectedCategory === link.title &&
								link.subItems.map((subItem) => (
									<div
										key={subItem.title}
										className="px-12 py-4 bg-berlin-grey-light hover:cursor-pointer hover:bg-berlin-grey-medium"
										onClick={() => {
											window.location.href = subItem.link ?? "/";
										}}
									>
										{subItem.title}
									</div>
								))}
						</div>
					),
				)}
			</div>
		</Drawer>
	);
};

export default MainMenu;
