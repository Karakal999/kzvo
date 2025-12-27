import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// Types
export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: UserRole;
  createdAt: Date;
  lastLogin: Date;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  isSuperAdmin: boolean; // Головний адміністратор з повними правами
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          uid: userDoc.id,
          email: data.email,
          displayName: data.displayName,
          role: data.role || 'user',
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLogin: data.lastLogin?.toDate() || new Date(),
        } as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Create or update user profile in Firestore
  const createUserProfile = async (user: User, displayName?: string) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // Create new user profile with default role 'student'
        await setDoc(userRef, {
          email: user.email,
          displayName: displayName || user.displayName || '',
          role: 'student',
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });
      } else {
        // Update last login
        await setDoc(userRef, {
          lastLogin: serverTimestamp(),
        }, { merge: true });
      }

      return await fetchUserProfile(user.uid);
    } catch (error) {
      console.error('Error creating user profile:', error);
      return null;
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name if provided
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }

      // Create user profile in Firestore
      await createUserProfile(userCredential.user, displayName);
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await createUserProfile(userCredential.user);
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Reset password error:', error);
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        const profile = await fetchUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const isAdmin = userProfile?.role === 'admin';
  const isTeacher = userProfile?.role === 'teacher';
  const isStudent = userProfile?.role === 'student';
  // Головний суперадміністратор з повними правами
  const isSuperAdmin = userProfile?.email === 'admin@kzvo.edu' && isAdmin;

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    isAdmin,
    isTeacher,
    isStudent,
    isSuperAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Helper function to get user-friendly error messages
function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Ця електронна адреса вже використовується';
    case 'auth/invalid-email':
      return 'Невірна електронна адреса';
    case 'auth/operation-not-allowed':
      return 'Операція не дозволена';
    case 'auth/weak-password':
      return 'Пароль занадто слабкий';
    case 'auth/user-disabled':
      return 'Цей обліковий запис вимкнено';
    case 'auth/user-not-found':
      return 'Користувача не знайдено';
    case 'auth/wrong-password':
      return 'Невірний пароль';
    case 'auth/too-many-requests':
      return 'Забагато спроб. Спробуйте пізніше';
    default:
      return 'Сталася помилка. Спробуйте ще раз';
  }
}

