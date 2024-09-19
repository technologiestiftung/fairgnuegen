import React from "react";
import { useFreeOffersOnly } from "../../hooks/use-free-offers-only";
import Checkbox from "./checkbox";
import { trackInteraction } from "../../analytics/matomo.ts";

const FreeOffersCheckbox: React.FC = () => {
	const label = "Freier Eintritt";
	const { isShowingFreeOffersOnly, toggleIsShowingFreeOffersOnly } =
		useFreeOffersOnly();

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		trackInteraction({
			eventAction: "checkbox click",
			eventName: `free only ${e.currentTarget.checked ? "checked" : "unchecked"} (from: ${window.location.pathname})`,
		});
		toggleIsShowingFreeOffersOnly();
	};

	return (
		<Checkbox
			id={"free-only"}
			label={label}
			onChange={onChange}
			isChecked={isShowingFreeOffersOnly}
		/>
	);
};

export default FreeOffersCheckbox;
