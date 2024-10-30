import { AccessibilityButton } from "./accessibility-button";
import { SearchButton } from "./search-button";
import { MenuButton } from "./menu-button";

export function SidebarButtons() {
	return (
		<div className="flex gap-[16px] pr-8 tracking-normal">
			<AccessibilityButton />
			<SearchButton />
			<MenuButton />
		</div>
	);
}
