# Посібник з інтернаціоналізації (i18n)

## Обзор

Этот проект использует **react-i18next** для поддержки многоязычности. Поддерживаются два языка:
- 🇺🇦 **Украинский (uk)** - основной язык
- 🇬🇧 **Английский (en)** - дополнительный язык

## Структура файлов

```
src/
├── i18n/
│   └── config.ts              # Конфигурация i18next
├── locales/
│   ├── uk/                    # Украинские переводы
│   │   ├── common.json       # Общие фразы (кнопки, ошибки, статусы)
│   │   ├── navigation.json   # Меню и навигация
│   │   └── pages.json        # Контент страниц
│   └── en/                    # Английские переводы
│       ├── common.json
│       ├── navigation.json
│       └── pages.json
├── hooks/
│   └── useTranslation.ts      # Кастомные хуки для переводов
└── context/
    └── LanguageContext.tsx    # Контекст языка
```

## Основные возможности

### ✅ Автоматическое определение языка
- Из localStorage (`i18nextLng`)
- Из настроек браузера
- Fallback на украинский

### ✅ Асинхронная загрузка
- Translations загружаются по необходимости
- Code splitting по namespaces

### ✅ Интерполяция
- Поддержка переменных в переводах
- Пример: `"min_length": "Минимальная длина: {{count}} символов"`

### ✅ Namespaces (пространства имен)
- `common` - общие фразы
- `navigation` - меню и навигация  
- `pages` - контент страниц

---

## Використання в компонентах

### 1. Базове використання

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation('common');
  
  return (
    <div>
      <h1>{t('buttons.read_more')}</h1>
      <p>{t('status.loading')}</p>
    </div>
  );
};
```

### 2. Використання кількох namespaces

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation(['common', 'navigation', 'pages']);
  
  return (
    <div>
      <button>{t('common:buttons.download')}</button>
      <nav>{t('navigation:menu.about')}</nav>
      <h1>{t('pages:home.title')}</h1>
    </div>
  );
};
```

### 3. Интерполяция (переменные)

```tsx
const { t } = useTranslation('common');

// С числами
<p>{t('validation.min_length', { count: 8 })}</p>
// → "Минимальная длина: 8 символов"

// С другими переменными
<p>{t('time.days_ago', { count: 5 })}</p>
// → "5 днів тому" (украинский)
// → "5 days ago" (английский)
```

### 4. Кастомные хуки

```tsx
import { useCommonTranslation } from '@/hooks/useTranslation';

const MyComponent = () => {
  const { t } = useCommonTranslation();
  
  return <button>{t('buttons.submit')}</button>;
};
```

### 5. Використання з формами

```tsx
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
  const { t } = useTranslation('common');
  
  return (
    <form>
      <input
        type="text"
        placeholder={t('placeholders.name')}
        aria-label={t('labels.name')}
      />
      <input
        type="email"
        placeholder={t('placeholders.email')}
        aria-label={t('labels.email')}
      />
      <button type="submit">
        {t('buttons.submit')}
      </button>
    </form>
  );
};
```

### 6. Обработка ошибок

```tsx
const { t } = useTranslation('common');

const validateEmail = (email: string) => {
  if (!email) {
    return t('errors.required_field');
  }
  if (!isValidEmail(email)) {
    return t('errors.invalid_email');
  }
  return null;
};
```

### 7. Використання старого API (LanguageContext)

Для обратной совместимости:

```tsx
import { useLanguage } from '@/context/LanguageContext';

const MyComponent = () => {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div>
      <p>Текущий язык: {language}</p>
      <button onClick={() => setLanguage('EN')}>Switch to English</button>
      <p>{t('common:buttons.read_more')}</p>
    </div>
  );
};
```

---

## Структура ключей переводов

### common.json

```json
{
  "buttons": {
    "read_more": "...",
    "download": "...",
    "register": "..."
  },
  "labels": {
    "name": "...",
    "email": "..."
  },
  "status": {
    "loading": "...",
    "error": "..."
  },
  "errors": {
    "general": "...",
    "network": "..."
  },
  "validation": {
    "required": "...",
    "email": "..."
  },
  "placeholders": {
    "search": "...",
    "name": "..."
  }
}
```

### navigation.json

```json
{
  "header": {
    "academy": "...",
    "search": "..."
  },
  "menu": {
    "about": "...",
    "news": "..."
  },
  "submenu": {
    "about": {
      "history": "...",
      "structure": "..."
    }
  },
  "footer": {
    "contacts": "...",
    "privacy": "..."
  }
}
```

