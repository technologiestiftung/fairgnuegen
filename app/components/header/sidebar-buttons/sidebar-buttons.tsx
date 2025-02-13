import { AccessibilityButton } from "~/components/header/sidebar-buttons/accessibility-button.tsx";
import { SearchButton } from "~/components/header/sidebar-buttons/search-button.tsx";
import { MenuButton } from "~/components/header/sidebar-buttons/menu-button.tsx";

export function SidebarButtons() {
	return (
		<div className="flex gap-[16px] pr-4 tracking-normal">
			<AccessibilityButton />
			<SearchButton />
			<MenuButton />
		</div>
	);
}
