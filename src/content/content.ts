// This file is auto-generated and present only after you run `npx tsx create-data-and-routes.ts`
import { detailPagesContent } from "./detail-pages-content.js";

export type Offer = {
	path: string;
	provider: string;
	providerDescription: string;
	offerDescription: string;
	offerInformation: string;
	website: string;
	address: string;
	city: string;
	zip: number | null;
	district: string;
	isFree: boolean;
	category: string[];
	targetGroups: string[];
	x: number | null;
	y: number | null;
};

export type Breadcrumb = {
	href: string;
	label: string;
};

export type Content = {
	title: string;
	breadcrumbs?: Breadcrumb[];
	offer?: Offer;
	category?: string;
};

export const content: Record<string, Content> = {
	"/": {
		title: "Fairgnügen • Berlin fair und günstig erleben",
		breadcrumbs: [
			{
				href: "/",
				label: "Startseite",
			},
		],
	},
	"/all-offers/": {
		title: "All Offers",
		breadcrumbs: [
			{
				href: "/",
				label: "Startseite",
			},
			{
				href: "/all-offers",
				label: "Alle Angebote",
			},
		],
	},
	"/favorites/": {
		title: "Favorites",
		breadcrumbs: [
			{
				href: "/",
				label: "Startseite",
			},
			{
				href: "/favorites/",
				label: "Favoriten",
			},
		],
	},
	...detailPagesContent,
};

export const offers = Object.entries(detailPagesContent).map(([, value]) => ({
	...value.offer,
}));
