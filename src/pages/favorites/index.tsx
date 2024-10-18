import { lazy, Suspense } from "react";
import { Layout } from "../../layout/layout";

const LazyFavorites = lazy(() => import("../../components/lazy/favorites"));

export default function Index() {
	return (
		<Layout>
			<Suspense fallback={<div className="w-svw h-svh" />}>
				<LazyFavorites />
			</Suspense>
		</Layout>
	);
}
