import { lazy, Suspense } from "react";
import { Layout } from "../../layout/layout";

const LazyMap = lazy(() => import("../../components/lazy/map"));

export default function Index() {
	return (
		<Layout>
			<Suspense fallback={<div className="w-svw h-svh" />}>
				<LazyMap />
			</Suspense>
		</Layout>
	);
}
