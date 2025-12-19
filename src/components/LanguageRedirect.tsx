import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isValidLanguage } from '../hooks/useLanguageRoute';

/**
 * Component to handle language redirects
 * 
 * - Redirects from root (/) to /uk/ or /en/ based on preference
 * - Handles invalid language codes
 * - Syncs URL language with i18n state
 */
const LanguageRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  
  useEffect(() => {
    const pathname = location.pathname;
    const currentI18nLang = i18n.language;
    
    // If on root path, redirect to language-prefixed path
    if (pathname === '/') {
      const savedLang = currentI18nLang || 'uk';
      const targetLang = savedLang === 'en' ? 'en' : 'uk';
      navigate(`/${targetLang}`, { replace: true });
      return;
    }
    
    // Extract language from URL
    const langMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
    
    if (langMatch) {
      const urlLang = langMatch[1];
      
      // If invalid language, redirect to Ukrainian version
      if (!isValidLanguage(urlLang)) {
        const pathWithoutLang = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');
        navigate(`/uk${pathWithoutLang}`, { replace: true });
        return;
      }
      
      // Sync i18n with URL language (only if different)
      if (currentI18nLang !== urlLang) {
        i18n.changeLanguage(urlLang);
      }
    } else {
      // No language prefix found, add current language
      const currentLang = currentI18nLang === 'en' ? 'en' : 'uk';
      navigate(`/${currentLang}${pathname}`, { replace: true });
    }
    // Only depend on pathname - i18n.language changes are handled internally
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, navigate]);
  
  return null;
};

export default LanguageRedirect;

