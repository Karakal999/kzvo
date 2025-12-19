import { useTranslation } from 'react-i18next';
import Trans, { TransWithLink } from '../Trans';
import LinkWithLang from '../LinkWithLang';
import { pageKeys, commonKeys, formatDate, formatNumber } from '../../utils/i18n';

/**
 * Example component demonstrating content translation features
 * 
 * Shows:
 * - Trans component for complex translations
 * - Links inside text
 * - Pluralization
 * - Variable interpolation
 * - Key utility functions
 * - Date/number formatting
 */
const ContentTranslationExample = () => {
  const { t, i18n } = useTranslation(['common', 'about', 'news'] as any);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Content Translation Examples</h1>

      {/* Example 1: Basic Trans component */}
      <section className="p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">1. Basic Trans Component</h2>
        <Trans i18nKey="about:sections.history.content">
          Academy history content here
        </Trans>
      </section>

      {/* Example 2: Trans with variables */}
      <section className="p-4 bg-green-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">2. Trans with Variables</h2>
        <Trans 
          i18nKey="common:welcome"
          values={{ name: "Іван" }}
        >
          Welcome, {'{{name}}'}!
        </Trans>
      </section>

      {/* Example 3: Trans with link inside text */}
      <section className="p-4 bg-yellow-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">3. Link Inside Text</h2>
        <p>
          <Trans
            i18nKey="read_more_about"
            components={{
              link: <LinkWithLang to="/about" className="text-blue-600 hover:underline" />
            }}
          >
            Read more <link>about our academy</link>
          </Trans>
        </p>
      </section>

      {/* Example 4: TransWithLink helper */}
      <section className="p-4 bg-purple-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">4. TransWithLink Helper</h2>
        <p>
          <TransWithLink
            i18nKey="visit_our_page"
            linkTo="/contacts"
            linkClassName="text-blue-600 hover:underline"
          />
        </p>
      </section>

      {/* Example 5: Trans with bold text */}
      <section className="p-4 bg-pink-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">5. Trans with Formatting</h2>
        <Trans i18nKey="important_notice">
          This is <strong>very important</strong> information
        </Trans>
      </section>

      {/* Example 6: Using key utility functions */}
      <section className="p-4 bg-indigo-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">6. Key Utility Functions</h2>
        <div className="space-y-2">
          <p>
            <code className="bg-gray-200 px-2 py-1 rounded">
              pageKeys('about', 'title')
            </code>
            → <strong>{t(pageKeys('about', 'title'))}</strong>
          </p>
          <p>
            <code className="bg-gray-200 px-2 py-1 rounded">
              commonKeys('buttons', 'read_more')
            </code>
            → <strong>{t(commonKeys('buttons', 'read_more'))}</strong>
          </p>
        </div>
      </section>

      {/* Example 7: Pluralization */}
      <section className="p-4 bg-teal-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">7. Pluralization</h2>
        <div className="space-y-2">
          {[1, 2, 5, 21, 25].map(count => (
            <p key={count}>
              {t('course' as any, { count })} {/* Needs plural keys in translation */}
            </p>
          ))}
        </div>
      </section>

      {/* Example 8: Date formatting */}
      <section className="p-4 bg-orange-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">8. Date Formatting</h2>
        <div className="space-y-2">
          <p>
            Current date: 
            <strong className="ml-2">
              {formatDate(new Date(), i18n.language as 'uk' | 'en', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </strong>
          </p>
          <p>
            Short date: 
            <strong className="ml-2">
              {formatDate(new Date(), i18n.language as 'uk' | 'en', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </strong>
          </p>
        </div>
      </section>

      {/* Example 9: Number formatting */}
      <section className="p-4 bg-red-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">9. Number Formatting</h2>
        <div className="space-y-2">
          <p>
            Number: 
            <strong className="ml-2">
              {formatNumber(1234567.89, i18n.language as 'uk' | 'en')}
            </strong>
          </p>
          <p>
            Percentage: 
            <strong className="ml-2">
              {formatNumber(0.856, i18n.language as 'uk' | 'en', {
                style: 'percent',
                minimumFractionDigits: 1,
              })}
            </strong>
          </p>
        </div>
      </section>

      {/* Example 10: Nested translations */}
      <section className="p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">10. Nested Translations</h2>
        <div className="space-y-2">
          <h3 className="font-semibold">
            {t('about:sections.management.title' as any)}
          </h3>
          <ul className="list-disc list-inside">
            <li>{t('about:sections.management.positions.rector' as any)}</li>
            <li>{t('about:sections.management.positions.vice_rector_academic' as any)}</li>
            <li>{t('about:sections.management.positions.vice_rector_scientific' as any)}</li>
          </ul>
        </div>
      </section>

      {/* Example 11: News categories */}
      <section className="p-4 bg-cyan-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">11. Dynamic List Translation</h2>
        <div className="flex flex-wrap gap-2">
          {Object.keys(t('news:categories' as any, { returnObjects: true }) as any).map(key => (
            <span 
              key={key}
              className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
            >
              {t(`news:categories.${key}` as any)}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContentTranslationExample;

