import { useSearchParams } from "react-router-dom";
import useUpdateSearchParam from "./use-update-search-params";

export function useFreeOffersOnly() {
	const { updateSearchParam } = useUpdateSearchParam();
	const [searchParams] = useSearchParams();
	const isShowingFreeOffersOnly =
		(searchParams.get("free") ?? "false") === "true";
	const toggleIsShowingFreeOffersOnly = () => {
		updateSearchParam("free", isShowingFreeOffersOnly ? "false" : "true");
	};
	return {
		isShowingFreeOffersOnly,
		toggleIsShowingFreeOffersOnly,
	};
}
