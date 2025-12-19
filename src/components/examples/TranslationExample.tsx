import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Example component demonstrating various i18n usage patterns
 * 
 * This component shows:
 * 1. Basic translation usage
 * 2. Multiple namespaces
 * 3. Language switching
 * 4. Interpolation with variables
 * 5. Pluralization
 * 6. Nested keys
 */
const TranslationExample = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation(['common', 'navigation', 'pages']);
  const [count, setCount] = useState(3);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        i18n Translation Examples
      </h1>

      {/* Language Switcher */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">1. Language Switching</h2>
        <p className="mb-2">Current Language: <strong>{language}</strong></p>
        <div className="space-x-2">
          <button
            onClick={() => setLanguage('UA')}
            className={`px-4 py-2 rounded ${
              language === 'UA' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Українська
          </button>
          <button
            onClick={() => setLanguage('EN')}
            className={`px-4 py-2 rounded ${
              language === 'EN' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Basic Translation */}
      <div className="mb-8 p-4 bg-green-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">2. Basic Translations</h2>
        <div className="space-y-2">
          <p>
            <code className="bg-gray-200 px-2 py-1 rounded">
              t('common:buttons.read_more')
            </code>
            → <strong>{t('common:buttons.read_more')}</strong>
          </p>
          <p>
            <code className="bg-gray-200 px-2 py-1 rounded">
              t('common:buttons.download')
            </code>
            → <strong>{t('common:buttons.download')}</strong>
          </p>
          <p>
            <code className="bg-gray-200 px-2 py-1 rounded">
              t('common:status.loading')
            </code>
            → <strong>{t('common:status.loading')}</strong>
          </p>
        </div>
      </div>

      {/* Navigation Namespace */}
      <div className="mb-8 p-4 bg-purple-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">3. Navigation Translations</h2>
        <div className="space-y-2">
          <p>
            <code className="bg-gray-200 px-2 py-1 rounded">
              t('navigation:menu.about')
            </code>
            → <strong>{t('navigation:menu.about')}</strong>
          </p>
          <p>
            <code className="bg-gray-200 px-2 py-1 rounded">
              t('navigation:menu.education')
            </code>
            → <strong>{t('navigation:menu.education')}</strong>
          </p>
        </div>
      </div>

      {/* Pages Namespace */}
      <div className="mb-8 p-4 bg-yellow-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">4. Page Translations</h2>
        <div className="space-y-2">
          <p>
            <code className="bg-gray-200 px-2 py-1 rounded">
              t('pages:home.title')
            </code>
            → <strong>{t('pages:home.title')}</strong>
          </p>
          <p>
            <code className="bg-gray-200 px-2 py-1 rounded">
              t('pages:home.subtitle')
            </code>
            → <strong>{t('pages:home.subtitle')}</strong>
          </p>
        </div>
      </div>

      {/* Interpolation */}
      <div className="mb-8 p-4 bg-pink-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">5. Interpolation (Variables)</h2>
        <div className="space-y-2">
          <p>
            <code className="bg-gray-200 px-2 py-1 rounded">
              t('common:validation.min_length', &#123; count: 8 &#125;)
            </code>
            → <strong>{t('common:validation.min_length', { count: 8 })}</strong>
          </p>
          <p>
            <code className="bg-gray-200 px-2 py-1 rounded">
              t('common:time.days_ago', &#123; count: {count} &#125;)
            </code>
            → <strong>{t('common:time.days_ago', { count })}</strong>
          </p>
          <div className="mt-2">
            <button
              onClick={() => setCount(count + 1)}
              className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
            >
              +
            </button>
            <button
              onClick={() => setCount(Math.max(0, count - 1))}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              -
            </button>
          </div>
        </div>
      </div>

      {/* Error Messages */}
      <div className="mb-8 p-4 bg-red-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">6. Error Messages</h2>
        <div className="space-y-2">
          <p>
            <code className="bg-gray-200 px-2 py-1 rounded">
              t('common:errors.required_field')
            </code>
            → <strong>{t('common:errors.required_field')}</strong>
          </p>
          <p>
            <code className="bg-gray-200 px-2 py-1 rounded">
              t('common:errors.invalid_email')
            </code>
            → <strong>{t('common:errors.invalid_email')}</strong>
          </p>
        </div>
      </div>

      {/* Form Placeholders */}
      <div className="mb-8 p-4 bg-indigo-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">7. Form Placeholders</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder={t('common:placeholders.name')}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="email"
            placeholder={t('common:placeholders.email')}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder={t('common:placeholders.search')}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="p-4 bg-teal-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">8. Translated Buttons</h2>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            {t('common:buttons.read_more')}
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded">
            {t('common:buttons.download')}
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded">
            {t('common:buttons.register')}
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded">
            {t('common:buttons.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranslationExample;

