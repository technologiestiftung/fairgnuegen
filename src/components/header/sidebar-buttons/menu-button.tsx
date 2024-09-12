import { useState } from "react";
import { BarsIcon } from "../../icons/bars-icon";
import MainMenu from "../../menu/main-menu";

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
			<MainMenu isOpen={isOpen} close={() => setIsOpen(false)}></MainMenu>
		</>
	);
}
