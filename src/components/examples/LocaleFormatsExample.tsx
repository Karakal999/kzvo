/**
 * Example component demonstrating locale formatting
 */

import { useState } from 'react';
import { useLocaleFormat, useFormLocale } from '../../hooks/useLocaleFormat';
import LocalizedDate from '../LocalizedDate';
import LocalizedNumber from '../LocalizedNumber';
import LocalizedPhoneInput from '../LocalizedPhoneInput';
import LocalizedCalendar from '../LocalizedCalendar';
import LanguageSwitcher from '../LanguageSwitcher';
import { useCommonTranslation } from '../../hooks/useTypedTranslation';

/**
 * LocaleFormatsExample Component
 * 
 * Comprehensive example showing all locale formatting features:
 * - Date formatting (full, long, medium, short, relative)
 * - Number formatting
 * - Currency formatting
 * - Phone number formatting
 * - Calendar with holidays
 * - Localized forms
 */
const LocaleFormatsExample = () => {
  const { t } = useCommonTranslation();
  const {
    locale,
    formatDate,
    formatTimeAgo,
    formatNumber,
    formatCurrency,
    formatPercentage,
    formatFileSize,
    formatPhoneNumber,
    getCalendarConfig,
  } = useLocaleFormat();

  const { placeholders, dateFormat } = useFormLocale();

  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Example data
  const exampleDate = new Date('2023-12-14T14:30:00');
  const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
  const exampleNumber = 1234567.89;
  const examplePrice = 999.99;
  const exampleFileSize = 1536000; // bytes
  const examplePhone = '380441234567';

  const calendarConfig = getCalendarConfig();

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Locale Formatting Examples</h1>
        <LanguageSwitcher variant="default" />
      </div>

      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm">
          <strong>Current locale:</strong> {locale === 'uk' ? '🇺🇦 Українська' : '🇬🇧 English'}
        </p>
        <p className="text-sm mt-1">
          <strong>Date format:</strong> {dateFormat}
        </p>
      </div>

      <div className="grid gap-8">
        {/* Date Formatting Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">📅 Date Formatting</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">Full:</span>
              <LocalizedDate date={exampleDate} format="full" />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">Long:</span>
              <LocalizedDate date={exampleDate} format="long" />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">Medium:</span>
              <LocalizedDate date={exampleDate} format="medium" />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">Short:</span>
              <LocalizedDate date={exampleDate} format="short" />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">Time:</span>
              <LocalizedDate date={exampleDate} format="time" />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">Date & Time:</span>
              <LocalizedDate date={exampleDate} format="dateTime" />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">Relative (2h ago):</span>
              <LocalizedDate date={pastDate} relative />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">Holiday (New Year):</span>
              <LocalizedDate date={new Date('2024-01-01')} format="full" showHoliday />
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded">
            <h3 className="font-semibold mb-2">Raw values:</h3>
            <code className="text-sm">
              <pre className="whitespace-pre-wrap">
{`formatDate(date, 'full'): ${formatDate(exampleDate, 'full')}
formatDate(date, 'short'): ${formatDate(exampleDate, 'short')}
formatTimeAgo(pastDate): ${formatTimeAgo(pastDate)}`}
              </pre>
            </code>
          </div>
        </section>

        {/* Number Formatting Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">🔢 Number Formatting</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">Integer:</span>
              <LocalizedNumber value={exampleNumber} decimals={0} />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">2 Decimals:</span>
              <LocalizedNumber value={exampleNumber} decimals={2} />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">No grouping:</span>
              <LocalizedNumber value={exampleNumber} decimals={2} useGrouping={false} />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">Currency:</span>
              <LocalizedNumber value={examplePrice} type="currency" />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">Currency (no symbol):</span>
              <LocalizedNumber value={examplePrice} type="currency" showSymbol={false} />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">Percentage:</span>
              <LocalizedNumber value={75.5} type="percentage" decimals={1} />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">File Size:</span>
              <LocalizedNumber value={exampleFileSize} type="fileSize" />
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded">
            <h3 className="font-semibold mb-2">Raw values:</h3>
            <code className="text-sm">
              <pre className="whitespace-pre-wrap">
{`formatNumber(${exampleNumber}, {decimals: 2}): ${formatNumber(exampleNumber, { decimals: 2 })}
formatCurrency(${examplePrice}): ${formatCurrency(examplePrice)}
formatPercentage(75.5, 1): ${formatPercentage(75.5, 1)}
formatFileSize(${exampleFileSize}): ${formatFileSize(exampleFileSize)}`}
              </pre>
            </code>
          </div>
        </section>

        {/* Phone Number Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">📞 Phone Number Formatting</h2>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">Raw:</span>
              <code>{examplePhone}</code>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">Formatted:</span>
              <code>{formatPhoneNumber(examplePhone)}</code>
            </div>
          </div>

          <LocalizedPhoneInput
            value={phone}
            onChange={setPhone}
            label="Phone Number"
            required
          />
        </section>

        {/* Calendar Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">📆 Localized Calendar</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <LocalizedCalendar
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                showHolidays
              />
            </div>

            <div>
              <h3 className="font-semibold mb-3">Calendar Configuration</h3>
              
              <div className="space-y-2 text-sm">
                <p>
                  <strong>First day of week:</strong>{' '}
                  {calendarConfig.weekDaysFull[calendarConfig.firstDayOfWeek]}
                </p>

                <div>
                  <strong>Week days:</strong>
                  <div className="flex gap-2 mt-1">
                    {calendarConfig.weekDays.map((day, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <strong>Months:</strong>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {calendarConfig.monthsShort.map((month, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {month}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <strong>Selected date:</strong>
                  <p className="mt-1">
                    <LocalizedDate date={selectedDate} format="full" />
                  </p>
                </div>

                <div>
                  <strong>Holidays:</strong>
                  <ul className="mt-1 space-y-1">
                    {calendarConfig.holidays.slice(0, 5).map((holiday, i) => (
                      <li key={i} className="text-xs">
                        🎉 {holiday.date} - {holiday.name}
                      </li>
                    ))}
                    {calendarConfig.holidays.length > 5 && (
                      <li className="text-xs text-gray-500">
                        ... and {calendarConfig.holidays.length - 5} more
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Placeholders Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">📝 Form Placeholders</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {t('labels.email')}
              </label>
              <input
                type="email"
                placeholder={placeholders.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {t('labels.phone')}
              </label>
              <input
                type="tel"
                placeholder={placeholders.phone}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {t('labels.name')}
              </label>
              <input
                type="text"
                placeholder={placeholders.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {t('labels.date')}
              </label>
              <input
                type="text"
                placeholder={placeholders.date}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                {t('labels.message')}
              </label>
              <textarea
                placeholder={placeholders.message}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded">
            <h3 className="font-semibold mb-2">Placeholders object:</h3>
            <code className="text-sm">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(placeholders, null, 2)}
              </pre>
            </code>
          </div>
        </section>

        {/* Usage Examples Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">💻 Usage Examples</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. useLocaleFormat Hook</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
{`import { useLocaleFormat } from '@/hooks/useLocaleFormat';

const MyComponent = () => {
  const { formatDate, formatCurrency } = useLocaleFormat();
  
  return (
    <div>
      <p>{formatDate(new Date(), 'full')}</p>
      <p>{formatCurrency(999.99)}</p>
    </div>
  );
};`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. LocalizedDate Component</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
{`import LocalizedDate from '@/components/LocalizedDate';

<LocalizedDate date={article.publishedAt} format="full" />
<LocalizedDate date={comment.createdAt} relative />
<LocalizedDate date={event.date} showHoliday />`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. LocalizedNumber Component</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
{`import LocalizedNumber from '@/components/LocalizedNumber';

<LocalizedNumber value={price} type="currency" />
<LocalizedNumber value={discount} type="percentage" />
<LocalizedNumber value={fileSize} type="fileSize" />`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">4. LocalizedPhoneInput Component</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
{`import LocalizedPhoneInput from '@/components/LocalizedPhoneInput';

const [phone, setPhone] = useState('');

<LocalizedPhoneInput
  value={phone}
  onChange={setPhone}
  required
/>`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">5. LocalizedCalendar Component</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
{`import LocalizedCalendar from '@/components/LocalizedCalendar';

<LocalizedCalendar
  selectedDate={date}
  onSelectDate={setDate}
  showHolidays
  minDate={new Date()}
/>`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LocaleFormatsExample;

