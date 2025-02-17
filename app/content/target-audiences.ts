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
	children: { label: "targetAudience.children.label", valueInData: "Kinder" },
	adults: { label: "targetAudience.adults.label", valueInData: "Erwachsene" },
	family: { label: "targetAudience.family.label", valueInData: "Familie" },
	senior: { label: "targetAudience.senior.label", valueInData: "Senioren" },
};
