import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  deleteUser
} from 'firebase/auth'

import { auth } from '../firebase/firebase'
import { createUserDoc, deleteUserDoc } from '../api/users'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('🔥 AuthContext: Setting up Firebase Auth listener...')

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('🔥 AuthContext: Auth state changed:', user ? 'User logged in' : 'No user')
      setCurrentUser(user)
      setLoading(false)
    }, (error) => {
      console.error('🔥 AuthContext: Auth error:', error)
      setLoading(false)
    })

    // Fallback timeout in case listener never fires
    const timeout = setTimeout(() => {
      console.warn('⚠️ AuthContext: Auth listener timeout after 5s, forcing loading=false')
      setLoading(false)
    }, 5000)

    return () => {
      clearTimeout(timeout)
      unsubscribe()
    }
  }, [])

  const register = async ({ email, password, name, address }) => {
    // I create the auth user first, then save profile data in Firestore.
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    await createUserDoc({
      uid: credentials.user.uid,
      email: credentials.user.email,
      name,
      address
    })

    return credentials.user
  }

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

  const logout = () => signOut(auth)

  const removeAccount = async () => {
    // I delete the Firestore doc before auth deletion to keep rules simple.
    // If auth deletion fails with "requires-recent-login", log out/in then retry.
    if (!auth.currentUser) return

    await deleteUserDoc(auth.currentUser.uid)
    await deleteUser(auth.currentUser)
  }

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout,
    removeAccount
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
