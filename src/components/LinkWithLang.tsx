import { Link, type LinkProps } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

/**
 * Link component with automatic language prefix
 * 
 * Automatically adds language prefix to all links based on current language.
 * 
 * @example
 * // Current language: UK
 * <LinkWithLang to="/about">About</LinkWithLang>
 * // Renders: <Link to="/uk/about">About</Link>
 * 
 * @example
 * // Current language: EN
 * <LinkWithLang to="/news">News</LinkWithLang>
 * // Renders: <Link to="/en/news">News</Link>
 * 
 * @example
 * // With additional props
 * <LinkWithLang to="/contacts" className="btn">Contact Us</LinkWithLang>
 */
const LinkWithLang = ({ to, children, ...props }: LinkProps) => {
  const { language } = useLanguage();
  
  // Convert language code (UA/EN) to route prefix (uk/en)
  const langPrefix = language === 'EN' ? 'en' : 'uk';
  
  // Handle different types of 'to' prop
  const prefixedTo = typeof to === 'string'
    ? addLanguagePrefix(to, langPrefix)
    : to;

  return (
    <Link to={prefixedTo} {...props}>
      {children}
    </Link>
  );
};

/**
 * Add language prefix to path if not already present
 */
function addLanguagePrefix(path: string, langPrefix: string): string {
  // If path is external (starts with http/https), return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // If path is just a hash or query string, return as is
  if (path.startsWith('#') || path.startsWith('?')) {
    return path;
  }
  
  // If path already has language prefix, return as is
  if (path.startsWith('/uk/') || path.startsWith('/en/')) {
    return path;
  }
  
  // Handle root path
  if (path === '/') {
    return `/${langPrefix}`;
  }
  
  // Add language prefix
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${langPrefix}${cleanPath}`;
}

export default LinkWithLang;

