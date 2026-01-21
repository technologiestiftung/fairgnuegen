import React, { Fragment } from "react";
import { categoryMap } from "~/content/categories.ts";
import { DrawerRight } from "~/components/drawer/drawer-right.tsx";
import CloseIcon from "~/components/icons/close-icon.tsx";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";
import { MainMenuItem } from "~/components/menu/main-menu/main-menu-item.tsx";
import type { MenuItem } from "~/components/menu/main-menu/types.ts";

interface MainMenuProps {
	isOpen: boolean;
	close: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ isOpen, close }) => {
	const language = useLanguage();
	const i18n = useI18n(language);

	const categories = Object.entries(categoryMap).filter(
		([key]) => key !== "all",
	);

	const menuItems: MenuItem[] = [
		{
			title: i18n["menuItem.homepage"],
			subItems: categories.map(([key, category]) => ({
				title: i18n[`${category.i18nKey}.name`],
				subItems: [],
				isExternalLink: false,
				link: category.isRenderedInCategoryCards
					? `/all-offers/?category=${key}`
					: "/all-offers/",
			})),
			isExternalLink: false,
			link: "/all-offers/",
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
			link: "https://www.berlin.de/sen/soziales/soziale-sicherung/bn-berlin-ticket-s/angebote-faq-1524266.php",
		},
		{
			title: i18n["menuItem.about"],
			subItems: [],
			isExternalLink: false,
			link: "/about-project/",
		},
	];

	return (
		<DrawerRight isOpen={isOpen} close={close}>
			<nav className={`${isOpen ? "flex" : "hidden"} flex-col text-base`}>
				<div className="flex flex-row items-center justify-between px-3 pt-[0.95rem] pb-[1.5rem] lg:px-6 lg:pt-[1.45rem] lg:pb-[2.5rem]">
					<p className="text-[1.375rem] leading-[1.182rem] font-bold">
						{i18n["sidebar.menu"]}
					</p>
					<button
						onClick={close}
						className="pr-4"
						aria-label={i18n["button.name.close"]}
					>
						<CloseIcon />
					</button>
				</div>
				{menuItems.map((menuItem) => (
					<Fragment key={menuItem.title}>
						<MainMenuItem menuItem={menuItem} />
					</Fragment>
				))}
			</nav>
		</DrawerRight>
	);
};

export default MainMenu;
