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
			className={`
				text-link-blue flex justify-center items-center w-fit h-[43px] hover:underline
				focus-visible:outline focus-visible:outline-3 
				focus-visible:outline-berlin-blue 
				focus-visible:outline-offset-0 
				focus-visible:shadow-default-button-focus-shadow
			`}
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
			<span className="col-start-1 row-start-1 flex flex-row gap-2 items-center">
				<span className="scale-75">
					<ArrowLeftIcon></ArrowLeftIcon>
				</span>
				<span>{title}</span>
			</span>
		</button>
	);
};

export default BackButton;
