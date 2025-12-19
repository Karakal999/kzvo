/**
 * Locale formatting utilities for dates, numbers, and currencies
 */

import { format, formatDistance, formatRelative, parseISO } from 'date-fns';
import { uk, enUS } from 'date-fns/locale';
import type { Locale } from 'date-fns';

export type SupportedLocale = 'uk' | 'en';

/**
 * Get date-fns locale object
 */
export function getDateFnsLocale(locale: SupportedLocale): Locale {
  return locale === 'uk' ? uk : enUS;
}

/**
 * Date format patterns
 */
export const DATE_FORMATS = {
  full: {
    uk: "d MMMM yyyy 'року'",
    en: 'MMMM d, yyyy',
  },
  long: {
    uk: 'd MMMM yyyy',
    en: 'MMMM d, yyyy',
  },
  medium: {
    uk: 'd MMM yyyy',
    en: 'MMM d, yyyy',
  },
  short: {
    uk: 'dd.MM.yyyy',
    en: 'MM/dd/yyyy',
  },
  time: {
    uk: 'HH:mm',
    en: 'h:mm a',
  },
  dateTime: {
    uk: "d MMMM yyyy 'року' 'о' HH:mm",
    en: 'MMMM d, yyyy at h:mm a',
  },
} as const;

export type DateFormatType = keyof typeof DATE_FORMATS;

/**
 * Format date according to locale
 */
export function formatLocalizedDate(
  date: Date | string | number,
  locale: SupportedLocale,
  formatType: DateFormatType = 'medium'
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  const pattern = DATE_FORMATS[formatType][locale];
  const localeObj = getDateFnsLocale(locale);

  return format(dateObj, pattern, { locale: localeObj });
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(
  date: Date | string | number,
  baseDate: Date | number,
  locale: SupportedLocale
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  const localeObj = getDateFnsLocale(locale);

  return formatDistance(dateObj, baseDate, {
    addSuffix: true,
    locale: localeObj,
  });
}

/**
 * Format relative date (e.g., "yesterday at 3:20 PM")
 */
export function formatRelativeDate(
  date: Date | string | number,
  baseDate: Date | number,
  locale: SupportedLocale
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  const localeObj = getDateFnsLocale(locale);

  return formatRelative(dateObj, baseDate, { locale: localeObj });
}

/**
 * Number formatting options by locale
 */
export const NUMBER_FORMATS = {
  uk: {
    decimal: ',',
    thousands: ' ',
    currency: 'грн',
    currencyPosition: 'after' as const,
  },
  en: {
    decimal: '.',
    thousands: ',',
    currency: 'UAH',
    currencyPosition: 'before' as const,
  },
} as const;

/**
 * Format number with locale-specific separators
 */
export function formatNumber(
  value: number,
  locale: SupportedLocale,
  options?: {
    decimals?: number;
    useGrouping?: boolean;
  }
): string {
  const { decimals = 0, useGrouping = true } = options || {};

  return new Intl.NumberFormat(locale === 'uk' ? 'uk-UA' : 'en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping,
  }).format(value);
}

/**
 * Format currency with locale-specific format
 */
export function formatCurrency(
  value: number,
  locale: SupportedLocale,
  options?: {
    currency?: string;
    decimals?: number;
    showSymbol?: boolean;
  }
): string {
  const {
    currency = 'UAH',
    decimals = 2,
    showSymbol = true,
  } = options || {};

  if (!showSymbol) {
    return formatNumber(value, locale, { decimals });
  }

  return new Intl.NumberFormat(locale === 'uk' ? 'uk-UA' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format percentage
 */
export function formatPercentage(
  value: number,
  locale: SupportedLocale,
  decimals: number = 0
): string {
  return new Intl.NumberFormat(locale === 'uk' ? 'uk-UA' : 'en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
}

/**
 * Format file size
 */
export function formatFileSize(
  bytes: number,
  locale: SupportedLocale,
  decimals: number = 2
): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = locale === 'uk' 
    ? ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ']
    : ['B', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);

  return `${formatNumber(value, locale, { decimals })} ${sizes[i]}`;
}

/**
 * Phone number formatting
 */
export function formatPhoneNumber(
  phone: string,
  locale: SupportedLocale
): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Ukrainian format: +380 (XX) XXX-XX-XX
  if (locale === 'uk') {
    if (cleaned.startsWith('380')) {
      const match = cleaned.match(/^(380)(\d{2})(\d{3})(\d{2})(\d{2})$/);
      if (match) {
        return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
      }
    }
    // Local format: 0XX XXX XX XX
    const match = cleaned.match(/^0?(\d{2})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return `0${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }
  }

  // English/International format: +XXX (XX) XXX-XXXX
  if (locale === 'en') {
    if (cleaned.startsWith('380')) {
      const match = cleaned.match(/^(380)(\d{2})(\d{3})(\d{4})$/);
      if (match) {
        return `+${match[1]} ${match[2]} ${match[3]}-${match[4]}`;
      }
    }
  }

  return phone;
}

/**
 * Calendar configuration by locale
 */
export const CALENDAR_CONFIG = {
  uk: {
    firstDayOfWeek: 1, // Monday
    weekDays: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    weekDaysFull: [
      'Неділя',
      'Понеділок',
      'Вівторок',
      'Середа',
      'Четвер',
      "П'ятниця",
      'Субота',
    ],
    months: [
      'Січень',
      'Лютий',
      'Березень',
      'Квітень',
      'Травень',
      'Червень',
      'Липень',
      'Серпень',
      'Вересень',
      'Жовтень',
      'Листопад',
      'Грудень',
    ],
    monthsShort: [
      'Січ',
      'Лют',
      'Бер',
      'Кві',
      'Тра',
      'Чер',
      'Лип',
      'Сер',
      'Вер',
      'Жов',
      'Лис',
      'Гру',
    ],
    holidays: [
      { date: '01-01', name: 'Новий рік' },
      { date: '01-07', name: 'Різдво Христове' },
      { date: '03-08', name: 'Міжнародний жіночий день' },
      { date: '05-01', name: 'День праці' },
      { date: '05-09', name: 'День Перемоги' },
      { date: '06-28', name: 'День Конституції України' },
      { date: '08-24', name: 'День незалежності України' },
      { date: '10-14', name: 'День захисника України' },
      { date: '12-25', name: 'Різдво (католицьке)' },
    ],
  },
  en: {
    firstDayOfWeek: 0, // Sunday
    weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weekDaysFull: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthsShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    holidays: [
      { date: '01-01', name: 'New Year' },
      { date: '12-25', name: 'Christmas' },
      { date: '07-04', name: 'Independence Day (US)' },
    ],
  },
} as const;

/**
 * Check if date is a holiday
 */
export function isHoliday(
  date: Date,
  locale: SupportedLocale
): { isHoliday: boolean; name?: string } {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateStr = `${month}-${day}`;

  const holiday = CALENDAR_CONFIG[locale].holidays.find(
    (h) => h.date === dateStr
  );

  return {
    isHoliday: !!holiday,
    name: holiday?.name,
  };
}

/**
 * Get week start date
 */
export function getWeekStart(date: Date, locale: SupportedLocale): Date {
  const day = date.getDay();
  const firstDay = CALENDAR_CONFIG[locale].firstDayOfWeek;
  const diff = (day < firstDay ? 7 : 0) + day - firstDay;

  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - diff);
  weekStart.setHours(0, 0, 0, 0);

  return weekStart;
}

