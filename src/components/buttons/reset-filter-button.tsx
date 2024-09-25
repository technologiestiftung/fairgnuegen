import React from "react";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";

interface ResetFilterButtonProps {
	onClick: () => void;
}

const ResetFilterButton: React.FC<ResetFilterButtonProps> = ({ onClick }) => {
	const language = useLanguage();
	const i18n = useI18n(language);
	return (
		<div className="">
			<button
				className="px-3 py-1 border-black border-2 opacity-100 hover:opacity-50 flex justify-center items-center text-black h-[43px]"
				onClick={onClick}
			>
				<div className="flex flex-row gap-1 items-center">
					{i18n["filter.reset"]}
				</div>
			</button>
		</div>
	);
};

export default ResetFilterButton;
