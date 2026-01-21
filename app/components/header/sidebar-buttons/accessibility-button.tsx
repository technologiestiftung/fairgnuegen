import { useState } from "react";
import { AccessibilityIcon } from "~/components/icons/accessibility-icon";
import AccessibilityMenu from "~/components/menu/accessibility-menu";
import { useLanguage } from "~/hooks/use-language";
import { useI18n } from "~/i18n/use-i18n";

export function AccessibilityButton() {
	const language = useLanguage();
	const i18n = useI18n(language);

	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				className={`
					flex flex-col items-center text-[11px] gap-1 leading-3
					focus-visible:outline focus-visible:outline-3 
					focus-visible:outline-berlin-blue 
					focus-visible:outline-offset-0 
					focus-visible:shadow-default-button-focus-shadow
				`}
				onClick={() => setIsOpen(true)}
			>
				<AccessibilityIcon />
				{i18n["sidebar.accessibility"]}
			</button>

			<AccessibilityMenu isOpen={isOpen} close={() => setIsOpen(false)} />
		</>
	);
}
