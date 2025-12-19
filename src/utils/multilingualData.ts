import { useTranslation } from 'react-i18next';
import type { LanguageCode } from '../types/translations';

/**
 * Interface for multilingual content
 */
export interface MultilingualContent {
  uk: string;
  en: string;
}

/**
 * Hook to get translated content from multilingual data
 */
export function useMultilingualContent() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language === 'en' ? 'en' : 'uk') as LanguageCode;

  /**
   * Get translated string from multilingual content
   */
  const getContent = (content: MultilingualContent | string): string => {
    if (typeof content === 'string') {
      return content; // Legacy support for non-translated content
    }
    return content[currentLang] || content.uk; // Fallback to Ukrainian
  };

  return { getContent, currentLang };
}

/**
 * Helper to create multilingual content
 */
export function ml(uk: string, en: string): MultilingualContent {
  return { uk, en };
}

