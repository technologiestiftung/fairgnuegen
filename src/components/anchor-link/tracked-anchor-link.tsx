import { ReactNode } from "react";
import { trackInteraction } from "../../analytics/matomo";

type AnchorLinkProps = {
	href: string;
	children: string | ReactNode;
	target?: string;
	rel?: string;
	additionalTrackingContext?: string;
	className?: string;
};

export function TrackedAnchorLink({
	href,
	children,
	target,
	rel,
	additionalTrackingContext,
	className,
}: AnchorLinkProps) {
	return (
		<a
			href={href}
			className={className}
			target={target}
			rel={rel}
			onClick={() =>
				trackInteraction({
					eventAction: "anchor-link click",
					eventName: `to: ${href} (from: ${window.location.pathname}) ${additionalTrackingContext}`,
				})
			}
		>
			{children}
		</a>
	);
}
