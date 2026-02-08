import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore'

import { db } from '../firebase/firebase'

export const createUserDoc = async ({ uid, email, name, address }) => {
  const userRef = doc(db, 'users', uid)
  await setDoc(userRef, {
    uid,
    email,
    name: (name || '').trim(),
    address: (address || '').trim(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
}

export const getUserDoc = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

export const updateUserDoc = async (uid, updates) => {
  await setDoc(
    doc(db, 'users', uid),
    {
      ...updates,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  )
}

export const deleteUserDoc = async (uid) => {
  await deleteDoc(doc(db, 'users', uid))
}
