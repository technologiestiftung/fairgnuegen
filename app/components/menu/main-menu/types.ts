export interface MenuItem {
	title: string;
	subItems: MenuItem[];
	isExternalLink: boolean;
	link: string;
}
