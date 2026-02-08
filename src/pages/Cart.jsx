import { useState } from 'react'
import { Button, Table, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { createOrder } from '../api/orders'

function Cart() {
  const { currentUser } = useAuth()
  const { items, updateQty, removeFromCart, clearCart, total } =
    useCart()
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!items.length) return

    setError('')
    setLoading(true)

    try {
      // I store a snapshot of cart items in the order doc.
      const orderId = await createOrder({
        userId: currentUser.uid,
        items,
        total
      })
      clearCart()
      navigate(`/orders/${orderId}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!items.length) {
    return (
      <div>
        <h2>Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Cart</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price.toFixed(2)}</td>
              <td style={{ width: 120 }}>
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) =>
                    updateQty(
                      item.id,
                      Number(e.target.value)
                    )
                  }
                />
              </td>
              <td>${(item.price * item.qty).toFixed(2)}</td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4>Total: ${total.toFixed(2)}</h4>

      <Button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Placing Order...' : 'Checkout'}
      </Button>
    </div>
  )
}

export default Cart
