import React from "react";
import { useFreeOffersOnly } from "../../hooks/use-free-offers-only";
import Checkbox from "./checkbox";
import { trackInteraction } from "../../analytics/matomo.ts";
import { useLanguage } from "../../hooks/use-language.tsx";
import { useI18n } from "../../i18n/use-i18n.tsx";

interface FreeOffersCheckboxProps {
	id: string;
}

const FreeOffersCheckbox: React.FC<FreeOffersCheckboxProps> = ({ id }) => {
	const language = useLanguage();
	const i18n = useI18n(language);

	const label = i18n["filter.freeEntry"];
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
			id={id}
			label={label}
			onChange={onChange}
			isChecked={isShowingFreeOffersOnly}
		/>
	);
};

export default FreeOffersCheckbox;
