import { Client } from 'pg'

const PG_CONFIG = {
  host: process.env.PG_HOST || 'localhost',
  port: +(process.env.PG_PORT || 54322),
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DATABASE || 'postgres',
}

export async function resetDatabase() {
  const client = new Client(PG_CONFIG)
  await client.connect()
  // Borra datos de tablas relevantes (ajusta según tus tablas)
  await client.query(
    'TRUNCATE TABLE analytics, profiles, tenants, todos, users RESTART IDENTITY CASCADE',
  )
  await client.end()
}

export async function seedTestProfile() {
  const client = new Client(PG_CONFIG)
  await client.connect()
  const unique = Math.floor(Math.random() * 1e9)
  // Crea tenant con nombre único
  const tenantRes = await client.query(
    `INSERT INTO tenants (name, created_at) VALUES ($1, NOW()) RETURNING id`,
    [`Test Tenant ${unique}`],
  )
  const tenantId = tenantRes.rows[0].id
  // Crea usuario (ID autoincremental)
  const userRes = await client.query(
    `INSERT INTO users (email, username, created_at) VALUES ($1, $2, NOW()) RETURNING id, email`,
    [`testuser+${unique}@example.com`, `testuser_${unique}`],
  )
  const userId = userRes.rows[0].id
  // Crea perfil con el mismo ID numérico
  const profileRes = await client.query(
    `INSERT INTO profiles (id, email, full_name, tenant_id) VALUES ($1, $2, $3, $4) RETURNING id, email, tenant_id`,
    [userId, `testuser+${unique}@example.com`, 'Test User', tenantId],
  )
  await client.end()
  return {
    user: { id: userId, email: `testuser+${unique}@example.com` },
    profile: profileRes.rows[0],
    tenant: { id: tenantId },
  }
}

export function getMockedAuthHeaders(userId: string, tenantId: string) {
  return {
    'x-test-user-id': userId,
    'x-test-tenant-id': tenantId,
  }
}
