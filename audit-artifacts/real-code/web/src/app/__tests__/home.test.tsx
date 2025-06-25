import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Home from '../page.js'

describe('Home page', () => {
  it('renders the main title', () => {
    render(<Home />)
    expect(
      screen.getByText(/Deploy Your Vision with STRATO Core OS/i),
    ).toBeInTheDocument()
  })

  it('renders the CTA button', () => {
    render(<Home />)
    expect(
      screen.getByRole('button', { name: /Join the Waitlist/i }),
    ).toBeInTheDocument()
  })
})
