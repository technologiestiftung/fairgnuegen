import { routes } from "../../routes/routes";
import { content } from "../../content/content";

export function Header() {
	return (
		<header>
			Header
			<nav>
				<ul>
					{routes.map(({ path }) => (
						<li key={path}>
							<a href={path}>{content[path].title}</a>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
