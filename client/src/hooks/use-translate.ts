import { translations } from "@/config/translations";
import type { LanguageCode, TranslationStructure } from "@/config/translations";
import { useLanguage } from "@/contexts/language-context";

type TranslationValue = string | Partial<TranslationStructure>;

export function useTranslate() {
  const { currentLanguage } = useLanguage();

  function t(key: string, params?: Record<string, string>) {
    const keys = key.split(".");
    const langCode = currentLanguage.code as LanguageCode;
    let result: TranslationValue = translations[langCode];

    for (const k of keys) {
      if (!result || typeof result !== "object") {
        return key; // Return the key if translation not found
      }
      result = (result as Record<string, TranslationValue>)[k];
    }

    if (typeof result !== "string") {
      return key;
    }

    if (params) {
      return Object.entries(params).reduce((str, [key, value]) => {
        return str.replace(new RegExp(`{{${key}}}`, "g"), value);
      }, result);
    }

    return result;
  }

  return t;
} 