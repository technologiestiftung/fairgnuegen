import React from "react";
import ArrowRightIcon from "../icons/arrow-right-icon";
import { TrackedAnchorLink } from "../anchor-link/tracked-anchor-link";
import { useSearchParams } from "react-router-dom";

const ShowAllButton: React.FC = () => {
	const [searchParams] = useSearchParams();

	return (
		<TrackedAnchorLink
			className="h-[43px] border-black border-2 opacity-100 flex justify-center items-center w-[250px]"
			href={`/all-offers/${searchParams.toString()}`}
		>
			<div className="flex flex-row justify-end items-center h-full w-full hover:bg-berlin-grey-light">
				<div className="w-[207px] flex flex-row items-center justify-center font-normal">
					Alle Angebote zeigen
				</div>
				<div className="h-full bg-primary-red w-[43px] flex flex-row items-center justify-center border-l-black border-l-2">
					<ArrowRightIcon color="text-white"></ArrowRightIcon>
				</div>
			</div>
		</TrackedAnchorLink>
	);
};

export default ShowAllButton;
