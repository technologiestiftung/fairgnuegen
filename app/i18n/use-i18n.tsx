import { type AvailableLanguages, translations } from "~/i18n/translations.ts";
import { isLanguageSupported } from "~/i18n/is-language-supported.ts";

export function useI18n(
	language: AvailableLanguages | string,
): Record<string, string> {
	if (isLanguageSupported(language)) {
		return translations[language];
	}

	return translations["de"];
}
