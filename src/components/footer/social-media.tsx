import { SquareArrowIcon } from "../icons/square-arrow-icon";

export function SocialMedia() {
	const links = [
		{
			label: (
				<>
					Instagram <SquareArrowIcon />
				</>
			),
			href: "/instagram",
		},
		{
			label: (
				<>
					LinkedIn <SquareArrowIcon />{" "}
				</>
			),
			href: "/linkedin",
		},
	];

	return (
		<div className="flex flex-col gap-3.5">
			<span className="font-bold">Social Media</span>
			<ul className="flex flex-col gap-3.5">
				{links.map((link) => (
					<li key={link.href}>
						<a href={link.href} className="flex gap-1.5 hover:underline">
							{link.label}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
