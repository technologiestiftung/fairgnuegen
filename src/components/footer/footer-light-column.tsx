import React from "react";
import { ChevronDown } from "../icons/chevron-down.tsx";

type FooterColumnProps = {
	title: string;
	links: { label: string | React.ReactNode; href: string }[];
};

export function FooterLightColumn({ title, links }: FooterColumnProps) {
	return (
		<div className="flex flex-col desktop:gap-3.5">
			<div
				className={`
					font-bold
					flex justify-between items-center border-t-[0.5px] p-4 shadow-lg
					desktop:border-none desktop:p-0 desktop:shadow-none
				`}
			>
				<span className="text-lg">{title}</span>
				<div className="desktop:hidden">
					<ChevronDown />
				</div>
			</div>
			<ul className="flex flex-col desktop:gap-3.5">
				{links.map((link) => (
					<li key={link.href}>
						<a
							href={link.href}
							className="flex hover:underline pl-7 desktop:pl-0 py-4 desktop:py-0 gap-x-1.5"
						>
							{link.label}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