### pages.json

```json
{
  "home": {
    "title": "...",
    "subtitle": "..."
  },
  "about": {
    "title": "...",
    "meta_description": "..."
  },
  "news": {
    "title": "...",
    "latest": "..."
  }
}
```

---

## Переключение языка

### В компоненте

```tsx
import { useLanguage } from '@/context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div>
      <button 
        onClick={() => setLanguage('UA')}
        className={language === 'UA' ? 'active' : ''}
      >
        🇺🇦 UA
      </button>
      <button 
        onClick={() => setLanguage('EN')}
        className={language === 'EN' ? 'active' : ''}
      >
        🇬🇧 EN
      </button>
    </div>
  );
};
```

### Программно

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lang: 'uk' | 'en') => {
    i18n.changeLanguage(lang);
  };
  
  return <button onClick={() => changeLanguage('en')}>Switch</button>;
};
```

---

## SEO и мета-теги

```tsx
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async'; // если используете

const NewsPage = () => {
  const { t } = useTranslation('pages');
  
  return (
    <>
      <Helmet>
        <title>{t('news.title')}</title>
        <meta name="description" content={t('news.meta_description')} />
      </Helmet>
      <div>
        <h1>{t('news.title')}</h1>
      </div>
    </>
  );
};
```

---

## Добавление новых переводов

### 1. Додайте ключ в JSON файлы

**uk/common.json:**
```json
{
  "buttons": {
    "new_button": "Нова кнопка"
  }
}
```

**en/common.json:**
```json
{
  "buttons": {
    "new_button": "New button"
  }
}
```

### 2. Використовуйте в компоненте

```tsx
const { t } = useTranslation('common');
<button>{t('buttons.new_button')}</button>
```

---

## Добавление нового namespace

### 1. Создайте новые JSON файлы

```
src/locales/uk/forms.json
src/locales/en/forms.json
```

### 2. Імпортируйте в config.ts

```typescript
// src/i18n/config.ts
import formsUk from '../locales/uk/forms.json';
import formsEn from '../locales/en/forms.json';

const resources = {
  uk: {
    common: commonUk,
    navigation: navigationUk,
    pages: pagesUk,
    forms: formsUk, // добавьте
  },
  en: {
    common: commonEn,
    navigation: navigationEn,
    pages: pagesEn,
    forms: formsEn, // добавьте
  },
};
```

### 3. Додайте в список namespaces

```typescript
i18n.init({
  // ...
  ns: ['common', 'navigation', 'pages', 'forms'],
});
```

### 4. Використовуйте в компонентах

```tsx
const { t } = useTranslation('forms');
```

---

## Best Practices

### ✅ DO

1. **Використовуйте вложенные ключи**
   ```json
   {
     "pages": {
       "home": {
         "title": "Главная"
       }
     }
   }
   ```

2. **Группируйте по смыслу**
   - `buttons.*` - все кнопки
   - `errors.*` - все ошибки
   - `placeholders.*` - все placeholder'ы

3. **Використовуйте интерполяцию для динамических значений**
   ```json
   { "greeting": "Привет, {{name}}!" }
   ```

4. **Добавляйте контекст в ключи**
   ```json
   {
     "header.search": "Поиск",
     "footer.search": "Найти"
   }
   ```

### ❌ DON'T

1. **Не дублируйте переводы**
   - Використовуйте общие ключи в `common.json`

2. **Не використовуйте HTML в переводах**
   - Вместо этого разбивайте на несколько ключей

3. **Не використовуйте сложную логику в переводах**
   - Логіку залиште в компонентах

4. **Не забывайте про fallback**
   - Всегда проверяйте, що есть украинский перевод

---

## Отладка

### Включить debug режим

В `src/i18n/config.ts`:

```typescript
i18n.init({
  debug: true, // Показывает логи в консоли
  // ...
});
```

### Проверить текущий язык

```tsx
const { i18n } = useTranslation();
console.log('Current language:', i18n.language);
console.log('Available languages:', i18n.languages);
```

### Проверить загруженные переводы

```tsx
const { i18n } = useTranslation();
console.log('Resources:', i18n.store.data);
```

---

## Приклад компонента

См. `src/components/examples/TranslationExample.tsx` для полного примера использования всех возможностей i18n.

---

## Полезные ссылки

- [react-i18next документация](https://react.i18next.com/)
- [i18next документация](https://www.i18next.com/)
- [Интерполяция](https://www.i18next.com/translation-function/interpolation)
- [Namespaces](https://www.i18next.com/principles/namespaces)

