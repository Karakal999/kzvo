# Посібник з перекладу контенту

## 📚 Обзор

Повна система для перекладу всього контента сайта з підтримкою складних сценаріїв.

### Возможности

- ✅ Компонент Trans для сложных переводов
- ✅ Ссылки внутри текста
- ✅ Плюрализация (1 курс, 2 курса, 5 курсів)
- ✅ Интерполяция переменных
- ✅ HOC withTranslation для классовых компонентов
- ✅ Утиліти для генерации ключей
- ✅ Скрипты для извлечения ключей
- ✅ Файлы переводов для каждой страницы

---

## 🧩 Компонент Trans

**Файл:** `src/components/Trans.tsx`

### Базовое використання

```tsx
import Trans from '@/components/Trans';

// Простой текст
<Trans i18nKey="about:sections.history.content">
  Default text here
</Trans>
```

### С переменными

```tsx
<Trans 
  i18nKey="welcome"
  values={{ name: "Іван" }}
>
  Welcome, {{name}}!
</Trans>
```

### Со ссылкой внутри текста

```tsx
import LinkWithLang from '@/components/LinkWithLang';

<Trans
  i18nKey="read_more_about"
  components={{
    link: <LinkWithLang to="/about" className="text-blue-600" />
  }}
>
  Read more <link>about our academy</link>
</Trans>
```

**В файле перевода:**
```json
{
  "read_more_about": "Читайте більше <1>про нашу академію</1>"
}
```

### С форматуванням

```tsx
<Trans i18nKey="important_notice">
  This is <strong>very important</strong> information
</Trans>
```

**В файле перевода:**
```json
{
  "important_notice": "Це <1>дуже важлива</1> інформація"
}
```

### TransWithLink helper

Упрощенный вариант для ссылок:

```tsx
import { TransWithLink } from '@/components/Trans';

<TransWithLink
  i18nKey="visit_our_page"
  linkTo="/contacts"
  linkClassName="text-blue-600 hover:underline"
/>
```

---

## 🔢 Плюрализация

### Украинский язык

Украинский имеет 3 формы множественного числа:

- **one**: 1, 21, 31, 41... (1 курс)
- **few**: 2-4, 22-24, 32-34... (2 курса)
- **many**: 0, 5-20, 25-30... (5 курсів)

### Структура в JSON

```json
{
  "course_one": "{{count}} курс",
  "course_few": "{{count}} курса",
  "course_many": "{{count}} курсів"
}
```

### Використання

```tsx
const { t } = useTranslation('common');

// Автоматично выбирает правильную форму
t('course', { count: 1 })  // "1 курс"
t('course', { count: 2 })  // "2 курса"
t('course', { count: 5 })  // "5 курсів"
t('course', { count: 21 }) // "21 курс"
```

### Английский язык

Английский имеет 2 формы:

```json
{
  "course_one": "{{count}} course",
  "course_other": "{{count}} courses"
}
```

---

## 🔧 Утиліти для ключей

**Файл:** `src/utils/i18n.ts`

### pageKeys

Генерация ключей для страниц:

```tsx
import { pageKeys } from '@/utils/i18n';

// Вместо:
t('pages:about.sections.history.title')

// Используй:
t(pageKeys('about', 'sections', 'history', 'title'))
// Возвращает: 'pages:about.sections.history.title'
```

### commonKeys

Для общих переводов:

```tsx
import { commonKeys } from '@/utils/i18n';

t(commonKeys('buttons', 'read_more'))
// Возвращает: 'common:buttons.read_more'
```

### navKeys

Для навигации:

```tsx
import { navKeys } from '@/utils/i18n';

t(navKeys('menu', 'about'))
// Возвращает: 'navigation:menu.about'
```

### TranslationKeyBuilder

Для сложных случаев:

```tsx
import { createKeyBuilder } from '@/utils/i18n';

const builder = createKeyBuilder('about');

const key = builder
  .key('sections', 'management', 'title')
  .build();
// Возвращает: 'about:sections.management.title'

// Перевикористання
builder.reset().key('hero', 'title').build();
// Возвращает: 'about:hero.title'
```

---

## 📅 Форматування

### Даты

