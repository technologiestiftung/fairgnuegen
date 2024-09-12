export type TargetAudienceIdentifier =
	| "children"
	| "adults"
	| "family"
	| "senior";

export type TargetAudienceMap = {
	[K in TargetAudienceIdentifier]: string;
};

export const targetAudiencesMap: TargetAudienceMap = {
	children: "Kinder und Jugendliche",
	adults: "Erwachsene",
	family: "Familie",
	senior: "Senioren",
};
