# 📷 Посібник з перекладу медіа-контенту

## Обзор

Повна система для роботи з мультиязычным медиа-контентом: изображения, документы, видео, графики и карты.

---

## 🎯 Возможности

- ✅ Перекладені alt-тексти для зображень
- ✅ Мультиязычные PDF и другие документы
- ✅ Відео с субтитрами на двух языках
- ✅ Графики с локализованными легендами
- ✅ Карты с переведенными маркерами
- ✅ Структура файлов по языкам
- ✅ Автоматическое форматування размеров файлов

---

## 📦 Установлено

- ✅ Типы для медиа (`translated-media.ts`)
- ✅ Утиліти (`media-helpers.ts`)
- ✅ Переводы (`media.json`)
- ✅ 3 компонента (Image, Document, Video)
- ✅ Namespace 'media' в i18n

---

## 🖼️ Изображения з перекладами

### TranslatedImage Component

```tsx
import TranslatedImage from '@/components/media/TranslatedImage';

// С ключом перевода
<TranslatedImage 
  src="/logo.png" 
  alt="media:images.logoAlt"
/>

// З прямими переводами
<TranslatedImage
  src="/hero.jpg"
  alt={{ 
    uk: "Студенти на навчанні", 
    en: "Students in class" 
  }}
  caption={{ 
    uk: "Головна аудиторія", 
    en: "Main classroom" 
  }}
/>

// С fallback
<TranslatedImage
  src="/image.jpg"
  alt="media:images.buildingAlt"
  fallbackSrc="/images/placeholder.jpg"
  loading="lazy"
/>
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `src` | `string` | URL изображения |
| `alt` | `string \| {uk, en}` | Alt-текст или ключ перевода |
| `title` | `string \| {uk, en}` | Title (опционально) |
| `caption` | `string \| {uk, en}` | Подпись под изображением |
| `fallbackSrc` | `string` | Изображение при ошибке |
| `loading` | `'lazy' \| 'eager'` | Стратегия загрузки |

### Добавить переводы

**`src/locales/uk/media.json`:**
```json
{
  "images": {
    "logoAlt": "Логотип Академії",
    "heroAlt": "Студенти на навчанні",
    "buildingAlt": "Головний корпус"
  }
}
```

---

## 📄 Документы с языками

### TranslatedDocumentLink Component

```tsx
import TranslatedDocumentLink from '@/components/media/TranslatedDocumentLink';

// С объектом документа
<TranslatedDocumentLink
  document={documentData}
  label="media:documents.statute"
  showSize
  showLanguageSelector
  variant="card"
/>

// З прямими URL
<TranslatedDocumentLink
  files={{
    uk: '/files/uk/statute.pdf',
    en: '/files/en/statute_en.pdf'
  }}
  label="Statute"
  variant="button"
/>

// Простая ссылка
<TranslatedDocumentLink
  files={{
    uk: '/files/uk/schedule.docx',
    en: '/files/en/schedule_en.docx'
  }}
  label="media:documents.schedule"
  variant="link"
  openInNewTab
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `document` | `TranslatedDocument` | - | Объект документа |
| `files` | `{uk, en}` | - | Прямые URL файлов |
| `label` | `string` | Required | Метка или ключ перевода |
| `variant` | `'link' \| 'button' \| 'card'` | `'link'` | Вариант отображения |
| `showSize` | `boolean` | `true` | Показать размер файла |
| `showLanguageSelector` | `boolean` | `false` | Показать выбор языка |
| `openInNewTab` | `boolean` | `true` | Открыть в новой вкладке |

### Структура документа

```typescript
const documentData: TranslatedDocument = {
  id: '1',
  type: 'pdf',
  size: 2048000, // bytes
  translations: {
    uk: {
      filename: 'statut.pdf',
      title: 'Статут академії',
      description: 'Основні положення',
      url: '/files/uk/statute.pdf'
    },
    en: {
      filename: 'statute.pdf',
      title: 'Academy statute',
      description: 'Main provisions',
      url: '/files/en/statute_en.pdf'
    }
  },
  uploadedAt: '2024-01-01T00:00:00Z'
};
```

---

## 🎥 Відео с субтитрами

### TranslatedVideo Component

