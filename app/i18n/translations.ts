import en from "~/i18n/translations/en";
import de from "~/i18n/translations/de";

export type AvailableLanguages = keyof typeof translations;

export const translations = {
	en,
	de,
};
