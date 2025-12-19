# Посібник з мовного роутингу

## 📚 Обзор

Повна система роутинга з підтримкою мовых префиксов в URL для React-додатку.

### URL Структура

```
/ → /uk (redirect)
/uk → Украинская главная
/en → Английская главная
/uk/about → О нас (украинский)
/en/about → About (английский)
/uk/news → Новини (украинский)
/en/news → News (английский)
```

### Возможности

- ✅ Мовые префиксы в URL (/:lang/...)
- ✅ Автоматичной редирект с `/` на `/uk`
- ✅ Обработка невалидных мов (fallback на украинский)
- ✅ Синхронизация URL с i18n состоянием
- ✅ Компонент LinkWithLang для автоматических префиксов
- ✅ HTML атрибуты lang и dir
- ✅ SEO-friendly URLs

---

## 🗂️ Структура файлов

```
src/
├── components/
│   ├── LinkWithLang.tsx          # Link с автопрефиксом
│   └── LanguageRedirect.tsx      # Обработка редиректов
├── hooks/
│   └── useLanguageRoute.ts       # Хуки для роботи з мовым роутингом
├── layouts/
│   └── MainLayout.tsx            # Layout с мовой підтримкою
└── App.tsx                       # Роутинг с мовыми префиксами
```

---

## 🔧 Компоненты

### 1. LinkWithLang

Обертка над `Link` из react-router с автоматическим добавлением мового префикса.

**Файл:** `src/components/LinkWithLang.tsx`

#### Використання

```tsx
import LinkWithLang from '@/components/LinkWithLang';

// Текущий язык: UK
<LinkWithLang to="/about">О нас</LinkWithLang>
// Рендерит: <Link to="/uk/about">О нас</Link>

// Текущий язык: EN
<LinkWithLang to="/news">News</LinkWithLang>
// Рендерит: <Link to="/en/news">News</Link>
```

#### Приклады

```tsx
// Простая ссылка
<LinkWithLang to="/contacts">
  Контакты
</LinkWithLang>

// С классами
<LinkWithLang 
  to="/about" 
  className="btn btn-primary"
>
  Узнать больше
</LinkWithLang>

// С дополнительными пропсами
<LinkWithLang 
  to="/news" 
  target="_blank"
  rel="noopener"
>
  Новости
</LinkWithLang>
```

#### Особенности

