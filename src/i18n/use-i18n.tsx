import { AvailableLanguages, translations } from "./translations";
import { isLanguageSupported } from "./is-language-supported";

export function useI18n(
	language: AvailableLanguages | string,
): Record<string, string> {
	if (isLanguageSupported(language)) {
		return translations[language];
	}

	return translations["de"];
}
