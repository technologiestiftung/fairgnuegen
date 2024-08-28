// This file is auto-generated and present only after you run `npx tsx create-data-and-routes.ts`
import { detailPagesContent } from "./detail-pages-content.js";

export type Offer = {
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
	"/kultur/": {
		title: "Kultur",
		category: "Kultur",
	},
	"/freizeit/": {
		title: "Freizeit",
		category: "Freizeit",
	},
	"/sport/": {
		title: "Sport",
		category: "Sport",
	},
	"/bildung/": {
		title: "Bildung",
		category: "Bildung & Beratung",
	},
	...detailPagesContent,
};

export const offers = Object.entries(detailPagesContent).map(
	([key, value]) => ({
		path: key,
		...value.offer,
	}),
);
