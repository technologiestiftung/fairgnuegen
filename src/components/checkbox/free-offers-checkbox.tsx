import React from "react";
import { useFreeOffersOnly } from "../../hooks/use-free-offers-only";
import Checkbox from "./checkbox";

const FreeOffersCheckbox: React.FC = () => {
	const label = "Freier Eintritt";
	const { isShowingFreeOffersOnly, toggleIsShowingFreeOffersOnly } =
		useFreeOffersOnly();

	return (
		<Checkbox
			id={"free-only"}
			label={label}
			onChange={toggleIsShowingFreeOffersOnly}
			isChecked={isShowingFreeOffersOnly}
		/>
	);
};

export default FreeOffersCheckbox;
