import React from "react";

interface DrawerProps {
	isOpen: boolean;
	close: () => void;
	children: React.ReactNode;
}

export function Drawer({ isOpen, close, children }: DrawerProps) {
	return (
		<div
			className={`${isOpen ? "visible" : "invisible"} absolute top-0 right-0 h-full w-full z-20 bg-black bg-opacity-20`}
			onClick={close}
			// todo: make this work
			// onKeyDown={(event) => {
			// 	if (event.key !== "Escape") {
			// 		return;
			// 	}
			// 	close();
			// }}
		>
			<div
				className={`${isOpen ? "translate-x-0" : "translate-x-64"} transition absolute top-0 right-0 w-64 h-full bg-white`}
				onClick={(event) => event.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
}
