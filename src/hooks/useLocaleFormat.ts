/**
 * Hook for locale-aware formatting
 */

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  formatLocalizedDate,
  formatRelativeTime,
  formatRelativeDate,
  formatNumber,
  formatCurrency,
  formatPercentage,
  formatFileSize,
  formatPhoneNumber,
  isHoliday,
  getWeekStart,
  CALENDAR_CONFIG,
  type SupportedLocale,
  type DateFormatType,
} from '../utils/locale-formats';

/**
 * Hook for locale formatting utilities
 * 
 * @example
 * const { formatDate, formatNumber, formatCurrency } = useLocaleFormat();
 * 
 * formatDate(new Date(), 'full');
 * formatNumber(1234567.89, { decimals: 2 });
 * formatCurrency(999.99);
 */
export function useLocaleFormat() {
  const { i18n } = useTranslation();
  const locale = i18n.language as SupportedLocale;

  /**
   * Format date with current locale
   */
  const formatDate = useCallback(
    (
      date: Date | string | number,
      formatType: DateFormatType = 'medium'
    ): string => {
      return formatLocalizedDate(date, locale, formatType);
    },
    [locale]
  );

  /**
   * Format relative time (e.g., "2 hours ago")
   */
  const formatTimeAgo = useCallback(
    (date: Date | string | number, baseDate: Date | number = new Date()): string => {
      return formatRelativeTime(date, baseDate, locale);
    },
    [locale]
  );

  /**
   * Format relative date (e.g., "yesterday at 3:20 PM")
   */
  const formatDateRelative = useCallback(
    (date: Date | string | number, baseDate: Date | number = new Date()): string => {
      return formatRelativeDate(date, baseDate, locale);
    },
    [locale]
  );

  /**
   * Format number with locale-specific separators
   */
  const formatNum = useCallback(
    (
      value: number,
      options?: {
        decimals?: number;
        useGrouping?: boolean;
      }
    ): string => {
      return formatNumber(value, locale, options);
    },
    [locale]
  );

  /**
   * Format currency
   */
  const formatMoney = useCallback(
    (
      value: number,
      options?: {
        currency?: string;
        decimals?: number;
        showSymbol?: boolean;
      }
    ): string => {
      return formatCurrency(value, locale, options);
    },
    [locale]
  );

  /**
   * Format percentage
   */
  const formatPercent = useCallback(
    (value: number, decimals: number = 0): string => {
      return formatPercentage(value, locale, decimals);
    },
    [locale]
  );

  /**
   * Format file size
   */
  const formatSize = useCallback(
    (bytes: number, decimals: number = 2): string => {
      return formatFileSize(bytes, locale, decimals);
    },
    [locale]
  );

  /**
   * Format phone number
   */
  const formatPhone = useCallback(
    (phone: string): string => {
      return formatPhoneNumber(phone, locale);
    },
    [locale]
  );

  /**
   * Check if date is holiday
   */
  const checkHoliday = useCallback(
    (date: Date) => {
      return isHoliday(date, locale);
    },
    [locale]
  );

  /**
   * Get calendar configuration
   */
  const getCalendarConfig = useCallback(() => {
    return CALENDAR_CONFIG[locale];
  }, [locale]);

  /**
   * Get week start date
   */
  const getWeekStartDate = useCallback(
    (date: Date = new Date()) => {
      return getWeekStart(date, locale);
    },
    [locale]
  );

  return {
    locale,
    formatDate,
    formatTimeAgo,
    formatDateRelative,
    formatNumber: formatNum,
    formatCurrency: formatMoney,
    formatPercentage: formatPercent,
    formatFileSize: formatSize,
    formatPhoneNumber: formatPhone,
    isHoliday: checkHoliday,
    getCalendarConfig,
    getWeekStart: getWeekStartDate,
  };
}

/**
 * Hook for form placeholders and validation messages
 * 
 * @example
 * const { placeholders, validators } = useFormLocale();
 * 
 * <input placeholder={placeholders.email} />
 */
export function useFormLocale() {
  const { i18n } = useTranslation();
  const locale = i18n.language as SupportedLocale;

  const placeholders = {
    email: locale === 'uk' ? 'example@email.com' : 'example@email.com',
    phone: locale === 'uk' ? '+380 (XX) XXX-XX-XX' : '+380 XX XXX-XXXX',
    name: locale === 'uk' ? "Введіть ваше ім'я" : 'Enter your name',
    message: locale === 'uk' ? 'Введіть повідомлення...' : 'Enter message...',
    search: locale === 'uk' ? 'Пошук...' : 'Search...',
    date: locale === 'uk' ? 'ДД.MM.РРРР' : 'MM/DD/YYYY',
  };

  const dateFormat = locale === 'uk' ? 'dd.MM.yyyy' : 'MM/dd/yyyy';
  const timeFormat = locale === 'uk' ? 'HH:mm' : 'h:mm a';

  return {
    locale,
    placeholders,
    dateFormat,
    timeFormat,
  };
}

