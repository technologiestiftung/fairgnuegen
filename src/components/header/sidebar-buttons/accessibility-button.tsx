import { useState } from "react";
import { AccessibilityIcon } from "../../icons/accessibility-icon";
import AccessibilityMenu from "../../menu/accessibility-menu";

export function AccessibilityButton() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				className="flex flex-col items-center text-[11px]"
				onClick={() => setIsOpen(true)}
			>
				<AccessibilityIcon />
				Barrierefrei
			</button>
			<AccessibilityMenu isOpen={isOpen} close={() => setIsOpen(false)} />
		</>
	);
}
