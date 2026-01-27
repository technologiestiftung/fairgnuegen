import { AccessibilityButton } from "~/components/header/sidebar-buttons/accessibility-button";
import { SearchButton } from "~/components/header/sidebar-buttons/search-button";
import { MenuButton } from "~/components/header/sidebar-buttons/menu-button";

export function SidebarButtons() {
	return (
		<div className="flex gap-[16px] pr-4 tracking-normal">
			<AccessibilityButton />
			<SearchButton />
			<MenuButton />
		</div>
	);
}
