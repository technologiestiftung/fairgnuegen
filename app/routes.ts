import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
	route(":lang?/", "./routes/index.tsx"),
	route(":lang?/about-project/", "./routes/about-project/index.tsx"),
	route(
		":lang?/accessibility-statement/",
		"./routes/accessibility-statement/index.tsx",
	),
	route(":lang?/all-offers/", "./routes/all-offers/index.tsx"),
	route(":lang?/all-offers/:offer", "./routes/all-offers/[offer]/index.tsx"),
	route(":lang?/favorites/", "./routes/favorites/index.tsx"),
	route(":lang?/imprint/", "./routes/imprint/index.tsx"),
	route(":lang?/map/", "./routes/map/index.tsx"),
	route(":lang?/privacy-note/", "./routes/privacy-note/index.tsx"),
] satisfies RouteConfig;
