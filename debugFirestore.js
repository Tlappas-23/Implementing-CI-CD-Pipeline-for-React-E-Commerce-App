// Debug script to test Firestore connection
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBsDeS4wTK17bnB2kOgHVbrhgUFB5xRVkQ",
  authDomain: "e-commerce-app-63938.firebaseapp.com",
  projectId: "e-commerce-app-63938",
  storageBucket: "e-commerce-app-63938.firebasestorage.app",
  messagingSenderId: "698988491134",
  appId: "1:698988491134:web:3f3035cd6d9b134fe5032f"
}

console.log('🔧 Testing Firebase Configuration...\n')
console.log('Config:', JSON.stringify(firebaseConfig, null, 2))

let app, db

try {
  console.log('\n📱 Initializing Firebase...')
  app = initializeApp(firebaseConfig)
  console.log('✅ Firebase app initialized')

  console.log('\n📊 Getting Firestore instance...')
  db = getFirestore(app)
  console.log('✅ Firestore instance created')

  console.log('\n🔍 Fetching products from Firestore...')
  const productsRef = collection(db, 'products')

  const startTime = Date.now()
  const snapshot = await getDocs(productsRef)
  const endTime = Date.now()

  console.log(`✅ Query completed in ${endTime - startTime}ms`)
  console.log(`📦 Found ${snapshot.size} products\n`)

  if (snapshot.size > 0) {
    console.log('First 5 products:')
    snapshot.docs.slice(0, 5).forEach((doc, index) => {
      const data = doc.data()
      console.log(`  ${index + 1}. ${data.title} - $${data.price}`)
    })
  } else {
    console.log('⚠️  No products found!')
  }

  console.log('\n✅ SUCCESS: Firestore is working correctly!')
  process.exit(0)

} catch (error) {
  console.error('\n❌ ERROR occurred:')
  console.error('Code:', error.code)
  console.error('Message:', error.message)
  console.error('\nFull error:', error)

  if (error.code === 'permission-denied') {
    console.error('\n🔥 FIRESTORE RULES ISSUE!')
    console.error('Your Firestore security rules are blocking reads.')
    console.error('\nFix: Go to Firebase Console → Firestore → Rules')
    console.error('https://console.firebase.google.com/project/e-commerce-app-63938/firestore/rules')
    console.error('\nAdd this rule:')
    console.error('  match /products/{productId} {')
    console.error('    allow read: if true;')
    console.error('  }')
  }

  process.exit(1)
}
