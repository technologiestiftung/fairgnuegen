import React, { useState, useEffect } from "react";
import { ChevronDown } from "../icons/chevron-down";
import { ChevronUp } from "../icons/chevron-up";

interface AccordionProps {
	title: string;
	children: React.ReactNode;
	isExpanded?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
	title,
	children,
	isExpanded = false,
}) => {
	const [isOpen, setIsOpen] = useState(isExpanded);

	// Sync with external changes
	useEffect(() => {
		setIsOpen(isExpanded);
	}, [isExpanded]);

	return (
		<>
			<button
				className="flex justify-between items-center w-full hover:bg-berlin-grey-light hover:cursor-pointer py-4 border-b px-6 text-normal font-bold"
				onClick={() => setIsOpen((prev) => !prev)}
				aria-expanded={isOpen}
			>
				{title}
				{isOpen ? <ChevronUp /> : <ChevronDown />}
			</button>
			{isOpen && <div>{children}</div>}
		</>
	);
};

export default Accordion;
