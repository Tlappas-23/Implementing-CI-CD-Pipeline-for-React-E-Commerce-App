import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import ProductCard from '../components/ProductCard'

test('renders product info and details link', () => {
  const product = {
    id: 42,
    title: 'Test Product',
    price: 9.99,
    image: 'https://example.com/product.png'
  }

  render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>
  )

  expect(screen.getByText('Test Product')).toBeInTheDocument()
  expect(screen.getByText('$9.99')).toBeInTheDocument()

  const link = screen.getByRole('button', {
    name: /view details/i
  })
  expect(link).toHaveAttribute('href', '/products/42')
})
