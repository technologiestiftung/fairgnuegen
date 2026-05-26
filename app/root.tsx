import React from "react";
import {
	data,
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	useRouteError,
	useRouteLoaderData,
} from "react-router";
import stylesheet from "~/index.css?url";
import { Header } from "~/components/header/header";
import { Main } from "~/components/main/main";
import { Footer } from "~/components/footer/footer";
import { getBerlinFooter } from "~/external-templates/berlin-footer";
import { useLanguage } from "~/hooks/use-language";
import { usePageTitle } from "~/hooks/use-page-title";
import NotFound from "~/routes/404";
import { useI18n } from "~/i18n/use-i18n";

export const links = () => [{ rel: "stylesheet", href: stylesheet }];

export async function loader(args: { params: { lang?: string } }) {
	const lang = args.params.lang ?? "";
	const isLangParamSupported = ["", "en", "404"].includes(lang);

	if (!isLangParamSupported) {
		throw data("Page Not Found", { status: 404 });
	}

	return await getBerlinFooter();
}

export async function clientLoader({
	params,
	serverLoader,
}: {
	params: { lang?: string };
	serverLoader: () => Promise<unknown>;
}) {
	const lang = params.lang ?? "";
	const isLangParamSupported = ["", "en", "404"].includes(lang);

	if (!isLangParamSupported) {
		throw data("Page Not Found", { status: 404 });
	}

	return await serverLoader();
}

clientLoader.hydrate = true as const;

export function meta() {
	const title = usePageTitle();

	return [{ title }];
}

export function Layout({ children }: { children: React.ReactNode }) {
	const berlinFooter = useRouteLoaderData("root");
	const language = useLanguage();

	return (
		<html lang={language}>
			<head>
				<meta charSet="utf-8" />
				<link rel="icon" type="image/svg+xml" href="/berlin_de.svg" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				{/* <!-- Matomo -->	*/}
				<script>
					{`var _paq = (window._paq = window._paq || []);
					/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
					_paq.push(["trackPageView"]);
					_paq.push(["enableLinkTracking"]);
					(function () {
					var u = "${import.meta.env.VITE_MATOMO_URL}";
					_paq.push(["setTrackerUrl", u + "matomo.php"]);
					_paq.push(["setSiteId", "${import.meta.env.VITE_MATOMO_SITE_ID}"]);
					var d = document,
					g = d.createElement("script"),
					s = d.getElementsByTagName("script")[0];
					g.async = true;
					g.src = u + "matomo.js";
					s.parentNode.insertBefore(g, s);
				})();`}
				</script>
				{/* <!-- End Matomo Code --> */}
			</head>
			<body className="font-sans antialiased">
				<Header />

				<Main>{children}</Main>

				<Footer berlinFooter={berlinFooter} />

				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary() {
	const error = useRouteError();
	const language = useLanguage();
	const i18n = useI18n(language);

	if (isRouteErrorResponse(error) && error.status === 404) {
		return <NotFound />;
	}

	const statusCode = 500;

	return (
		<main className="container mx-auto px-4 py-16">
			<div className="max-w-2xl mx-auto text-center">
				<h1 className="text-6xl font-bold mb-4">{statusCode}</h1>
				<p className="text-lg mb-8">{i18n["500.p"]}</p>
				<a
					href="/"
					className="inline-block bg-[#1a1a1a] text-white px-6 py-3 font-bold hover:bg-[#333] transition-colors"
				>
					{i18n["500.link.label"]}
				</a>
			</div>
			{import.meta.env.DEV && error instanceof Error && error.stack && (
				<pre className="mt-8 w-full p-4 overflow-x-auto bg-gray-100 text-sm">
					<code>{error.stack}</code>
				</pre>
			)}
		</main>
	);
}
