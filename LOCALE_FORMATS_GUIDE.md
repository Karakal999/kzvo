# 📅 Посібник з локалізації форматів

## Обзор

Повна система локалізаціи форматов для дат, чисел, валют, телефонов и календарей з підтримкою украинского и английского мов.

---

## 🎯 Возможности

### ✅ Форматування дат

- Полный формат: "14 грудня 2023 року" / "December 14, 2023"
- Различные форматы (full, long, medium, short, time, dateTime)
- Относительное время: "2 години тому" / "2 hours ago"
- Индикаторы праздников

### ✅ Форматування чисел

- Локальные разделители: `1 234,56` (uk) vs `1,234.56` (en)
- Валюты: `999,99 грн` (uk) vs `UAH 999.99` (en)
- Проценты: `75,5%` (uk) vs `75.5%` (en)
- Размер файлов: `1,46 МБ` (uk) vs `1.46 MB` (en)

### ✅ Форматування телефонов

- Украинский: `+380 (44) 123-45-67`
- Английский: `+380 44 123-4567`
- Автоформатування при вводе

### ✅ Локализованный календарь

- Первый день недели: Понеділок (uk) vs Sunday (en)
- Локализованные названия месяцев/дней
- Индикаторы украинских праздников
- Поддержка минимальной/максимальной даты

---

## 📦 Установка

```bash
npm install date-fns
```

**Уже установлено!** ✅

---

## 🪝 useLocaleFormat Hook

Основной хук для роботи зо всеми форматами.

### Імпорт

```tsx
import { useLocaleFormat } from '@/hooks/useLocaleFormat';
```

### Базовое використання

```tsx
const MyComponent = () => {
  const {
    locale,              // Текущая локаль ('uk' | 'en')
    formatDate,          // Форматировать дату
    formatTimeAgo,       // Относительное время
    formatNumber,        // Форматировать число
    formatCurrency,      // Форматировать валюту
    formatPercentage,    // Форматировать процент
    formatFileSize,      // Форматировать размер файла
    formatPhoneNumber,   // Форматировать телефон
    isHoliday,          // Проверить праздник
    getCalendarConfig,  // Получить конфигурацию календаря
  } = useLocaleFormat();

  return (
    <div>
      <p>{formatDate(new Date(), 'full')}</p>
      <p>{formatCurrency(999.99)}</p>
      <p>{formatTimeAgo(article.publishedAt)}</p>
    </div>
  );
};
```

---

## 📅 Форматування дат

### formatDate(date, format)

Форматирует дату в локальном формате.

```tsx
const { formatDate } = useLocaleFormat();

// Полный формат
formatDate(new Date('2023-12-14'), 'full');
// UK: "14 грудня 2023 року"
// EN: "December 14, 2023"

// Длинный формат
formatDate(new Date('2023-12-14'), 'long');
// UK: "14 грудня 2023"
// EN: "December 14, 2023"

// Средний формат
formatDate(new Date('2023-12-14'), 'medium');
// UK: "14 гру 2023"
// EN: "Dec 14, 2023"

// Короткий формат
formatDate(new Date('2023-12-14'), 'short');
// UK: "14.12.2023"
// EN: "12/14/2023"

// Только время
formatDate(new Date('2023-12-14T14:30'), 'time');
// UK: "14:30"
// EN: "2:30 PM"

// Дата и время
formatDate(new Date('2023-12-14T14:30'), 'dateTime');
// UK: "14 грудня 2023 року о 14:30"
// EN: "December 14, 2023 at 2:30 PM"
```

### formatTimeAgo(date, baseDate?)

Форматирует относительное время.

```tsx
const { formatTimeAgo } = useLocaleFormat();

const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

formatTimeAgo(twoHoursAgo);
// UK: "2 години тому"
// EN: "2 hours ago"

formatTimeAgo(new Date(Date.now() - 60 * 1000));
// UK: "менше хвилини тому"
// EN: "less than a minute ago"
```

### isHoliday(date)

Проверяет, является ли дата праздником.

