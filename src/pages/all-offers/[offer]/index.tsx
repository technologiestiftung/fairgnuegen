import { lazy, Suspense } from "react";
import { Layout } from "../../../layout/layout";

const LazyOffer = lazy(
	() => import("../../../components/lazy/all-offers/[offer]"),
);

export default function Index() {
	return (
		<Layout>
			<Suspense fallback={<div className="w-svw h-svh" />}>
				<LazyOffer />
			</Suspense>
		</Layout>
	);
}
