import 'firebase/compat/auth';
import React, {
  createContext,
  useContext,
  useState
} from 'react';

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query, where
} from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { AuthError } from 'firebase/auth';

import { FIREBASE_CONFIG } from '../util/config';

type FirebaseProviderPropsType = {
  children: React.ReactNode;
};

type FirebaseStateType = {
  user: firebase.User | null;
  error: string | null;
  token: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  isFetchingUser: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithMicrosoft: () => Promise<void>;
  registerWithCredentials: (email: string, password: string) => Promise<void>;
  loginWithCredentials: (email: string, password: string) => Promise<void>;
  logoutUserFromFirebase: () => Promise<void>;
};

firebase.initializeApp(FIREBASE_CONFIG);
const FirebaseContext = createContext<FirebaseStateType | undefined>(undefined);

function useFirebase() {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }

  return context;
}

export { useFirebase };
