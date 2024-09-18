import React from "react";

import { DrawerSearch } from "../drawer/drawer-search";
import CloseIcon from "../icons/close-icon";
import SearchBar from "../search-bar/search-bar";

interface SearchMenuProps {
	isOpen: boolean;
	close: () => void;
}

const SearchMenu: React.FC<SearchMenuProps> = ({ isOpen, close }) => {
	return (
		<DrawerSearch isOpen={isOpen} close={() => close()}>
			<div className="flex flex-col gap-4 px-6 py-4 text-base">
				<div className="flex flex-row items-center justify-end  mb-6 mt-4">
					<button onClick={() => close()}>
						<CloseIcon></CloseIcon>
					</button>
				</div>
			</div>
			<div className="flex flex-row justify-center">
				<div className="w-full px-4 md:w-[50%] flex flex-col gap-2 mt-[10vh] md:mt-[30vh]">
					<h1 className="font-bold">
						Suche auf der Internetseite{" "}
						<span>
							{'"'}Fairgnügen{'"'}
						</span>
					</h1>
					<SearchBar
						onSubmitOverride={(search) => {
							window.location.href = `/all-offers/?search=${search}`;
						}}
					></SearchBar>
				</div>
			</div>
		</DrawerSearch>
	);
};

export default SearchMenu;
