import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { extractTranslation, useTranslationExtractor } from '../../hooks/useTranslatedData';
import { mockTranslatedNews } from '../../data/mock-translated-news';
import type { ContentLanguage } from '../../types/translated-content';
import SEOHead from '../SEOHead';
import LanguageAlternates from '../LanguageAlternates';

/**
 * Example component showing how to work with translated dynamic content
 * 
 * Demonstrates:
 * - Loading translated data
 * - Extracting translation for current language
 * - SEO with multilingual content
 * - hreflang tags
 */
const TranslatedNewsExample = () => {
  const { i18n } = useTranslation();
  const extract = useTranslationExtractor();
  const [news, setNews] = useState<ReturnType<typeof extract>[]>([]);
  const [selectedNews, setSelectedNews] = useState<ReturnType<typeof extract> | null>(null);

  // Load and extract translations
  useEffect(() => {
    const currentLang = i18n.language as ContentLanguage;
    const extractedNews = mockTranslatedNews.map(item => 
      extractTranslation(item, currentLang)
    );
    setNews(extractedNews);
  }, [i18n.language]);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* SEO for the listing page */}
      {!selectedNews && (
        <SEOHead
          title="News"
          description="Latest news from the Academy"
          type="website"
        />
      )}

      {/* SEO for selected article */}
      {selectedNews && (
        <>
          <SEOHead
            title={selectedNews.metaTitle || selectedNews.title}
            description={selectedNews.metaDescription || selectedNews.excerpt || ''}
            image={selectedNews.image}
            type="article"
            publishedTime={selectedNews.createdAt}
            modifiedTime={selectedNews.updatedAt}
            author={selectedNews.author}
          />
          <LanguageAlternates
            slugs={{
              uk: mockTranslatedNews.find(n => n.id === selectedNews.id)?.translations.uk.slug || '',
              en: mockTranslatedNews.find(n => n.id === selectedNews.id)?.translations.en.slug || '',
            }}
          />
        </>
      )}

      <h1 className="text-3xl font-bold mb-8">
        Translated News Example
      </h1>

      {selectedNews ? (
        /* Article View */
        <div>
          <button
            onClick={() => setSelectedNews(null)}
            className="mb-4 text-blue-600 hover:underline"
          >
            ← Back to list
          </button>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {selectedNews.image && (
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="w-full h-64 object-cover"
              />
            )}

            <div className="p-6">
              {/* Featured badge */}
              {mockTranslatedNews.find(n => n.id === selectedNews.id)?.featured && (
                <span className="inline-block px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-semibold mb-4">
                  Featured
                </span>
              )}

              <h2 className="text-3xl font-bold mb-4">
                {selectedNews.title}
              </h2>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <span>{new Date(selectedNews.date).toLocaleDateString()}</span>
                {selectedNews.author && <span>• {selectedNews.author}</span>}
                <span>• {selectedNews.category}</span>
              </div>

              {selectedNews.excerpt && (
                <p className="text-lg text-gray-700 mb-6">
                  {selectedNews.excerpt}
                </p>
              )}

              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedNews.content }}
              />

              {mockTranslatedNews.find(n => n.id === selectedNews.id)?.tags && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {mockTranslatedNews.find(n => n.id === selectedNews.id)?.tags?.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Language alternatives info */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">🌐 Language Alternatives:</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    🇺🇦 Ukrainian: /uk/news/{mockTranslatedNews.find(n => n.id === selectedNews.id)?.translations.uk.slug}
                  </p>
                  <p>
                    🇬🇧 English: /en/news/{mockTranslatedNews.find(n => n.id === selectedNews.id)?.translations.en.slug}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      ) : (
        /* List View */
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedNews(item)}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                {mockTranslatedNews.find(n => n.id === item.id)?.featured && (
                  <span className="inline-block px-2 py-1 bg-yellow-400 text-yellow-900 rounded text-xs font-semibold mb-2">
                    Featured
                  </span>
                )}

                <h3 className="text-xl font-bold mb-2 line-clamp-2">
                  {item.title}
                </h3>

                {item.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                  <span className="text-blue-600 hover:underline">
                    Read more →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Section */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">How This Works</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">1. Data Structure</h3>
            <pre className="bg-white p-4 rounded overflow-x-auto text-sm">
{`{
  "id": 1,
  "translations": {
    "uk": {
      "title": "Заголовок новини",
      "content": "Текст...",
      "slug": "novyna-1"
    },
    "en": {
      "title": "News title",
      "content": "Content...",
      "slug": "news-1"
    }
  },
  "image": "/images/news.jpg",
  "date": "2025-01-15"
}`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">2. Extract Translation</h3>
            <pre className="bg-white p-4 rounded overflow-x-auto text-sm">
{`const extract = useTranslationExtractor();
const localizedNews = extract(newsData);

// Result: { id, title, content, slug, image, date }`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">3. SEO Tags</h3>
            <pre className="bg-white p-4 rounded overflow-x-auto text-sm">
{`<SEOHead
  title={news.metaTitle}
  description={news.metaDescription}
  image={news.image}
  type="article"
/>
<LanguageAlternates slugs={{ uk: "...", en: "..." }} />`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">4. Current Language</h3>
            <p className="text-lg">
              <strong>Current:</strong> {i18n.language === 'uk' ? '🇺🇦 Українська' : '🇬🇧 English'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatedNewsExample;

