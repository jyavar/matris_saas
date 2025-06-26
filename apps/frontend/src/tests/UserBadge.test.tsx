import { render, screen } from '@testing-library/react'

import UserBadge from '../components/ui/UserBadge.js'

describe('UserBadge', () => {
  it('renderiza correctamente con props mínimas', () => {
    render(<UserBadge username="janedoe" status="online" />)
    expect(screen.getByText('janedoe')).toBeInTheDocument()
    expect(screen.getByText('online')).toBeInTheDocument()
  })
})
