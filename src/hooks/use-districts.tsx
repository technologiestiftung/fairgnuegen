import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DistrictIdentifier } from "../components/buttons/filter-button";

export function useDistricts() {
	const [searchParams] = useSearchParams();
	const [districts, setDistricts] = useState<DistrictIdentifier[]>([]);

	useEffect(() => {
		const rawDistricts = searchParams.get("district");
		const parsedDistricts = rawDistricts ? rawDistricts.split(",") : [];
		setDistricts(parsedDistricts as DistrictIdentifier[]);
	}, [searchParams]);

	return {
		districts,
	};
}
