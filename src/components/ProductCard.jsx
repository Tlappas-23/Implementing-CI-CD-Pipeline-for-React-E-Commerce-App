import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

/**
 * Displays product preview card
 */
function ProductCard({ product }) {
  return (
    <Card className="product-card">
      <Card.Img
        src={product.image}
        alt={product.title}
        className="product-image"
      />
      <Card.Body>
        <Card.Title className="product-title">
          {product.title}
        </Card.Title>
        <p className="product-price">${product.price}</p>
        <Button as={Link} to={`/products/${product.id}`}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
