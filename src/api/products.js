import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore'

import { db } from '../firebase/firebase'

const productsRef = collection(db, 'products')

const normalizeProduct = (product) => ({
  title: (product.title || '').trim(),
  price: Number(product.price) || 0,
  description: (product.description || '').trim(),
  category: (product.category || '').trim(),
  image: (product.image || '').trim()
})

export const getAllProducts = async () => {
  const snapshot = await getDocs(productsRef)
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
  }))
}

export const getProductById = async (id) => {
  const snap = await getDoc(doc(db, 'products', id))
  if (!snap.exists()) throw new Error('Product not found')
  return { id: snap.id, ...snap.data() }
}

export const createProduct = async (product) => {
  const payload = normalizeProduct(product)
  const docRef = await addDoc(productsRef, {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  return docRef.id
}

export const updateProduct = async (id, product) => {
  const payload = normalizeProduct(product)
  await updateDoc(doc(db, 'products', id), {
    ...payload,
    updatedAt: serverTimestamp()
  })
}

export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, 'products', id))
}
