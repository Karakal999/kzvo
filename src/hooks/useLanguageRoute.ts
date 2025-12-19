import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Valid language codes for routing
 */
export type LanguageRoute = 'uk' | 'en';

/**
 * Hook to manage language-based routing
 * 
 * @returns Current language from URL and navigation helper
 * 
 * @example
 * const { lang, navigateWithLang } = useLanguageRoute();
 * 
 * // Navigate with language prefix
 * navigateWithLang('/about'); // Goes to /uk/about or /en/about
 */
export const useLanguageRoute = () => {
  const params = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  
  const lang = (params.lang || 'uk') as LanguageRoute;
  
  // Sync URL language with i18n
  useEffect(() => {
    if (lang && (lang === 'uk' || lang === 'en')) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
    }
  }, [lang, i18n]);
  
  /**
   * Navigate to a path with current language prefix
   */
  const navigateWithLang = (path: string, options?: { replace?: boolean }) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const fullPath = `/${lang}${cleanPath}`;
    navigate(fullPath, options);
  };
  
  return {
    lang,
    navigateWithLang,
    isValidLang: lang === 'uk' || lang === 'en',
  };
};

/**
 * Get current language from URL path
 */
export const getLanguageFromPath = (pathname: string): LanguageRoute => {
  const match = pathname.match(/^\/(uk|en)(\/|$)/);
  return (match?.[1] as LanguageRoute) || 'uk';
};

/**
 * Check if language is valid
 */
export const isValidLanguage = (lang: string): lang is LanguageRoute => {
  return lang === 'uk' || lang === 'en';
};

/**
 * Add language prefix to path
 */
export const addLangToPath = (path: string, lang: LanguageRoute): string => {
  if (path.startsWith(`/${lang}/`)) return path;
  if (path === '/') return `/${lang}`;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${cleanPath}`;
};

/**
 * Remove language prefix from path
 */
export const removeLangFromPath = (path: string): string => {
  return path.replace(/^\/(uk|en)(\/|$)/, '/');
};

