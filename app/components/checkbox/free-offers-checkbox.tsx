import React from "react";
import { useFreeOffersOnly } from "~/hooks/use-free-offers-only.tsx";
import { trackInteraction } from "~/analytics/matomo.ts";
import Checkbox from "~/components/checkbox/checkbox.tsx";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";

const FreeOffersCheckbox: React.FC = () => {
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
			id={"free-only"}
			label={label}
			onChange={onChange}
			isChecked={isShowingFreeOffersOnly}
		/>
	);
};

export default FreeOffersCheckbox;
