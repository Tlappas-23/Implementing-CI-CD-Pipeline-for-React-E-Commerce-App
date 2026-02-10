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
    // Listen for authentication state changes (login/logout)
    // This fires whenever a user logs in, logs out, or on page load
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    // Cleanup function - unsubscribe from auth listener when component unmounts
    return unsubscribe
  }, [])

  const register = async ({ email, password, name, address }) => {
    // Step 1: Create authentication account in Firebase Auth
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    // Step 2: Save additional user profile data (name, address) to Firestore
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
    if (!auth.currentUser) return

    // Step 1: Delete user profile data from Firestore
    await deleteUserDoc(auth.currentUser.uid)

    // Step 2: Delete authentication account from Firebase Auth
    // Note: May require recent login for security
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
