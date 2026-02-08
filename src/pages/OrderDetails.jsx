import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Table } from 'react-bootstrap'

import { useAuth } from '../contexts/AuthContext'
import { getOrderById } from '../api/orders'
import LoadingSpinner from '../components/LoadingSpinner'

const formatDate = (timestamp) => {
  if (!timestamp) return 'Pending...'
  if (timestamp.toDate) return timestamp.toDate().toLocaleString()
  return new Date(timestamp).toLocaleString()
}

function OrderDetails() {
  const { id } = useParams()
  const { currentUser } = useAuth()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await getOrderById(id)

        if (data.userId !== currentUser.uid) {
          throw new Error('You do not have access to this order.')
        }

        setOrder(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [id, currentUser])

  if (loading) return <LoadingSpinner />
  if (error) return <Alert variant="danger">{error}</Alert>
  if (!order) return null

  return (
    <div>
      <h2>Order Details</h2>
      <p>
        <strong>Order ID:</strong> {order.id}
      </p>
      <p>
        <strong>Date:</strong> {formatDate(order.createdAt)}
      </p>
      <p>
        <strong>Total:</strong> ${Number(order.total).toFixed(2)}
      </p>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items?.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${Number(item.price).toFixed(2)}</td>
              <td>{item.qty}</td>
              <td>${(item.price * item.qty).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default OrderDetails
