import React from "react";

interface DrawerLeftProps {
	isOpen: boolean;
	close: () => void;
	children: React.ReactNode;
}

export function DrawerLeft({ isOpen, close, children }: DrawerLeftProps) {
	return (
		<div
			className={`${isOpen ? "visible" : "invisible"} overflow-x-hidden fixed top-0 left-0 z-20 w-screen h-screen`}
			onClick={close}
			// todo: make this work
			// onKeyDown={(event) => {
			// 	if (event.key !== "Escape") {
			// 		return;
			// 	}
			// 	close();
			// }}
		>
			<div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-40"></div>
			<div
				className={`${isOpen ? "translate-x-0" : "-translate-x-64"} transition absolute top-0 left-0  h-full bg-white w-[90vw] md:w-[500px]  overflow-y-scroll`}
				onClick={(event) => event.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
}
