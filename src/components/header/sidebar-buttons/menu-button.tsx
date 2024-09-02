import { BarsIcon } from "../../icons/bars-icon";
import { useState } from "react";
import { Drawer } from "../../drawer/drawer";

export function MenuButton() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				className="flex flex-col items-center text-[11px]"
				onClick={() => setIsOpen(true)}
			>
				<BarsIcon />
				Menü
			</button>
			<Drawer isOpen={isOpen} close={() => setIsOpen(false)}>
				Menü
			</Drawer>
		</>
	);
}
