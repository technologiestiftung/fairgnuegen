type Route = {
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
	{
		path: "/kultur/",
		page: "./pages/[category]/index.tsx",
	},
	{
		path: "/sport/",
		page: "./pages/[category]/index.tsx",
	},
	{
		path: "/freizeit/",
		page: "./pages/[category]/index.tsx",
	},
	{
		path: "/bildung/",
		page: "./pages/[category]/index.tsx",
	},
];
