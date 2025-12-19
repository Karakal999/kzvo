# LanguageSwitcher & LanguageProvider Guide

## 📚 Обзор

Повна система керування языками для React-додатку с:
- ✅ LanguageProvider для керування состоянием
- ✅ LanguageSwitcher компонент с 3 вариантами дизайна
- ✅ TypeScript типизация
- ✅ Автосохранение в localStorage
- ✅ Хуки с полной типизацией

---

## 🎯 LanguageProvider

### Описание

`LanguageProvider` - контекст для керування мовою приложения.

**Файл:** `src/context/LanguageContext.tsx`

### Возможности

- ✅ Управление текущим мовою (UA/EN)
- ✅ Автоопределение языка из localStorage или браузера
- ✅ Автосохранение выбора в localStorage
- ✅ Обновление атрибута `lang` в HTML
- ✅ Состояние загрузки при смене языка
- ✅ Обратная совместимость со старым API

### Використання

```tsx
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <YourApp />
    </LanguageProvider>
  );
}
```

### API

```typescript
interface LanguageContextType {
  language: 'UA' | 'EN';           // Текущий язык
  setLanguage: (lang) => void;     // Функция смены языка
  t: (key, options?) => string;    // Функция перевода
  isLoading: boolean;              // Состояние загрузки
}
```

### Приклад использования

```tsx
import { useLanguage } from '@/context/LanguageContext';

function MyComponent() {
  const { language, setLanguage, t, isLoading } = useLanguage();
  
  return (
    <div>
      <p>Текущий язык: {language}</p>
      <button 
        onClick={() => setLanguage('EN')}
        disabled={isLoading}
      >
        Switch to English
      </button>
      <p>{t('common:buttons.read_more')}</p>
    </div>
  );
}
```

---

## 🎨 LanguageSwitcher Component

### Описание

Компонент переключателя мов с тремя вариантами дизайна.

**Файл:** `src/components/LanguageSwitcher.tsx`

### Варианты дизайна

#### 1. Default (по умолчанию)

Кнопки с флагами и текстом:

```tsx
<LanguageSwitcher />
// или
<LanguageSwitcher variant="default" />
```

**Вид:**
```
┌─────────┐  ┌─────────┐
│ 🇺🇦  UA  │  │ 🇬🇧  EN  │
└─────────┘  └─────────┘
```

#### 2. Compact (компактный)

Только флаги в круглых кнопках:

```tsx
<LanguageSwitcher variant="compact" />
```

**Вид:**
```
┌───┐  ┌───┐
│ 🇺🇦 │  │ 🇬🇧 │
└───┘  └───┘
```

**Используется в Header** - идеально для верхней панели.

#### 3. Dropdown (выпадающий список)

Выпадающий список с флагами:

```tsx
<LanguageSwitcher variant="dropdown" />
```

**Вид:**
```
┌──────────────────┐
│ 🇺🇦 Українська  ▼│
└──────────────────┘
```

### Props

```typescript
interface LanguageSwitcherProps {
  variant?: 'default' | 'compact' | 'dropdown';
  className?: string;
}
```

### Приклады использования

#### В Header (текущая реализация)

```tsx
import LanguageSwitcher from './LanguageSwitcher';

function Header() {
  return (
    <header>
      <div className="top-bar">
        <LanguageSwitcher variant="compact" />
      </div>
    </header>
  );
}
```

#### В Footer

```tsx
function Footer() {
  return (
    <footer>
      <LanguageSwitcher variant="default" />
    </footer>
  );
}
```

#### В мобильном меню

```tsx
function MobileMenu() {
  return (
    <div className="mobile-menu">
      <LanguageSwitcher variant="dropdown" className="w-full" />
    </div>
  );
}
```

#### Кастомная стилизация

```tsx
<LanguageSwitcher 
  variant="compact" 
  className="my-custom-class bg-gray-50 p-2 rounded"
/>
```

### Доступность (a11y)

Компонент повністю доступен:
- ✅ `aria-label` для каждой кнопки
- ✅ `aria-current` для активного языка
- ✅ `title` атрибуты для подсказок
- ✅ Клавиатурная навигация
- ✅ Фокус-стили

