import { initializeApp, getApps } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCzFAX9dnKeRtQ_gULfkvfTc_dwQZh_tKg",
  authDomain: "mediqueue10.firebaseapp.com",
  projectId: "mediqueue10",
  storageBucket: "mediqueue10.firebasestorage.app",
  messagingSenderId: "702576780735",
  appId: "1:702576780735:web:061dd60c9b1a8f90512d0a",
  measurementId: "G-M2VG54PMNY",
}

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
