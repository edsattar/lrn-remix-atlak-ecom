import locales from "./locales";

const languages = Object.keys(locales);
export const supportedLngs = [...languages];
type Language = (typeof languages)[number];

export const isSupportedLanguage = (lang: string) => {
	return supportedLngs.includes(lang as any);
};

type Resource = {
	translation: typeof locales.en;
};

const resources: Record<Language, Resource> = {
	en: { translation: locales.en },
	es: { translation: locales.es },
};

export const config = {
	supportedLngs,
	fallbackLng: "en",
	defaultNS: "translation",
	resources,
};
