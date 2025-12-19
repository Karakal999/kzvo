/**
 * Localized calendar component
 */

import { useState } from 'react';
import { useLocaleFormat } from '../hooks/useLocaleFormat';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LocalizedCalendarProps {
  /**
   * Selected date
   */
  selectedDate?: Date;

  /**
   * Date selection handler
   */
  onSelectDate?: (date: Date) => void;

  /**
   * Minimum selectable date
   */
  minDate?: Date;

  /**
   * Maximum selectable date
   */
  maxDate?: Date;

  /**
   * Show holidays
   */
  showHolidays?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * LocalizedCalendar Component
 * 
 * Calendar with locale-specific configuration:
 * - First day of week (Monday for UK, Sunday for EN)
 * - Localized month/day names
 * - Holiday indicators
 * 
 * @example
 * const [date, setDate] = useState(new Date());
 * 
 * <LocalizedCalendar
 *   selectedDate={date}
 *   onSelectDate={setDate}
 *   showHolidays
 * />
 */
const LocalizedCalendar = ({
  selectedDate,
  onSelectDate,
  minDate,
  maxDate,
  showHolidays = true,
  className = '',
}: LocalizedCalendarProps) => {
  const { getCalendarConfig, isHoliday } = useLocaleFormat();
  const config = getCalendarConfig();

  const [currentMonth, setCurrentMonth] = useState(
    selectedDate || new Date()
  );

  // Get first day of month
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );

  // Get last day of month
  const lastDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );

  // Calculate starting day offset
  const startOffset =
    (firstDayOfMonth.getDay() - config.firstDayOfWeek + 7) % 7;

  // Get days in month
  const daysInMonth = lastDayOfMonth.getDate();

  // Generate calendar days
  const calendarDays: (Date | null)[] = [];

  // Add empty cells before month start
  for (let i = 0; i < startOffset; i++) {
    calendarDays.push(null);
  }

  // Add month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    );
  }

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleDateClick = (date: Date) => {
    if (!isDateDisabled(date) && onSelectDate) {
      onSelectDate(date);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <h3 className="text-lg font-semibold">
          {config.months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>

        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {config.weekDays.map((day, index) => (
          <div
            key={index}
            className="text-center text-sm font-medium text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="p-2" />;
          }

          const disabled = isDateDisabled(date);
          const selected = isDateSelected(date);
          const today = isToday(date);
          const holiday = showHolidays ? isHoliday(date) : { isHoliday: false };

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              disabled={disabled}
              className={`
                relative p-2 text-center rounded-md transition-colors
                ${disabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}
                ${selected ? 'bg-primary text-white hover:bg-primary/90' : ''}
                ${today && !selected ? 'ring-2 ring-primary' : ''}
                ${holiday.isHoliday && !selected ? 'text-accent font-semibold' : ''}
              `}
              title={holiday.isHoliday ? holiday.name : undefined}
            >
              {date.getDate()}
              {holiday.isHoliday && (
                <span className="absolute top-0 right-0 text-xs">🎉</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      {showHolidays && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full ring-2 ring-primary" />
              <span>Сьогодні / Today</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🎉</span>
              <span>Свято / Holiday</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalizedCalendar;

