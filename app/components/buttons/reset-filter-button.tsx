import React from "react";
import { useLanguage } from "~/hooks/use-language";
import { useI18n } from "~/i18n/use-i18n";
import { Button } from "~/components/buttons/button";

interface ResetFilterButtonProps {
	onClick: () => void;
}

const ResetFilterButton: React.FC<ResetFilterButtonProps> = ({ onClick }) => {
	const language = useLanguage();
	const i18n = useI18n(language);
	return (
		<Button
			className="text-link-blue flex justify-center items-center w-fit h-[43px] hover:underline"
			onClick={onClick}
		>
			{i18n["filter.reset"]}
		</Button>
	);
};

export default ResetFilterButton;
