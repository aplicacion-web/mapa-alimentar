import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAqby00hRokrA6JFOaBDUgYvM3Tgu77GIg",
  authDomain: "mapa-alimentar.firebaseapp.com",
  projectId: "mapa-alimentar",
  storageBucket: "mapa-alimentar.firebasestorage.app",
  messagingSenderId: "650915765811",
  appId: "1:650915765811:web:e56b989f1b7ad76c328d46"
};

export const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
