/**
 * Image component with translated alt text
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ContentLanguage } from '../../types/translated-content';

interface TranslatedImageProps {
  /**
   * Image source URL
   */
  src: string;

  /**
   * Translated alt text
   * Can be translation key or object with uk/en values
   */
  alt: string | { uk: string; en: string };

  /**
   * Translated title (optional)
   */
  title?: string | { uk: string; en: string };

  /**
   * Image width
   */
  width?: number | string;

  /**
   * Image height
   */
  height?: number | string;

  /**
   * CSS classes
   */
  className?: string;

  /**
   * Loading strategy
   */
  loading?: 'lazy' | 'eager';

  /**
   * Show caption below image
   */
  caption?: string | { uk: string; en: string };

  /**
   * On click handler
   */
  onClick?: () => void;

  /**
   * Fallback image on error
   */
  fallbackSrc?: string;
}

/**
 * TranslatedImage Component
 * 
 * Image with translated alt text and optional caption
 * 
 * @example
 * // With translation key
 * <TranslatedImage 
 *   src="/logo.png" 
 *   alt="media:images.logoAlt"
 * />
 * 
 * @example
 * // With direct translations
 * <TranslatedImage
 *   src="/hero.jpg"
 *   alt={{ uk: "Герой", en: "Hero" }}
 *   caption={{ uk: "Головне зображення", en: "Main image" }}
 * />
 */
const TranslatedImage = ({
  src,
  alt,
  title,
  width,
  height,
  className = '',
  loading = 'lazy',
  caption,
  onClick,
  fallbackSrc = '/images/placeholder.jpg',
}: TranslatedImageProps) => {
  const { t, i18n } = useTranslation('media');
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const currentLang = i18n.language as ContentLanguage;

  // Get translated text
  const getTranslatedText = (text: string | { uk: string; en: string } | undefined): string => {
    if (!text) return '';
    
    if (typeof text === 'string') {
      // If it looks like a translation key, translate it
      if (text.includes(':') || text.includes('.')) {
        return t(text as any);
      }
      return text;
    }

    return text[currentLang] || text.uk || text.en || '';
  };

  const altText = getTranslatedText(alt);
  const titleText = title ? getTranslatedText(title) : undefined;
  const captionText = caption ? getTranslatedText(caption) : undefined;

  const handleError = () => {
    if (!hasError) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const imageElement = (
    <img
      src={imageSrc}
      alt={altText}
      title={titleText}
      width={width}
      height={height}
      loading={loading}
      className={`${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      onError={handleError}
    />
  );

  if (captionText) {
    return (
      <figure className="inline-block">
        {imageElement}
        <figcaption className="text-sm text-gray-600 mt-2 text-center">
          {captionText}
        </figcaption>
      </figure>
    );
  }

  return imageElement;
};

export default TranslatedImage;

