import { v4 as uuidv4 } from 'uuid'

export async function generateUser(emailSeed: string) {
  const email = `test-${emailSeed}-${Date.now()}@example.com`
  const password = 'password123'
  const tenant_id = uuidv4()

  // Mock user generation for tests
  return {
    email,
    password,
    tenant_id,
    profile: {
      id: uuidv4(),
      email,
      tenant_id,
    },
  }
}

// Helpers para tokens (mock, si es necesario)
export function getExpiredToken() {
  return 'expired.token.here'
}
export function getInvalidToken() {
  return 'invalid.token.here'
}

export const testUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  tenant_id: 'test-tenant-id',
}
