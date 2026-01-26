import type { MouseEventHandler, ReactNode, Ref } from "react";

type ButtonProps = {
	ref?: Ref<HTMLButtonElement>;
	children: ReactNode | string;
	className: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
	ariaLabel?: string;
};

export function Button({
	ref,
	children,
	className,
	onClick,
	ariaLabel,
}: ButtonProps) {
	return (
		<button
			ref={ref}
			onClick={onClick}
			aria-label={ariaLabel}
			className={`
				focus-visible:outline focus-visible:outline-3 
				focus-visible:outline-berlin-blue 
				focus-visible:outline-offset-0 
				focus-visible:shadow-default-button-focus-shadow
				${className}
			`}
		>
			{children}
		</button>
	);
}
