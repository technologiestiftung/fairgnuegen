import LinkIcon from "~/components/icons/link-icon.tsx";

export function MainMenuExternalLink({
	link,
	title,
}: {
	link: string;
	title: string;
}) {
	return (
		<a
			href={link}
			className="flex items-center gap-x-1 text-link-blue hover:underline py-[1rem] lg:py-[1.175rem] px-3 lg:px-6 border-b"
			target="_blank"
			rel="noreferrer"
		>
			{title}
			<LinkIcon />
		</a>
	);
}
