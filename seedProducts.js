// Run this script to seed your Firestore database with sample products
// Usage: node seedProducts.js

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBsDeS4wTK17bnB2kOgHVbrhgUFB5xRVkQ",
  authDomain: "e-commerce-app-63938.firebaseapp.com",
  projectId: "e-commerce-app-63938",
  storageBucket: "e-commerce-app-63938.firebasestorage.app",
  messagingSenderId: "698988491134",
  appId: "1:698988491134:web:3f3035cd6d9b134fe5032f"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const sampleProducts = [
  {
    title: "iPhone 15 Pro",
    price: 999,
    description: "Latest flagship iPhone with A17 Pro chip and titanium design",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
  },
  {
    title: "MacBook Pro 16",
    price: 2499,
    description: "Powerful laptop with M3 Max chip for professionals",
    category: "electronics",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
  },
  {
    title: "Men's Casual Shirt",
    price: 29.99,
    description: "Comfortable cotton shirt for everyday wear",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
  },
  {
    title: "Women's T-Shirt",
    price: 19.99,
    description: "Short sleeve cotton t-shirt",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg"
  },
  {
    title: "Gold Chain Bracelet",
    price: 168,
    description: "Elegant gold plated bracelet",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
  }
]

async function seedProducts() {
  console.log('🌱 Seeding products to Firestore...')

  try {
    const productsRef = collection(db, 'products')

    for (const product of sampleProducts) {
      const docRef = await addDoc(productsRef, {
        ...product,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      console.log(`✅ Added: ${product.title} (ID: ${docRef.id})`)
    }

    console.log('\n🎉 Successfully seeded', sampleProducts.length, 'products!')
    console.log('Visit your app to see them!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding products:', error)
    process.exit(1)
  }
}

seedProducts()