```tsx
import { formatDate } from '@/utils/i18n';

formatDate(new Date(), 'uk', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
// "19 грудня 2025"

formatDate(new Date(), 'en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
// "December 19, 2025"
```

### Числа

```tsx
import { formatNumber } from '@/utils/i18n';

formatNumber(1234567.89, 'uk')
// "1 234 567,89"

formatNumber(1234567.89, 'en')
// "1,234,567.89"

// Проценты
formatNumber(0.856, 'uk', {
  style: 'percent',
  minimumFractionDigits: 1,
})
// "85,6%"
```

### Валюта

```tsx
import { formatCurrency } from '@/utils/i18n';

formatCurrency(1500, 'UAH', 'uk')
// "1 500,00 ₴"

formatCurrency(1500, 'USD', 'en')
// "$1,500.00"
```

---

## 🎓 HOC withTranslation

**Файл:** `src/hoc/withTranslation.tsx`

Для классовых компонентов:

```tsx
import { Component } from 'react';
import { withTranslation, WithTranslation } from '@/hoc/withTranslation';

interface Props {
  title: string;
}

class MyComponent extends Component<Props & WithTranslation> {
  render() {
    const { t } = this.props;
    
    return (
      <div>
        <h1>{t('common:buttons.read_more')}</h1>
        <p>{this.props.title}</p>
      </div>
    );
  }
}

export default withTranslation('common')(MyComponent);
```

### TranslatedComponent base class

Упрощенный вариант:

```tsx
import { TranslatedComponent } from '@/hoc/withTranslation';

class MyComponent extends TranslatedComponent<Props> {
  render() {
    // this.t доступен напрямую
    return <h1>{this.t('title')}</h1>;
  }
  
  componentDidMount() {
    // Доступ к языку
    console.log(this.currentLanguage);
    
    // Смена языка
    this.changeLanguage('en');
  }
}

export default withTranslation('common')(MyComponent);
```

---

## 📁 Структура файлов переводов

### Приклад: about.json

```json
{
  "title": "Про академію",
  "meta_description": "...",
  "hero": {
    "title": "Академія педагогічної освіти",
    "subtitle": "..."
  },
  "sections": {
    "history": {
      "title": "Історія академії",
      "content": "...",
      "milestones": {
        "1991": "Заснування академії",
        "2000": "..."
      }
    },
    "management": {
      "title": "Керівництво",
      "positions": {
        "rector": "Ректор",
        "vice_rector": "Проректор"
      }
    }
  }
}
```

### Використання

```tsx
const { t } = useTranslation('about');

<h1>{t('title')}</h1>
<p>{t('hero.subtitle')}</p>
<h2>{t('sections.history.title')}</h2>
<p>{t('sections.management.positions.rector')}</p>
```

---

## 🔍 Скрипты

### extract-i18n-keys.js

Извлекает все ключи из исходного кода и проверяет наличие переводов.

**Використання:**

```bash
npm run i18n:extract
# или
npm run i18n:check
```

**Що делает:**
1. Сканирует все `.tsx` и `.ts` файлы
2. Извлекает ключи переводов
3. Проверяет наличие переводов для каждого языка
4. Показывает статистику покрытия
5. Выводит список отсутствующих переводов

**Вывод:**

```
=== i18n Keys Extraction ===

Scanning files in src/...
Found 150 files

Total unique keys found: 245

=== Translation Status ===

UK: 240/245 keys (98.0% coverage)
Missing 5 translations:
  - about:new_section.title
  - common:new_button
  ...

EN: 235/245 keys (95.9% coverage)
Missing 10 translations:
  - about:new_section.title
  - about:new_section.content
  ...
```

### generate-missing-keys.js

Автоматично добавляет відсутні ключи в файли перекладів.

**Використання:**

```bash
# Dry run (просмотр без изменений)
npm run i18n:generate:dry

# Применить изменения
npm run i18n:generate
```

**Що делает:**
1. Находит все ключи в коде
2. Проверяет, какие отсутствуют в переводах
3. Добавляет их с placeholder значениями
4. Сохраняет обновленные JSON файлы

**Placeholder:**
- UK: `"ПОТРЕБУЄ ПЕРЕКЛАДУ: key.name"`
- EN: `"NEEDS TRANSLATION: key.name"`

