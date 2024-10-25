import { lazy, Suspense } from "react";
import { Layout } from "../../layout/layout";

const LazyAboutProject = lazy(
	() => import("../../components/lazy/about-project"),
);

export default function Index() {
	return (
		<Layout>
			<Suspense fallback={<div className="w-svw h-svh" />}>
				<LazyAboutProject />
			</Suspense>
		</Layout>
	);
}
