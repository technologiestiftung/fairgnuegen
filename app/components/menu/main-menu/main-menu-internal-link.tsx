import { LocalizedTrackedAnchorLink } from "~/components/anchor-link/localized-tracked-anchor-link";

export function MainMenuInternalLink({
	link,
	title,
}: {
	link: string;
	title: string;
}) {
	return (
		<LocalizedTrackedAnchorLink
			href={link}
			additionalTrackingContext={"(drawer menu)"}
			className="py-[1rem] lg:py-[1.175rem] px-3 lg:px-6 border-b hover:underline"
		>
			{title}
		</LocalizedTrackedAnchorLink>
	);
}
