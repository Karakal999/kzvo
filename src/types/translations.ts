/**
 * TypeScript types for i18n translations
 * 
 * These types provide autocomplete and type safety when using translations.
 */

// Import JSON types
import type commonUk from '../locales/uk/common.json';
import type navigationUk from '../locales/uk/navigation.json';
import type pagesUk from '../locales/uk/pages.json';

/**
 * Supported languages
 */
export type Language = 'uk' | 'en';
export type LanguageCode = 'UA' | 'EN'; // Legacy format for backward compatibility

/**
 * Available namespaces
 */
export type Namespace = 'common' | 'navigation' | 'pages';

/**
 * Translation resources structure
 */
export interface TranslationResources {
  common: typeof commonUk;
  navigation: typeof navigationUk;
  pages: typeof pagesUk;
}

/**
 * Common translations type
 */
export type CommonTranslations = typeof commonUk;

/**
 * Navigation translations type
 */
export type NavigationTranslations = typeof navigationUk;

/**
 * Pages translations type
 */
export type PagesTranslations = typeof pagesUk;

/**
 * Utility type to get all translation keys from a namespace
 */
export type TranslationKeys<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ? `${K & string}.${TranslationKeys<T[K]> & string}`
        : K & string;
    }[keyof T]
  : never;

/**
 * All possible translation keys for common namespace
 * 
 * @example
 * const key: CommonTranslationKey = 'buttons.read_more';
 */
export type CommonTranslationKey = TranslationKeys<CommonTranslations>;

/**
 * All possible translation keys for navigation namespace
 */
export type NavigationTranslationKey = TranslationKeys<NavigationTranslations>;

/**
 * All possible translation keys for pages namespace
 */
export type PagesTranslationKey = TranslationKeys<PagesTranslations>;

/**
 * Translation function type
 */
export type TranslationFunction = (
  key: string,
  options?: Record<string, any>
) => string;

/**
 * Language context type
 */
export interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationFunction;
}

/**
 * i18next instance type with our resources
 */
export interface I18nInstance {
  language: Language;
  languages: Language[];
  changeLanguage: (lng: Language) => Promise<void>;
  t: TranslationFunction;
}

/**
 * Helper type for nested object keys
 * 
 * @example
 * type Keys = NestedKeyOf<{ a: { b: { c: string } } }>;
 * // Keys = 'a' | 'a.b' | 'a.b.c'
 */
export type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;

/**
 * Typed translation keys for each namespace
 */
export interface TypedTranslationKeys {
  common: {
    buttons: {
      read_more: string;
      download: string;
      register: string;
      submit: string;
      cancel: string;
      close: string;
      save: string;
      edit: string;
      delete: string;
      back: string;
      next: string;
      previous: string;
      view_all: string;
      show_more: string;
      show_less: string;
      preview: string;
      search: string;
      filter: string;
      sort: string;
      apply: string;
      reset: string;
    };
    labels: {
      category: string;
      date: string;
      time: string;
      location: string;
      author: string;
      status: string;
      all: string;
      name: string;
      email: string;
      phone: string;
      message: string;
      subject: string;
      description: string;
      title: string;
      language: string;
    };
    status: {
      loading: string;
      success: string;
      error: string;
      empty: string;
      not_found: string;
      coming_soon: string;
    };
    errors: {
      general: string;
      network: string;
      not_found: string;
      required_field: string;
      invalid_email: string;
      invalid_phone: string;
      file_too_large: string;
      file_format: string;
      submission_failed: string;
    };
    validation: {
      required: string;
      email: string;
      phone: string;
      min_length: string;
      max_length: string;
      invalid_format: string;
    };
    placeholders: {
      search: string;
      name: string;
      email: string;
      phone: string;
      message: string;
      select: string;
      date: string;
      search_news: string;
      search_events: string;
      search_documents: string;
    };
    time: {
      today: string;
      yesterday: string;
      tomorrow: string;
      days_ago: string;
      hours_ago: string;
      minutes_ago: string;
      just_now: string;
    };
    confirmation: {
      delete: string;
      cancel: string;
      leave: string;
    };
  };
  navigation: {
    header: {
      email: string;
      phone: string;
      academy: string;
      academy_full: string;
      search: string;
      menu: string;
      lang_ua: string;
      lang_en: string;
    };
    menu: {
      about: string;
      activity: string;
      education: string;
      teachers: string;
      students: string;
      resources: string;
      news: string;
      contacts: string;
    };
    submenu: {
      about: {
        history: string;
        structure: string;
        management: string;
        documents: string;
        public_info: string;
      };
      activity: {
        science: string;
        international: string;
        projects: string;
        conferences: string;
      };
      education: {
        programs: string;
        higher_education: string;
        qualification: string;
        calendar: string;
      };
      teachers: {
        development: string;
        events: string;
        journal: string;
        nush: string;
      };
      students: {
        olympiads: string;
        competitions: string;
        teacher_year: string;
        results: string;
      };
      resources: {
        library: string;
        media: string;
        documents: string;
        links: string;
      };
    };
    footer: {
      about_academy: string;
      description: string;
      quick_links: string;
      contacts: string;
      address: string;
      follow_us: string;
      rights: string;
      privacy: string;
      terms: string;
    };
    breadcrumbs: {
      home: string;
    };
  };
  pages: {
    home: {
      title: string;
      subtitle: string;
      hero: {
        i_am_teacher: string;
        i_am_student: string;
        i_am_applicant: string;
      };
      stats: {
        graduates: string;
        programs: string;
        experience: string;
      };
      quick_access: {
        title: string;
        for_teachers: string;
        for_students: string;
        for_applicants: string;
      };
      news: {
        title: string;
        all_news: string;
      };
      events: {
        title: string;
        view_calendar: string;
      };
    };
    about: {
      title: string;
      meta_description: string;
      history: {
        title: string;
        description: string;
      };
      structure: {
        title: string;
        departments: string;
      };
      management: {
        title: string;
        rector: string;
        vice_rectors: string;
      };
    };
    news: {
      title: string;
      meta_description: string;
      latest: string;
      archive: string;
      categories: {
        all: string;
        announcements: string;
        events: string;
        achievements: string;
      };
    };
    education: {
      title: string;
      meta_description: string;
      programs: {
        title: string;
        bachelor: string;
        master: string;
        qualification: string;
      };
      admission: {
        title: string;
        requirements: string;
        documents: string;
        deadline: string;
      };
    };
    teachers: {
      title: string;
      meta_description: string;
      development: {
        title: string;
        courses: string;
        webinars: string;
        trainings: string;
      };
      events: {
        title: string;
        upcoming: string;
        past: string;
        register: string;
      };
    };
    students: {
      title: string;
      meta_description: string;
      competitions: {
        title: string;
        olympiads: string;
        competitions: string;
        results: string;
      };
    };
    contacts: {
      title: string;
      meta_description: string;
      get_in_touch: string;
      address_title: string;
      phone_title: string;
      email_title: string;
      working_hours: string;
      form: {
        title: string;
        success: string;
        error: string;
      };
    };
    not_found: {
      title: string;
      description: string;
      go_home: string;
    };
  };
}

/**
 * Helper to create typed translation key
 */
export const createTranslationKey = <N extends Namespace>(
  namespace: N,
  key: string
): string => {
  return `${namespace}:${key}`;
};

