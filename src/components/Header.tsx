import { Link } from 'react-router-dom';
import { Menu, X, Search, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';
import SearchModal from './SearchModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [language, setLanguage] = useState<'UA' | 'EN'>('UA');

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
    { path: '/about', label: 'ПРО АКАДЕМІЮ' },
    { path: '/activity', label: 'ДІЯЛЬНІСТЬ' },
    { path: '/education', label: 'ОСВІТА ПРОГРАМИ' },
    { path: '/teachers', label: 'ВЧИТЕЛЮ' },
    { path: '/students', label: 'УЧНЯМ/КОНКУРСИ' },
    { path: '/resources', label: 'РЕСУРСИ' },
    { path: '/news', label: 'НОВИНИ' },
    { path: '/contacts', label: 'КОНТАКТИ' },
  ];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'UA' ? 'EN' : 'UA');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>📧 info@academy.ua</span>
            <span className="hidden md:inline">📞 +380 (44) 123-45-67</span>
          </div>
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 hover:text-accent transition-colors"
              aria-label="Змінити мову"
            >
              <span className={language === 'UA' ? 'font-bold' : ''}>UA</span>
              <span>/</span>
              <span className={language === 'EN' ? 'font-bold' : ''}>EN</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-primary p-2 rounded-lg">
              <GraduationCap className="h-8 w-8 text-accent" />
            </div>
            <div className="hidden lg:block">
              <div className="text-primary font-bold text-lg leading-tight">
                Академія
              </div>
              <div className="text-primary text-sm">
                Педагогічної Освіти
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Пошук (Ctrl+K)"
              title="Пошук (Ctrl+K)"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="xl:hidden p-2 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Відкрити меню"
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
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;
