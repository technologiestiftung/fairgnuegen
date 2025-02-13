import { useEffect, useRef } from "react";

/**
 * A custom hook that traps focus within a container when it is open.
 * Useful for modals, popups, and other UI components that require keyboard focus management.
 *
 * @param {boolean} isOpen - Whether the focus trap should be active.
 * @param {() => void} close - Callback function to close the container (e.g., triggered by the "Escape" key).
 * @returns {React.RefObject<HTMLDivElement>} A ref to be assigned to the focus-trapped container.
 *
 * @example
 * function Modal({ isOpen, onClose }) {
 *   const modalRef = useFocusTrap(isOpen, onClose);
 *
 *   return (
 *     isOpen && (
 *       <div ref={modalRef} role="dialog" aria-modal="true">
 *         <button onClick={onClose}>Close</button>
 *       </div>
 *     )
 *   );
 * }
 */
export const useFocusTrap = (isOpen: boolean, close: () => void) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const previouslyFocusedElement = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!isOpen || !containerRef.current) return;

		// Store the previously focused element to restore it later
		previouslyFocusedElement.current = document.activeElement as HTMLElement;

		// Query all focusable elements inside the container
		const focusableSelector =
			'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
		const focusableElements = Array.from(
			containerRef.current.querySelectorAll<HTMLElement>(focusableSelector),
		);

		// Focus the first focusable element
		if (focusableElements.length > 0) {
			focusableElements[0].focus();
		}

		// Handles focus trapping inside the container
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!containerRef.current) return;

			if (event.key === "Tab") {
				const firstElement = focusableElements[0];
				const lastElement = focusableElements[focusableElements.length - 1];

				if (!firstElement || !lastElement) return;

				if (event.shiftKey && document.activeElement === firstElement) {
					// Shift + Tab: Move focus to the last element
					event.preventDefault();
					lastElement.focus();
				} else if (!event.shiftKey && document.activeElement === lastElement) {
					// Tab: Move focus to the first element
					event.preventDefault();
					firstElement.focus();
				}
			} else if (event.key === "Escape") {
				// Close the container when Escape key is pressed
				close();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			// Restore focus to the previously focused element
			previouslyFocusedElement.current?.focus();
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, close]);

	return containerRef;
};
