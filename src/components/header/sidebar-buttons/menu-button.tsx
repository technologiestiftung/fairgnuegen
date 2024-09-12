import { useState } from "react";
import { categoryMap } from "../../../content/categories";
import { Drawer } from "../../drawer/drawer";
import { BarsIcon } from "../../icons/bars-icon";
import { ChevronDown } from "../../icons/chevron-down";
import { ChevronUp } from "../../icons/chevron-up";
import CloseIcon from "../../icons/close-icon";

interface MenuItem {
	title: string;
	subItems: MenuItem[];
	isExternalLink: boolean;
	link?: string;
}

export function MenuButton() {
	const [isOpen, setIsOpen] = useState(false);

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
			link: "",
		},
		{
			title: "Presse",
			subItems: [],
			isExternalLink: true,
			link: "",
		},
		{
			title: "Kontakt",
			subItems: [],
			isExternalLink: true,
			link: "",
		},
		{
			title: "Leitung",
			subItems: [],
			isExternalLink: true,
			link: "",
		},
		{
			title: "Hier twittert die Senatsverwaltung",
			subItems: [],
			isExternalLink: true,
			link: "",
		},
		{
			title: "Hier stellt die Senatsverwaltung ihre Videos ein",
			subItems: [],
			isExternalLink: true,
			link: "",
		},
		{
			title: "Hier postet die Senatsverwaltung",
			subItems: [],
			isExternalLink: true,
			link: "",
		},
	];

	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	return (
		<>
			<button
				className="flex flex-col items-center text-[11px]"
				onClick={() => setIsOpen(true)}
			>
				<BarsIcon />
				Menü
			</button>
			<Drawer isOpen={isOpen} close={() => setIsOpen(false)}>
				<div className="flex flex-col text-base ">
					<div className="flex flex-row items-center justify-between mb-6 mt-4 px-6 py-4">
						<p className="text-2xl font-bold">Menü</p>
						<button onClick={() => setIsOpen(false)}>
							<CloseIcon></CloseIcon>
						</button>
					</div>
					{links.map((link) =>
						link.isExternalLink ? (
							<a
								key={link.title}
								href={link.link}
								className="text-link-blue hover:underline py-4 px-6 border-b"
							>
								{link.title}
							</a>
						) : (
							<>
								<div
									key={link.title}
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
							</>
						),
					)}
				</div>
			</Drawer>
		</>
	);
}
