import React from "react";
import ArrowLeftIcon from "../icons/arrow-left-icon";
import { useLanguage } from "../../hooks/use-language";
import { useI18n } from "../../i18n/use-i18n";

const BackButton: React.FC = () => {
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<button
			className="px-3 py-1 border-black border-2 opacity-100 hover:opacity-50 flex justify-center items-center text-black w-60 h-[43px]"
			onClick={() => {
				window.history.back();
			}}
		>
			<div className="col-start-1 row-start-1 flex flex-row gap-2 items-center">
				<ArrowLeftIcon></ArrowLeftIcon>
				<div>{i18n["return"]}</div>
			</div>
		</button>
	);
};

export default BackButton;
