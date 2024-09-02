import { AccessibilityButton } from "./accessibility-button";
import { SearchButton } from "./search-button";
import { MenuButton } from "./menu-button";

export function SidebarButtons() {
	return (
		<div className="flex gap-2 pr-9">
			<AccessibilityButton />
			<SearchButton />
			<MenuButton />
		</div>
	);
}
