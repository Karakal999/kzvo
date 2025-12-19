import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguageRoute } from '../hooks/useLanguageRoute';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  noindex?: boolean;
  canonical?: string;
}

/**
 * SEO Component with multilingual support
 * 
 * Features:
 * - Meta tags (title, description, keywords)
 * - Open Graph tags
 * - Twitter Card tags
 * - hreflang tags for language alternatives
 * - Canonical URL
 * 
 * @example
 * <SEOHead
 *   title="About Us"
 *   description="Learn more about our academy"
 *   image="/images/about.jpg"
 * />
 */
const SEOHead = ({
  title,
  description,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  keywords,
  noindex = false,
  canonical,
}: SEOHeadProps) => {
  const location = useLocation();
  const { lang } = useLanguageRoute();

  // Base URL - should be from environment
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://academy.ua';
  
  // Current URL
  const currentUrl = `${baseUrl}${location.pathname}`;
  
  // Canonical URL (custom or current)
  const canonicalUrl = canonical || currentUrl;
  
  // Image URL (absolute)
  const imageUrl = image?.startsWith('http') ? image : `${baseUrl}${image}`;
  
  // Site name
  const siteName = 'Академія Педагогічної Освіти | Academy of Pedagogical Education';
  
  // Full title
  const fullTitle = `${title} | ${siteName}`;
  
  // Get path without language prefix
  const pathWithoutLang = location.pathname.replace(/^\/(uk|en)/, '') || '/';
  
  // Language alternatives
  const alternateUrls = {
    uk: `${baseUrl}/uk${pathWithoutLang}`,
    en: `${baseUrl}/en${pathWithoutLang}`,
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      {author && <meta name="author" content={author} />}
      
      {/* Language */}
      <html lang={lang || 'uk'} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang Tags */}
      <link rel="alternate" hrefLang="uk" href={alternateUrls.uk} />
      <link rel="alternate" hrefLang="en" href={alternateUrls.en} />
      <link rel="alternate" hrefLang="x-default" href={alternateUrls.uk} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : 'uk_UA'} />
      <meta property="og:locale:alternate" content={lang === 'en' ? 'uk_UA' : 'en_US'} />
      
      {image && (
        <>
          <meta property="og:image" content={imageUrl} />
          <meta property="og:image:alt" content={title} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}
      
      {type === 'article' && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={imageUrl} />}
      
      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#1e40af" />
    </Helmet>
  );
};

export default SEOHead;
