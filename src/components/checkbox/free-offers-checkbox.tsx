import React from "react";
import { useFreeOffersOnly } from "../../hooks/use-free-offers-only";
import { CheckIcon } from "../icons/check-icon";

const FreeOffersCheckbox: React.FC = () => {
	const label = "Freier Eintritt";
	const { isShowingFreeOffersOnly, toggleIsShowingFreeOffersOnly } =
		useFreeOffersOnly();
	return (
		<div
			className="w-fit flex flex-row items-center gap-3 py-2 text-lg font-bold hover:cursor-pointer"
			onClick={() => {
				toggleIsShowingFreeOffersOnly();
			}}
		>
			<div
				className={`${!isShowingFreeOffersOnly && "border border-2 border-black"} w-5 h-5 flex flex-row items-center justify-center rounded-[2px]  ${isShowingFreeOffersOnly ? "bg-focus-blue" : ""}`}
			>
				<CheckIcon></CheckIcon>
			</div>
			<div>{label}</div>
		</div>
	);
};

export default FreeOffersCheckbox;
