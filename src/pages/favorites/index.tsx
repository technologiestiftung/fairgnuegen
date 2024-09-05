import { Layout } from "../../layout/layout";
import { useFavoritesStore } from "../../store/favorites-store";

export default function Index() {
	const favorites = useFavoritesStore((state) => state.favorites);

	return (
		<Layout>
			<div>
				<h1 className="text-2xl font-bold">Favoriten</h1>
				{favorites.map((f) => (
					<p key={f}>{f}</p>
				))}
			</div>
		</Layout>
	);
}
