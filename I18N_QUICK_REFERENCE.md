# i18n Короткий довідник

## Імпорт

```tsx
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
```

## Основні патерни

### 1. Простий переклад

```tsx
const { t } = useTranslation('common');
<button>{t('buttons.read_more')}</button>
```

### 2. Кілька namespaces

```tsx
const { t } = useTranslation(['common', 'pages']);
<h1>{t('pages:home.title')}</h1>
<button>{t('common:buttons.submit')}</button>
```

### 3. З змінними

```tsx
<p>{t('validation.min_length', { count: 8 })}</p>
```

### 4. Перемикання мови

```tsx
const { language, setLanguage } = useLanguage();
<button onClick={() => setLanguage('EN')}>EN</button>
```

### 5. Placeholder у формах

```tsx
<input placeholder={t('placeholders.search')} />
```

## Структура ключів

```
common:
  ├── buttons.*        → Кнопки
  ├── labels.*         → Мітки полів
  ├── status.*         → Статуси
  ├── errors.*         → Помилки
  ├── validation.*     → Валідація
  └── placeholders.*   → Placeholder'и

navigation:
  ├── header.*         → Шапка сайту
  ├── menu.*           → Меню навігації
  ├── submenu.*        → Підменю
  └── footer.*         → Футер

pages:
  ├── home.*           → Головна
  ├── about.*          → Про нас
  ├── news.*           → Новини
  └── contacts.*       → Контакти
```

## Часті приклади

| Що потрібно | Ключ | Приклад використання |
|-------------|------|----------------------|
| Кнопка "Читати далі" | `common:buttons.read_more` | `{t('common:buttons.read_more')}` |
| Placeholder пошуку | `common:placeholders.search` | `placeholder={t('placeholders.search')}` |
| Помилка email | `common:errors.invalid_email` | `{t('errors.invalid_email')}` |
| Завантаження | `common:status.loading` | `{t('status.loading')}` |
| Назва сторінки | `pages:home.title` | `{t('pages:home.title')}` |
| Пункт меню | `navigation:menu.about` | `{t('navigation:menu.about')}` |

## Кастомні хуки

```tsx
import { 
  useCommonTranslation,      // Для common
  useNavigationTranslation,  // Для navigation
  usePageTranslation         // Для pages
} from '@/hooks/useTranslation';

const { t } = useCommonTranslation();
```

## Debug

```tsx
const { i18n } = useTranslation();
console.log('Поточна мова:', i18n.language);
console.log('Доступні мови:', i18n.languages);
```

## Багатомовний динамічний контент

### Використання ml() для подій, новин тощо

```tsx
import { ml } from '../utils/multilingualData';
import { useMultilingualContent } from '../utils/multilingualData';

// У даних
const event = {
  title: ml('Вебінар з НУШ', 'NUSh Webinar'),
  description: ml('Опис українською', 'Description in English'),
};

// У компоненті
const { getContent } = useMultilingualContent();
return <h1>{getContent(event.title)}</h1>;
```

## Корисні посилання

- 📚 **TRANSLATION_GUIDE.md** - повний посібник по перекладу
- 🌐 **src/locales/README.md** - структура перекладів
- 🚀 **I18N_GUIDE.md** - детальна документація

