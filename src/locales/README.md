# Переклади / Translations

Ця папка містить усі переклади для багатомовного сайту Академії.

## Структура

```
locales/
├── uk/              # Українська (основна мова)
│   ├── common.json
│   ├── navigation.json
│   └── pages.json
├── en/              # Англійська
│   ├── common.json
│   ├── navigation.json
│   └── pages.json
└── translations.ts  # Стара система (можна видалити після міграції)
```

## Опис файлів

### common.json
Загальні фрази, що використовуються по всьому сайту:
- Кнопки (читати далі, завантажити, зареєструватися)
- Мітки полів форм (ім'я, email, телефон)
- Статуси (завантаження, помилка, успіх)
- Помилки та валідація
- Placeholder'и
- Часові мітки
- Підтвердження

### navigation.json
Навігація та структура сайту:
- Елементи шапки (header)
- Головне меню (menu)
- Підменю (submenu)
- Футер (footer)
- Хлібні крихти (breadcrumbs)

### pages.json
Контент сторінок:
- home - Головна сторінка
- about - Про нас
- news - Новини
- education - Освіта
- teachers - Для вчителів
- students - Для учнів
- contacts - Контакти
- not_found - 404

## Як додати новий переклад

1. Відкрийте потрібний JSON файл в обох мовах (uk та en)
2. Додайте новий ключ в тому ж форматі
3. Перекладіть значення
4. Збережіть обидва файли

**Приклад:**

```json
// uk/common.json
{
  "buttons": {
    "read_more": "Читати далі",
    "download": "Завантажити",
    "new_button": "Новий текст"  // ← новий ключ
  }
}

// en/common.json
{
  "buttons": {
    "read_more": "Read more",
    "download": "Download",
    "new_button": "New text"  // ← новий ключ
  }
}
```

## Найкращі практики

### Іменування ключів
- Використовуйте вкладені об'єкти: `buttons.read_more`
- Групуйте за змістом: `errors.*`, `labels.*`
- Будьте описовими: `invalid_email` замість `error1`

### Переклад
- **НЕ** використовуйте Google Translate бездумно
- Враховуйте контекст використання
- Перевіряйте граматику та стилістику
- Уникайте калькування з російської

## Приклади

### Використання в компонентах

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation('common');
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button>{t('buttons.read_more')}</button>
    </div>
  );
};
```

### Переклад з різних namespace'ів

```tsx
const { t } = useTranslation('navigation'); // navigation.json
const { t: tCommon } = useTranslation('common'); // common.json
const { t: tPages } = useTranslation('pages'); // pages.json

return (
  <div>
    <nav>{t('menu.about')}</nav>
    <button>{tCommon('buttons.submit')}</button>
    <h1>{tPages('home.title')}</h1>
  </div>
);
```

### Переклад з параметрами

```json
{
  "greeting": "Вітаємо, {{name}}!",
  "items_count": "Знайдено {{count}} елементів"
}
```

```tsx
t('greeting', { name: 'Іван' }); // → "Вітаємо, Іван!"
t('items_count', { count: 5 }); // → "Знайдено 5 елементів"
```

## Інтерполяція (змінні)

```json
{
  "welcome_user": "Вітаємо, {{username}}!",
  "items_found": "Знайдено {{count}} результатів",
  "deadline": "До {{date}} залишилось {{days}} днів"
}
```

## Плюралізація

```json
{
  "students_count": "{{count}} студент",
  "students_count_plural": "{{count}} студенти",
  "students_count_many": "{{count}} студентів"
}
```

## Корисні посилання

- [react-i18next документація](https://react.i18next.com/)
- [i18next документація](https://www.i18next.com/)
- **I18N_GUIDE.md** - повний посібник по i18n системі
- **TRANSLATION_GUIDE.md** - посібник по перекладу контенту
- **MIGRATION_GUIDE.md** - міграція зі старої системи
