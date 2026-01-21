import { ChevronUp } from "~/components/icons/chevron-up.tsx";
import { ChevronDown } from "~/components/icons/chevron-down.tsx";
import { LocalizedTrackedAnchorLink } from "~/components/anchor-link/localized-tracked-anchor-link.tsx";
import type { MenuItem } from "~/components/menu/main-menu/types.ts";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";
import { useState } from "react";
import { useCategories } from "~/hooks/use-categories.tsx";
import { useLocation } from "react-router";

export function MainMenuInternalLinkWithCollapsible({
	menuItem,
}: {
	menuItem: MenuItem;
}) {
	const language = useLanguage();
	const location = useLocation();
	const i18n = useI18n(language);
	const { category } = useCategories();

	const initialCollapsibleState = category !== null;

	const [isCollapsibleOpen, setIsCollapsibleOpen] = useState<boolean>(
		initialCollapsibleState,
	);

	const toggleCollapsible = () => {
		setIsCollapsibleOpen(!isCollapsibleOpen);
	};

	const currentLocation = `${location.pathname}${location.search}`;

	return (
		<>
			<div
				className={`hover:cursor-pointer py-[0.8rem] lg:py-[1rem] border-b border-t hover:underline`}
			>
				<div className="w-full flex flex-row justify-between items-center">
					<a
						href={menuItem.link}
						className={`${currentLocation === menuItem.link && "font-bold"} w-full px-3 lg:px-7`}
					>
						{menuItem.title}
					</a>
					<button
						className={`
							border-l border-l-black py-2 pr-5 pl-4 border-b
							focus-visible:outline focus-visible:outline-3 
							focus-visible:outline-berlin-blue 
							focus-visible:outline-offset-0 
							focus-visible:shadow-default-button-focus-shadow
						`}
						onClick={toggleCollapsible}
						aria-label={
							isCollapsibleOpen
								? i18n["button.name.collapse"]
								: i18n["button.name.expand"]
						}
						aria-expanded={isCollapsibleOpen}
					>
						{isCollapsibleOpen ? (
							<ChevronUp className="size-[0.9rem]" />
						) : (
							<ChevronDown className="size-[0.9rem]" />
						)}
					</button>
				</div>
			</div>

			{isCollapsibleOpen && (
				<ul className="flex flex-col border-b">
					{menuItem.subItems.map((subItem, index) => {
						const isLast = index === menuItem.subItems.length - 1;
						const isCurrentLocation = currentLocation === subItem.link;
						return (
							<li key={subItem.title} className="flex flex-col w-full">
								<LocalizedTrackedAnchorLink
									key={subItem.link}
									href={subItem.link}
									additionalTrackingContext={"(drawer menu)"}
									className={`
														pl-8 lg:pl-11 py-4 lg:py-[1.19rem] bg-berlin-grey-light hover:underline focus:relative
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
	);
}
