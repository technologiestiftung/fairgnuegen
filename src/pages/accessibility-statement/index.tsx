import { lazy, Suspense } from "react";
import { Layout } from "../../layout/layout";

const LazyAccessibilityStatement = lazy(
	() => import("../../components/lazy/accessibility-statement"),
);

export default function Index() {
	return (
		<Layout>
			<Suspense fallback={<div className="w-svw h-svh" />}>
				<LazyAccessibilityStatement />
			</Suspense>
		</Layout>
	);
}
