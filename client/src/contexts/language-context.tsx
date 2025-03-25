import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, supportedLanguages } from '@/config/languages';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (code: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    const defaultLang = supportedLanguages.find(lang => lang.code === savedLang) || supportedLanguages[0];
    return defaultLang;
  });

  useEffect(() => {
    localStorage.setItem('language', currentLanguage.code);
    document.documentElement.lang = currentLanguage.code;
    document.documentElement.dir = currentLanguage.direction || 'ltr';
    document.documentElement.setAttribute('data-language', currentLanguage.code);
  }, [currentLanguage]);

  const setLanguage = (code: string) => {
    const newLang = supportedLanguages.find(lang => lang.code === code);
    if (newLang) {
      setCurrentLanguage(newLang);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 