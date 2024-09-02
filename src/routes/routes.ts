export type Route = {
	path: string;
	page: string;
};

export const routes: Route[] = [
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
];
