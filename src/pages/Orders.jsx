import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Table } from 'react-bootstrap'

import { useAuth } from '../contexts/AuthContext'
import { getOrdersByUser } from '../api/orders'
import LoadingSpinner from '../components/LoadingSpinner'

const formatDate = (timestamp) => {
  if (!timestamp) return 'Pending...'
  if (timestamp.toDate) return timestamp.toDate().toLocaleString()
  return new Date(timestamp).toLocaleString()
}

function Orders() {
  const { currentUser } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getOrdersByUser(currentUser.uid)
        // I sort newest-first on the client to avoid index setup.
        const sorted = [...data].sort((a, b) => {
          const aTime = a.createdAt?.seconds || 0
          const bTime = b.createdAt?.seconds || 0
          return bTime - aTime
        })
        setOrders(sorted)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [currentUser])

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <h2>Order History</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {!orders.length && <p>No orders yet.</p>}

      {!!orders.length && (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link to={`/orders/${order.id}`}>
                    {order.id}
                  </Link>
                </td>
                <td>{formatDate(order.createdAt)}</td>
                <td>${Number(order.total).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default Orders