```tsx
import TranslatedVideo from '@/components/media/TranslatedVideo';

const videoData: TranslatedVideo = {
  id: '1',
  videoUrl: '/videos/intro.mp4',
  thumbnail: '/videos/thumbnails/intro.jpg',
  duration: 180, // seconds
  translations: {
    uk: {
      title: 'Вступне відео про академію',
      description: 'Дізнайтеся більше про нашу академію',
      subtitles: [{
        language: 'uk',
        url: '/videos/subtitles/uk/intro.vtt',
        format: 'vtt',
        label: 'Українська'
      }]
    },
    en: {
      title: 'Introduction to the academy',
      description: 'Learn more about our academy',
      subtitles: [{
        language: 'en',
        url: '/videos/subtitles/en/intro.vtt',
        format: 'vtt',
        label: 'English'
      }]
    }
  }
};

<TranslatedVideo
  video={videoData}
  autoSelectSubtitles
  controls
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `video` | `TranslatedVideo` | Required | Данные видео |
| `autoSelectSubtitles` | `boolean` | `true` | Автовыбор субтитров |
| `controls` | `boolean` | `true` | Показать контролы |
| `autoplay` | `boolean` | `false` | Автовоспроизведение |
| `loop` | `boolean` | `false` | Зациклить |
| `muted` | `boolean` | `false` | Без звука |
| `poster` | `string` | - | Постер (превью) |

### Формат субтитров (.vtt)

```
WEBVTT

1
00:00:00.000 --> 00:00:03.000
Вітаємо в Академії педагогічної освіти

2
00:00:03.500 --> 00:00:07.000
Ми готуємо висококваліфікованих вчителів
```

---

## 📂 Структура файлов

### Рекомендуемая структура

```
public/
├── files/
│   ├── uk/
│   │   ├── statute.pdf
│   │   ├── schedule.docx
│   │   └── regulations.pdf
│   └── en/
│       ├── statute_en.pdf
│       ├── schedule_en.docx
│       └── regulations_en.pdf
├── videos/
│   ├── subtitles/
│   │   ├── uk/
│   │   │   ├── intro.vtt
│   │   │   └── tutorial.vtt
│   │   └── en/
│   │       ├── intro.vtt
│   │       └── tutorial.vtt
│   └── thumbnails/
│       ├── intro.jpg
│       └── tutorial.jpg
└── images/
    ├── gallery/
    └── logos/
```

### Утиліти для путей

```tsx
import { 
  getLocalizedFileUrl, 
  generateLocalizedPaths 
} from '@/utils/media-helpers';

// Генерация путей
const paths = generateLocalizedPaths('/files/{lang}/document', 'pdf');
// { uk: '/files/uk/document.pdf', en: '/files/en/document.pdf' }

// Получить URL для текущего языка
const url = getLocalizedFileUrl('/files/{lang}/statute.pdf', 'uk');
// '/files/uk/statute.pdf'
```

---

## 📊 Утиліти

### getFileIcon(extension)

```tsx
import { getFileIcon } from '@/utils/media-helpers';

getFileIcon('pdf')   // '📄'
getFileIcon('docx')  // '📝'
getFileIcon('xlsx')  // '📊'
getFileIcon('mp4')   // '🎥'
```

### formatFileSize(bytes, locale)

```tsx
import { formatFileSize } from '@/utils/media-helpers';

formatFileSize(1536000, 'uk')  // '1,46 МБ'
formatFileSize(1536000, 'en')  // '1.46 MB'
```

### parseSRT(content)

```tsx
import { parseSRT } from '@/utils/media-helpers';

const srtContent = `
1
00:00:00,500 --> 00:00:02,000
Привіт!
`;

const cues = parseSRT(srtContent);
// [{ start: 0.5, end: 2, text: 'Привіт!' }]
```

---

## 🗺️ Карты и графики

### Типы для карт

```typescript
interface TranslatedMapMarker {
  id: string;
  lat: number;
  lng: number;
  translations: {
    uk: {
      title: string;
      description?: string;
      address?: string;
    };
    en: {
      title: string;
      description?: string;
      address?: string;
    };
  };
}
```

### Типы для графиков

```typescript
interface TranslatedChartData {
  labels: {
    uk: string[];
    en: string[];
  };
  datasets: Array<{
    label: {
      uk: string;
      en: string;
    };
    data: number[];
  }>;
  title?: {
    uk: string;
    en: string;
  };
}
```

---

## 💻 Полный пример

```tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TranslatedImage from '@/components/media/TranslatedImage';
import TranslatedDocumentLink from '@/components/media/TranslatedDocumentLink';
import TranslatedVideo from '@/components/media/TranslatedVideo';

