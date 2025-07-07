export type Offer = {
	id: string;
	language: string;
	path: string;
	slug: string;
	provider: string;
	providerDescription: string;
	offerDescription: string;
	offerInformation: string;
	website: string;
	addressWithHouseNumber: string;
	cityWithZip: string;
	district: string | null;
	isFree: boolean;
	category: string;
	targetGroups: string[];
	lat: number | null;
	lon: number | null;
};

export type Breadcrumb = {
	href: string;
	label: string;
	optionalTitleLabel?: string;
};

export type Content = {
	breadcrumbs: Breadcrumb[];
	offer?: Offer;
	category?: string;
};
