import { useLocation } from "react-router-dom";
import { content } from "../../content/content";
import { Layout } from "../../layout/layout";

export default function Index() {
	const location = useLocation();

	const title = content[location.pathname].title ?? "404";

	return (
		<>
			<Layout>
				Offer Page
				<h1>Slug: {title}</h1>
			</Layout>
		</>
	);
}
