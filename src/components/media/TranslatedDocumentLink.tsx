/**
 * Document link component with language selection
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, ExternalLink } from 'lucide-react';
import { getFileIcon, formatFileSize, getFileExtension } from '../../utils/media-helpers';
import { useLocaleFormat } from '../../hooks/useLocaleFormat';
import type { ContentLanguage } from '../../types/translated-content';
import type { TranslatedDocument } from '../../types/translated-media';

interface TranslatedDocumentLinkProps {
  /**
   * Document data or file key
   */
  document?: TranslatedDocument;

  /**
   * Direct file URLs by language (alternative to document)
   */
  files?: {
    uk: string;
    en: string;
  };

  /**
   * Document label (translation key or text)
   */
  label: string;

  /**
   * Show file size
   */
  showSize?: boolean;

  /**
   * Show language selector
   */
  showLanguageSelector?: boolean;

  /**
   * Display variant
   */
  variant?: 'button' | 'link' | 'card';

  /**
   * Icon to display
   */
  icon?: React.ReactNode;

  /**
   * CSS classes
   */
  className?: string;

  /**
   * Open in new tab
   */
  openInNewTab?: boolean;

  /**
   * Description (optional)
   */
  description?: string | { uk: string; en: string };
}

/**
 * TranslatedDocumentLink Component
 * 
 * Link to downloadable document with language selection
 * 
 * @example
 * // With document object
 * <TranslatedDocumentLink
 *   document={documentData}
 *   label="media:documents.statute"
 *   showSize
 *   showLanguageSelector
 * />
 * 
 * @example
 * // With direct file URLs
 * <TranslatedDocumentLink
 *   files={{
 *     uk: '/files/uk/statute.pdf',
 *     en: '/files/en/statute_en.pdf'
 *   }}
 *   label="Statute"
 *   variant="button"
 * />
 */
const TranslatedDocumentLink = ({
  document,
  files,
  label,
  showSize = true,
  showLanguageSelector = false,
  variant = 'link',
  icon,
  className = '',
  openInNewTab = true,
  description,
}: TranslatedDocumentLinkProps) => {
  const { t, i18n } = useTranslation('media');
  const { locale } = useLocaleFormat();
  const [selectedLang, setSelectedLang] = useState<ContentLanguage>(
    i18n.language as ContentLanguage
  );

  const currentLang = i18n.language as ContentLanguage;

  // Get file URL
  const fileUrl = files
    ? files[selectedLang]
    : document?.translations[selectedLang]?.url || '';

  // Get file info
  const filename = document?.translations[selectedLang]?.filename || fileUrl.split('/').pop() || '';
  const extension = getFileExtension(filename);
  const fileIcon = icon || getFileIcon(extension);

  // Get label text
  const labelText = typeof label === 'string' && (label.includes(':') || label.includes('.')) 
    ? t(label as any) 
    : label;

  // Get description text
  const getDescriptionText = (): string => {
    if (!description) return '';
    if (typeof description === 'string') {
      return description.includes(':') ? t(description as any) : description;
    }
    return description[currentLang] || '';
  };

  const descriptionText = getDescriptionText();

  const handleDownload = (lang: ContentLanguage) => {
    const url = files ? files[lang] : document?.translations[lang]?.url || '';
    
    if (openInNewTab) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
  };

  // Button variant
  if (variant === 'button') {
    return (
      <div className={className}>
        <button
          onClick={() => handleDownload(selectedLang)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          <span className="text-xl">{fileIcon}</span>
          <span>{labelText}</span>
          <Download className="h-4 w-4" />
        </button>

        {showLanguageSelector && (
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setSelectedLang('uk')}
              className={`px-3 py-1 text-sm rounded ${
                selectedLang === 'uk'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🇺🇦 UK
            </button>
            <button
              onClick={() => setSelectedLang('en')}
              className={`px-3 py-1 text-sm rounded ${
                selectedLang === 'en'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🇬🇧 EN
            </button>
          </div>
        )}
      </div>
    );
  }

  // Card variant
  if (variant === 'card') {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow ${className}`}>
        <div className="flex items-start gap-4">
          <div className="text-4xl">{fileIcon}</div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{labelText}</h3>
            
            {descriptionText && (
              <p className="text-sm text-gray-600 mb-2">{descriptionText}</p>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              {document?.size && showSize && (
                <span>{formatFileSize(document.size, locale)}</span>
              )}
              {extension && (
                <span className="uppercase">{extension}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {showLanguageSelector ? (
                <>
                  <button
                    onClick={() => handleDownload('uk')}
                    className="flex items-center gap-1 px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/90"
                  >
                    🇺🇦 UK
                    <Download className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleDownload('en')}
                    className="flex items-center gap-1 px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/90"
                  >
                    🇬🇧 EN
                    <Download className="h-3 w-3" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleDownload(selectedLang)}
                  className="flex items-center gap-1 px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/90"
                >
                  {t('documents.download')}
                  <Download className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Link variant (default)
  return (
    <a
      href={fileUrl}
      target={openInNewTab ? '_blank' : '_self'}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center gap-2 text-primary hover:underline ${className}`}
    >
      <span className="text-xl">{fileIcon}</span>
      <span>{labelText}</span>
      {openInNewTab && <ExternalLink className="h-4 w-4" />}
      {!openInNewTab && <Download className="h-4 w-4" />}
    </a>
  );
};

export default TranslatedDocumentLink;

