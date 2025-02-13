export type DistrictIdentifier =
	| "charlottenburg-wilmersdorf"
	| "friedrichshain-kreuzberg"
	| "lichtenberg"
	| "marzahn-hellersdorf"
	| "mitte"
	| "neukölln"
	| "pankow"
	| "reinickendorf"
	| "spandau"
	| "steglitz-zehlendorf"
	| "tempelhof-schöneberg"
	| "treptow-köpenick";

export type DistrictsMap = {
	[K in DistrictIdentifier]: string;
};

export const districtsMap: DistrictsMap = {
	"charlottenburg-wilmersdorf": "Charlottenburg-Wilmersdorf",
	"friedrichshain-kreuzberg": "Friedrichshain-Kreuzberg",
	lichtenberg: "Lichtenberg",
	"marzahn-hellersdorf": "Marzahn-Hellersdorf",
	mitte: "Mitte",
	neukölln: "Neukölln",
	pankow: "Pankow",
	reinickendorf: "Reinickendorf",
	spandau: "Spandau",
	"steglitz-zehlendorf": "Steglitz-Zehlendorf",
	"tempelhof-schöneberg": "Tempelhof-Schöneberg",
	"treptow-köpenick": "Treptow-Köpenick",
};
