import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	TargetAudienceIdentifier,
	targetAudiencesMap,
} from "../content/target-audiences";

export function useTargetAudiences() {
	const [searchParams] = useSearchParams();
	const [targetAudiences, setTargetAudiences] = useState<
		TargetAudienceIdentifier[]
	>([]);

	useEffect(() => {
		const rawTargetAudiences = searchParams.get("target_audience");
		const parsedTargetAudiences = rawTargetAudiences
			? rawTargetAudiences.split(",")
			: [];
		setTargetAudiences(parsedTargetAudiences as TargetAudienceIdentifier[]);
	}, [searchParams]);

	return {
		targetAudiences,
		targetAudienceValues: targetAudiences.map((d) => targetAudiencesMap[d]),
	};
}