---

## 🪝 Хуки для роботи з переводами

### 1. useLanguage (основной)

Доступ к контексту языка:

```tsx
import { useLanguage } from '@/context/LanguageContext';

const { language, setLanguage, t, isLoading } = useLanguage();
```

### 2. useTypedTranslation (с типизацией)

**Файл:** `src/hooks/useTypedTranslation.ts`

```tsx
import { useTypedTranslation } from '@/hooks/useTypedTranslation';

// Один namespace
const { t } = useTypedTranslation('common');
t('buttons.read_more'); // ✅ Автодополнение

// Несколько namespaces
const { t } = useTypedTranslation(['common', 'pages']);
t('common:buttons.submit');
t('pages:home.title');
```

### 3. useCommonTranslation

Для общих переводов (кнопки, ошибки, метки):

```tsx
import { useCommonTranslation } from '@/hooks/useTypedTranslation';

const { t } = useCommonTranslation();
<button>{t('buttons.download')}</button>
```

### 4. useNavigationTranslation

Для навигации (меню, header, footer):

```tsx
import { useNavigationTranslation } from '@/hooks/useTypedTranslation';

const { t } = useNavigationTranslation();
<nav>{t('menu.about')}</nav>
```

### 5. usePageTranslation

Для контента страниц:

```tsx
import { usePageTranslation } from '@/hooks/useTypedTranslation';

const { t } = usePageTranslation();
<h1>{t('home.title')}</h1>
```

### 6. useLanguageControl

Управление мовою без контекста:

```tsx
import { useLanguageControl } from '@/hooks/useTypedTranslation';

const { language, changeLanguage, languages } = useLanguageControl();

<button onClick={() => changeLanguage('en')}>
  Switch to English
</button>
```

---

## 📘 TypeScript типизация

### Файл типов

**Файл:** `src/types/translations.ts`

### Основные типы

```typescript
// Языки
type Language = 'uk' | 'en';
type LanguageCode = 'UA' | 'EN'; // Legacy

// Namespaces
type Namespace = 'common' | 'navigation' | 'pages';

// Ресурсы переводов
interface TranslationResources {
  common: typeof commonUk;
  navigation: typeof navigationUk;
  pages: typeof pagesUk;
}

// Функция перевода
type TranslationFunction = (
  key: string,
  options?: Record<string, any>
) => string;
```

### Типизированные ключи

```typescript
import type { 
  CommonTranslationKey,
  NavigationTranslationKey,
  PagesTranslationKey 
} from '@/types/translations';

// Використання
const key: CommonTranslationKey = 'buttons.read_more'; // ✅
const key2: CommonTranslationKey = 'invalid.key'; // ❌ Ошибка
```

### Структура TypedTranslationKeys

Полная типизация всех ключей переводов:

```typescript
interface TypedTranslationKeys {
  common: {
    buttons: {
      read_more: string;
      download: string;
      register: string;
      // ... и т.д.
    };
    labels: { ... };
    status: { ... };
    errors: { ... };
  };
  navigation: {
    header: { ... };
    menu: { ... };
    footer: { ... };
  };
  pages: {
    home: { ... };
    about: { ... };
    // ... и т.д.
  };
}
```

---

## 🔄 Интеграция в существующий Header

### Было (старая система)

```tsx
import { translations } from '../locales/translations';
import { useLanguage } from '../context/LanguageContext';

const { language, setLanguage } = useLanguage();
const t = translations[language];

const toggleLanguage = () => {
  setLanguage(language === 'UA' ? 'EN' : 'UA');
};

// В JSX
<button onClick={toggleLanguage}>
  {t['header.lang.ua']} / {t['header.lang.en']}
</button>
```

### Стало (новая система)

```tsx
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const { t } = useTranslation('navigation');

// В JSX
<LanguageSwitcher variant="compact" />
```

**Преимущества:**
- ✅ Меньше кода
- ✅ Лучший UX (визуальные флаги)
- ✅ Типизация
- ✅ Переиспользуемый компонент

---

## 💾 localStorage

### Сохраняемые ключи

