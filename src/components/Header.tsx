import { Menu, X, Search, GraduationCap, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchModal from './SearchModal';
import LanguageSwitcher from './LanguageSwitcher';
import LinkWithLang from './LinkWithLang';
import { useTranslation } from 'react-i18next';
import { UserMenu } from './auth/UserMenu';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t } = useTranslation('navigation');
  const { user } = useAuth();

  // Global Ctrl+K handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  const navItems = [
    { path: '/about', label: t('menu.about') },
    { path: '/activity', label: t('menu.activity') },
    { path: '/education', label: t('menu.education') },
    { path: '/teachers', label: t('menu.teachers') },
    { path: '/students', label: t('menu.students') },
    { path: '/resources', label: t('menu.resources') },
    { path: '/news', label: t('menu.news') },
    { path: '/contacts', label: t('menu.contacts') },
  ];

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>📧 {t('header.email')}</span>
            <span className="hidden md:inline">📞 {t('header.phone')}</span>
          </div>
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher variant="compact" />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <LinkWithLang to="/" className="flex items-center space-x-3">
            <div className="bg-primary p-2 rounded-lg">
              <GraduationCap className="h-8 w-8 text-accent" />
            </div>
            <div className="hidden lg:block">
              <div className="text-primary font-bold text-lg leading-tight">
                {t('header.academy')}
              </div>
              <div className="text-primary text-sm">
                {t('header.academy_full')}
              </div>
            </div>
          </LinkWithLang>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => (
              <LinkWithLang
                key={item.path}
                to={item.path}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md transition-colors"
              >
                {item.label}
              </LinkWithLang>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-full transition-colors"
              aria-label={`${t('header.search')} (Ctrl+K)`}
              title={`${t('header.search')} (Ctrl+K)`}
            >
              <Search className="h-5 w-5" />
            </button>

            {/* User Menu or Login Button */}
            {user ? (
              <UserMenu />
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>{t('auth.login.title', { defaultValue: 'Вхід' })}</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="xl:hidden p-2 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t('header.menu')}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="xl:hidden mt-4 pb-4 animate-slideDown">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <LinkWithLang
                  key={item.path}
                  to={item.path}
                  className="px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </LinkWithLang>
              ))}
              
              {/* Mobile Login Button */}
              {!user && (
                <Link
                  to="/login"
                  className="sm:hidden flex items-center justify-center space-x-2 px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4" />
                  <span>{t('auth.login.title', { defaultValue: 'Вхід' })}</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
    </>
  );
};

export default Header;
