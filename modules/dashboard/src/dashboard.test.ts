import { describe, expect, it } from 'vitest'

import { getDashboardWelcomeMessage } from './index'

describe('Dashboard Module', () => {
  it('should return a welcome message', () => {
    const message = getDashboardWelcomeMessage()
    expect(message).toBe('Welcome to the Dashboard Module!')
  })
})
