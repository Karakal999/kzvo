// Скрипт для виправлення ролі адміністратора
// Запустіть: node scripts/fix-admin-role.js

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCmI6XUm7fKdAqSem73JRnP7kKLoYOIijQ",
  authDomain: "kzvo-18b82.firebaseapp.com",
  projectId: "kzvo-18b82",
  storageBucket: "kzvo-18b82.firebasestorage.app",
  messagingSenderId: "159668329494",
  appId: "1:159668329494:web:dea8d83adeb153106a6937",
  measurementId: "G-BS5MTYQBD3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function fixAdminRole() {
  try {
    // Увійдіть як admin
    const userCredential = await signInWithEmailAndPassword(auth, 'admin@kzvo.edu', 'admin123');
    const userId = userCredential.user.uid;
    
    console.log('✅ Увійшли як admin@kzvo.edu');
    console.log('🔑 User ID:', userId);
    
    // Оновіть роль
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      role: 'admin',
      displayName: 'Адміністратор'
    });
    
    console.log('✅ Роль успішно оновлена на "admin"!');
    console.log('🔄 Тепер перезавантажте сторінку профілю');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Помилка:', error.message);
    process.exit(1);
  }
}

fixAdminRole();

