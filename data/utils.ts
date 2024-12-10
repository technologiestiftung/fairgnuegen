import { Offer } from "../src/content/content";

export interface FoundOffer {
	isIdentical: boolean;
	offerDe: Offer | undefined;
	offerEn: Offer | undefined;
}

export interface ApiRow {
	id: string;
	name_anbieter: string;
	kurzbeschreibung_des_anbieters: string;
	kurzbeschreibung_des_angebots: string;
	art_der_ermaessigung: string;
	website: string;
	strasse_und_hausnummer_des_angebots: string;
	plz_und_ort_des_angebots: string;
	gratis: string;
	kategorie: string;
	zielgruppen: string;
	freigabe: string;
}

export function existsIdenticallyInData(
	offer: Offer,
	existingData: Offer[],
): FoundOffer {
	const foundDe = existingData.find((row) => {
		return row.id === offer.id;
	});
	if (!foundDe) {
		return {
			isIdentical: false,
			offerDe: undefined,
			offerEn: undefined,
		};
	}
	const isIdentical = JSON.stringify(offer) === JSON.stringify(foundDe);
	const foundEn = existingData.find((row) => {
		return row.id === `${offer.id}_en`;
	});

	if (isIdentical) {
		return {
			isIdentical: true,
			offerDe: foundDe,
			offerEn: foundEn,
		};
	}

	return {
		isIdentical: false,
		offerDe: undefined,
		offerEn: undefined,
	};
}