---

## 📝 Примеры использования

### Приклад 1: Страница About

```tsx
import { useTranslation } from 'react-i18next';
import Trans from '@/components/Trans';

const AboutPage = () => {
  const { t } = useTranslation('about');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('hero.subtitle')}</p>
      
      <section>
        <h2>{t('sections.history.title')}</h2>
        <Trans i18nKey="about:sections.history.content">
          History content
        </Trans>
      </section>
      
      <section>
        <h2>{t('sections.management.title')}</h2>
        <ul>
          <li>{t('sections.management.positions.rector')}</li>
          <li>{t('sections.management.positions.vice_rector')}</li>
        </ul>
      </section>
    </div>
  );
};
```

### Приклад 2: Новостная карточка

```tsx
import { useTranslation } from 'react-i18next';
import { formatDate } from '@/utils/i18n';
import LinkWithLang from '@/components/LinkWithLang';

interface NewsCardProps {
  title: string;
  date: Date;
  slug: string;
}

const NewsCard = ({ title, date, slug }: NewsCardProps) => {
  const { t, i18n } = useTranslation('news');
  
  return (
    <div className="news-card">
      <h3>{title}</h3>
      <p className="date">
        {t('article.published')}: {' '}
        {formatDate(date, i18n.language as 'uk' | 'en', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <LinkWithLang to={`/news/${slug}`}>
        {t('common:buttons.read_more')}
      </LinkWithLang>
    </div>
  );
};
```

### Приклад 3: Статистика с плюрализацией

```tsx
import { useTranslation } from 'react-i18next';

const Statistics = () => {
  const { t } = useTranslation('common');
  
  const stats = {
    graduates: 1500,
    programs: 25,
    teachers: 120,
  };
  
  return (
    <div>
      <div>
        {t('stat.graduates', { count: stats.graduates })}
      </div>
      <div>
        {t('stat.programs', { count: stats.programs })}
      </div>
      <div>
        {t('stat.teachers', { count: stats.teachers })}
      </div>
    </div>
  );
};
```

---

## 🎯 Best Practices

### ✅ DO

1. **Використовуйте Trans для сложного контента**
   ```tsx
   <Trans i18nKey="about:description">
     Text with <strong>formatting</strong> and <link>links</link>
   </Trans>
   ```

2. **Группируйте ключи логически**
   ```json
   {
     "sections": {
       "history": { ... },
       "management": { ... }
     }
   }
   ```

3. **Використовуйте утиліти для ключей**
   ```tsx
   t(pageKeys('about', 'title'))
   ```

4. **Добавляйте контекст в ключи**
   ```json
   {
     "button.submit": "Надіслати",
     "form.submit": "Подати заявку"
   }
   ```

### ❌ DON'T

1. **Не хардкодьте текст**
   ```tsx
   // ❌ Плохо
   <h1>Про академію</h1>
   
   // ✅ Хорошо
   <h1>{t('about:title')}</h1>
   ```

2. **Не використовуйте HTML в переводах**
   ```json
   // ❌ Плохо
   { "text": "Click <a href='/about'>here</a>" }
   
   // ✅ Хорошо - використовуйте Trans
   { "text": "Click <1>here</1>" }
   ```

3. **Не дублируйте переводы**
   ```json
   // ❌ Плохо
   {
     "page1.read_more": "Читати далі",
     "page2.read_more": "Читати далі"
   }
   
   // ✅ Хорошо - використовуйте common
   { "common:buttons.read_more": "Читати далі" }
   ```

---

## ✅ Checklist

- [x] Компонент Trans створен
- [x] TransWithLink helper створен
- [x] Плюрализация налаштована
- [x] Утиліти для ключей створены
- [x] HOC withTranslation створен
- [x] Файлы переводов для страниц створены
- [x] Скрипты для извлечения ключей створены
- [x] Примеры использования створены
- [x] Документация написана
- [x] Проект компилируется ✅

---

## 🎉 Готово!

Повна система перевода контента налаштована!

**Компоненты:**
- ✅ Trans - сложные переводы
- ✅ Утиліти ключей
- ✅ HOC для классов
- ✅ Скрипты извлечения

**Удачной разработки!** 🚀

