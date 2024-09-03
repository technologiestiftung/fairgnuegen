import React from "react";

interface LikeIconProps {
	isSelected: boolean;
}

const LikeIcon: React.FC<LikeIconProps> = ({ isSelected }) => {
	if (!isSelected) {
		return (
			<svg
				width="43"
				height="43"
				viewBox="0 0 43 43"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={`hover:cursor-pointer fill-[#132458] hover:fill-[#8991AB] text-[#132458] hover:text-[#8991AB]`}
			>
				<g id="Icon_heart" clipPath="url(#clip0_3584_39410)">
					<path
						id="Vector"
						d="M21.25 42.5C9.53271 42.5 0 32.9678 0 21.25C0 9.53223 9.53271 0 21.25 0C32.9673 0 42.5 9.53271 42.5 21.25C42.5 32.9673 32.9673 42.5 21.25 42.5ZM21.25 1.5C10.3599 1.5 1.5 10.3599 1.5 21.25C1.5 32.1401 10.3599 41 21.25 41C32.1401 41 41 32.1406 41 21.25C41 10.3594 32.1401 1.5 21.25 1.5Z"
						fill="color"
					/>
					<path
						id="Vector_2"
						d="M21.2504 32.9354C20.7504 32.9354 20.2704 32.7254 19.9204 32.3654L11.6104 23.5054C11.5004 23.3854 11.3904 23.2654 11.2904 23.1354C9.03042 20.3454 9.17042 16.2654 11.6004 13.6554C12.8604 12.3054 14.5504 11.5654 16.3504 11.5654C17.9704 11.5654 19.5404 12.1854 20.7504 13.3154L21.2504 13.7754L21.7404 13.3154C22.9604 12.1854 24.5204 11.5654 26.1404 11.5654C27.9204 11.5654 29.6504 12.3254 30.8904 13.6554C33.3304 16.2754 33.4704 20.3454 31.2104 23.1354C31.1004 23.2654 31.0004 23.3854 30.8904 23.5054L22.5804 32.3554C22.2304 32.7254 21.7404 32.9354 21.2404 32.9354H21.2504ZM16.3504 13.0654C14.9704 13.0654 13.6804 13.6354 12.7004 14.6754C10.7704 16.7454 10.6604 19.9754 12.4504 22.1854C12.5304 22.2854 12.6104 22.3754 12.7004 22.4654L21.0104 31.3254C21.1304 31.4454 21.3604 31.4554 21.4904 31.3254L29.7904 22.4754C29.8704 22.3854 29.9604 22.2854 30.0404 22.1854C31.8304 19.9754 31.7204 16.7454 29.7904 14.6754C28.8404 13.6554 27.5104 13.0654 26.1404 13.0654C24.9004 13.0654 23.7004 13.5454 22.7604 14.4154L21.7604 15.3554C21.4704 15.6254 21.0304 15.6254 20.7404 15.3554L19.7304 14.4154C18.7904 13.5454 17.5904 13.0654 16.3504 13.0654Z"
						fill="color"
					/>
				</g>
				<defs>
					<clipPath id="clip0_3584_39410">
						<rect width="42.5469" height="42.5" fill="white" />
					</clipPath>
				</defs>
			</svg>
		);
	}

	return (
		<svg
			width="43"
			height="43"
			viewBox="0 0 43 43"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`hover:cursor-pointer fill-[#E40422] hover:fill-[#F18190] text-[#132458] hover:text-[#8991AB]`}
		>
			<g id="icon_heart_fill" clipPath="url(#clip0_3584_48191)">
				<path
					id="Vector"
					d="M21.25 0C9.53003 0 0 9.53003 0 21.25C0 32.97 9.53003 42.5 21.25 42.5C32.97 42.5 42.5 32.97 42.5 21.25C42.5 9.52997 32.97 0 21.25 0ZM21.25 41C10.36 41 1.5 32.14 1.5 21.25C1.5 10.36 10.36 1.5 21.25 1.5C32.14 1.5 41 10.3601 41 21.25C41 32.1399 32.14 41 21.25 41Z"
					fill="currentColor"
				/>
				<g id="Clip path group">
					<mask
						id="mask0_3584_48191"
						maskUnits="userSpaceOnUse"
						x="9"
						y="11"
						width="24"
						height="23"
					>
						<g id="clippath">
							<path
								id="Vector_2"
								d="M32.8468 11.749H9.7168V33.119H32.8468V11.749Z"
								fill="white"
							/>
						</g>
					</mask>
					<g mask="url(#mask0_3584_48191)">
						<g id="Group">
							<path
								id="Vector_3"
								d="M31.2464 23.309C31.1464 23.449 31.0364 23.569 30.9264 23.679L22.6264 32.539C22.2664 32.909 21.7864 33.119 21.2864 33.119C20.7864 33.119 20.3064 32.909 19.9564 32.549L11.6464 23.689C11.5364 23.569 11.4264 23.439 11.3264 23.319C9.06646 20.529 9.20646 16.449 11.6464 13.839C12.9064 12.489 14.5864 11.749 16.3864 11.749C18.0064 11.749 19.5764 12.369 20.7864 13.499L21.2864 13.969L21.7764 13.499C22.9964 12.369 24.5664 11.749 26.1864 11.749C27.9664 11.749 29.6964 12.509 30.9264 13.839C33.3664 16.449 33.5064 20.529 31.2464 23.309Z"
								fill="color"
							/>
						</g>
					</g>
				</g>
			</g>
			<defs>
				<clipPath id="clip0_3584_48191">
					<rect width="42.5" height="42.5" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};

export default LikeIcon;
