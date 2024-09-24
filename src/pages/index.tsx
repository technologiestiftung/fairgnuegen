import { Layout } from "../layout/layout";
import { lazy, Suspense } from "react";

const LazyHome = lazy(() => import("../components/lazy/index"));

export default function Index() {
	return (
		<Layout>
			<Suspense fallback={<div className="w-svw h-svh" />}>
				<LazyHome />
			</Suspense>
		</Layout>
	);
}
