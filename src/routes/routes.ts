export type Route = {
	path: string;
	page: string;
};

const baseRoutes: Route[] = [
	{
		path: "/",
		page: "./pages/index.tsx",
	},
	{
		path: "/all-offers/",
		page: "./pages/all-offers/index.tsx",
	},
	{
		path: "/favorites/",
		page: "./pages/favorites/index.tsx",
	},
	{
		path: "/map/",
		page: "./pages/map/index.tsx",
	},
	{
		path: "/imprint/",
		page: "./pages/imprint/index.tsx",
	},
	{
		path: "/privacy-note/",
		page: "./pages/privacy-note/index.tsx",
	},
	{
		path: "/about-project/",
		page: "./pages/about-project/index.tsx",
	},
	{
		path: "/accessibility-statement/",
		page: "./pages/accessibility-statement/index.tsx",
	},
];

const i18nRoutes: Route[] = baseRoutes.map(({ path, page }) => ({
	path: `/en${path}`,
	page,
}));

export const routes = [...baseRoutes, ...i18nRoutes];
