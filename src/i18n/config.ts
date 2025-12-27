import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector'; // DISABLED: Conflicts with URL-based language

// Import translation files
import commonUk from '../locales/uk/common.json';
import navigationUk from '../locales/uk/navigation.json';
import pagesUk from '../locales/uk/pages.json';
import aboutUk from '../locales/uk/about.json';
import newsUk from '../locales/uk/news.json';
import mediaUk from '../locales/uk/media.json';
import competitionsUk from '../locales/uk/competitions.json';
import authUk from '../locales/uk/auth.json';

import commonEn from '../locales/en/common.json';
import navigationEn from '../locales/en/navigation.json';
import pagesEn from '../locales/en/pages.json';
import aboutEn from '../locales/en/about.json';
import newsEn from '../locales/en/news.json';
import mediaEn from '../locales/en/media.json';
import competitionsEn from '../locales/en/competitions.json';
import authEn from '../locales/en/auth.json';

// Translation resources
const resources = {
  uk: {
    common: commonUk,
    navigation: navigationUk,
    pages: pagesUk,
    about: aboutUk,
    news: newsUk,
    media: mediaUk,
    competitions: competitionsUk,
    translation: authUk, // auth translations
  },
  en: {
    common: commonEn,
    navigation: navigationEn,
    pages: pagesEn,
    about: aboutEn,
    news: newsEn,
    media: mediaEn,
    competitions: competitionsEn,
    translation: authEn, // auth translations
  },
};

// Language is now controlled by URL routing (/:lang/...)
// We don't use automatic detection to avoid conflicts

i18n
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    
    // Default language (fallback)
    lng: 'uk', // Set initial language
    fallbackLng: 'uk',
    
    // Allowed languages
    supportedLngs: ['uk', 'en'],
    
    // Default namespace
    defaultNS: 'common',
    
    // Namespaces to load by default
        ns: ['common', 'navigation', 'pages', 'about', 'news', 'media', 'competitions', 'translation'],
    
    // Interpolation options
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    
    // React options
    react: {
      useSuspense: false, // Disabled to avoid hydration issues
    },
    
    // Debug mode (set to false in production)
    debug: true, // Always true in dev to see what's happening
    
    // Return empty string for missing keys instead of showing key
    returnEmptyString: false,
    
    // Return null for missing keys
    returnNull: false,
  });

// Update HTML lang attribute when language changes
i18n.on('languageChanged', (lng) => {
  console.log(`[i18n] Language changed to: ${lng}`);
  document.documentElement.setAttribute('lang', lng);
  localStorage.setItem('i18nextLng', lng);
  
  // Also update legacy format for LanguageContext
  const legacyLang = lng === 'en' ? 'EN' : 'UA';
  localStorage.setItem('language', legacyLang);
});

// Log initial state
console.log('[i18n] Initialized with language:', i18n.language);
console.log('[i18n] Available namespaces:', Object.keys(resources.uk));

export default i18n;

