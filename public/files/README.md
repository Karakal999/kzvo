# Структура файлов для мультиязычного контента

## Организация файлов

```
files/
├── uk/                 # Украинские документы
│   ├── statute.pdf
│   ├── schedule.docx
│   └── regulations.pdf
└── en/                 # Английские документы
    ├── statute_en.pdf
    ├── schedule_en.docx
    └── regulations_en.pdf
```

## Naming conventions

### Вариант 1: Папки по языкам (рекомендуется)
```
/files/uk/document.pdf
/files/en/document.pdf
```

### Вариант 2: Суффиксы
```
/files/document_uk.pdf
/files/document_en.pdf
```

### Вариант 3: Placeholder
```
/files/{lang}/document.pdf
```

## Відео субтитри

```
videos/
├── subtitles/
│   ├── uk/
│   │   ├── video1.vtt
│   │   └── video2.srt
│   └── en/
│       ├── video1.vtt
│       └── video2.srt
└── thumbnails/
    ├── video1.jpg
    └── video2.jpg
```

## Примеры использования

### Документы
```tsx
<TranslatedDocumentLink
  files={{
    uk: '/files/uk/statute.pdf',
    en: '/files/en/statute_en.pdf'
  }}
  label="Statute"
  showLanguageSelector
/>
```

### Видео
```tsx
<TranslatedVideo
  video={{
    id: '1',
    videoUrl: '/videos/intro.mp4',
    translations: {
      uk: {
        title: 'Вступне відео',
        subtitles: [{ 
          language: 'uk', 
          url: '/videos/subtitles/uk/intro.vtt',
          format: 'vtt'
        }]
      },
      en: {
        title: 'Introduction video',
        subtitles: [{ 
          language: 'en', 
          url: '/videos/subtitles/en/intro.vtt',
          format: 'vtt'
        }]
      }
    }
  }}
/>
```

