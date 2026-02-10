import { useEffect, useState } from 'react'
import { Row, Col, Alert } from 'react-bootstrap'

import { getAllProducts } from '../api/products'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('📦 Products page: Starting to fetch products...')
    getAllProducts()
      .then(data => {
        console.log('📦 Products page: Received', data.length, 'products')
        setProducts(data)
      })
      .catch((err) => {
        console.error('📦 Products page: Error:', err)
        setError('Failed to load products: ' + err.message)
      })
      .finally(() => {
        console.log('📦 Products page: Setting loading=false')
        setLoading(false)
      })
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <Row>
      {products.map(product => (
        <Col md={4} className="mb-4" key={product.id}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  )
}

export default Products
