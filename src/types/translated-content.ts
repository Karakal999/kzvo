/**
 * Types for multilingual content from API/Database
 */

/**
 * Supported languages
 */
export type ContentLanguage = 'uk' | 'en';

/**
 * Translation object for a specific language
 */
export interface Translation<T> {
  uk: T;
  en: T;
}

/**
 * Base translated content interface
 */
export interface TranslatedContent {
  id: string | number;
  translations: Translation<any>;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Translated news article
 */
export interface TranslatedNews extends TranslatedContent {
  translations: Translation<{
    title: string;
    content: string;
    excerpt?: string;
    slug: string;
    metaTitle?: string;
    metaDescription?: string;
  }>;
  image: string;
  imageAlt?: Translation<string>;
  date: string;
  category: string;
  tags?: string[];
  featured?: boolean;
  author?: string;
}

/**
 * Translated course/program
 */
export interface TranslatedCourse extends TranslatedContent {
  translations: Translation<{
    title: string;
    description: string;
    content: string;
    requirements?: string;
    outcomes?: string[];
    slug: string;
    metaTitle?: string;
    metaDescription?: string;
  }>;
  duration: number; // in hours
  price?: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  image?: string;
  instructor?: string;
}

/**
 * Translated document metadata
 */
export interface TranslatedDocument extends TranslatedContent {
  translations: Translation<{
    title: string;
    description?: string;
    slug: string;
  }>;
  file: string;
  fileSize: number;
  fileType: string;
  category: string;
  date: string;
}

/**
 * Translated event
 */
export interface TranslatedEvent extends TranslatedContent {
  translations: Translation<{
    title: string;
    description: string;
    location: string;
    slug: string;
  }>;
  startDate: string;
  endDate?: string;
  image?: string;
  capacity?: number;
  registrationLink?: string;
}

/**
 * Translated person (teacher, management)
 */
export interface TranslatedPerson extends TranslatedContent {
  translations: Translation<{
    name: string;
    position: string;
    bio?: string;
    qualifications?: string[];
    slug: string;
  }>;
  photo: string;
  email?: string;
  phone?: string;
  socialLinks?: {
    linkedin?: string;
    facebook?: string;
    twitter?: string;
  };
}

/**
 * Helper type to extract translated data for current language
 */
export type ExtractedTranslation<T extends TranslatedContent> = 
  T['translations'][ContentLanguage] & Omit<T, 'translations'>;

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