```tsx
const { isHoliday } = useLocaleFormat();

const newYear = new Date('2024-01-01');
const holiday = isHoliday(newYear);

if (holiday.isHoliday) {
  console.log(holiday.name); // "Новий рік" или "New Year"
}
```

---

## 🔢 Форматування чисел

### formatNumber(value, options)

```tsx
const { formatNumber } = useLocaleFormat();

// С разделителями тысяч
formatNumber(1234567, { decimals: 0 });
// UK: "1 234 567"
// EN: "1,234,567"

// С десятичными
formatNumber(1234.56, { decimals: 2 });
// UK: "1 234,56"
// EN: "1,234.56"

// Без группировки
formatNumber(1234567, { decimals: 0, useGrouping: false });
// UK: "1234567"
// EN: "1234567"
```

### formatCurrency(value, options)

```tsx
const { formatCurrency } = useLocaleFormat();

// По умолчанию UAH
formatCurrency(999.99);
// UK: "999,99 грн"
// EN: "999,99 UAH"

// Без символа
formatCurrency(999.99, { showSymbol: false });
// UK: "999,99"
// EN: "999.99"

// Другая валюта
formatCurrency(100, { currency: 'USD' });
// UK: "100,00 $"
// EN: "$100.00"
```

### formatPercentage(value, decimals)

```tsx
const { formatPercentage } = useLocaleFormat();

formatPercentage(75.5, 1);
// UK: "75,5%"
// EN: "75.5%"

formatPercentage(100, 0);
// UK: "100%"
// EN: "100%"
```

### formatFileSize(bytes, decimals)

```tsx
const { formatFileSize } = useLocaleFormat();

formatFileSize(1536000);
// UK: "1,46 МБ"
// EN: "1.46 MB"

formatFileSize(1024);
// UK: "1,00 КБ"
// EN: "1.00 KB"
```

---

## 📞 Форматування телефонов

### formatPhoneNumber(phone)

```tsx
const { formatPhoneNumber } = useLocaleFormat();

// Международный формат
formatPhoneNumber('380441234567');
// UK: "+380 (44) 123-45-67"
// EN: "+380 44 123-4567"

// Локальный формат (Ukraine)
formatPhoneNumber('0441234567');
// UK: "044 123 45 67"
```

---

## 🎨 Компоненты

### LocalizedDate

Компонент для отображения дат.

```tsx
import LocalizedDate from '@/components/LocalizedDate';

// Полный формат
<LocalizedDate date={article.publishedAt} format="full" />

// Относительное время
<LocalizedDate date={comment.createdAt} relative />

// С индикатором праздника
<LocalizedDate date={event.date} showHoliday />

// Короткий формат с CSS классом
<LocalizedDate 
  date={new Date()} 
  format="short" 
  className="text-gray-600"
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `date` | `Date \| string \| number` | Required | Дата для форматирования |
| `format` | `DateFormatType` | `'medium'` | Тип формата |
| `relative` | `boolean` | `false` | Показать як относительное время |
| `baseDate` | `Date \| number` | `new Date()` | Базовая дата для relative |
| `showHoliday` | `boolean` | `false` | Показать индикатор праздника |
| `className` | `string` | `''` | CSS классы |

### LocalizedNumber

Компонент для отображения чисел.

```tsx
import LocalizedNumber from '@/components/LocalizedNumber';

// Число
<LocalizedNumber value={1234567.89} decimals={2} />

// Валюта
<LocalizedNumber value={999.99} type="currency" />

// Процент
<LocalizedNumber value={75.5} type="percentage" decimals={1} />

// Размер файла
<LocalizedNumber value={1536000} type="fileSize" />
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | Required | Число |
| `type` | `'number' \| 'currency' \| 'percentage' \| 'fileSize'` | `'number'` | Тип |
| `decimals` | `number` | Varies | Десятичные знаки |
| `currency` | `string` | `'UAH'` | Код валюты |
| `showSymbol` | `boolean` | `true` | Показать символ валюты |
| `useGrouping` | `boolean` | `true` | Разделители тысяч |
| `className` | `string` | `''` | CSS классы |

