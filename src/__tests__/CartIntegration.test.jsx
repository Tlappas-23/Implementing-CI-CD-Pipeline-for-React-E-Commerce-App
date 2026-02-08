import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CartProvider, useCart } from '../contexts/CartContext'

const product = {
  id: 'sku-123',
  title: 'Integration Product',
  price: 12.5,
  image: 'https://example.com/cart.png'
}

function AddProductButton() {
  const { addToCart } = useCart()

  return (
    <button type="button" onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  )
}

function CartCount() {
  const { items } = useCart()
  return <p>Cart Items: {items.length}</p>
}

test('updates cart when a product is added', async () => {
  localStorage.clear()

  const user = userEvent.setup()

  render(
    <CartProvider>
      <AddProductButton />
      <CartCount />
    </CartProvider>
  )

  expect(screen.getByText('Cart Items: 0')).toBeInTheDocument()

  await user.click(
    screen.getByRole('button', { name: /add to cart/i })
  )

  expect(screen.getByText('Cart Items: 1')).toBeInTheDocument()
})
