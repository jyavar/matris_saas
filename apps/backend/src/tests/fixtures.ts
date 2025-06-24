import { v4 as uuidv4 } from 'uuid'

import { supabase } from './setup'

export async function generateUser(emailSeed: string) {
  const email = `test-${emailSeed}-${Date.now()}@example.com`
  const password = 'password123'
  const tenant_id = uuidv4()

  // Crea usuario en Supabase Auth (simulado: inserta en profiles)
  const { data: profile, error } = await supabase
    .from('profiles')
    .insert({
      email,
      tenant_id,
    })
    .select()
    .single()

  if (error) throw error

  return {
    email,
    password,
    tenant_id,
    profile,
  }
}

// Helpers para tokens (mock, si es necesario)
export function getExpiredToken() {
  return 'expired.token.here'
}
export function getInvalidToken() {
  return 'invalid.token.here'
}
