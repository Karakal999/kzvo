import { type TFunction } from 'i18next';

/**
 * Type-safe key generator for translations
 * 
 * @example
 * const key = pageKeys('about', 'sections', 'history', 'title');
 * // Returns: 'pages:about.sections.history.title'
 * 
 * const key2 = commonKeys('buttons', 'read_more');
 * // Returns: 'common:buttons.read_more'
 */

/**
 * Generate page translation key
 */
export const pageKeys = (...keys: string[]): string => {
  return `pages:${keys.join('.')}`;
};

/**
 * Generate common translation key
 */
export const commonKeys = (...keys: string[]): string => {
  return `common:${keys.join('.')}`;
};

/**
 * Generate navigation translation key
 */
export const navKeys = (...keys: string[]): string => {
  return `navigation:${keys.join('.')}`;
};

/**
 * Translation key builder with namespace
 */
export class TranslationKeyBuilder {
  private namespace: string;
  private path: string[] = [];

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  /**
   * Add key to path
   */
  key(...keys: string[]): this {
    this.path.push(...keys);
    return this;
  }

  /**
   * Build final key
   */
  build(): string {
    const fullPath = this.path.join('.');
    return `${this.namespace}:${fullPath}`;
  }

  /**
   * Reset path
   */
  reset(): this {
    this.path = [];
    return this;
  }
}

/**
 * Create key builder for specific namespace
 */
export const createKeyBuilder = (namespace: string) => {
  return new TranslationKeyBuilder(namespace);
};

/**
 * Pluralization helper
 * 
 * Uses i18next pluralization rules
 * 
 * @example
 * // In translation file:
 * {
 *   "course_one": "{{count}} курс",
 *   "course_few": "{{count}} курса", 
 *   "course_many": "{{count}} курсів"
 * }
 * 
 * // Usage:
 * t('course', { count: 1 }) // "1 курс"
 * t('course', { count: 2 }) // "2 курса"
 * t('course', { count: 5 }) // "5 курсів"
 */
export const getPluralKey = (baseKey: string, count: number): string => {
  // Ukrainian pluralization rules
  const n = Math.abs(count);
  const n10 = n % 10;
  const n100 = n % 100;
  
  if (n10 === 1 && n100 !== 11) {
    return `${baseKey}_one`;
  }
  if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) {
    return `${baseKey}_few`;
  }
  return `${baseKey}_many`;
};

/**
 * Safe translation helper with fallback
 */
export const safeTranslate = (
  t: TFunction,
  key: string,
  fallback?: string,
  options?: any
): string => {
  const translation = t(key as any, options);
  
  // If translation returns the key, it means translation is missing
  if (translation === key && fallback) {
    return fallback;
  }
  
  return translation as string;
};

/**
 * Translation helper for nested objects
 * 
 * @example
 * const data = {
 *   title_uk: "Заголовок",
 *   title_en: "Title",
 *   description_uk: "Опис",
 *   description_en: "Description"
 * };
 * 
 * const translated = translateObject(data, 'uk');
 * // { title: "Заголовок", description: "Опис" }
 */
export const translateObject = <T extends Record<string, any>>(
  obj: T,
  lang: 'uk' | 'en',
  suffix: string = ''
): Partial<T> => {
  const result: any = {};
  const langSuffix = `_${lang}${suffix}`;
  
  Object.keys(obj).forEach((key) => {
    if (key.endsWith(langSuffix)) {
      const baseKey = key.replace(langSuffix, '');
      result[baseKey] = obj[key];
    }
  });
  
  return result;
};

/**
 * Format number with localization
 */
export const formatNumber = (
  num: number,
  lang: 'uk' | 'en',
  options?: Intl.NumberFormatOptions
): string => {
  const locale = lang === 'uk' ? 'uk-UA' : 'en-US';
  return new Intl.NumberFormat(locale, options).format(num);
};

/**
 * Format date with localization
 */
export const formatDate = (
  date: Date | string,
  lang: 'uk' | 'en',
  options?: Intl.DateTimeFormatOptions
): string => {
  const locale = lang === 'uk' ? 'uk-UA' : 'en-US';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

/**
 * Format currency
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'UAH',
  lang: 'uk' | 'en' = 'uk'
): string => {
  const locale = lang === 'uk' ? 'uk-UA' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Interpolate variables in string
 * 
 * @example
 * interpolate("Hello {{name}}", { name: "John" })
 * // "Hello John"
 */
export const interpolate = (
  template: string,
  variables: Record<string, any>
): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return variables[key] !== undefined ? String(variables[key]) : `{{${key}}}`;
  });
};

/**
 * Check if translation key exists
 */
export const hasTranslation = (t: TFunction, key: string): boolean => {
  const translation = t(key as any);
  return translation !== key;
};

/**
 * Get all translations for a key in all languages
 */
export const getAllTranslations = (
  t: TFunction,
  key: string,
  languages: string[] = ['uk', 'en']
): Record<string, string> => {
  const result: Record<string, string> = {};
  
  languages.forEach((lang) => {
    result[lang] = t(key as any, { lng: lang } as any) as string;
  });
  
  return result;
};

