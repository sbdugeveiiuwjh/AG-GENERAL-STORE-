import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile } from '../types/grocery';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  authError: string | null;
  authErrorCode: string | null;
  setAuthError: (err: string | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  saveUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  isStoreOwner: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authErrorCode, setAuthErrorCode] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Store owner email configuration
  const STORE_OWNER_EMAIL = 'kumaranjlibhagat@gmail.com';
  const isStoreOwner = user?.email?.toLowerCase() === STORE_OWNER_EMAIL.toLowerCase();

  // Load and sync user profile from Firestore
  const syncUserProfile = async (firebaseUser: User) => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    let localData: Partial<UserProfile> | null = null;
    try {
      const saved = localStorage.getItem(`ag_user_profile_${firebaseUser.uid}`);
      if (saved) {
        localData = JSON.parse(saved);
      }
    } catch {
      // ignore JSON error
    }

    try {
      const snap = await getDoc(userDocRef);
      if (snap.exists()) {
        const firestoreData = snap.data() as UserProfile;
        const merged: UserProfile = {
          ...firestoreData,
          displayName: firestoreData.displayName || firebaseUser.displayName || localData?.displayName || '',
          photoURL: firebaseUser.photoURL || firestoreData.photoURL || localData?.photoURL || '',
          email: firebaseUser.email || firestoreData.email || ''
        };
        setUserProfile(merged);
        localStorage.setItem(`ag_user_profile_${firebaseUser.uid}`, JSON.stringify(merged));
      } else {
        const newProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: (firebaseUser.displayName || localData?.displayName || '').slice(0, 100),
          photoURL: (firebaseUser.photoURL || localData?.photoURL || '').slice(0, 1000),
          phone: (localData?.phone || '').slice(0, 20),
          address: (localData?.address || '').slice(0, 500),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        await setDoc(userDocRef, newProfile);
        setUserProfile(newProfile);
        localStorage.setItem(`ag_user_profile_${firebaseUser.uid}`, JSON.stringify(newProfile));
      }
    } catch (err) {
      console.warn('Could not sync user profile to firestore:', err);
      // Fallback local profile so UI never breaks
      const fallbackProfile: UserProfile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || localData?.displayName || '',
        photoURL: firebaseUser.photoURL || localData?.photoURL || '',
        phone: localData?.phone || '',
        address: localData?.address || ''
      };
      setUserProfile(fallbackProfile);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncUserProfile(currentUser);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);
    setAuthErrorCode(null);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      if (res.user) {
        await syncUserProfile(res.user);
      }
    } catch (error: any) {
      console.error('Google Sign-in error:', error);
      const code = error?.code || '';
      setAuthErrorCode(code);
      if (code === 'auth/popup-closed-by-user') {
        setAuthError('गूगल लॉगिन विंडो बंद कर दी गई। कृपया दोबारा "Google से लॉगिन करें" पर टैप करें।');
      } else if (code === 'auth/popup-blocked') {
        setAuthError('ब्राउज़र ने पॉप-अप को रोक दिया है। कृपया ऊपर ब्राउज़र सेटिंग में Pop-up Allow करें।');
      } else if (code === 'auth/cancelled-popup-request') {
        setAuthError('लॉगिन अनुरोध रद्द हुआ। कृपया पुनः प्रयास करें।');
      } else {
        setAuthError(error?.message || 'गूगल से लॉगिन करने में विफल। कृपया पुनः प्रयास करें।');
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      setIsAuthModalOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const saveUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);

    // Build strictly valid payload matching firestore.rules
    const updated: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: (data.displayName !== undefined ? data.displayName : (userProfile?.displayName || user.displayName || '')).slice(0, 100),
      photoURL: (user.photoURL || userProfile?.photoURL || '').slice(0, 1000),
      phone: (data.phone !== undefined ? data.phone : (userProfile?.phone || '')).slice(0, 20),
      address: (data.address !== undefined ? data.address : (userProfile?.address || '')).slice(0, 500),
      createdAt: userProfile?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Update local state immediately for instant feedback
    setUserProfile(updated);
    try {
      localStorage.setItem(`ag_user_profile_${user.uid}`, JSON.stringify(updated));
    } catch {
      // ignore
    }

    try {
      await setDoc(userDocRef, updated, { merge: true });
    } catch (err) {
      console.error('Error saving profile to firestore:', err);
      handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        authError,
        authErrorCode,
        setAuthError,
        isAuthModalOpen,
        setIsAuthModalOpen,
        signInWithGoogle,
        logout,
        saveUserProfile,
        isStoreOwner
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
