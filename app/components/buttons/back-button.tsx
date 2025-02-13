import React from "react";
import ArrowLeftIcon from "~/components/icons/arrow-left-icon.tsx";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useNavigate } from "react-router";

interface BackButtonProps {
	title: string;
}

const BackButton: React.FC<BackButtonProps> = ({ title }) => {
	const allOffersPathRegex = /^\/(?:en\/)?all-offers\/$/;
	const navigate = useNavigate();
	const language = useLanguage();

	return (
		<button
			className="text-link-blue flex justify-center items-center w-fit h-[43px] hover:underline"
			onClick={() => {
				const isAllOffersPage = allOffersPathRegex.test(
					window.location.pathname,
				);
				if (isAllOffersPage) {
					const languagePrefix = language === "de" ? "" : `/${language}`;
					navigate(`${languagePrefix}/`);
					window.scrollTo(0, 0);
					return;
				}
				window.history.back();
			}}
		>
			<div className="col-start-1 row-start-1 flex flex-row gap-2 items-center">
				<div className="scale-75">
					<ArrowLeftIcon></ArrowLeftIcon>
				</div>
				<div className="">{title}</div>
			</div>
		</button>
	);
};

export default BackButton;
