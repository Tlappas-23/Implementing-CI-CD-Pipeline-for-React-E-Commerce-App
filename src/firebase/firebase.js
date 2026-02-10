// Firebase Configuration
// These environment variables are loaded from .env (local) or Vercel (production)
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase project configuration
// Values come from environment variables set in .env and Vercel dashboard
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Initialize Firebase app with our configuration
const app = initializeApp(firebaseConfig)

// Export Firebase Authentication service for login/register features
export const auth = getAuth(app)

// Export Firestore Database service for storing products, orders, and user data
export const db = getFirestore(app)
