import { MainMenuExternalLink } from "~/components/menu/main-menu/main-menu-external-link";
import { MainMenuInternalLink } from "~/components/menu/main-menu/main-menu-internal-link";
import { MainMenuInternalLinkWithCollapsible } from "~/components/menu/main-menu/main-menu-internal-link-with-collapsible";
import type { MenuItem } from "~/components/menu/main-menu/types";

export function MainMenuItem({ menuItem }: { menuItem: MenuItem }) {
	if (menuItem.isExternalLink) {
		return <MainMenuExternalLink link={menuItem.link} title={menuItem.title} />;
	}

	if (menuItem.subItems.length === 0) {
		return <MainMenuInternalLink link={menuItem.link} title={menuItem.title} />;
	}

	return <MainMenuInternalLinkWithCollapsible menuItem={menuItem} />;
}
