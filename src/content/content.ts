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

export type Content = {
	title: string;
	offer?: Offer;
	category?: string;
};

export const content: Record<string, Content> = {
	"/": {
		title: "Home",
	},
	"/all-offers/": {
		title: "All Offers",
	},
	"/favorites/": {
		title: "Favorites",
	},
	...detailPagesContent,
};

export const offers = Object.entries(detailPagesContent).map(([, value]) => ({
	...value.offer,
}));
