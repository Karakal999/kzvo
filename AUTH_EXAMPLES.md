# Приклади використання системи аутентифікації

## Базове використання AuthContext

### Отримання інформації про користувача

```tsx
import { useAuth } from '../context/AuthContext';

function UserProfile() {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (!user) {
    return <div>Ви не авторизовані</div>;
  }

  return (
    <div>
      <h1>Привіт, {userProfile?.displayName}!</h1>
      <p>Email: {user.email}</p>
      <p>Роль: {userProfile?.role}</p>
    </div>
  );
}
```

### Вхід користувача

```tsx
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

function LoginExample() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      // Користувач увійшов успішно
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <div className="error">{error}</div>}
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <button type="submit">Увійти</button>
    </form>
  );
}
```

### Реєстрація користувача

```tsx
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

function RegisterExample() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, displayName);
      // Користувач зареєстрований успішно
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {error && <div className="error">{error}</div>}
      <input 
        type="text" 
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Ім'я"
      />
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <button type="submit">Зареєструватися</button>
    </form>
  );
}
```

### Вихід з системи

```tsx
import { useAuth } from '../context/AuthContext';

function LogoutButton() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      // Користувач вийшов успішно
    } catch (err) {
      console.error('Помилка виходу:', err);
    }
  };

  return (
    <button onClick={handleLogout}>
      Вийти
    </button>
  );
}
```

## Захист роутів

### Базовий захищений роут

```tsx
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

// В App.tsx
<Route path="/profile" element={
  <ProtectedRoute>
    <ProfilePage />
  </ProtectedRoute>
} />
```

### Роут тільки для адміністраторів

```tsx
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

// В App.tsx
<Route path="/admin" element={
  <ProtectedRoute requireAdmin={true}>
    <AdminPanel />
  </ProtectedRoute>
} />
```

### Кастомний захищений компонент

```tsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function AdminOnlyComponent() {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>Адмін-панель</h1>
      {/* Контент тільки для адміністраторів */}
    </div>
  );
}
```

## Умовний рендеринг

### Показати різний контент для авторизованих/неавторизованих

```tsx
import { useAuth } from '../context/AuthContext';

function ConditionalContent() {
  const { user, isAdmin } = useAuth();

  return (
    <div>
      {user ? (
        <div>
          <p>Ви увійшли як {user.email}</p>
          {isAdmin && <p>У вас є права адміністратора</p>}
        </div>
      ) : (
        <div>
          <p>Будь ласка, увійдіть в систему</p>
          <Link to="/login">Увійти</Link>
        </div>
      )}
    </div>
  );
}
```

### Показати кнопку тільки для адміністраторів

```tsx
import { useAuth } from '../context/AuthContext';

function AdminButton() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return null;
  }

  return (
    <button onClick={() => console.log('Адмін дія')}>
      Адмін функція
    </button>
  );
}
```

## Робота з Firestore

### Отримання даних користувача з Firestore

```tsx
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

function UserData() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      };
      fetchUserData();
    }
  }, [user]);

  return (
    <div>
      {userData && (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      )}
    </div>
  );
}
```

### Оновлення профілю користувача

```tsx
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

function UpdateProfile() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState('');

  const handleUpdate = async () => {
    if (!user) return;
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: displayName,
      });
      alert('Профіль оновлено!');
    } catch (error) {
      console.error('Помилка оновлення:', error);
    }
  };

  return (
    <div>
      <input 
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Нове ім'я"
      />
      <button onClick={handleUpdate}>Оновити</button>
    </div>
  );
}
```

## Скидання пароля

```tsx
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await resetPassword(email);
      setMessage('Лист для скидання пароля відправлено на вашу пошту');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleReset}>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ваш email"
      />
      <button type="submit">Скинути пароль</button>
    </form>
  );
}
```

## Перенаправлення після входу

```tsx
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function LoginWithRedirect() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      // Перенаправити на сторінку, з якої прийшов користувач
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  return <LoginForm />;
}
```

## Обробка помилок

```tsx
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

function LoginWithErrorHandling() {
  const { signIn } = useAuth();
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    setError('');
    
    try {
      await signIn(email, password);
    } catch (err: any) {
      // Обробка різних типів помилок
      switch (err.code) {
        case 'auth/user-not-found':
          setError('Користувача не знайдено');
          break;
        case 'auth/wrong-password':
          setError('Невірний пароль');
          break;
        case 'auth/too-many-requests':
          setError('Забагато спроб. Спробуйте пізніше');
          break;
        default:
          setError(err.message || 'Сталася помилка');
      }
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {/* Форма входу */}
    </div>
  );
}
```

## Перевірка статусу аутентифікації

```tsx
import { useAuth } from '../context/AuthContext';

function AuthStatus() {
  const { user, userProfile, loading, isAdmin } = useAuth();

  if (loading) {
    return <div>Перевірка статусу...</div>;
  }

  return (
    <div>
      <h2>Статус аутентифікації</h2>
      <p>Авторизований: {user ? 'Так' : 'Ні'}</p>
      {user && (
        <>
          <p>Email: {user.email}</p>
          <p>UID: {user.uid}</p>
          <p>Ім'я: {userProfile?.displayName}</p>
          <p>Роль: {userProfile?.role}</p>
          <p>Адміністратор: {isAdmin ? 'Так' : 'Ні'}</p>
        </>
      )}
    </div>
  );
}
```

## Інтеграція з формами (React Hook Form)

```tsx
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
}

function LoginWithHookForm() {
  const { signIn } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data.email, data.password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register('email', { 
          required: 'Email обов\'язковий',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Невірний формат email'
          }
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input 
        {...register('password', { 
          required: 'Пароль обов\'язковий',
          minLength: {
            value: 6,
            message: 'Пароль повинен містити мінімум 6 символів'
          }
        })}
        type="password"
        placeholder="Пароль"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Увійти</button>
    </form>
  );
}
```

