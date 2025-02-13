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

		// Delay focusing the first element to allow animations to start first
		const timeout = setTimeout(() => {
			// Focus the first focusable element
			if (focusableElements.length > 0) {
				focusableElements[0].focus();
			}
		}, 100); // Small delay to let animation complete

		// Handles focus trapping inside the container
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!containerRef.current || !focusableElements.length) {
				return;
			}

			// Close the container when the Escape key is pressed
			if (event.key === "Escape") {
				close();
				return;
			}

			// Ignore key presses other than Tab
			if (event.key !== "Tab") {
				return;
			}

			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			const isLastElementFocused = document.activeElement === lastElement;
			// Prevent focus from escaping the container and loop back to the first element
			if (isLastElementFocused) {
				event.preventDefault();
				firstElement.focus();
				return;
			}

			const isShiftTab = event.shiftKey;
			const isFirstElementFocused = document.activeElement === firstElement;
			// Prevent focus from escaping the container and loop back to the last element
			if (isShiftTab && isFirstElementFocused) {
				event.preventDefault();
				lastElement.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			clearTimeout(timeout);
			// Restore focus to the previously focused element
			previouslyFocusedElement.current?.focus();
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, close]);

	// Return the ref to be attached to the focus-trapped container
	return containerRef;
};
