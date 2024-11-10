import locales from "./locales";

const languages = ["en", "es"] as const;
export const supportedLngs = [...languages];
export type Language = (typeof languages)[number];

export type Resource = {
  translation: typeof locales.en;
};

export const resources: Record<Language, Resource> = {
  en: { translation: locales.en },
  es: { translation: locales.es },
};

export const returnLanguageIfSupported = (
  lang?: string,
): Language | undefined => {
  if (supportedLngs.includes(lang as Language)) {
    return lang as Language;
  }
  return undefined;
};
