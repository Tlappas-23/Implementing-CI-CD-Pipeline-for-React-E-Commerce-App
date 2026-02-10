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
  console.log('🔍 Fetching products from Firestore...')
  try {
    const snapshot = await getDocs(productsRef)
    console.log('✅ Products fetched:', snapshot.size)
    const products = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    }))
    console.log('✅ Products mapped:', products.length)
    return products
  } catch (error) {
    console.error('❌ Error fetching products:', error.code, error.message)
    throw error
  }
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
