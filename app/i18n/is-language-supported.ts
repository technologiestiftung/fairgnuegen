import { type AvailableLanguages, translations } from "~/i18n/translations.ts";

export function isLanguageSupported(
	language: string,
): language is AvailableLanguages {
	return language in translations;
}
