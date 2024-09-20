import React from "react";
import { Collapsible } from "../collapsible/collapsible";

type FooterColumnProps = {
	title: string;
	links: { label: string | React.ReactNode; href: string }[];
};

export function FooterDarkColumn({ title, links }: FooterColumnProps) {
	return (
		<>
			{/* Mobile */}
			<div className="flex flex-col desktop:hidden">
				<Collapsible title={title}>
					<ul className="flex flex-col bg-black">
						{links.map((link) => (
							<li key={link.href}>
								<a
									href={link.href}
									className="flex hover:underline pl-7 gap-x-1.5  py-4"
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</Collapsible>
			</div>

			{/* Desktop */}
			<div className="hidden desktop:flex flex-col gap-3.5">
				<div className="font-bold flex justify-between items-center">
					<span className="text-lg">{title}</span>
				</div>
				<ul className="flex flex-col gap-3.5 bg-inherit">
					{links.map((link) => (
						<li key={link.href}>
							<a
								href={link.href}
								className="flex hover:underline pl-7 desktop:pl-0 py-4 desktop:py-0 desktop:gap-1.5"
							>
								{link.label}
							</a>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
