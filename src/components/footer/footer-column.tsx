import React from "react";

type FooterColumnProps = {
	title: string;
	links: { label: string | React.ReactNode; href: string }[];
};

export function FooterColumn({ title, links }: FooterColumnProps) {
	return (
		<div className="flex flex-col gap-3.5">
			<span className="font-bold">{title}</span>
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
