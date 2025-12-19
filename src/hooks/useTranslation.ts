import { useTranslation as useI18nextTranslation } from 'react-i18next';

/**
 * Custom hook for translations with TypeScript support
 * 
 * Usage:
 * const { t } = useTranslation('namespace');
 * t('key.path')
 */
export const useTranslation = (namespace?: 'common' | 'navigation' | 'pages' | Array<'common' | 'navigation' | 'pages'>) => {
  return useI18nextTranslation(namespace);
};

/**
 * Hook for common translations (most used namespace)
 */
export const useCommonTranslation = () => {
  return useI18nextTranslation('common');
};

/**
 * Hook for navigation translations
 */
export const useNavigationTranslation = () => {
  return useI18nextTranslation('navigation');
};

/**
 * Hook for page-specific translations
 */
export const usePageTranslation = () => {
  return useI18nextTranslation('pages');
};

