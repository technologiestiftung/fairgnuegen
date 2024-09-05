import { useSearchParams } from "react-router-dom";

const useUpdateSearchParam = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const updateSearchParam = (key: string, value: string) => {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.set(key, value);
		setSearchParams(newParams);
	};

	return updateSearchParam;
};

export default useUpdateSearchParam;
