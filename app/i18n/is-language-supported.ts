import { type AvailableLanguages, translations } from "~/i18n/translations";

export function isLanguageSupported(
	language: string,
): language is AvailableLanguages {
	return language in translations;
}
