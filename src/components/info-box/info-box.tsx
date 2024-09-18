import React from "react";
import LinkIcon from "../icons/link-icon";
import RocketIconLarge from "../icons/rocket-icon-large";

interface InfoBoxProps {
	showProviderHint: boolean;
	maxWidth: string;
}

export const InfoBox: React.FC<InfoBoxProps> = ({
	showProviderHint,
	maxWidth,
}) => {
	return (
		<div className="w-full py-10 bg-berlin-light-green flex flex-col gap-8 px-4 lg:px-0">
			<div
				className={`${maxWidth} flex flex-col mx-auto flex flex-row justify-center items-center`}
			>
				<div className="grid grid-rows-1 grid-cols-1">
					<div className="row-start-1 col-start-1 p-8 bg-white flex flex-col gap-4">
						<div>
							Mit dem Berechtigungsnachweis Berlin-Ticket S können Menschen, die
							Sozialhilfe erhalten, den öffentlichen Nahverkehr sowie Sport-,
							Bildungs-, Kultur- und Freizeitangebote kostenlos oder vergünstigt
							nutzen. Viel Spaß!
						</div>

						<a
							href={
								"https://www.berlin.de/sen/soziales/soziale-sicherung/bn-berlin-ticket-s/"
							}
							className="text-link-blue flex flex-row items-center gap-1 justify-start md:justify-end hover:underline"
							target="_blank"
							rel="noreferrer"
						>
							<div className="">Mehr Infos zum Berechtigungsnachweis</div>
							<div className="min-w-20 md:min-w-10">
								<LinkIcon></LinkIcon>
							</div>
						</a>
					</div>
					<div className="pointer-events-none row-start-1 col-start-1 w-[50%] border-t-4 border-b-4 border-l-4 border-berlin-pink"></div>
					<div className="pointer-events-none row-start-1 col-start-1 ml-[50%] w-[50%] border-t-4 border-b-4 border-r-4 border-berlin-green"></div>
				</div>
			</div>
			{showProviderHint && (
				<div
					className={`${maxWidth} flex flex-col mx-auto justify-center items-center`}
				>
					<div className="border border-berlin-green border-4 p-8 flex flex-row gap-8 items-center break-words">
						<div className="min-w-8">
							<RocketIconLarge></RocketIconLarge>
						</div>

						<div>
							Sie sind Anbieter und möchten sich mit einem Angebot sozial für
							Berlinerinnen und Berliner engagieren? Schreiben Sie uns gerne an
							und wir nehmen Ihr Angebot auf. Sie haben noch weitere Fragen?
							<br />
							<a
								href="mailto:berechtigungsnachweis@jugendkulturservice.de"
								className="text-link-blue hover:underline"
							>
								Kontaktieren Sie uns
							</a>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
