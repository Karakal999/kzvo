import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface LanguageAlternatesProps {
  /**
   * Custom slug for each language (if different from URL path)
   */
  slugs?: {
    uk: string;
    en: string;
  };
  /**
   * Base path (default: current path without language prefix)
   */
  basePath?: string;
}

/**
 * Component to add hreflang tags for language alternatives
 * 
 * Use this when you have content with different slugs per language
 * or when you need more control over language alternatives.
 * 
 * @example
 * // Same path for all languages
 * <LanguageAlternates />
 * 
 * @example
 * // Different slugs per language
 * <LanguageAlternates
 *   slugs={{
 *     uk: 'pro-nas',
 *     en: 'about-us'
 *   }}
 * />
 */
const LanguageAlternates = ({ slugs, basePath }: LanguageAlternatesProps) => {
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://academy.ua';

  // Get path without language prefix if not provided
  const path = basePath || location.pathname.replace(/^\/(uk|en)/, '') || '/';

  // Generate URLs
  const urls = slugs
    ? {
        uk: `${baseUrl}/uk/${slugs.uk}`,
        en: `${baseUrl}/en/${slugs.en}`,
      }
    : {
        uk: `${baseUrl}/uk${path}`,
        en: `${baseUrl}/en${path}`,
      };

  return (
    <Helmet>
      <link rel="alternate" hrefLang="uk" href={urls.uk} />
      <link rel="alternate" hrefLang="en" href={urls.en} />
      <link rel="alternate" hrefLang="x-default" href={urls.uk} />
    </Helmet>
  );
};

/**
 * Hook to generate language alternate URLs
 */
export function useLanguageAlternates(slugs?: { uk: string; en: string }) {
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://academy.ua';
  const path = location.pathname.replace(/^\/(uk|en)/, '') || '/';

  if (slugs) {
    return {
      uk: `${baseUrl}/uk/${slugs.uk}`,
      en: `${baseUrl}/en/${slugs.en}`,
    };
  }

  return {
    uk: `${baseUrl}/uk${path}`,
    en: `${baseUrl}/en${path}`,
  };
}

export default LanguageAlternates;

