# Посібник з перекладу динамічного контенту

## 📚 Обзор

Повна система для роботи з мультиязычным динамическим контентом из API/БД.

### Возможности

- ✅ Типы для мультиязычных данных
- ✅ Хуки для загрузки переведенных данных
- ✅ Извлечение перевода для текущего языка
- ✅ SEO с hreflang тегами
- ✅ Автогенерация sitemap для всех мов
- ✅ Мок-данные для примеров

---

## 🗄️ Структура данных

### Базовая структура

```typescript
{
  "id": 1,
  "translations": {
    "uk": {
      "title": "Заголовок новини",
      "content": "Текст новини...",
      "slug": "novyna-1"
    },
    "en": {
      "title": "News title",
      "content": "News content...",
      "slug": "news-1"
    }
  },
  "image": "/images/news.jpg",
  "date": "2025-01-15"
}
```

### Типы контента

**Файл:** `src/types/translated-content.ts`

#### TranslatedNews

```typescript
interface TranslatedNews {
  id: string | number;
  translations: {
    uk: {
      title: string;
      content: string;
      excerpt?: string;
      slug: string;
      metaTitle?: string;
      metaDescription?: string;
    };
    en: { ... };
  };
  image: string;
  date: string;
  category: string;
  tags?: string[];
  featured?: boolean;
  author?: string;
}
```

#### TranslatedCourse

```typescript
interface TranslatedCourse {
  id: string | number;
  translations: {
    uk: {
      title: string;
      description: string;
      content: string;
      requirements?: string;
      outcomes?: string[];
      slug: string;
    };
    en: { ... };
  };
  duration: number;
  price?: number;
  level: 'beginner' | 'intermediate' | 'advanced';
}
```

#### TranslatedDocument

```typescript
interface TranslatedDocument {
  id: string | number;
  translations: {
    uk: {
      title: string;
      description?: string;
      slug: string;
    };
    en: { ... };
  };
  file: string;
  fileSize: number;
  fileType: string;
  category: string;
}
```

---

## 🪝 Хуки для роботи з данными

**Файл:** `src/hooks/useTranslatedData.ts`

### useTranslatedData

Загрузка одного элемента:

```tsx
import { useTranslatedData } from '@/hooks/useTranslatedData';
import type { TranslatedNews } from '@/types/translated-content';

const NewsArticle = ({ id }) => {
  const { data, loading, error } = useTranslatedData<TranslatedNews>('news', id);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  if (!data) return <NotFound />;

  return (
    <article>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <span>{data.date}</span>
    </article>
  );
};
```

### useTranslatedList

Загрузка списка:

```tsx
import { useTranslatedList } from '@/hooks/useTranslatedData';

const NewsList = () => {
  const { data, loading, error, total } = useTranslatedList<TranslatedNews>('news', {
    category: 'announcements',
    limit: 10,
    page: 1
  });

  return (
    <div>
      {data.map(news => (
        <NewsCard key={news.id} news={news} />
      ))}
      <p>Total: {total}</p>
    </div>
  );
};
```

### useTranslationExtractor

Извлечение перевода без загрузки:

```tsx
import { useTranslationExtractor } from '@/hooks/useTranslatedData';

const NewsCard = ({ newsData }) => {
  const extract = useTranslationExtractor();
  const localizedNews = extract(newsData);

  return (
    <div>
      <h3>{localizedNews.title}</h3>
      <p>{localizedNews.excerpt}</p>
    </div>
  );
};
```

### extractTranslation

Функция для извлечения (не хук):

```typescript
import { extractTranslation } from '@/hooks/useTranslatedData';

const newsData = fetchNewsFromAPI();
const localizedNews = extractTranslation(newsData, 'uk');
```

---

## 🎯 SEO для мультиязычного контента

**Файл:** `src/components/SEOHead.tsx`

### Базовое використання

```tsx
import SEOHead from '@/components/SEOHead';

<SEOHead
  title="About Us"
  description="Learn more about our academy"
  image="/images/about.jpg"
/>
```

### Для статей/новостей

```tsx
<SEOHead
  title={news.metaTitle || news.title}
  description={news.metaDescription || news.excerpt}
  image={news.image}
  type="article"
  publishedTime={news.createdAt}
  modifiedTime={news.updatedAt}
  author={news.author}
  keywords={['образование', 'новости']}
/>
```

