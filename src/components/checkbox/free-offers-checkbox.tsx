import React from "react";
import { useSearchParams } from "react-router-dom";
import useUpdateSearchParam from "../../hooks/use-update-search-params";

const FreeOffersCheckbox: React.FC = () => {
	const id = "free-offers-checkbox";
	const label = "Freier Eintritt";
	const updateSearchParam = useUpdateSearchParam();
	const [searchParams] = useSearchParams();
	const showFreeOffersOnly = (searchParams.get("free") ?? "false") === "true";
	return (
		<div className="flex flex-row items-center gap-2 py-2 text-lg font-bold">
			<input
				type="checkbox"
				id={id}
				name={id}
				value={label}
				onChange={() => {
					updateSearchParam("free", showFreeOffersOnly ? "false" : "true");
				}}
				checked={showFreeOffersOnly}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	);
};

export default FreeOffersCheckbox;
