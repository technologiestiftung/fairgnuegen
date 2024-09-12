import React from "react";
import { useSearchParams } from "react-router-dom";
import useUpdateSearchParam from "../../hooks/use-update-search-params";
import { CheckIcon } from "../icons/check-icon";

const FreeOffersCheckbox: React.FC = () => {
	const label = "Freier Eintritt";
	const { updateSearchParam } = useUpdateSearchParam();
	const [searchParams] = useSearchParams();
	const showFreeOffersOnly = (searchParams.get("free") ?? "false") === "true";
	return (
		<div
			className="w-fit flex flex-row items-center gap-3 py-2 text-lg font-bold hover:cursor-pointer"
			onClick={() => {
				updateSearchParam("free", showFreeOffersOnly ? "false" : "true");
			}}
		>
			<div
				className={`${!showFreeOffersOnly && "border border-2 border-black"} w-5 h-5 flex flex-row items-center justify-center rounded-[2px]  ${showFreeOffersOnly ? "bg-focus-blue" : ""}`}
			>
				<CheckIcon></CheckIcon>
			</div>
			<div>{label}</div>
		</div>
	);
};

export default FreeOffersCheckbox;
