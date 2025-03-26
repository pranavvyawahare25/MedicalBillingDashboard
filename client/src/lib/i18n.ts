import { useLanguage } from "@/contexts/language-context";

type TranslationValue = string | { [key: string]: TranslationValue };

const translations: Record<'en' | 'hi' | 'mr' | 'ta', { common: { [key: string]: string } }> = {
  en: {
    common: {
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
    }
  },
  hi: {
    common: {
      save: "सहेजें",
      cancel: "रद्द करें",
      delete: "हटाएं",
      edit: "संपादित करें",
      add: "जोड़ें",
    }
  },
  mr: {
    common: {
      save: "जतन करा",
      cancel: "रद्द करा",
      delete: "हटवा",
      edit: "संपादित करा",
      add: "जोडा",
    }
  },
  ta: {
    common: {
      save: "சேமி",
      cancel: "ரத்து",
      delete: "அழி",
      edit: "திருத்து",
      add: "சேர்",
    }
  }
};

export const useTranslation = () => {
  const { currentLanguage } = useLanguage();

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage.code as keyof typeof translations];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return t;
};
