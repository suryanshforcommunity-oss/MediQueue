"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
  type User,
} from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { auth, db, googleProvider } from "./firebase"

interface UserData {
  uid: string
  email: string | null
  name: string | null
  role: "patient" | "doctor"
  phone?: string
  gender?: string
  dateOfBirth?: string
  department?: string
  createdAt?: Date
}

interface AuthContextType {
  user: User | null
  userData: UserData | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, additionalData: Partial<UserData>) => Promise<void>
  signInWithGoogle: (role: "patient" | "doctor") => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)

      if (firebaseUser) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData)
        }
      } else {
        setUserData(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email: string, password: string, additionalData: Partial<UserData>) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const { uid } = userCredential.user

    // Store additional user data in Firestore
    await setDoc(doc(db, "users", uid), {
      uid,
      email,
      role: "patient",
      ...additionalData,
      createdAt: serverTimestamp(),
    })
  }

  const signInWithGoogle = async (role: "patient" | "doctor") => {
    const result = await signInWithPopup(auth, googleProvider)
    const { uid, email, displayName } = result.user

    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, "users", uid))

    if (!userDoc.exists()) {
      // Create new user document
      await setDoc(doc(db, "users", uid), {
        uid,
        email,
        name: displayName,
        role,
        createdAt: serverTimestamp(),
      })
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
