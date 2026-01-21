import { useEffect } from "react";

export function useUpdateSearchInput({
	searchURLQueryValue,
	searchInputValue,
	setSearchInputValue,
}: {
	searchURLQueryValue: string;
	searchInputValue: string;
	setSearchInputValue: (value: string) => void;
}) {
	useEffect(() => {
		if (searchURLQueryValue !== searchInputValue) {
			setSearchInputValue(searchURLQueryValue);
		}
	}, [searchURLQueryValue]);
}
