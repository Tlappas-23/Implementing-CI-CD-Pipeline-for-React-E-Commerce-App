import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

import { getProductById, deleteProduct } from '../api/products'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

import ConfirmDeleteModal from '../components/ConfirmDeleteModal'
import LoadingSpinner from '../components/LoadingSpinner' // ✅ FIX

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const { addToCart } = useCart()
  const { currentUser } = useAuth()

  useEffect(() => {
    getProductById(id)
      .then(data => setProduct(data))
      .catch(err => console.error(err))
  }, [id])

  const handleDelete = async () => {
    await deleteProduct(id)
    navigate('/products')
  }

  // loading state
  if (!product) return <LoadingSpinner />

  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} />

      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h4>${product.price}</h4>

        <Button
          variant="warning"
          onClick={() => navigate(`/edit-product/${id}`)}
        >
          Edit
        </Button>{' '}
        {/* This puts the current product into the cart context. */}
        <Button
          variant="success"
          onClick={() => {
            if (!currentUser) return navigate('/login')
            addToCart(product)
          }}
        >
          Add to Cart
        </Button>{' '}
        <Button
          variant="danger"
          onClick={() => setShowModal(true)}
        >
          Delete
        </Button>
      </div>

      <ConfirmDeleteModal
        show={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}

export default ProductDetails
