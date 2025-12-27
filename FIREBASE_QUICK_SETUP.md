# 🚀 Швидке налаштування Firebase (5 хвилин)

## Крок 1: Створіть проект (1 хв)

1. Відкрийте: **https://console.firebase.google.com/**
2. Натисніть **"Add project"** (Додати проект)
3. Введіть назву: **"KZVO Academy"**
4. Вимкніть Google Analytics (не потрібно для тесту)
5. Натисніть **"Create project"**

## Крок 2: Увімкніть Authentication (1 хв)

1. У лівому меню знайдіть **"Authentication"**
2. Натисніть **"Get started"**
3. Виберіть **"Email/Password"**
4. Увімкніть перший перемикач (**Email/Password**)
5. Натисніть **"Save"**

## Крок 3: Створіть Firestore Database (1 хв)

1. У лівому меню знайдіть **"Firestore Database"**
2. Натисніть **"Create database"**
3. Виберіть **"Start in test mode"** (для розробки)
4. Виберіть локацію: **"europe-west1"** або найближчу до вас
5. Натисніть **"Enable"**

## Крок 4: Отримайте конфігурацію (2 хв)

1. Натисніть на **⚙️ (Settings)** біля "Project Overview"
2. Виберіть **"Project settings"**
3. Прокрутіть вниз до **"Your apps"**
4. Натисніть на іконку **</>** (Web)
5. Введіть назву: **"KZVO Web App"**
6. НЕ вибирайте Firebase Hosting
7. Натисніть **"Register app"**

Ви побачите конфігурацію:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "kzvo-academy.firebaseapp.com",
  projectId: "kzvo-academy",
  storageBucket: "kzvo-academy.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Крок 5: Оновіть .env.local (1 хв)

Відкрийте файл `.env.local` в корені проекту і замініть значення:

```env
VITE_FIREBASE_API_KEY=AIza...  # Ваш apiKey
VITE_FIREBASE_AUTH_DOMAIN=kzvo-academy.firebaseapp.com  # Ваш authDomain
VITE_FIREBASE_PROJECT_ID=kzvo-academy  # Ваш projectId
VITE_FIREBASE_STORAGE_BUCKET=kzvo-academy.appspot.com  # Ваш storageBucket
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789  # Ваш messagingSenderId
VITE_FIREBASE_APP_ID=1:123456789:web:abc123  # Ваш appId
```

## Крок 6: Перезапустіть сервер

```bash
# Зупиніть сервер (Ctrl+C в терміналі)
# Запустіть знову:
npm run dev
```

## Крок 7: Створіть тестового користувача

### Спосіб 1: Через Firebase Console

1. **Authentication → Users → Add user**
2. Email: `admin@kzvo.edu`
3. Password: `admin123`
4. Натисніть **"Add user"**

5. Скопіюйте **UID** створеного користувача

6. **Firestore Database → Start collection**
7. Collection ID: `users`
8. Document ID: **[вставте скопійований UID]**
9. Додайте поля:
   - `email` (string): `admin@kzvo.edu`
   - `displayName` (string): `Адміністратор КЗВО`
   - `role` (string): `admin`
   - `createdAt` (timestamp): [поточна дата]
   - `lastLogin` (timestamp): [поточна дата]
10. Натисніть **"Save"**

### Спосіб 2: Через сайт (простіше)

1. Відкрийте сайт: `http://localhost:5173/register`
2. Зареєструйтеся з email: `admin@kzvo.edu`
3. Перейдіть в **Firestore Database → users**
4. Знайдіть свого користувача
5. Змініть поле `role` з `student` на `admin`
6. Збережіть

## ✅ Готово!

Тепер спробуйте увійти:
- Email: `admin@kzvo.edu`
- Password: `admin123`

Має працювати! 🎉

---

## 🐛 Якщо не працює:

1. **Перевірте консоль браузера (F12)** - там будуть деталі помилки
2. **Перевірте .env.local** - всі значення правильні?
3. **Перезапустіть сервер** - зміни .env потребують перезапуску
4. **Очистіть кеш** - Ctrl+Shift+R

## 📞 Типові помилки:

### "Firebase: Error (auth/configuration-not-found)"
**Рішення:** Перевірте .env.local та перезапустіть сервер

### "Firebase: Error (auth/invalid-api-key)"
**Рішення:** Перевірте apiKey в .env.local

### "Firebase: Error (auth/user-not-found)"
**Рішення:** Створіть користувача в Firebase Console

### "Missing or insufficient permissions"
**Рішення:** Налаштуйте Firestore в "test mode" або додайте правила безпеки з файлу `firestore.rules`

