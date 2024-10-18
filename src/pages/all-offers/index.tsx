import { lazy, Suspense } from "react";
import { Layout } from "../../layout/layout";

const LazyAllOffers = lazy(() => import("../../components/lazy/all-offers"));

export default function Index() {
	return (
		<Layout>
			<Suspense fallback={<div className="w-svw h-svh" />}>
				<LazyAllOffers />
			</Suspense>
		</Layout>
	);
}
