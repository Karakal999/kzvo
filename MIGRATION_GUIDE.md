# Міграція на react-i18next

## Обзор изменений

Старая система использовала собственный контекст с файлом `translations.ts`. Новая система использует **react-i18next** с JSON файлами и namespaces.

## Старая система → Новая система

### Формат языка

| Старый | Новый |
|--------|-------|
| `'UA'` | `'uk'` |
| `'EN'` | `'en'` |

**Примечание:** `LanguageContext` автоматически конвертирует между форматами для обратной совместимости.

### Ключи переводов

#### Было (translations.ts):

```typescript
translations['UA']['header.email']
translations['EN']['nav.about']
```

#### Стало (JSON + namespaces):

```typescript
t('navigation:header.email')
t('navigation:menu.about')
```

### Изменение структуры ключей

| Старый ключ | Новый ключ | Namespace |
|-------------|------------|-----------|
| `header.email` | `header.email` | `navigation` |
| `nav.about` | `menu.about` | `navigation` |
| `common.read_more` | `buttons.read_more` | `common` |
| `home.title` | `home.title` | `pages` |

## Миграция компонентов

### Приклад 1: Простой компонент

#### Было:

```tsx
import { useLanguage } from '@/context/LanguageContext';

const Header = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <span>{t('header.email')}</span>
      <span>{t('header.phone')}</span>
    </div>
  );
};
```

#### Стало (вариант 1 - рекомендуется):

```tsx
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation('navigation');
  
  return (
    <div>
      <span>{t('header.email')}</span>
      <span>{t('header.phone')}</span>
    </div>
  );
};
```

#### Стало (вариант 2 - обратная совместимость):

```tsx
import { useLanguage } from '@/context/LanguageContext';

const Header = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <span>{t('navigation:header.email')}</span>
      <span>{t('navigation:header.phone')}</span>
    </div>
  );
};
```

### Приклад 2: Компонент с кнопками

#### Было:

```tsx
const { t } = useLanguage();

<button>{t('common.read_more')}</button>
<button>{t('common.download')}</button>
```

#### Стало:

```tsx
const { t } = useTranslation('common');

<button>{t('buttons.read_more')}</button>
<button>{t('buttons.download')}</button>
```

### Приклад 3: Переключатель языка

#### Было:

```tsx
import { useLanguage } from '@/context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <>
      <button onClick={() => setLanguage('UA')}>
        {language === 'UA' ? '🇺🇦' : 'UA'}
      </button>
      <button onClick={() => setLanguage('EN')}>
        {language === 'EN' ? '🇬🇧' : 'EN'}
      </button>
    </>
  );
};
```

#### Стало (без изменений):

```tsx
import { useLanguage } from '@/context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <>
      <button onClick={() => setLanguage('UA')}>
        {language === 'UA' ? '🇺🇦' : 'UA'}
      </button>
      <button onClick={() => setLanguage('EN')}>
        {language === 'EN' ? '🇬🇧' : 'EN'}
      </button>
    </>
  );
};
```

**Работает без изменений!** ✅

### Приклад 4: Навигационное меню

#### Было:

```tsx
const { t } = useLanguage();

const menuItems = [
  { label: t('nav.about'), path: '/about' },
  { label: t('nav.news'), path: '/news' },
  { label: t('nav.contacts'), path: '/contacts' },
];
```

#### Стало:

```tsx
const { t } = useTranslation('navigation');

const menuItems = [
  { label: t('menu.about'), path: '/about' },
  { label: t('menu.news'), path: '/news' },
  { label: t('menu.contacts'), path: '/contacts' },
];
```

## Таблиця міграції ключей

### Навигация

| Старый | Новый |
|--------|-------|
| `header.email` | `navigation:header.email` |
| `header.phone` | `navigation:header.phone` |
| `header.academy` | `navigation:header.academy` |
| `nav.about` | `navigation:menu.about` |
| `nav.activity` | `navigation:menu.activity` |
| `nav.education` | `navigation:menu.education` |
| `footer.about_academy` | `navigation:footer.about_academy` |
| `footer.contacts` | `navigation:footer.contacts` |

### Общие фразы

| Старый | Новый |
|--------|-------|
| `common.read_more` | `common:buttons.read_more` |
| `common.download` | `common:buttons.download` |
| `common.register` | `common:buttons.register` |
| `common.loading` | `common:status.loading` |
| `common.error` | `common:status.error` |
| `common.search` | `common:buttons.search` |
| `common.close` | `common:buttons.close` |

### Страницы

| Старый | Новый |
|--------|-------|
| `home.title` | `pages:home.title` |
| `home.subtitle` | `pages:home.subtitle` |
| `home.i_am_teacher` | `pages:home.hero.i_am_teacher` |
| `home.graduates` | `pages:home.stats.graduates` |

## Пошаговая миграция

### Крок 1: Найти все использования

Найдите все использования `useLanguage`:

```bash
grep -r "useLanguage" src/
```

### Крок 2: Определить namespace

Посмотрите на ключи и определите, к какому namespace они относятся:
- `header.*`, `nav.*`, `footer.*` → `navigation`
- `common.*` → `common`
- `home.*`, `about.*`, `news.*` → `pages`

### Крок 3: Обновить імпорты

```tsx
// Было
import { useLanguage } from '@/context/LanguageContext';

// Стало (если используете только переводы)
import { useTranslation } from 'react-i18next';

// Или оставьте useLanguage если нужен переключатель языка
```

### Крок 4: Обновить ключи

Використовуйте таблицю міграції выше или добавьте namespace:

```tsx
// Было
t('common.read_more')

// Стало
t('buttons.read_more') // если указали namespace в useTranslation
// ИЛИ
t('common:buttons.read_more') // если используете несколько namespaces
```

### Крок 5: Тестирование

Перевірте компонент на обоих языках:
1. Откройте компонент
2. Переключите язык
3. Убедитесь, що все переводы работают

## Обратная совместимость

Старый API через `useLanguage` продолжает работать:

```tsx
const { language, setLanguage, t } = useLanguage();

// Это работает!
t('navigation:header.email')
t('common:buttons.read_more')
```

Но рекомендуется постепенно мигрировать на `useTranslation` для:
- Лучшей производительности
- TypeScript поддержки
- Более чистого кода

## Чеклист міграції компонента

- [ ] Определен правильный namespace
- [ ] Обновлены імпорты
- [ ] Обновлены все ключи переводов
- [ ] Протестировано на украинском
- [ ] Протестировано на английском
- [ ] Проверены edge cases (пустые значения, длинный текст)
- [ ] Обновлены TypeScript типы (если есть)

## Часто задаваемые вопросы

### Q: Нужно ли сразу мигрировать все компоненти?

**A:** Нет! Старая и новая системы работают параллельно. Мигрируйте постепенно.

### Q: Що делать, если не нахожу перевод для старого ключа?

**A:** Перевірте таблицю міграції выше. Если ключа нет - он был реорганизован в новой структуре.

### Q: Можно ли использовать оба API в одном компоненте?

**A:** Да, но не рекомендуется. Выберите один подход.

### Q: Як добавить новый перевод?

**A:** Додайте в відповідний JSON файл (`common.json`, `navigation.json`, `pages.json`) для обох мов.

## Помощь

Смотрите полную документацию в:
- `I18N_GUIDE.md` - повний посібник
- `I18N_QUICK_REFERENCE.md` - краткий справочник
- `src/components/examples/TranslationExample.tsx` - примеры использования

