import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

/**
 * Main Layout Component
 * 
 * Provides the main structure for all pages including:
 * - Language-aware HTML attributes
 * - Header with navigation
 * - Breadcrumbs
 * - Main content area
 * - Footer
 */
const MainLayout = () => {
  const { i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  // Sync i18n with URL language
  useEffect(() => {
    const urlLang = lang || 'uk';
    
    // IMPORTANT: Always sync i18n with URL language
    // This ensures that URL is the source of truth
    if (i18n.language !== urlLang) {
      console.log(`[MainLayout] Syncing language: ${i18n.language} -> ${urlLang}`);
      i18n.changeLanguage(urlLang);
      
      // Also update localStorage to match URL
      const legacyLang = urlLang === 'en' ? 'EN' : 'UA';
      localStorage.setItem('language', legacyLang);
      localStorage.setItem('i18nextLng', urlLang);
    }
    
    // Set language attribute for accessibility and SEO
    document.documentElement.setAttribute('lang', urlLang);
    
    // Set direction (for future RTL languages like Arabic)
    // Currently both uk and en are LTR
    const direction = 'ltr'; // Both uk and en are left-to-right
    document.documentElement.setAttribute('dir', direction);
    
    // Add language class to body for CSS styling if needed
    document.body.className = `lang-${urlLang}`;
    
    // Only depend on lang from URL, not on i18n object to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Breadcrumbs />
      <main className="flex-grow bg-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