### LocalizedPhoneInput

Компонент для ввода телефона с автоформатуванням.

```tsx
import LocalizedPhoneInput from '@/components/LocalizedPhoneInput';

const [phone, setPhone] = useState('');

<LocalizedPhoneInput
  value={phone}
  onChange={setPhone}
  label="Phone Number"
  required
  error={errors.phone}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | Required | Значение |
| `onChange` | `(value: string) => void` | Required | Обработчик изменения |
| `name` | `string` | `'phone'` | Имя поля |
| `label` | `string` | - | Метка |
| `required` | `boolean` | `false` | Обязательное поле |
| `disabled` | `boolean` | `false` | Отключено |
| `error` | `string` | - | Сообщение об ошибке |
| `className` | `string` | `''` | CSS классы |

### LocalizedCalendar

Локализованный календарь с праздниками.

```tsx
import LocalizedCalendar from '@/components/LocalizedCalendar';

const [date, setDate] = useState(new Date());

<LocalizedCalendar
  selectedDate={date}
  onSelectDate={setDate}
  showHolidays
  minDate={new Date()}
  maxDate={new Date(2025, 11, 31)}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedDate` | `Date` | - | Выбранная дата |
| `onSelectDate` | `(date: Date) => void` | - | Обработчик выбора |
| `minDate` | `Date` | - | Минимальная дата |
| `maxDate` | `Date` | - | Максимальная дата |
| `showHolidays` | `boolean` | `true` | Показать праздники |
| `className` | `string` | `''` | CSS классы |

**Особенности:**

- **UK:** Неделя начинается с понедельника
- **EN:** Неделя начинается с воскресенья
- Локализованные названия месяцев и дней
- Индикаторы украинских праздников
- Современный UI с Tailwind CSS

---

## 📝 useFormLocale Hook

Хук для локалізаціи форм.

```tsx
import { useFormLocale } from '@/hooks/useLocaleFormat';

const MyForm = () => {
  const { placeholders, dateFormat, timeFormat } = useFormLocale();

  return (
    <form>
      <input 
        type="email" 
        placeholder={placeholders.email}
      />
      <input 
        type="tel" 
        placeholder={placeholders.phone}
      />
      <input 
        type="text" 
        placeholder={placeholders.name}
      />
    </form>
  );
};
```

**Placeholders:**

```typescript
{
  email: "example@email.com",
  phone: "+380 (XX) XXX-XX-XX" (uk) | "+380 XX XXX-XXXX" (en),
  name: "Введіть ваше ім'я" (uk) | "Enter your name" (en),
  message: "Введіть повідомлення..." (uk) | "Enter message..." (en),
  search: "Пошук..." (uk) | "Search..." (en),
  date: "ДД.MM.РРРР" (uk) | "MM/DD/YYYY" (en)
}
```

---

## 📅 Конфигурация календаря

### getCalendarConfig()

Возвращает локальную конфигурацию календаря.

```tsx
const { getCalendarConfig } = useLocaleFormat();
const config = getCalendarConfig();

config.firstDayOfWeek  // 1 (Пн) для uk, 0 (Вс) для en
config.weekDays        // ['Нд', 'Пн', ...] или ['Sun', 'Mon', ...]
config.weekDaysFull    // ['Неділя', 'Понеділок', ...]
config.months          // ['Січень', 'Лютий', ...] или ['January', 'February', ...]
config.monthsShort     // ['Січ', 'Лют', ...] или ['Jan', 'Feb', ...]
config.holidays        // [{ date: '01-01', name: 'Новий рік' }, ...]
```

### Украинские праздники

```typescript
[
  { date: '01-01', name: 'Новий рік' },
  { date: '01-07', name: 'Різдво Христове' },
  { date: '03-08', name: 'Міжнародний жіночий день' },
  { date: '05-01', name: 'День праці' },
  { date: '05-09', name: 'День Перемоги' },
  { date: '06-28', name: 'День Конституції України' },
  { date: '08-24', name: 'День незалежності України' },
  { date: '10-14', name: 'День захисника України' },
  { date: '12-25', name: 'Різдво (католицьке)' }
]
```

---

## 💻 Полный пример: Форма обратной связи

```tsx
import { useState } from 'react';
import { useCommonTranslation } from '@/hooks/useTypedTranslation';
import { useFormLocale } from '@/hooks/useLocaleFormat';
import LocalizedPhoneInput from '@/components/LocalizedPhoneInput';