- ✅ Автоматично добавляет префикс языка
- ✅ Не добавляет префикс к внешним ссылкам (http://, https://)
- ✅ Не добавляет префикс к якорям (#) и query strings (?)
- ✅ Проверяет, нет ли уже префикса в пути
- ✅ Обрабатывает корневой путь (/)

---

### 2. LanguageRedirect

Компонент для обработки мовых редиректов.

**Файл:** `src/components/LanguageRedirect.tsx`

#### Функции

1. **Редирект с корня**
   ```
   / → /uk (или /en если сохранен английский)
   ```

2. **Обработка невалидных мов**
   ```
   /fr/about → /uk/about (французский не поддерживается)
   /de/news → /uk/news (немецкий не поддерживается)
   ```

3. **Синхронизация URL с i18n**
   - Если URL содержит `/en/`, i18n переключается на английский
   - Если URL содержит `/uk/`, i18n переключается на украинский

4. **Добавление префикса**
   ```
   /about → /uk/about (если нет префикса)
   /news → /en/news (если текущий язык EN)
   ```

#### Використання

Компонент автоматически используется в `MainLayout`:

```tsx
import LanguageRedirect from '@/components/LanguageRedirect';

const MainLayout = () => {
  return (
    <>
      <LanguageRedirect />
      {/* Остальной контент */}
    </>
  );
};
```

---

### 3. useLanguageRoute Hook

Хук для роботи з мовым роутингом.

**Файл:** `src/hooks/useLanguageRoute.ts`

#### API

```typescript
const { lang, navigateWithLang, isValidLang } = useLanguageRoute();

// lang: 'uk' | 'en' - текущий язык из URL
// navigateWithLang: (path: string) => void - навигация с префиксом
// isValidLang: boolean - валидность языка
```

#### Приклады

```tsx
import { useLanguageRoute } from '@/hooks/useLanguageRoute';

const MyComponent = () => {
  const { lang, navigateWithLang } = useLanguageRoute();
  
  // Текущий язык
  console.log(lang); // 'uk' или 'en'
  
  // Навигация с мовым префиксом
  const goToAbout = () => {
    navigateWithLang('/about'); // Переход на /uk/about или /en/about
  };
  
  return (
    <div>
      <p>Текущий язык: {lang}</p>
      <button onClick={goToAbout}>О нас</button>
    </div>
  );
};
```

#### Утиліти

```typescript
// Получить язык из пути
const lang = getLanguageFromPath('/uk/about'); // 'uk'

// Проверить валидность
const isValid = isValidLanguage('uk'); // true
const isValid2 = isValidLanguage('fr'); // false

// Добавить префикс
const path = addLangToPath('/about', 'uk'); // '/uk/about'

// Удалить префикс
const path = removeLangFromPath('/uk/about'); // '/about'
```

---

## 🛣️ Роутинг в App.tsx

### Структура

```tsx
<Router>
  <Routes>
    {/* Root redirect */}
    <Route path="/" element={<Navigate to="/uk" replace />} />
    
    {/* Language-specific routes */}
    <Route path="/:lang" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="news" element={<News />} />
      {/* ... другие роуты */}
    </Route>
    
    {/* Catch-all */}
    <Route path="*" element={<Navigate to="/uk" replace />} />
  </Routes>
</Router>
```

### Приклады URL

| URL | Описание | Результат |
|-----|----------|-----------|
| `/` | Корень | Redirect → `/uk` |
| `/uk` | Украинская главная | ✅ Home (UK) |
| `/en` | Английская главная | ✅ Home (EN) |
| `/uk/about` | О нас (украинский) | ✅ About (UK) |
| `/en/about` | About (английский) | ✅ About (EN) |
| `/fr/about` | Французский (не поддерживается) | Redirect → `/uk/about` |
| `/about` | Без префикса | Redirect → `/uk/about` |
| `/invalid` | Несуществующий роут | Redirect → `/uk` |

---

## 🎨 MainLayout с мовой підтримкою

**Файл:** `src/layouts/MainLayout.tsx`

### Возможности

1. **HTML атрибуты**
   ```html
   <html lang="uk" dir="ltr">
   ```

2. **CSS класс для языка**
   ```html
   <body class="lang-uk">
   ```

3. **Автоматическая синхронизация**
   - URL → i18n
   - i18n → HTML атрибуты

### Код

```tsx
const MainLayout = () => {
  const { i18n } = useTranslation();
  const { lang } = useLanguageRoute();

  useEffect(() => {
    const currentLang = lang || 'uk';
    
    // Set HTML lang attribute
    document.documentElement.setAttribute('lang', currentLang);
    
    // Set direction (for RTL languages in future)
    document.documentElement.setAttribute('dir', 'ltr');
    
    // Add language class to body
    document.body.className = `lang-${currentLang}`;
  }, [lang, i18n.language]);

  return (
    <>
      <LanguageRedirect />
      <Header />
      <main><Outlet /></main>
      <Footer />
    </>
  );
};
```

---

## 📝 Обновление существующих компонентов

### Header

```tsx
// Было
import { Link } from 'react-router-dom';
<Link to="/about">About</Link>

// Стало
import LinkWithLang from './LinkWithLang';
<LinkWithLang to="/about">About</LinkWithLang>
```

### Footer

```tsx
// Было
<Link to="/contacts">Контакты</Link>

// Стало
import LinkWithLang from './LinkWithLang';
<LinkWithLang to="/contacts">Контакты</LinkWithLang>
```

### Любой компонент

```tsx
// Было
<Link to="/news">Новини</Link>

// Стало
import LinkWithLang from '@/components/LinkWithLang';
<LinkWithLang to="/news">Новини</LinkWithLang>
```

---

## 🔄 Переключение языка

### Через LanguageSwitcher

```tsx
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Компонент автоматически обновляет URL
<LanguageSwitcher variant="compact" />

// Клик на EN:
// /uk/about → /en/about
// /uk/news → /en/news
```

### Программно

```tsx
import { useLanguage } from '@/context/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

const MyComponent = () => {
  const { setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  const switchToEnglish = () => {
    setLanguage('EN');
    
    // Обновить URL
    const newPath = location.pathname.replace('/uk/', '/en/');
    navigate(newPath, { replace: true });
  };
  
  return <button onClick={switchToEnglish}>Switch to EN</button>;
};
```

**Примечание:** `LanguageSwitcher` уже делает это автоматически!

---

## 🌐 SEO и мета-теги

### Hreflang теги

Додайте в `<head>` для SEO:

```tsx
import { Helmet } from 'react-helmet-async';
import { useLanguageRoute } from '@/hooks/useLanguageRoute';

const MyPage = () => {
  const { lang } = useLanguageRoute();
  const currentPath = window.location.pathname.replace(/^\/(uk|en)/, '');
  
  return (
    <>
      <Helmet>
        <link 
          rel="alternate" 
          hrefLang="uk" 
          href={`https://academy.ua/uk${currentPath}`} 
        />
        <link 
          rel="alternate" 
          hrefLang="en" 
          href={`https://academy.ua/en${currentPath}`} 
        />
        <link 
          rel="alternate" 
          hrefLang="x-default" 
          href={`https://academy.ua/uk${currentPath}`} 
        />
      </Helmet>
      {/* Контент */}
    </>
  );
};
```

### Canonical URL

```tsx
<Helmet>
  <link 
    rel="canonical" 
    href={`https://academy.ua/${lang}${currentPath}`} 
  />
