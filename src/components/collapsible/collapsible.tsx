import { ReactNode, useEffect, useState } from "react";
import { ChevronDown } from "../icons/chevron-down.tsx";

type CollapsibleProps = {
	title: string;
	titleClassName?: string;
	children: string | ReactNode;
};

let timeout: ReturnType<typeof setTimeout>;

export function Collapsible({ title, children }: CollapsibleProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isShadowVisible, setIsShadowVisible] = useState(false);

	useEffect(() => {
		clearTimeout(timeout);

		if (isOpen) {
			setIsShadowVisible(true);
			return () => {};
		}

		timeout = setTimeout(() => {
			setIsShadowVisible(false);
		}, 150);

		return () => clearTimeout(timeout);
	}, [isOpen]);

	return (
		<div className="flex flex-col">
			<button
				className={`
					font-bold flex justify-between items-center border-t-[0.5px] p-4 
					${isShadowVisible ? "shadow-[0_4px_4px_rgba(144,144,144,.5)]" : "shadow-none"}
				`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="text-lg">{title}</span>
				<div className={`transition ${isOpen ? "-rotate-180" : "rotate-0"}`}>
					<ChevronDown />
				</div>
			</button>

			<div
				className={`transition-all duration-200 ease-in-out overflow-hidden
				${isOpen ? "max-h-96 " : "max-h-0 invisible"}`}
			>
				{children}
			</div>
		</div>
	);
}
