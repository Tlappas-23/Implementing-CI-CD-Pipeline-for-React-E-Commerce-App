import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { createProduct } from '../api/products'

function AddProduct() {
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  })
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // This now writes to Firestore instead of the FakeStore API.
    await createProduct(form)
    setSuccess(true)
  }

  return (
    <div className="form-page">
      <h2>Add Product</h2>

      {success && (
        <Alert variant="success">
          Product created successfully
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Control
          placeholder="Title"
          required
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <Form.Control
          className="mt-2"
          placeholder="Price"
          type="number"
          required
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
        />
        <Form.Control
          className="mt-2"
          placeholder="Description"
          required
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <Form.Control
          className="mt-2"
          placeholder="Category"
          required
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
        <Form.Control
          className="mt-2"
          placeholder="Image URL"
          required
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
        />
        <Button className="mt-3" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default AddProduct
