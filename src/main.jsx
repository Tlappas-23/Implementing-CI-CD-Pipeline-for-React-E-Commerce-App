// React entry point
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Global styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

// Root component
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'

// Mount React app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
)
