import english from "../../resources/locales/en/common.json";
import spanish from "../../resources/locales/es/common.json";

const languages = ["en", "bs"] as const;
export const supportedLanguages = [...languages];
export type Language = (typeof languages)[number];

export type Resource = {
  common: typeof english;
};

export const resources: Record<Language, Resource> = {
  en: { common: english },
  bs: { common: spanish },
};

export const returnLanguageIfSupported = (
  lang?: string,
): Language | undefined => {
  if (supportedLanguages.includes(lang as Language)) {
    return lang as Language;
  }
  return undefined;
};
