/**
 * Component for displaying dates in localized format
 */

import { useLocaleFormat } from '../hooks/useLocaleFormat';
import type { DateFormatType } from '../utils/locale-formats';

interface LocalizedDateProps {
  /**
   * Date to format (Date object, ISO string, or timestamp)
   */
  date: Date | string | number;

  /**
   * Format type
   * - full: "14 грудня 2023 року" / "December 14, 2023"
   * - long: "14 грудня 2023" / "December 14, 2023"
   * - medium: "14 гру 2023" / "Dec 14, 2023"
   * - short: "14.12.2023" / "12/14/2023"
   * - time: "14:30" / "2:30 PM"
   * - dateTime: "14 грудня 2023 року о 14:30" / "December 14, 2023 at 2:30 PM"
   */
  format?: DateFormatType;

  /**
   * Display as relative time instead (e.g., "2 hours ago")
   */
  relative?: boolean;

  /**
   * Base date for relative time (defaults to now)
   */
  baseDate?: Date | number;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Show holiday indicator if date is a holiday
   */
  showHoliday?: boolean;
}

/**
 * LocalizedDate Component
 * 
 * Displays dates in locale-specific format with optional relative time
 * 
 * @example
 * // Full date format
 * <LocalizedDate date={new Date()} format="full" />
 * 
 * @example
 * // Relative time
 * <LocalizedDate date={articleDate} relative />
 * 
 * @example
 * // With holiday indicator
 * <LocalizedDate date={eventDate} showHoliday />
 */
const LocalizedDate = ({
  date,
  format = 'medium',
  relative = false,
  baseDate,
  className = '',
  showHoliday = false,
}: LocalizedDateProps) => {
  const { formatDate, formatTimeAgo, isHoliday } = useLocaleFormat();

  const formattedDate = relative
    ? formatTimeAgo(date, baseDate)
    : formatDate(date, format);

  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
  const holiday = showHoliday ? isHoliday(dateObj) : { isHoliday: false };

  return (
    <time
      dateTime={dateObj.toISOString()}
      className={`${className} ${holiday.isHoliday ? 'text-accent font-semibold' : ''}`}
      title={holiday.isHoliday ? holiday.name : undefined}
    >
      {formattedDate}
      {holiday.isHoliday && showHoliday && (
        <span className="ml-1" title={holiday.name}>
          🎉
        </span>
      )}
    </time>
  );
};

export default LocalizedDate;

