import { useLanguage } from "@/contexts/language-context";
import { translations } from "@/config/translations";

type LanguageCode = 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta' | 'gu' | 'kn' | 'ml' | 'pa' | 'ur';
type TranslationValue = string | { [key: string]: TranslationValue };
type TranslationsType = { [key in LanguageCode]: { [key: string]: TranslationValue } };

export function useTranslate() {
  const { currentLanguage } = useLanguage();

  const t = (key: string, params?: Record<string, string>) => {
    const keys = key.split(".");
    let result: TranslationValue = (translations as TranslationsType)[currentLanguage.code as LanguageCode];
    
    for (const k of keys) {
      if (!result || typeof result !== "object") {
        console.warn(`Translation not found for key: ${key} in language: ${currentLanguage.code}`);
        return key;
      }
      result = (result as { [key: string]: TranslationValue })[k];
    }

    if (typeof result !== "string") {
      console.warn(`Translation not found for key: ${key} in language: ${currentLanguage.code}`);
      return key;
    }

    if (params) {
      return Object.entries(params).reduce(
        (str: string, [paramKey, value]) => str.replace(`{${paramKey}}`, value),
        result
      );
    }

    return result;
  };

  return { t };
} 