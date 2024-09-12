import { useSearchParams } from "react-router-dom";

interface KeyValue {
	key: string;
	value: string;
}

const useUpdateSearchParam = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const updateSearchParam = (key: string, value: string) => {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.set(key, value);
		setSearchParams(newParams);
	};

	const updateManySearchParams = (keyValuePairs: KeyValue[]) => {
		const newParams = new URLSearchParams(searchParams.toString());
		keyValuePairs.forEach(({ key, value }) => {
			newParams.set(key, value);
		});
		setSearchParams(newParams);
	};

	return { updateSearchParam, updateManySearchParams };
};

export default useUpdateSearchParam;
