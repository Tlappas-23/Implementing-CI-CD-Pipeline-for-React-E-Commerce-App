# Firebase E-Commerce App with CI/CD Pipeline

A full-stack e-commerce application built with React and Firebase, featuring automated testing and deployment through GitHub Actions and Vercel.

## 🌐 Live Demo
https://fakestore-10u0svn7d-tommys-projects-678b576d.vercel.app

## ✨ Features
- **Authentication**: Email/password registration, login, and logout
- **User Profiles**: Create and update profile information (name, address)
- **Product Management**: Browse, create, edit, and delete products
- **Shopping Cart**: Add items to cart with quantity management
- **Checkout**: Complete orders and save to order history
- **Order History**: View past orders and order details

## 🛠 Tech Stack
- **Frontend**: React 19 + Vite
- **Backend**: Firebase Authentication + Firestore Database
- **UI Framework**: React Bootstrap
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions + Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ installed
- Firebase account
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tlappas-23/Implementing-CI-CD-Pipeline-for-React-E-Commerce-App.git
   cd fakestore-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable **Authentication** → Email/Password provider
   - Enable **Firestore Database**
   - Get your Firebase config from Project Settings → Your apps

4. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Add your Firebase configuration values:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Set up Firestore Security Rules**
   In Firebase Console → Firestore → Rules, paste:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Anyone can read products, authenticated users can write
       match /products/{productId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       // Users can only access their own profile
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       // Users can only access their own orders
       match /orders/{orderId} {
         allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
         allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
       }
     }
   }
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173)

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Watch Mode (runs tests on file changes)
```bash
npm run test:watch
```

### Test Coverage
The project includes:
- **2 Unit Tests**: ProductCard and LoadingSpinner components
- **1 Integration Test**: Cart functionality when adding products

## 🔄 CI/CD Pipeline

### How It Works
1. **Push to `main` branch** → GitHub Actions triggers
2. **Continuous Integration**:
   - Install dependencies
   - Run all tests (must pass)
   - Build the application
3. **Continuous Deployment** (only if tests pass):
   - Deploy to Vercel automatically

### Required GitHub Secrets
Set these in your GitHub repository → Settings → Secrets and variables → Actions:

**Vercel Deployment:**
- `VERCEL_TOKEN` - Get from [vercel.com/account/tokens](https://vercel.com/account/tokens)
- `VERCEL_ORG_ID` - Run `vercel link` and check `.vercel/project.json`
- `VERCEL_PROJECT_ID` - Run `vercel link` and check `.vercel/project.json`

**Firebase Configuration (for building in CI):**
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

### Vercel Environment Variables
Also add the 6 Firebase variables in Vercel → Settings → Environment Variables for all environments (Production, Preview, Development)

## 📁 Project Structure
```
fakestore-app/
├── .github/workflows/    # GitHub Actions CI/CD configuration
├── public/              # Static assets
├── src/
│   ├── api/            # Firestore API functions (products, orders, users)
│   ├── components/     # Reusable React components
│   ├── contexts/       # React Context (Auth, Cart)
│   ├── firebase/       # Firebase configuration
│   ├── pages/          # Page components (Home, Products, Cart, etc.)
│   └── __tests__/      # Jest tests
├── .env.example        # Example environment variables
└── vercel.json         # Vercel deployment configuration
```

## 📝 Notes
- Products are stored in Firebase Firestore (not from external API)
- Account deletion requires recent login for security
- All cart data is persisted in localStorage

## 🤝 Contributing
This project was built as part of a coding bootcamp assignment demonstrating Test-Driven Development (TDD) and CI/CD best practices.

## 📄 License
MIT