</Helmet>
```

---

## 🧪 Тестирование

### Проверить роутинг

1. **Откройте сайт на `/`**
   - Должен редиректить на `/uk`

2. **Перейдите на `/uk/about`**
   - Должна открыться страница "О нас" на украинском

3. **Перейдите на `/en/about`**
   - Должна открыться страница "About" на английском

4. **Переключите язык**
   - URL должен измениться с `/uk/...` на `/en/...`

5. **Попробуйте `/fr/about`**
   - Должен редиректить на `/uk/about`

6. **Попробуйте `/about` (без префикса)**
   - Должен редиректить на `/uk/about`

### Проверить HTML атрибуты

```javascript
// В консоли браузера
document.documentElement.lang // 'uk' или 'en'
document.documentElement.dir  // 'ltr'
document.body.className       // 'lang-uk' или 'lang-en'
```

---

## 🎯 Best Practices

### ✅ DO

1. **Всегда використовуйте LinkWithLang**
   ```tsx
   <LinkWithLang to="/about">About</LinkWithLang>
   ```

2. **Використовуйте useLanguageRoute для навигации**
   ```tsx
   const { navigateWithLang } = useLanguageRoute();
   navigateWithLang('/news');
   ```

3. **Добавляйте hreflang теги**
   ```tsx
   <link rel="alternate" hrefLang="uk" href="..." />
   ```

4. **Проверяйте валидность языка**
   ```tsx
   const { isValidLang } = useLanguageRoute();
   if (!isValidLang) { /* handle */ }
   ```

### ❌ DON'T

1. **Не використовуйте обычный Link**
   ```tsx
   // ❌ Плохо
   <Link to="/about">About</Link>
   
   // ✅ Хорошо
   <LinkWithLang to="/about">About</LinkWithLang>
   ```

2. **Не хардкодьте мовые префиксы**
   ```tsx
   // ❌ Плохо
   <Link to="/uk/about">About</Link>
   
   // ✅ Хорошо
   <LinkWithLang to="/about">About</LinkWithLang>
   ```

3. **Не забывайте про внешние ссылки**
   ```tsx
   // ✅ Внешние ссылки работают нормально
   <LinkWithLang to="https://google.com">Google</LinkWithLang>
   // Рендерит без префикса: https://google.com
   ```

---

## 🔧 Расширение системы

### Добавить третий язык (например, польский)

1. **Обновите типы**
   ```typescript
   // src/hooks/useLanguageRoute.ts
   export type LanguageRoute = 'uk' | 'en' | 'pl';
   ```

2. **Обновите валидацию**
   ```typescript
   export const isValidLanguage = (lang: string): lang is LanguageRoute => {
     return lang === 'uk' || lang === 'en' || lang === 'pl';
   };
   ```

3. **Додайте переводы**
   ```
   src/locales/pl/
   ├── common.json
   ├── navigation.json
   └── pages.json
   ```

4. **Обновите i18n config**
   ```typescript
   // src/i18n/config.ts
   supportedLngs: ['uk', 'en', 'pl']
   ```

5. **Обновите LanguageSwitcher**
   ```tsx
   <button onClick={() => setLanguage('PL')}>🇵🇱</button>
   ```

### Добавить RTL язык (например, арабский)

1. **Обновите MainLayout**
   ```typescript
   const direction = currentLang === 'ar' ? 'rtl' : 'ltr';
   document.documentElement.setAttribute('dir', direction);
   ```

2. **Додайте RTL стили**
   ```css
   [dir="rtl"] .container {
     direction: rtl;
     text-align: right;
   }
   ```

---

## 📚 Примеры использования

### Приклад 1: Навигационное меню

```tsx
import LinkWithLang from '@/components/LinkWithLang';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const { t } = useTranslation('navigation');
  
  const menuItems = [
    { path: '/about', label: t('menu.about') },
    { path: '/news', label: t('menu.news') },
    { path: '/contacts', label: t('menu.contacts') },
  ];
  
  return (
    <nav>
      {menuItems.map(item => (
        <LinkWithLang 
          key={item.path} 
          to={item.path}
          className="nav-link"
        >
          {item.label}
        </LinkWithLang>
      ))}
    </nav>
  );
};
```

### Приклад 2: Программная навигация

```tsx
import { useLanguageRoute } from '@/hooks/useLanguageRoute';

