import { useSearchParams } from "react-router-dom";
import useUpdateSearchParam from "./use-update-search-params";

export function useFreeOffersOnly() {
	const { updateSearchParam } = useUpdateSearchParam();
	const [searchParams] = useSearchParams();
	const showFreeOffersOnly = (searchParams.get("free") ?? "false") === "true";
	const setShowFreeOffersOnly = (value: boolean) => {
		updateSearchParam("free", value ? "true" : "false");
	};
	return { showFreeOffersOnly, setShowFreeOffersOnly };
}
