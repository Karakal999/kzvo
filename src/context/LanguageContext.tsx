import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { LanguageCode, TranslationFunction } from '../types/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationFunction;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Hook to access language context
 * 
 * @example
 * const { language, setLanguage, t } = useLanguage();
 * 
 * @throws Error if used outside LanguageProvider
 */
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

/**
 * Language Provider Component
 * 
 * Manages application language state and provides translation functions.
 * Automatically saves language preference to localStorage.
 * 
 * Features:
 * - Language detection from localStorage or browser
 * - Automatic persistence to localStorage
 * - Backward compatibility with legacy UA/EN format
 * - Loading state for async language changes
 * 
 * @example
 * <LanguageProvider>
 *   <App />
 * </LanguageProvider>
 */
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const { i18n, t: i18nT } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  // Map between old format (UA/EN) and i18next format (uk/en)
  const getCurrentLanguage = (): LanguageCode => {
    return i18n.language === 'en' ? 'EN' : 'UA';
  };

  const setLanguage = async (lang: LanguageCode) => {
    try {
      setIsLoading(true);
      const i18nLang = lang === 'EN' ? 'en' : 'uk';
      await i18n.changeLanguage(i18nLang);
      
      // Save to localStorage for persistence
      localStorage.setItem('language', lang);
      localStorage.setItem('i18nextLng', i18nLang);
      
      // Update HTML lang attribute for accessibility and SEO
      document.documentElement.setAttribute('lang', i18nLang);
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initialize language on mount - run only once
    const initializeLanguage = async () => {
      // Check for saved language preference (legacy format)
      const savedLang = localStorage.getItem('language');
      const currentI18nLang = i18n.language;
      
      if (savedLang === 'EN' || savedLang === 'UA') {
        const i18nLang = savedLang === 'EN' ? 'en' : 'uk';
        if (currentI18nLang !== i18nLang) {
          await i18n.changeLanguage(i18nLang);
        }
      }
      
      // Ensure HTML lang attribute is set
      const currentLang = currentI18nLang === 'en' ? 'en' : 'uk';
      document.documentElement.setAttribute('lang', currentLang);
    };

    initializeLanguage();
    // Run only on mount, not when i18n changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for language changes and update localStorage
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      const legacyLang = lng === 'en' ? 'EN' : 'UA';
      localStorage.setItem('language', legacyLang);
      document.documentElement.setAttribute('lang', lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
    // Only set up listener once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Wrapper for translation function to maintain backward compatibility
  const t: TranslationFunction = (key: string, options?: Record<string, any>): string => {
    return i18nT(key, options || {}) as string;
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language: getCurrentLanguage(), 
        setLanguage, 
        t,
        isLoading 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

