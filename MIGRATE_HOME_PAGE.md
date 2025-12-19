# Міграція Home.tsx на i18next

## Проблема
Страница Home использует старую систему переводов (`translations[language]`) и весь контент захардкожен на украинском.

## Решение
Нужно заменить:

### Было:
```typescript
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../locales/translations';

const { language } = useLanguage();
const t = translations[language];

// Використання:
t['home.i_am_teacher']
```

### Стало:
```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation('pages');

// Використання:
t('home.hero.i_am_teacher')
```

## Що нужно изменить в Home.tsx:

1. Заменить імпорты
2. Замінити всі хардкоджені рядки на `t('...')`
3. Обновить массивы `quickLinksTeachers`, `quickLinksStudents`, `quickLinksApplicants`

## Быстрое решение (временное)

Создать файл `src/pages/Home.i18n.tsx` с переведенной версией и заменить імпорт в App.tsx.

Или использовать скрипт автоматической миграции.

