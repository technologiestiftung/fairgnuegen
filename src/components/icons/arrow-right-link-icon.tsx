import React from "react";

interface ArrowRightLinkIconProps {
	color: string;
}

const ArrowRightIcon: React.FC<ArrowRightLinkIconProps> = ({ color }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="13"
			height="11"
			viewBox="0 0 13 11"
			fill="none"
			className={color}
		>
			<path
				d="M6.63774 2.00904L6.63778 2.00909L9.02928 4.54199H1.78576C1.27532 4.54199 0.875 4.97718 0.875 5.5C0.875 6.02282 1.27532 6.45801 1.78576 6.45801H9.0272L6.64019 8.99096C6.64018 8.99097 6.64017 8.99098 6.64015 8.991C6.28783 9.36455 6.28784 9.96819 6.64019 10.3417C6.99647 10.7194 7.57812 10.7194 7.93439 10.3417L11.8632 6.17669L11.9441 6.09091L11.9366 6.08293C12.211 5.70799 12.1857 5.1678 11.8607 4.82331L7.93194 0.658273C7.57566 0.280576 6.99401 0.280576 6.63774 0.658273C6.28537 1.03183 6.28537 1.63549 6.63774 2.00904Z"
				fill="currentColor"
				stroke="currentColor"
				strokeWidth="0.25"
			/>
		</svg>
	);
};

export default ArrowRightIcon;
