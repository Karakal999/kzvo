import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  variant?: 'default' | 'compact' | 'dropdown';
  className?: string;
}

/**
 * Language Switcher Component
 * 
 * Allows users to switch between Ukrainian and English languages.
 * Saves preference to localStorage automatically.
 * 
 * @example
 * // Default style with flags
 * <LanguageSwitcher />
 * 
 * @example
 * // Compact style
 * <LanguageSwitcher variant="compact" />
 * 
 * @example
 * // Dropdown style
 * <LanguageSwitcher variant="dropdown" />
 */
const LanguageSwitcher = ({ variant = 'default', className = '' }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation('navigation');

  const handleLanguageChange = (lang: 'UA' | 'EN') => {
    setLanguage(lang);
    // Language is automatically saved to localStorage by LanguageContext
  };

  // Default variant with flags and text
  if (variant === 'default') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          onClick={() => handleLanguageChange('UA')}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-lg
            transition-all duration-200 font-medium
            ${language === 'UA' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
          aria-label={t('header.lang_ua')}
          aria-current={language === 'UA' ? 'true' : 'false'}
        >
          <span className="text-lg">🇺🇦</span>
          <span className="text-sm">UA</span>
        </button>

        <button
          onClick={() => handleLanguageChange('EN')}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-lg
            transition-all duration-200 font-medium
            ${language === 'EN' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
          aria-label={t('header.lang_en')}
          aria-current={language === 'EN' ? 'true' : 'false'}
        >
          <span className="text-lg">🇬🇧</span>
          <span className="text-sm">EN</span>
        </button>
      </div>
    );
  }

  // Compact variant - flags only
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <button
          onClick={() => handleLanguageChange('UA')}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center
            transition-all duration-200 text-2xl
            ${language === 'UA' 
              ? 'bg-blue-100 ring-2 ring-blue-600' 
              : 'hover:bg-gray-100'
            }
          `}
          aria-label={t('header.lang_ua')}
          aria-current={language === 'UA' ? 'true' : 'false'}
          title="Українська"
        >
          🇺🇦
        </button>

        <button
          onClick={() => handleLanguageChange('EN')}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center
            transition-all duration-200 text-2xl
            ${language === 'EN' 
              ? 'bg-blue-100 ring-2 ring-blue-600' 
              : 'hover:bg-gray-100'
            }
          `}
          aria-label={t('header.lang_en')}
          aria-current={language === 'EN' ? 'true' : 'false'}
          title="English"
        >
          🇬🇧
        </button>
      </div>
    );
  }

  // Dropdown variant
  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value as 'UA' | 'EN')}
          className="
            appearance-none bg-white border border-gray-300 rounded-lg
            px-4 py-2 pr-8 cursor-pointer
            hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-colors duration-200
          "
          aria-label="Language selector"
        >
          <option value="UA">🇺🇦 Українська</option>
          <option value="EN">🇬🇧 English</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    );
  }

  return null;
};

export default LanguageSwitcher;

