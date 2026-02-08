import { render } from '@testing-library/react'

import LoadingSpinner from '../components/LoadingSpinner'

test('renders a loading spinner', () => {
  const { container } = render(<LoadingSpinner />)

  expect(container.querySelector('.spinner-border')).toBeInTheDocument()
})
