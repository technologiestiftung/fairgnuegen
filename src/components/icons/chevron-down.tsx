export function ChevronDown({ className }: { className?: string }) {
	return (
		<svg
			width="16"
			height="11"
			viewBox="0 0 16 11"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M2 2L8 8L14 2"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="round"
			/>
		</svg>
	);
}
