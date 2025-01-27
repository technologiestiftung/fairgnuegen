// This file is auto-generated and present only after you run `npx tsx create-data-and-routes.ts`
import { detailPagesContent } from "./detail-pages-content.js";

export type Offer = {
	id: string;
	language: string;
	path: string;
	slug: string;
	provider: string;
	providerDescription: string;
	offerDescription: string;
	offerInformation: string;
	website: string;
	addressWithHouseNumber: string;
	cityWithZip: string;
	district: string | null;
	isFree: boolean;
	category: string;
	targetGroups: string[];
	lat: number | null;
	lon: number | null;
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
		title: "Fairgnügen • Berlin vergünstigt erleben",
		breadcrumbs: [
			{
				href: "/",
				label: "Fairgnügen",
			},
		],
	},
	"/en/": {
		title: "Fairgnügen • Experience Berlin fairly and cheaply",
		breadcrumbs: [
			{
				href: "/",
				label: "Home",
			},
		],
	},
	"/all-offers/": {
		title: "Alle Angebote",
		breadcrumbs: [
			{
				href: "/",
				label: "Fairgnügen",
			},
			{
				href: "/all-offers",
				label: "Alle Angebote",
			},
		],
	},
	"/en/all-offers/": {
		title: "All Offers",
		breadcrumbs: [
			{
				href: "/",
				label: "Home",
			},
			{
				href: "/all-offers",
				label: "Alle Angebote",
			},
		],
	},
	"/favorites/": {
		title: "Favoriten",
		breadcrumbs: [
			{
				href: "/",
				label: "Fairgnügen",
			},
			{
				href: "/favorites/",
				label: "Favoriten",
			},
		],
	},
	"/en/favorites/": {
		title: "Favorites",
		breadcrumbs: [
			{
				href: "/",
				label: "Home",
			},
			{
				href: "/favorites/",
				label: "Favorites",
			},
		],
	},
	"/map/": {
		title: "Kartenansicht",
		breadcrumbs: [
			{
				href: "/",
				label: "Fairgnügen",
			},
			{
				href: "/map/",
				label: "Kartenansicht",
			},
		],
	},
	"/en/map/": {
		title: "Map",
		breadcrumbs: [
			{
				href: "/",
				label: "Home",
			},
			{
				href: "/map/",
				label: "Map",
			},
		],
	},
	"/imprint/": {
		title: "Impressum",
		breadcrumbs: [
			{
				href: "/",
				label: "Fairgnügen",
			},
			{
				href: "/imprint/",
				label: "Impressum",
			},
		],
	},
	"/en/imprint/": {
		title: "Imprint",
		breadcrumbs: [
			{
				href: "/",
				label: "Home",
			},
			{
				href: "/imprint/",
				label: "Imprint",
			},
		],
	},
	"/privacy-note/": {
		title: "Datenschutzerklärung",
		breadcrumbs: [
			{
				href: "/",
				label: "Fairgnügen",
			},
			{
				href: "/privacy-note/",
				label: "Datenschutzerklärung",
			},
		],
	},
	"/en/privacy-note/": {
		title: "Privacy Note",
		breadcrumbs: [
			{
				href: "/",
				label: "Home",
			},
			{
				href: "/privacy-note/",
				label: "Privacy Note",
			},
		],
	},
	"/about-project/": {
		title: "Über das Projekt",
		breadcrumbs: [
			{
				href: "/",
				label: "Fairgnügen",
			},
			{
				href: "/about-project/",
				label: "Über das Projekt",
			},
		],
	},
	"/en/about-project/": {
		title: "About the project",
		breadcrumbs: [
			{
				href: "/",
				label: "Home",
			},
			{
				href: "/about-project/",
				label: "About the project",
			},
		],
	},
	"/accessibility-statement/": {
		title: "Erklärung zur Barrierefreiheit",
		breadcrumbs: [
			{
				href: "/",
				label: "Fairgnügen",
			},
			{
				href: "/accessibility-statement/",
				label: "Erklärung zur Barrierefreiheit",
			},
		],
	},
	"/en/accessibility-statement/": {
		title: "Accessibility Statement",
		breadcrumbs: [
			{
				href: "/",
				label: "Home",
			},
			{
				href: "/accessibility-statement/",
				label: "Accessibility Statement",
			},
		],
	},
	...detailPagesContent,
};

export const offers = Object.entries(detailPagesContent).map(([, value]) => ({
	...value.offer,
}));
