import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import { content } from "./content/content";
import { usePageTitle } from "./hooks/use-page-title";

const pages: Record<string, { default: React.FC }> = import.meta.glob(
	"./pages/**/*.tsx",
	{ eager: true },
);

export function App() {
	usePageTitle();

	return (
		<>
			<nav>
				<ul>
					{routes.map(({ path }) => (
						<li key={path}>
							<a href={path}>{content[path].title}</a>
						</li>
					))}
				</ul>
			</nav>
			<Routes>
				{routes.map(({ path, page }) => {
					const Element = pages[page].default;
					return <Route key={path} path={path} element={<Element />}></Route>;
				})}
			</Routes>
		</>
	);
}
