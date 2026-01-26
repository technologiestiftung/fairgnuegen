import React from "react";
import ArrowLeftIcon from "~/components/icons/arrow-left-icon.tsx";
import { useLanguage } from "~/hooks/use-language.tsx";
import { useNavigate } from "react-router";
import { Button } from "~/components/buttons/button.tsx";

interface BackButtonProps {
	title: string;
}

const BackButton: React.FC<BackButtonProps> = ({ title }) => {
	const allOffersPathRegex = /^\/(?:en\/)?all-offers\/$/;
	const navigate = useNavigate();
	const language = useLanguage();

	return (
		<Button
			className={`
				text-link-blue flex justify-center items-center w-fit h-[43px] hover:underline
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
		</Button>
	);
};

export default BackButton;
