import { useLocation } from "react-router-dom";
import { content } from "../../content/content";

export default function Index() {
	const location = useLocation();

	const title = content[location.pathname].title ?? "404";

	return (
		<>
			<h1>Slug: {title}</h1>
		</>
	);
}
