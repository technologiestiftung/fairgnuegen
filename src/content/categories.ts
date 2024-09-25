export type CategoryIdentifier =
	| "kultur"
	| "freizeit"
	| "bildung_beratung"
	| "sport"
	| "all";

export type CategoryDetails = {
	color: string;
	textColor?: string;
	name: string;
	image: string;
	description: string;
	isRenderedInCategoryCards: boolean;
};

export type CategoryMap = {
	[K in CategoryIdentifier]: CategoryDetails;
};

export const categoryMap: CategoryMap = {
	all: {
		color: "bg-primary-blue",
		textColor: undefined,
		name: "categories.all.name",
		image: "",
		description: "categories.all.description",
		isRenderedInCategoryCards: false,
	},
	kultur: {
		color: "bg-culture",
		textColor: "text-white",
		name: "categories.kultur.name",
		image: "kultur",
		description: "categories.kultur.description",
		isRenderedInCategoryCards: true,
	},
	sport: {
		color: "bg-sport",
		textColor: "text-black",
		name: "categories.sport.name",
		image: "sport",
		description: "categories.sport.description",
		isRenderedInCategoryCards: true,
	},
	bildung_beratung: {
		color: "bg-education",
		textColor: "text-black",
		name: "categories.bildung_beratung.name",
		image: "bildung",
		description: "categories.bildung_beratung.description",
		isRenderedInCategoryCards: true,
	},
	freizeit: {
		color: "bg-leisure",
		textColor: "text-black",
		name: "categories.freizeit.name",
		image: "freizeit",
		description: "categories.freizeit.description",
		isRenderedInCategoryCards: true,
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

export function getCategoryDetailsFromName(
	name: string | null,
): CategoryDetails | null {
	if (!name) {
		return null;
	}
	const category = Object.entries(categoryMap).find(([, c]) => c.name === name);
	if (category) {
		return category[1];
	}
	return null;
}

function isValidCategory(value: string | null): value is CategoryIdentifier {
	if (value) {
		const parsed = value.split(",");
		if (parsed.length > 1) {
			return Object.keys(categoryMap).includes(value ?? "");
		}
		return Object.keys(categoryMap).includes(value ?? "");
	}
	return false;
}
