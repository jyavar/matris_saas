import { vi } from 'vitest'

export const authMiddlewareMock = vi.fn().mockImplementation((req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.replace('Bearer ', '')
  if (!token || token === 'invalid' || token === 'undefined') {
    return res.status(401).json({ message: 'No authentication token provided.', error: 'Unauthorized' })
  }
  req.user = { id: 'test-user-id', email: 'test@example.com', tenant_id: 'test-tenant' }
  next()
}) 