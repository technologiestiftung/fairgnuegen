import en from "./translations/en";
import de from "./translations/de";

export type AvailableLanguages = keyof typeof translations;
export type TranslationKeys = keyof typeof de;

export const translations = {
	en,
	de,
};
