# Налаштування Firebase для системи аутентифікації

## Крок 1: Створення проекту Firebase

1. Перейдіть на [Firebase Console](https://console.firebase.google.com/)
2. Натисніть "Add project" (Додати проект)
3. Введіть назву проекту (наприклад, "KZVO Academy")
4. Виберіть налаштування (Google Analytics можна вимкнути для тестування)
5. Натисніть "Create project"

## Крок 2: Налаштування Authentication

1. У лівому меню виберіть **Authentication**
2. Натисніть **Get started**
3. Перейдіть на вкладку **Sign-in method**
4. Увімкніть **Email/Password**:
   - Натисніть на "Email/Password"
   - Увімкніть перший перемикач (Email/Password)
   - Натисніть "Save"

## Крок 3: Налаштування Firestore Database

1. У лівому меню виберіть **Firestore Database**
2. Натисніть **Create database**
3. Виберіть режим:
   - **Production mode** - для продакшену
   - **Test mode** - для розробки (правила безпеки будуть відкриті)
4. Виберіть локацію (наприклад, `europe-west1`)
5. Натисніть **Enable**

### Налаштування правил безпеки Firestore

Після створення бази даних, перейдіть на вкладку **Rules** та замініть правила на:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read their own data, admins can read all
    match /users/{userId} {
      allow read: if request.auth != null && 
                     (request.auth.uid == userId || 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow write: if request.auth != null && 
                      (request.auth.uid == userId || 
                       get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Content collections - read for all, write for admins only
    match /{collection}/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Крок 4: Отримання конфігурації Firebase

1. У лівому меню натисніть на іконку шестерні ⚙️ біля "Project Overview"
2. Виберіть **Project settings**
3. Прокрутіть вниз до секції **Your apps**
4. Натисніть на іконку веб-додатку `</>`
5. Введіть назву додатку (наприклад, "KZVO Web")
6. Не потрібно налаштовувати Firebase Hosting
7. Натисніть **Register app**
8. Скопіюйте конфігурацію Firebase

## Крок 5: Додавання конфігурації до проекту

1. Створіть файл `.env` в корені проекту (якщо його ще немає)
2. Додайте наступні змінні з даними з Firebase Console:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**ВАЖЛИВО:** Додайте `.env` до `.gitignore`, щоб не комітити конфіденційні дані!

## Крок 6: Створення першого адміністратора

Після реєстрації першого користувача, вам потрібно вручну надати йому права адміністратора:

1. Перейдіть в **Firestore Database**
2. Знайдіть колекцію `users`
3. Відкрийте документ з UID вашого користувача
4. Змініть поле `role` з `user` на `admin`
5. Збережіть зміни

## Крок 7: Запуск проекту

```bash
npm install
npm run dev
```

## Використання системи аутентифікації

### Для користувачів:
- `/login` - сторінка входу
- `/register` - сторінка реєстрації
- `/profile` - профіль користувача (потрібна авторизація)

### Для адміністраторів:
- `/admin` - адмін-панель (потрібні права адміністратора)

## Компоненти

### AuthContext
Надає доступ до:
- `user` - поточний користувач Firebase
- `userProfile` - профіль користувача з Firestore
- `signIn(email, password)` - вхід
- `signUp(email, password, displayName)` - реєстрація
- `signOut()` - вихід
- `resetPassword(email)` - скидання пароля
- `isAdmin` - чи є користувач адміністратором

### ProtectedRoute
Компонент для захисту роутів:

```tsx
<Route path="/admin" element={
  <ProtectedRoute requireAdmin={true}>
    <Admin />
  </ProtectedRoute>
} />
```

### UserMenu
Меню користувача в Header, показує:
- Ім'я користувача
- Посилання на профіль
- Посилання на адмін-панель (для адмінів)
- Кнопку виходу

## Безпека

1. **Ніколи не комітьте `.env` файл** - додайте його до `.gitignore`
2. **Налаштуйте правила Firestore** - обмежте доступ до даних
3. **Використовуйте HTTPS** - для продакшену обов'язково
4. **Регулярно оновлюйте залежності** - для безпеки

## Troubleshooting

### Помилка "Firebase: Error (auth/configuration-not-found)"
- Перевірте, чи правильно налаштовані змінні оточення
- Перезапустіть dev сервер після зміни `.env`

### Помилка "Missing or insufficient permissions"
- Перевірте правила безпеки Firestore
- Переконайтеся, що користувач авторизований

### Користувач не може увійти
- Перевірте, чи увімкнено Email/Password authentication
- Перевірте правильність email та пароля
- Подивіться в консоль браузера на помилки

## Додаткові можливості

### Скидання пароля
Додайте сторінку `/forgot-password`:

```tsx
const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(email);
    alert('Лист для скидання пароля відправлено!');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button type="submit">Скинути пароль</button>
    </form>
  );
};
```

### Оновлення профілю
Додайте можливість редагування профілю в `/profile`.

### Соціальна аутентифікація
Додайте вхід через Google, Facebook тощо в Firebase Console.

## Корисні посилання

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)

