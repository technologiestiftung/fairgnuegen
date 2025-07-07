// This file is auto-generated and present only after you run `npx tsx create-data-and-routes.ts`
import { detailPagesContent } from "~/content/detail-pages-content.ts";
import { type Content } from "./types.ts";

export const content: Record<string, Content> = {
	"/": {
		breadcrumbs: [
			{
				href: "/",
				label: "Fairgnügen",
				optionalTitleLabel: "Berlin vergünstigt erleben",
			},
		],
	},
	"/en/": {
		breadcrumbs: [
			{
				href: "/",
				label: "Fairgnügen",
				optionalTitleLabel: "Experience Berlin fairly and cheaply",
			},
		],
	},
	"/all-offers/": {
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
	"/favorites/": {
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
		breadcrumbs: [
			{
				href: "/",
				label: "Fairgnügen",
			},
			{
				href: "/favorites/",
				label: "Favorites",
			},
		],
	},
	"/map/": {
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
		breadcrumbs: [
			{
				href: "/",
				label: "Fairgnügen",
			},
			{
				href: "/map/",
				label: "Map",
			},
		],
	},
	"/imprint/": {
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
		breadcrumbs: [
			{
				href: "/",
				label: "Fairgnügen",
			},
			{
				href: "/imprint/",
				label: "Imprint",
			},
		],
	},
	"/privacy-note/": {
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
		breadcrumbs: [
			{
				href: "/",
				label: "Fairgnügen",
			},
			{
				href: "/privacy-note/",
				label: "Privacy Note",
			},
		],
	},
	"/about-project/": {
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
		breadcrumbs: [
			{
				href: "/",
				label: "Fairgnügen",
			},
			{
				href: "/about-project/",
				label: "About the project",
			},
		],
	},
	"/accessibility-statement/": {
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
		breadcrumbs: [
			{
				href: "/",
				label: "Fairgnügen",
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
