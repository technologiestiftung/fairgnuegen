import { type AvailableLanguages, translations } from "~/i18n/translations";
import { isLanguageSupported } from "~/i18n/is-language-supported";

export function useI18n(
	language: AvailableLanguages | string,
): Record<string, string> {
	if (isLanguageSupported(language)) {
		return translations[language];
	}

	return translations["de"];
}
