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
	i18nKey: string;
	isRenderedInCategoryCards: boolean;
};

export type CategoryMap = {
	[K in CategoryIdentifier]: CategoryDetails;
};

export const categoryMap: CategoryMap = {
	all: {
		color: "bg-primary-blue",
		textColor: undefined,
		name: "Alle Angebote",
		image: "",
		i18nKey: "categories.all",
		isRenderedInCategoryCards: false,
	},
	kultur: {
		color: "bg-culture",
		textColor: "text-white",
		name: "Kultur",
		image: "kultur",
		i18nKey: "categories.kultur",
		isRenderedInCategoryCards: true,
	},
	sport: {
		color: "bg-sport",
		textColor: "text-black",
		name: "Sport",
		image: "sport",
		i18nKey: "categories.sport",
		isRenderedInCategoryCards: true,
	},
	bildung_beratung: {
		color: "bg-education",
		textColor: "text-black",
		name: "Bildung & Beratung",
		image: "bildung",
		i18nKey: "categories.bildung_beratung",
		isRenderedInCategoryCards: true,
	},
	freizeit: {
		color: "bg-leisure",
		textColor: "text-black",
		name: "Freizeit",
		image: "freizeit",
		i18nKey: "categories.freizeit",
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
