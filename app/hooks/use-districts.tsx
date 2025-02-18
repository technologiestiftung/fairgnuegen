import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { type DistrictIdentifier, districtsMap } from "~/content/districts.ts";

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
		districtValues: districts.map((d) => districtsMap[d]),
	};
}
