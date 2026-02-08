import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore'

import { db } from '../firebase/firebase'

const ordersRef = collection(db, 'orders')

export const createOrder = async ({ userId, items, total }) => {
  const payload = {
    userId,
    items,
    total,
    createdAt: serverTimestamp()
  }

  const docRef = await addDoc(ordersRef, payload)
  return docRef.id
}

export const getOrdersByUser = async (userId) => {
  const q = query(ordersRef, where('userId', '==', userId))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
  }))
}

export const getOrderById = async (id) => {
  const snap = await getDoc(doc(db, 'orders', id))
  if (!snap.exists()) throw new Error('Order not found')
  return { id: snap.id, ...snap.data() }
}
