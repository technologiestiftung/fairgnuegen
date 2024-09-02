export type CategoryIdentifier =
	| "kultur"
	| "freizeit"
	| "bildung_beratung"
	| "sport"
	| "all";

export type CategoryDetails = {
	color: string;
	name: string;
	image: string;
	description: string;
	isRendered: boolean;
};

export type CategoryMap = {
	[K in CategoryIdentifier]: CategoryDetails;
};

export const categoryMap: CategoryMap = {
	kultur: {
		color: "bg-culture",
		name: "Kultur",
		image: "/kultur.jpg",
		description: "Angebote fürs Museum, Theater, Konzerte und vieles mehr",
		isRendered: true,
	},
	sport: {
		color: "bg-sport",
		name: "Sport",
		image: "/sport.jpg",
		description:
			"Angebote um körperlich fit zu bleiben oder den Sport zu feiern",
		isRendered: true,
	},
	bildung_beratung: {
		color: "bg-education",
		name: "Bildung & Beratung",
		image: "/bildung.jpg",
		description: "Weiterbildungs- und Beratungsangebote",
		isRendered: true,
	},
	freizeit: {
		color: "bg-leisure",
		name: "Freizeit",
		image: "/freizeit.jpg",
		description:
			"Angebote fürs Kino, Restaurants, Bars und Aktivitäten an der freien Luft",
		isRendered: true,
	},
	all: {
		color: "bg-primary-blue",
		name: "Alle Angebote",
		image: "",
		description: "",
		isRendered: false,
	},
};

export function getCategory(value: string | null): CategoryIdentifier {
	if (!value) {
		return "all";
	}

	if (isValidCategory(value)) {
		return value;
	}

	return "all";
}

function isValidCategory(value: string | null): value is CategoryIdentifier {
	return Object.keys(categoryMap).includes(value ?? "");
}
