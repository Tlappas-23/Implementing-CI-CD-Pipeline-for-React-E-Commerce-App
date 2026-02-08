import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home">
      <h1>Welcome to FakeStore</h1>
      <p className="lead">
        Browse products stored in Firebase
      </p>
      <Button as={Link} to="/products">
        View Products
      </Button>
    </div>
  )
}

export default Home
