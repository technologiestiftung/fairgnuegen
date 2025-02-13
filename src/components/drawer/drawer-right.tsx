import React from "react";
import { useOnEscape } from "../../hooks/use-on-escape";
import { useFocusTrap } from "../../hooks/use-focus-trap";

interface DrawerProps {
	isOpen: boolean;
	close: () => void;
	children: React.ReactNode;
}

export function DrawerRight({ isOpen, close, children }: DrawerProps) {
	useOnEscape(close);
	const menuRef = useFocusTrap(isOpen, close);

	return (
		<div
			ref={menuRef}
			className={`overflow-x-hidden overflow-y-hidden fixed top-0 right-0 z-20 w-screen h-screen pointer-events-none`}
			onClick={close}
		>
			<div
				className={`${isOpen ? "opacity-100" : "opacity-0"} transition absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-40 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
			/>
			<div
				className={`${isOpen ? "translate-x-0" : "translate-x-[90vw] md:translate-x-[560px]"} transition absolute top-0 right-0  h-full bg-white w-[90vw] md:w-[560px] overflow-y-scroll pointer-events-auto`}
				onClick={(event) => event.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
}
