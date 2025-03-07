import React from "react";
import { useOnEscape } from "~/hooks/use-on-escape.tsx";
import { useFocusTrap } from "~/hooks/use-focus-trap.tsx";

interface DrawerSearchProps {
	isOpen: boolean;
	close: () => void;
	children: React.ReactNode;
}

export function DrawerSearch({ isOpen, close, children }: DrawerSearchProps) {
	useOnEscape(close);
	const menuRef = useFocusTrap(isOpen, close);

	return (
		<div
			ref={menuRef}
			className={`${isOpen ? "visible" : "invisible"} overflow-x-hidden absolute top-0 right-0 z-20 w-screen h-screen`}
			onClick={close}
		>
			<div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-40"></div>
			<div
				className={`${isOpen ? "translate-x-0" : "translate-x-64"} transition absolute top-0 right-0  h-full bg-white w-[90vw] md:w-[90vw]  overflow-y-scroll`}
				onClick={(event) => event.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
}
