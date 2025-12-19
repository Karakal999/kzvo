/**
 * Component for displaying numbers in localized format
 */

import { useLocaleFormat } from '../hooks/useLocaleFormat';

interface LocalizedNumberProps {
  /**
   * Number value to format
   */
  value: number;

  /**
   * Display type
   */
  type?: 'number' | 'currency' | 'percentage' | 'fileSize';

  /**
   * Number of decimal places
   */
  decimals?: number;

  /**
   * Currency code (for currency type)
   */
  currency?: string;

  /**
   * Show currency symbol
   */
  showSymbol?: boolean;

  /**
   * Use thousand separators
   */
  useGrouping?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * LocalizedNumber Component
 * 
 * Displays numbers in locale-specific format with support for
 * currencies, percentages, and file sizes
 * 
 * @example
 * // Simple number
 * <LocalizedNumber value={1234567.89} decimals={2} />
 * // → "1 234 567,89" (uk) or "1,234,567.89" (en)
 * 
 * @example
 * // Currency
 * <LocalizedNumber value={999.99} type="currency" />
 * // → "999,99 грн" (uk) or "UAH 999.99" (en)
 * 
 * @example
 * // Percentage
 * <LocalizedNumber value={75.5} type="percentage" decimals={1} />
 * // → "75,5%" (uk) or "75.5%" (en)
 * 
 * @example
 * // File size
 * <LocalizedNumber value={1536000} type="fileSize" />
 * // → "1,46 МБ" (uk) or "1.46 MB" (en)
 */
const LocalizedNumber = ({
  value,
  type = 'number',
  decimals,
  currency,
  showSymbol = true,
  useGrouping = true,
  className = '',
}: LocalizedNumberProps) => {
  const {
    formatNumber,
    formatCurrency,
    formatPercentage,
    formatFileSize,
  } = useLocaleFormat();

  let formattedValue: string;

  switch (type) {
    case 'currency':
      formattedValue = formatCurrency(value, {
        currency,
        decimals: decimals ?? 2,
        showSymbol,
      });
      break;

    case 'percentage':
      formattedValue = formatPercentage(value, decimals ?? 0);
      break;

    case 'fileSize':
      formattedValue = formatFileSize(value, decimals ?? 2);
      break;

    case 'number':
    default:
      formattedValue = formatNumber(value, {
        decimals: decimals ?? 0,
        useGrouping,
      });
      break;
  }

  return <span className={className}>{formattedValue}</span>;
};

export default LocalizedNumber;

