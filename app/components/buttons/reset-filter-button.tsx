import React from "react";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";

interface ResetFilterButtonProps {
	onClick: () => void;
}

const ResetFilterButton: React.FC<ResetFilterButtonProps> = ({ onClick }) => {
	const language = useLanguage();
	const i18n = useI18n(language);
	return (
		<button
			className="text-link-blue flex justify-center items-center w-fit h-[43px] hover:underline"
			onClick={onClick}
		>
			{i18n["filter.reset"]}
		</button>
	);
};

export default ResetFilterButton;
