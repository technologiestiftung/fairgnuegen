import React, { useEffect } from "react";

export function useCloseOnClickOutside(
	languageSelectRef: React.RefObject<HTMLDivElement | null>,
	setIsOpen: (isOpen: boolean) => void,
) {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (languageSelectRef.current === null) {
				return;
			}

			const target = event.target as HTMLElement;
			if (languageSelectRef.current.contains(target)) {
				return;
			}

			setIsOpen(false);
		}

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);
}
