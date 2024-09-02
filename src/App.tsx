import React from "react";
import { Route, Routes } from "react-router-dom";
import { usePageTitle } from "./hooks/use-page-title";
import { routes } from "./routes/routes";
// This file is auto-generated and present only after you run `npx tsx create-data-and-routes.ts`
import { detailPagesRoutes } from "./routes/detail-pages-routes";

const pages: Record<string, { default: React.FC }> = import.meta.glob(
	"./pages/**/*.tsx",
	{ eager: true },
);

export function App() {
	usePageTitle();

	return (
		<>
			<Routes>
				{routes.concat(detailPagesRoutes).map(({ path, page }) => {
					const Element = pages[page].default;
					return <Route key={path} path={path} element={<Element />}></Route>;
				})}
			</Routes>
		</>
	);
}
