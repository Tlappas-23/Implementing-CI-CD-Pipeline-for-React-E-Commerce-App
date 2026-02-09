# Firebase E-Commerce App (React + Vite)

React e‑commerce app with Firebase Authentication and Firestore for product and order management.

## Live Demo
- https://fakestore-jbyr3sl6j-tommys-projects-678b576d.vercel.app

## Features
- Email/password registration, login, logout
- User profile CRUD (name, address)
- Product CRUD (create, read, update, delete)
- Cart with checkout
- Order history + order detail views

## Tech Stack
- React 19 + Vite
- Firebase Auth + Firestore
- React Bootstrap

## Setup
1. Install dependencies
   ```bash
   npm install
   ```

2. Create a Firebase project
   - Enable **Authentication** (Email/Password)
   - Enable **Firestore Database**
   - Add a **Web App** and copy the config values

3. Create `.env`
   - Copy `.env.example` to `.env`
   - Paste your Firebase config values

4. (Optional) Firestore rules
   ```rules
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /products/{productId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /orders/{orderId} {
         allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
         allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
       }
     }
   }
   ```

5. Seed products
   - Use **Add Product** in the app, or
   - Create `products` docs in Firestore manually:
     - `title` (string)
     - `price` (number)
     - `description` (string)
     - `category` (string)
     - `image` (string URL)

6. Run the app
   ```bash
   npm run dev
   ```

## Testing
- Run all tests
  ```bash
  npm test
  ```
- Watch mode
  ```bash
  npm run test:watch
  ```

## CI/CD
GitHub Actions runs tests and builds on every push to `main`. If tests pass, the app deploys to Vercel.

Required GitHub Secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Notes
- Deleting an account may require a recent login (Firebase security rule).
- Products are read from Firestore (FakeStore API is no longer used).