const ContactForm = () => {
  const { t } = useCommonTranslation();
  const { placeholders } = useFormLocale();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Валидация и отправка
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Имя */}
      <div>
        <label className="block text-sm font-medium mb-1">
          {t('labels.name')}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={placeholders.name}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">
          {t('labels.email')}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder={placeholders.email}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {/* Телефон */}
      <LocalizedPhoneInput
        value={formData.phone}
        onChange={(phone) => setFormData({ ...formData, phone })}
        required
        error={errors.phone}
      />

      {/* Сообщение */}
      <div>
        <label className="block text-sm font-medium mb-1">
          {t('labels.message')}
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={placeholders.message}
          rows={5}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {/* Кнопка отправки */}
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
      >
        {t('buttons.send')}
      </button>
    </form>
  );
};
```

---

## 🎯 Best Practices

### ✅ DO

1. **Використовуйте компоненти для отображения**
   ```tsx
   <LocalizedDate date={date} format="full" />
   <LocalizedNumber value={price} type="currency" />
   ```

2. **Використовуйте хук для логики**
   ```tsx
   const { formatDate, formatCurrency } = useLocaleFormat();
   const formatted = formatDate(data.date, 'short');
   ```

3. **Використовуйте правильный формат для контекста**
   ```tsx
   // В карточке новости
   <LocalizedDate date={news.date} format="medium" />
   
   // В комментариях
   <LocalizedDate date={comment.createdAt} relative />
   ```

4. **Показывайте индикаторы праздников для событий**
   ```tsx
   <LocalizedDate date={event.date} showHoliday />
   ```

### ❌ DON'T

1. **Не форматируйте даты вручную**
   ```tsx
   // ❌ Плохо
   const formatted = date.toLocaleDateString('uk-UA');
   
   // ✅ Хорошо
   <LocalizedDate date={date} format="medium" />
   ```

2. **Не забывайте про локали в числах**
   ```tsx
   // ❌ Плохо
   <span>{price.toFixed(2)} грн</span>
   
   // ✅ Хорошо
   <LocalizedNumber value={price} type="currency" />
   ```

3. **Не використовуйте жестко заданные форматы**
   ```tsx
   // ❌ Плохо
   const formatted = `${day}.${month}.${year}`;
   
   // ✅ Хорошо
   formatDate(date, 'short');
   ```

---

## 📊 Статистика

**Створено:**
- ✅ 1 утилитный файл (`locale-formats.ts`)
- ✅ 2 хука (`useLocaleFormat`, `useFormLocale`)
- ✅ 4 компонента (Date, Number, Phone, Calendar)
- ✅ 1 пример использования
- ✅ 1 документация

**Поддерживается:**
- ✅ 2 языка (uk, en)
- ✅ 6 форматов дат
- ✅ 4 типа чисел
- ✅ 9 украинских праздников
- ✅ Автоформатування телефонов

---

## ✅ Build Status

```bash
npm run build
# ✅ Build успешен (1.86s)
```

---

## 🎉 Готово!

Повна система локалізаціи форматов готова до використання!

**Наступні кроки:**
1. Изучите примеры в `src/components/examples/LocaleFormatsExample.tsx`
2. Використовуйте компоненти в ваших формах и сторінках
3. Расширяйте список праздников при необходимости

**Удачной разработки!** 🚀

---

_Створено: 19 грудня 2025_
_Версия: 1.0.0_
_Статус: Production Ready ✅_

