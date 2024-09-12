export type TargetAudienceIdentifier =
	| "children"
	| "adults"
	| "family"
	| "senior";

export type TargetAudienceDetail = {
	label: string;
	valueInData: string;
};

export type TargetAudienceMap = {
	[K in TargetAudienceIdentifier]: TargetAudienceDetail;
};

export const targetAudiencesMap: TargetAudienceMap = {
	children: { label: "Kinder und Jugendliche", valueInData: "Kinder" },
	adults: { label: "Erwachsene", valueInData: "Erwachsene" },
	family: { label: "Familie", valueInData: "Familie" },
	senior: { label: "Senior:innen", valueInData: "Senioren" },
};
