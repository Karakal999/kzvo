/**
 * Types for multilingual media content
 */

import type { ContentLanguage } from './translated-content';

/**
 * Translated image with alt texts
 */
export interface TranslatedImage {
  src: string;
  alt: {
    uk: string;
    en: string;
  };
  title?: {
    uk: string;
    en: string;
  };
  width?: number;
  height?: number;
  caption?: {
    uk: string;
    en: string;
  };
}

/**
 * Document file info
 */
export interface DocumentFile {
  id: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'txt' | 'other';
  size: number; // in bytes
  uploadedAt?: string;
  updatedAt?: string;
}

/**
 * Translated document
 */
export interface TranslatedDocument extends DocumentFile {
  translations: {
    uk: {
      filename: string;
      title: string;
      description?: string;
      url: string;
    };
    en: {
      filename: string;
      title: string;
      description?: string;
      url: string;
    };
  };
  category?: string;
  icon?: string;
}

/**
 * Video subtitle file
 */
export interface SubtitleFile {
  language: ContentLanguage;
  url: string;
  format: 'srt' | 'vtt' | 'ass';
  label?: string;
}

/**
 * Translated video
 */
export interface TranslatedVideo {
  id: string;
  videoUrl: string;
  thumbnail?: string;
  duration?: number; // in seconds
  translations: {
    uk: {
      title: string;
      description?: string;
      subtitles?: SubtitleFile[];
    };
    en: {
      title: string;
      description?: string;
      subtitles?: SubtitleFile[];
    };
  };
  uploadedAt?: string;
}

/**
 * Chart/Graph localized data
 */
export interface TranslatedChartData {
  labels: {
    uk: string[];
    en: string[];
  };
  datasets: Array<{
    label: {
      uk: string;
      en: string;
    };
    data: number[];
  }>;
  title?: {
    uk: string;
    en: string;
  };
  xAxisLabel?: {
    uk: string;
    en: string;
  };
  yAxisLabel?: {
    uk: string;
    en: string;
  };
  tooltips?: {
    uk: Record<string, string>;
    en: Record<string, string>;
  };
}

/**
 * Map marker with translations
 */
export interface TranslatedMapMarker {
  id: string;
  lat: number;
  lng: number;
  translations: {
    uk: {
      title: string;
      description?: string;
      address?: string;
    };
    en: {
      title: string;
      description?: string;
      address?: string;
    };
  };
  icon?: string;
  category?: string;
}

/**
 * Gallery image item
 */
export interface GalleryImage extends TranslatedImage {
  id: string;
  category?: string;
  thumbnail?: string;
  order?: number;
}

/**
 * File paths by language
 */
export interface LocalizedFilePaths {
  uk: string;
  en: string;
}

/**
 * Media asset with translations
 */
export interface MediaAsset {
  id: string;
  type: 'image' | 'video' | 'document' | 'audio';
  translations: {
    uk: {
      title: string;
      description?: string;
      url: string;
      alt?: string;
    };
    en: {
      title: string;
      description?: string;
      url: string;
      alt?: string;
    };
  };
  metadata?: {
    size?: number;
    format?: string;
    duration?: number;
    width?: number;
    height?: number;
  };
}

