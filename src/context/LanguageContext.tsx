import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { translations } from '../locales/translations';

type Language = 'UA' | 'EN';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get saved language from localStorage or default to UA
    const saved = localStorage.getItem('language');
    return (saved === 'EN' ? 'EN' : 'UA') as Language;
  });

  useEffect(() => {
    // Save language to localStorage when it changes
    localStorage.setItem('language', language);
    // Update document lang attribute
    document.documentElement.lang = language === 'UA' ? 'uk' : 'en';
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.UA] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