### Що генерируется автоматически

```html
<!-- Basic Meta -->
<title>About Us | Академія</title>
<meta name="description" content="..." />
<html lang="uk" />

<!-- Canonical -->
<link rel="canonical" href="https://academy.ua/uk/about" />

<!-- Hreflang -->
<link rel="alternate" hreflang="uk" href="https://academy.ua/uk/about" />
<link rel="alternate" hreflang="en" href="https://academy.ua/en/about" />
<link rel="alternate" hreflang="x-default" href="https://academy.ua/uk/about" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="About Us" />
<meta property="og:locale" content="uk_UA" />
<meta property="og:locale:alternate" content="en_US" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
```

---

## 🔗 Альтернативные мовые версии

**Файл:** `src/components/LanguageAlternates.tsx`

### Для контента с одинаковыми URL

```tsx
import LanguageAlternates from '@/components/LanguageAlternates';

// Автоматично берет текущий путь
<LanguageAlternates />
```

### Для контента с разными slug

```tsx
<LanguageAlternates
  slugs={{
    uk: 'pro-nas',
    en: 'about-us'
  }}
/>
```

### Хук useLanguageAlternates

```tsx
import { useLanguageAlternates } from '@/components/LanguageAlternates';

const alternateUrls = useLanguageAlternates({
  uk: 'novyna-1',
  en: 'news-1'
});

// alternateUrls = {
//   uk: 'https://academy.ua/uk/novyna-1',
//   en: 'https://academy.ua/en/news-1'
// }
```

---

## 🗺️ Sitemap

**Файл:** `scripts/generate-sitemap.cjs`

### Генерация

```bash
npm run sitemap:generate
```

Создает:
- `public/sitemap.xml` - главный индекс
- `public/sitemap-uk.xml` - украинские страницы
- `public/sitemap-en.xml` - английские страницы

### Автогенерация при build

Sitemap автоматически генерируется перед каждым build:

```bash
npm run build
# → Запускает prebuild → sitemap:generate → build
```

### Структура sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://academy.ua/uk/about</loc>
    <lastmod>2025-12-19</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="uk" href="https://academy.ua/uk/about"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://academy.ua/en/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://academy.ua/uk/about"/>
  </url>
</urlset>
```

### Добавление динамического контента

Отредактируйте `scripts/generate-sitemap.cjs`:

```javascript
const dynamicPages = {
  news: [
    { 
      slugs: { uk: 'novyna-1', en: 'news-1' },
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: '2025-01-15'
    },
  ],
  courses: [
    {
      slugs: { uk: 'kurs-1', en: 'course-1' },
      priority: 0.8,
      changefreq: 'weekly'
    },
  ],
};
```

---

## 💾 Мок-данные

**Файл:** `src/data/mock-translated-news.ts`

### Використання моков

```tsx
import { mockTranslatedNews, fetchTranslatedNews } from '@/data/mock-translated-news';

// Прямое використання
const news = mockTranslatedNews;

// Симуляция API
const newsItem = await fetchTranslatedNews(1);
const newsList = await fetchTranslatedNews();

// По slug
const news = await fetchNewsBySlug('novyna-1', 'uk');
```

### Структура мока

```typescript
export const mockTranslatedNews: TranslatedNews[] = [
  {
    id: 1,
    translations: {
      uk: {
        title: "Нова освітня програма",
        excerpt: "Короткий опис...",
        content: "<p>Повний текст...</p>",
        slug: "nova-programa",
        metaTitle: "Нова програма | Академія",
        metaDescription: "SEO опис...",
      },
      en: {
        title: "New Educational Program",
        excerpt: "Short description...",
        content: "<p>Full text...</p>",
        slug: "new-program",
        metaTitle: "New Program | Academy",
        metaDescription: "SEO description...",
      },
    },
    image: "/images/news/program.jpg",
    imageAlt: {
      uk: "Презентація програми",
      en: "Program presentation",
    },
    date: "2025-01-15",
    category: "announcements",
    tags: ["освіта", "програми"],
    featured: true,
    author: "Адміністрація",
  },
];
```

---

## 📝 Полный пример: Страница новости

```tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { extractTranslation } from '@/hooks/useTranslatedData';
import { fetchNewsBySlug } from '@/data/mock-translated-news';
import type { TranslatedNews, ContentLanguage } from '@/types/translated-content';
import SEOHead from '@/components/SEOHead';
import LanguageAlternates from '@/components/LanguageAlternates';

const NewsArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  const [newsData, setNewsData] = useState<TranslatedNews | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNewsBySlug(
          slug!,
          i18n.language as ContentLanguage
        );
        setNewsData(data);
      } catch (error) {
        console.error('Failed to load news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [slug, i18n.language]);

  if (loading) return <LoadingSkeleton />;
  if (!newsData) return <NotFound />;

  const localizedNews = extractTranslation(
    newsData,
    i18n.language as ContentLanguage
  );

  return (
    <>
      {/* SEO */}
      <SEOHead
        title={localizedNews.metaTitle || localizedNews.title}
        description={localizedNews.metaDescription || localizedNews.excerpt || ''}
        image={newsData.image}
        type="article"
        publishedTime={newsData.createdAt}
        modifiedTime={newsData.updatedAt}
        author={newsData.author}
        keywords={newsData.tags}
      />

      {/* Language alternates */}
      <LanguageAlternates
        slugs={{
          uk: newsData.translations.uk.slug,
          en: newsData.translations.en.slug,
        }}
      />

      {/* Content */}
      <article>
        {newsData.image && (
          <img src={newsData.image} alt={localizedNews.title} />
        )}

        {newsData.featured && (
          <span className="badge">Featured</span>
        )}

        <h1>{localizedNews.title}</h1>

        <div className="meta">
          <time>{new Date(newsData.date).toLocaleDateString()}</time>
          {newsData.author && <span>• {newsData.author}</span>}
        </div>

        {localizedNews.excerpt && (
          <p className="excerpt">{localizedNews.excerpt}</p>
        )}

        <div 
          className="content"
          dangerouslySetInnerHTML={{ __html: localizedNews.content }}
        />

        {newsData.tags && (
          <div className="tags">
            {newsData.tags.map(tag => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        )}
      </article>
    </>
  );
};

export default NewsArticlePage;
```

---

## 🔧 Настройки

### Установить BASE_URL

Создайте `.env` файл:

```env
VITE_BASE_URL=https://academy.ua
```

Используется в:
- SEO компонентах для canonical URL
- Генерации sitemap
- hreflang тегах

### Настроить API endpoints

В `useTranslatedData.ts`:

```typescript
const response = await fetch(`/api/${type}/${id}`);
// Замініть на ваш API endpoint
```

---

## 🎯 Best Practices

### ✅ DO

1. **Всегда використовуйте SEOHead**
   ```tsx
   <SEOHead title={...} description={...} />
   ```

2. **Добавляйте hreflang для разных slug**
   ```tsx
   <LanguageAlternates slugs={{ uk: '...', en: '...' }} />
   ```

3. **Извлекайте перевод на клиенте**
   ```tsx
   const extract = useTranslationExtractor();
   const localized = extract(data);
   ```

4. **Використовуйте типы TypeScript**
   ```tsx
   const { data } = useTranslatedData<TranslatedNews>('news', id);
   ```

### ❌ DON'T

1. **Не храните переводы отдельно**
   ```typescript
   // ❌ Плохо
   { id: 1, title_uk: '...', title_en: '...' }
   
   // ✅ Хорошо
   { id: 1, translations: { uk: { title: '...' }, en: { title: '...' } } }
   ```

2. **Не забывайте про SEO**
   ```tsx
   // ❌ Плохо - нет SEO
   <article>{news.title}</article>
   
   // ✅ Хорошо
   <><SEOHead .../><article>...</article></>
   ```

---

## ✅ Checklist

- [x] Типы для мультиязычных данных
- [x] useTranslatedData хук
- [x] useTranslatedList хук
- [x] useTranslationExtractor хук
- [x] SEOHead компонент
- [x] LanguageAlternates компонент
- [x] Генерация sitemap
- [x] Мок-данные
- [x] Приклад использования
- [x] Документация
- [x] Build успешен ✅

---

## 🎉 Готово!

Повна система для роботи з мультиязычным динамическим контентом!

**Удачной разработки!** 🚀

