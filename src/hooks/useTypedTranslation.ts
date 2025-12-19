import { useTranslation as useI18nextTranslation } from 'react-i18next';
import type { Namespace } from '../types/translations';

/**
 * Typed hook for translations with full TypeScript support
 * 
 * Provides autocomplete and type checking for translation keys.
 * 
 * @param namespace - The namespace to use (common, navigation, pages)
 * @returns Translation function and i18n instance
 * 
 * @example
 * // Single namespace
 * const { t } = useTypedTranslation('common');
 * t('buttons.read_more'); // ✅ Autocomplete works
 * 
 * @example
 * // Multiple namespaces
 * const { t } = useTypedTranslation(['common', 'navigation']);
 * t('common:buttons.submit');
 * t('navigation:menu.about');
 * 
 * @example
 * // With interpolation
 * const { t } = useTypedTranslation('common');
 * t('validation.min_length', { count: 8 });
 */
export const useTypedTranslation = (namespace?: Namespace | Namespace[]) => {
  return useI18nextTranslation(namespace);
};

/**
 * Hook for common translations (buttons, labels, errors, etc.)
 * 
 * @example
 * const { t } = useCommonTranslation();
 * <button>{t('buttons.download')}</button>
 */
export const useCommonTranslation = () => {
  return useI18nextTranslation('common');
};

/**
 * Hook for navigation translations (header, menu, footer)
 * 
 * @example
 * const { t } = useNavigationTranslation();
 * <nav>{t('menu.about')}</nav>
 */
export const useNavigationTranslation = () => {
  return useI18nextTranslation('navigation');
};

/**
 * Hook for page-specific translations
 * 
 * @example
 * const { t } = usePageTranslation();
 * <h1>{t('home.title')}</h1>
 */
export const usePageTranslation = () => {
  return useI18nextTranslation('pages');
};

/**
 * Hook for multiple namespaces
 * 
 * @example
 * const { t } = useMultipleNamespaces(['common', 'pages']);
 * <button>{t('common:buttons.submit')}</button>
 * <h1>{t('pages:home.title')}</h1>
 */
export const useMultipleNamespaces = (namespaces: Namespace[]) => {
  return useI18nextTranslation(namespaces);
};

/**
 * Hook to get current language and change language function
 * 
 * @example
 * const { language, changeLanguage } = useLanguageControl();
 * <button onClick={() => changeLanguage('en')}>EN</button>
 */
export const useLanguageControl = () => {
  const { i18n } = useI18nextTranslation();
  
  return {
    language: i18n.language,
    changeLanguage: (lng: 'uk' | 'en') => i18n.changeLanguage(lng),
    languages: i18n.languages,
  };
};