const MediaPage = () => {
  const { t } = useTranslation('media');

  const documents: TranslatedDocument[] = [
    {
      id: '1',
      type: 'pdf',
      size: 2048000,
      translations: {
        uk: {
          filename: 'statut.pdf',
          title: 'Статут академії',
          url: '/files/uk/statute.pdf'
        },
        en: {
          filename: 'statute.pdf',
          title: 'Academy statute',
          url: '/files/en/statute_en.pdf'
        }
      }
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Изображение */}
      <TranslatedImage
        src="/images/hero.jpg"
        alt="media:images.heroAlt"
        caption={{
          uk: "Студенти на практичному занятті",
          en: "Students in practical class"
        }}
        className="w-full rounded-lg mb-8"
      />

      {/* Документы */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{t('documents.title')}</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {documents.map(doc => (
            <TranslatedDocumentLink
              key={doc.id}
              document={doc}
              label={doc.translations.uk.title}
              variant="card"
              showSize
              showLanguageSelector
            />
          ))}
        </div>
      </section>

      {/* Відео */}
      <section>
        <h2 className="text-2xl font-bold mb-4">{t('videos.title')}</h2>
        
        <TranslatedVideo
          video={{
            id: '1',
            videoUrl: '/videos/intro.mp4',
            translations: {
              uk: {
                title: 'Вступне відео',
                description: 'Знайомство з академією',
                subtitles: [{
                  language: 'uk',
                  url: '/videos/subtitles/uk/intro.vtt',
                  format: 'vtt'
                }]
              },
              en: {
                title: 'Introduction',
                description: 'Meet our academy',
                subtitles: [{
                  language: 'en',
                  url: '/videos/subtitles/en/intro.vtt',
                  format: 'vtt'
                }]
              }
            }
          }}
          autoSelectSubtitles
          controls
        />
      </section>
    </div>
  );
};

export default MediaPage;
```

---

## 🎯 Best Practices

### ✅ DO

1. **Використовуйте структуру папок**
   ```
   /files/uk/document.pdf
   /files/en/document.pdf
   ```

2. **Завжди додавайте alt-тексти**
   ```tsx
   <TranslatedImage src="..." alt="media:images.logoAlt" />
   ```

3. **Предоставляйте оба языка**
   ```tsx
   files={{ uk: '...', en: '...' }}
   ```

4. **Використовуйте lazy loading**
   ```tsx
   <TranslatedImage src="..." loading="lazy" />
   ```

### ❌ DON'T

1. **Не використовуйте хардкод alt**
   ```tsx
   // ❌ Плохо
   <img src="..." alt="Logo" />
   
   // ✅ Хорошо
   <TranslatedImage src="..." alt="media:images.logoAlt" />
   ```

2. **Не смешивайте языки в одном файле**
   ```
   // ❌ Плохо
   /files/document_mixed.pdf
   
   // ✅ Хорошо
   /files/uk/document.pdf
   /files/en/document.pdf
   ```

---

## 📊 Статистика

**Створено:**
- ✅ 3 типа файлов
- ✅ 1 утилитный файл (15+ функций)
- ✅ 2 файла переводов (uk/en)
- ✅ 3 компонента
- ✅ Структура папок
- ✅ Документация

**Поддерживается:**
- ✅ Зображення з alt/caption
- ✅ PDF, DOCX, XLSX, и др.
- ✅ MP4 видео с VTT/SRT субтитрами
- ✅ Графики и карты (типы)
- ✅ Автоформатування размеров

---

## ✅ Build Status

```bash
npm run build
# ✅ Build успешен (2.80s)
```

---

## 🚀 Наступні кроки

1. **Загрузите файлы:**
   - Создайте папки `public/files/uk` и `public/files/en`
   - Загрузите документы для каждого языка

2. **Додайте субтитри:**
   - Создайте `.vtt` или `.srt` файлы
   - Разместите в `public/videos/subtitles/{lang}/`

3. **Додайте переводы:**
   - Обновите `src/locales/{lang}/media.json`
   - Додайте ключи для ваших зображень

4. **Використовуйте компоненти:**
   - Замініть `<img>` на `<TranslatedImage>`
   - Використовуйте `<TranslatedDocumentLink>` для файлов
   - Додайте `<TranslatedVideo>` для видео

---

## 🎉 Готово!

Повна система перевода медиа-контента готова!

**Удачной разработки!** 🚀

---

_Створено: 19 грудня 2025_
_Версия: 1.0.0_
_Статус: Production Ready ✅_