```javascript
localStorage.getItem('language')     // 'UA' или 'EN' (legacy)
localStorage.getItem('i18nextLng')   // 'uk' или 'en' (i18next)
```

### Приоритет определения языка

1. **localStorage** (`i18nextLng` или `language`)
2. **Настройки браузера** (`navigator.language`)
3. **Fallback** на украинский (`uk`)

### Очистка кеша

```javascript
// Сбросить язык
localStorage.removeItem('language');
localStorage.removeItem('i18nextLng');
location.reload();
```

---

## 🎨 Кастомизация стилей

### Изменить цвета активной кнопки

```tsx
// В LanguageSwitcher.tsx
className={`
  ${language === 'UA' 
    ? 'bg-green-600 text-white'  // Ваши цвета
    : 'bg-gray-100 text-gray-700'
  }
`}
```

### Добавить анимацию

```tsx
className="transition-all duration-300 transform hover:scale-105"
```

### Изменить размер флагов

```tsx
<span className="text-3xl">🇺🇦</span> // Больше
<span className="text-sm">🇺🇦</span>  // Меньше
```

---

## 🧪 Тестирование

### Проверить переключение языка

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSwitcher from './LanguageSwitcher';

test('switches language on click', () => {
  render(<LanguageSwitcher />);
  
  const enButton = screen.getByLabelText(/english/i);
  fireEvent.click(enButton);
  
  // Проверить, що язык изменился
  expect(localStorage.getItem('language')).toBe('EN');
});
```

---

## 📱 Адаптивность

### Desktop

```tsx
<LanguageSwitcher variant="default" /> // Полный вид
```

### Tablet

```tsx
<LanguageSwitcher variant="compact" /> // Компактный
```

### Mobile

```tsx
<LanguageSwitcher variant="dropdown" className="w-full" />
```

### Приклад адаптивного использования

```tsx
<div className="language-switcher">
  {/* Desktop */}
  <div className="hidden lg:block">
    <LanguageSwitcher variant="default" />
  </div>
  
  {/* Mobile & Tablet */}
  <div className="lg:hidden">
    <LanguageSwitcher variant="compact" />
  </div>
</div>
```

---

## 🚀 Быстрый старт

### 1. Імпортировать компонент

```tsx
import LanguageSwitcher from '@/components/LanguageSwitcher';
```

### 2. Добавить в Header

```tsx
<header>
  <LanguageSwitcher variant="compact" />
</header>
```

### 3. Готово! ✅

Компонент автоматически:
- Определит текущий язык
- Сохранит выбор в localStorage
- Обновит все переводы на странице

---

## 🔧 Troubleshooting

### Язык не переключается

**Проблема:** Клик по кнопке не меняет язык.

**Решение:**
1. Перевірте, що `LanguageProvider` обернут вокруг приложения
2. Перевірте консоль на ошибки
3. Очистите localStorage и перезагрузите

### Переводы не обновляются

**Проблема:** Язык меняется, но тексты остаются прежними.

**Решение:**
1. Убедитесь, що используете `useTranslation` или `useLanguage`
2. Перевірте, що ключи переводов правильные
3. Перевірте, що JSON файлы загружены

### TypeScript ошибки

**Проблема:** TypeScript жалуется на типы.

**Решение:**
1. Убедитесь, що `src/types/i18next.d.ts` существует
2. Перезапустите TypeScript сервер
3. Перевірте імпорты в `tsconfig.json`

---

## 📚 Дополнительные ресурсы

- **I18N_GUIDE.md** - Повний посібник з i18n
- **I18N_QUICK_REFERENCE.md** - Короткий довідник
- **MIGRATION_GUIDE.md** - Миграция со старой системы
- **src/components/examples/TranslationExample.tsx** - Примеры использования

---

## ✅ Checklist

- [x] LanguageProvider створен и налаштован
- [x] LanguageSwitcher с 3 вариантами дизайна
- [x] TypeScript типизация
- [x] Хуки с полной типизацией
- [x] Автосохранение в localStorage
- [x] Интеграция в Header
- [x] Документация
- [x] Доступность (a11y)
- [x] Адаптивный дизайн

**Готово к использованию!** 🎉

