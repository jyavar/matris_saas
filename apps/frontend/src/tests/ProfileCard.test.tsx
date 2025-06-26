import { render, screen } from '@testing-library/react'

import ProfileCard from '../components/ui/ProfileCard.js'

describe('ProfileCard', () => {
  it('renderiza correctamente con props mínimas', () => {
    render(
      <ProfileCard
        username="janedoe"
        fullName="Jane Doe"
        avatarUrl="/avatar.jpg"
      />,
    )
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('@janedoe')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', '/avatar.jpg')
  })
})
