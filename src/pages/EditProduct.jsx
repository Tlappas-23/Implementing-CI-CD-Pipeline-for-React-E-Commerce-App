import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { getProductById, updateProduct } from '../api/products'

function EditProduct() {
  const { id } = useParams()
  const [form, setForm] = useState({})
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    getProductById(id).then(data => setForm(data))
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Updating the Firestore product doc with the edited fields.
    await updateProduct(id, form)
    setSuccess(true)
  }

  return (
    <div className="form-page">
      <h2>Edit Product</h2>

      {success && (
        <Alert variant="success">
          Product updated successfully (mock API)
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Control
          value={form.title || ''}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <Form.Control
          className="mt-2"
          value={form.price || ''}
          onChange={e => setForm({ ...form, price: e.target.value })}
        />
        <Form.Control
          className="mt-2"
          value={form.description || ''}
          onChange={e =>
            setForm({ ...form, description: e.target.value })
          }
        />
        <Form.Control
          className="mt-2"
          value={form.category || ''}
          onChange={e =>
            setForm({ ...form, category: e.target.value })
          }
        />
        <Form.Control
          className="mt-2"
          value={form.image || ''}
          onChange={e =>
            setForm({ ...form, image: e.target.value })
          }
        />
        <Button className="mt-3" type="submit">
          Update
        </Button>
      </Form>
    </div>
  )
}

export default EditProduct