const SearchResults = () => {
  const { navigateWithLang } = useLanguageRoute();
  
  const handleResultClick = (slug: string) => {
    navigateWithLang(`/news/${slug}`);
  };
  
  return (
    <div>
      {results.map(result => (
        <div 
          key={result.id}
          onClick={() => handleResultClick(result.slug)}
        >
          {result.title}
        </div>
      ))}
    </div>
  );
};
```

### Приклад 3: Условный рендеринг по языку

```tsx
import { useLanguageRoute } from '@/hooks/useLanguageRoute';

const LocalizedContent = () => {
  const { lang } = useLanguageRoute();
  
  return (
    <div>
      {lang === 'uk' && <UkrainianSpecificContent />}
      {lang === 'en' && <EnglishSpecificContent />}
    </div>
  );
};
```

---

## ✅ Checklist

- [x] LinkWithLang компонент створен
- [x] LanguageRedirect компонент створен
- [x] useLanguageRoute хук створен
- [x] App.tsx обновлен с мовыми роутами
- [x] MainLayout обновлен с мовой підтримкою
- [x] Header использует LinkWithLang
- [x] Footer использует LinkWithLang
- [x] HTML атрибуты (lang, dir) налаштованы
- [x] Редиректы работают корректно
- [x] Проект компилируется без ошибок
- [x] Документация створена

---

## 🎉 Готово!

Повна система мового роутинга налаштована и готова до використання!

**Основные URL:**
- `/` → `/uk` (redirect)
- `/uk/` → Главная (украинский)
- `/en/` → Home (английский)
- `/uk/about` → О нас
- `/en/about` → About

**Удачной разработки!** 🚀

