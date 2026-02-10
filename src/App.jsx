import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import NavigationBar from './components/NavigationBar'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import OrderDetails from './pages/OrderDetails'
import ProtectedRoute from './components/ProtectedRoute'

// Main App Component
// Handles routing between different pages using React Router
function App() {
  return (
    <Router>
      {/* Full-width navbar */}
      <NavigationBar />

      {/* Centered page content */}
      <Container className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route
            path="/add-product"
            element={(
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/edit-product/:id"
            element={(
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            )}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={(
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/cart"
            element={(
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/orders"
            element={(
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/orders/:id"
            element={(
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            )}
          />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
