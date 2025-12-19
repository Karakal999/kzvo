import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

const SEOHead = ({
  title,
  description,
  keywords,
  ogImage = '/og-default.jpg',
  ogType = 'website',
  canonical,
}: SEOHeadProps) => {
  const fullTitle = `${title} | Академія Педагогічної Освіти`;
  const siteUrl = 'https://academy.edu.ua'; // Replace with actual domain

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', `${siteUrl}${ogImage}`, true);
    updateMetaTag('og:url', canonical || window.location.href, true);
    updateMetaTag('og:site_name', 'Академія Педагогічної Освіти', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', `${siteUrl}${ogImage}`);

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'Ukrainian');
    updateMetaTag('author', 'Академія Педагогічної Освіти');

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical || window.location.href);
  }, [title, description, keywords, ogImage, ogType, canonical, fullTitle, siteUrl]);

  return null; // This component doesn't render anything
};

export default SEOHead;

// Predefined SEO data for common pages
export const SEO_DATA = {
  home: {
    title: 'Головна',
    description: 'Академія педагогічної освіти - провідний заклад підвищення кваліфікації вчителів України. Курси, олімпіади, конкурси та освітні програми.',
    keywords: 'академія освіти, підвищення кваліфікації, курси для вчителів, освітні програми, олімпіади, конкурси',
  },
  about: {
    title: 'Про Академію',
    description: 'Історія, керівництво та структура Академії педагогічної освіти. Дізнайтеся більше про наш заклад та його діяльність.',
    keywords: 'про академію, історія, керівництво, структура, педагогічна освіта',
  },
  programs: {
    title: 'Освітні програми',
    description: 'Курси підвищення кваліфікації, магістратура та аспірантура. Вибирайте програму для професійного розвитку.',
    keywords: 'освітні програми, підвищення кваліфікації, магістратура, аспірантура, курси',
  },
  competitions: {
    title: 'Олімпіади та конкурси',
    description: 'Всеукраїнські олімпіади, творчі конкурси та інтелектуальні змагання для учнів. Конкурс "Вчитель року".',
    keywords: 'олімпіади, конкурси, вчитель року, інтелектуальні змагання, учні',
  },
  resources: {
    title: 'Ресурси та документи',
    description: 'Нормативні документи, методичні матеріали, навчальні програми та корисні ресурси для вчителів.',
    keywords: 'нормативні документи, методичні матеріали, НУШ, ресурси для вчителів',
  },
  news: {
    title: 'Новини',
    description: 'Актуальні новини та оголошення Академії педагогічної освіти. Слідкуйте за подіями у сфері освіти.',
    keywords: 'новини, оголошення, події, освіта, академія',
  },
  events: {
    title: 'Календар подій',
    description: 'Розклад олімпіад, конкурсів, конференцій та інших освітніх заходів. Плануйте вашу участь.',
    keywords: 'календар подій, події, конференції, семінари, олімпіади',
  },
  contacts: {
    title: 'Контакти',
    description: 'Контактна інформація Академії педагогічної освіти. Адреса, телефони, email та карта проїзду.',
    keywords: 'контакти, адреса, телефон, email, як нас знайти',
  },
};

