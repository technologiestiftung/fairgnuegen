import React, { useState } from "react";
import { ChevronDown } from "../icons/chevron-down";
import { ChevronUp } from "../icons/chevron-up";

interface AccordionProps {
	title: string;
	children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="border-b">
			<button
				className="flex justify-between items-center w-full px-6 py-4 text-left font-bold hover:bg-gray-100"
				onClick={() => setIsOpen((prev) => !prev)}
				aria-expanded={isOpen}
			>
				{title}
				{isOpen ? <ChevronUp /> : <ChevronDown />}
			</button>
			{isOpen && <div className="px-6 py-2">{children}</div>}
		</div>
	);
};

export default Accordion;
