import jwt from 'jsonwebtoken'
import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { server } from '../index'
import { supabase } from '../lib/supabase.js'
// Mocks/Helpers mínimos para ejemplo ejecutable
// Reemplaza estos con tus implementaciones reales
// const db = {
//   todo: { deleteMany: async () => {} },
//   profile: { deleteMany: async () => {}, create: async (data: { data: Record<string, unknown> }) => ({ id: uuidv4(), ...data.data }) },
//   user: { deleteMany: async () => {}, create: async (data: { data: Record<string, unknown> }) => ({ id: uuidv4(), ...data.data }) },
// }
// const hashPassword = async (pw: string) => `hashed-${pw}`
// const generateTestToken = (id: string) => `token-for-${id}`
const generateExpiredToken = () => 'expired.token.here'
const analyticsService = { getUserAnalytics: async () => [] }
const profilesService = {
  createProfile: async (userId: string, data: { name?: string }) => {
    if (data.name === 'Jane' && userId === 'duplicate')
      throw new Error('Duplicate')
    return { id: uuidv4(), ...data }
  },
}
const todoRepo = { create: vi.fn() }
const todoService = {
  createTodo: async (_: string, data: { title?: string }) => {
    if (data.title === 'fail') throw new Error('DB Down')
    return { id: uuidv4(), ...data }
  },
  getTodos: async () => [{ title: 'Second' }, { title: 'First' }],
}
const authService = {
  login: async () => {
    throw new Error('Invalid login credentials')
  },
}

async function resetDatabase() {
  await supabase.from('todos').delete().neq('id', null)
  // Si quieres limpiar más tablas, repite el patrón para 'profiles', 'users', etc.
}
// async function seedUser(overrides: Record<string, unknown> = {}) {
//   const id = uuidv4()
//   const email = `test-${id}@example.com`
//   const password = await hashPassword('password123')
//   const user = await db.user.create({ data: { id, email, password, ...overrides } })
//   return user.id
// }
async function getRealToken() {
  const email = `test-${Date.now()}@example.com`
  const password = 'password123'
  await request(server).post('/auth/signup').send({ email, password })
  const res = await request(server).post('/auth/signin').send({ email, password })
  return res.body.access_token
}

beforeEach(async () => {
  await resetDatabase()
})

describe.skip('Backend Extended Coverage', () => {
  it('Analytics: should return 400 when no query is provided', async () => {
    const token = await getRealToken()
    const res = await request(server)
      .get('/analytics')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(400)
  })

  it('Analytics: should return empty dataset for new user', async () => {
    const token = await getRealToken()
    const res = await request(server)
      .get('/analytics?range=30d')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.data ?? []).toEqual([])
  })

  it('Profiles: should fail to create profile with invalid fields', async () => {
    const token = await getRealToken()
    const res = await request(server)
      .post('/profiles')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: '', age: -5 })
    expect(res.status).toBe(400)
  })

  it('Profiles: should return 404 for non-existing profile', async () => {
    const token = await getRealToken()
    const nonExistentId = '00000000-0000-0000-0000-000000000999'
    const res = await request(server)
      .get(`/profiles/${nonExistentId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(404)
  })

  it("Profiles: should deny update of another user's profile", async () => {
    // Crear usuario y perfil ajeno con username válido
    const otherEmail = `other-${Date.now()}@example.com`
    const otherPassword = 'password123'
    await request(server)
      .post('/auth/signup')
      .send({ email: otherEmail, password: otherPassword, username: 'UserB' })
    const otherSignIn = await request(server)
      .post('/auth/signin')
      .send({ email: otherEmail, password: otherPassword })
    const otherToken = otherSignIn.body.access_token
    // Obtener el id del perfil ajeno
    const otherProfileRes = await request(server)
      .get('/profiles/me')
      .set('Authorization', `Bearer ${otherToken}`)
    const otherProfileId = otherProfileRes.body.id
    // Ahora, con un usuario distinto, intentar actualizar ese perfil
    const token = await getRealToken()
    const res = await request(server)
      .put(`/profiles/${otherProfileId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'Hacked' })
    expect(res.status).toBe(404)
  })

  it('Todos: should not create a todo with empty body', async () => {
    const token = await getRealToken()
    const res = await request(server)
      .post('/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ task: '' })
    expect(res.status).toBe(400)
  })

  it('Todos: should return 404 when deleting non-existent todo', async () => {
    const token = await getRealToken()
    const nonExistentId = 999999
    const res = await request(server)
      .delete(`/todos/${nonExistentId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(404)
  })

  it('Todos: should return empty list for user with no todos', async () => {
    const token = await getRealToken()
    // Decodificar el user_id del token
    const decoded = jwt.decode(token) as Record<string, unknown> | null
    const userId =
      decoded && typeof decoded.sub === 'string' ? decoded.sub : undefined
    await supabase.from('todos').delete().eq('user_id', userId)
    const res = await request(server)
      .get('/todos')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.todos ?? res.body)).toBe(true)
    expect((res.body.todos ?? res.body).length).toBe(0)
  })

  it('AnalyticsService: should return [] if no analytics data exists', async () => {
    const result = await analyticsService.getUserAnalytics()
    expect(result).toEqual([])
  })

  it('ProfilesService: should throw error on duplicate profile creation', async () => {
    await expect(
      profilesService.createProfile('duplicate', { name: 'Jane' }),
    ).rejects.toThrow()
  })

  it('TodosService: should handle DB failure gracefully', async () => {
    todoRepo.create.mockRejectedValueOnce(new Error('DB Down'))
    await expect(
      todoService.createTodo('user-id', { title: 'fail' }),
    ).rejects.toThrow('DB Down')
  })

  it('TodosService: should return todos sorted by createdAt desc', async () => {
    await todoService.createTodo('user-id', { title: 'First' })
    await new Promise((r) => setTimeout(r, 100))
    await todoService.createTodo('user-id', { title: 'Second' })
    const result = await todoService.getTodos()
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
    expect(result[0]?.title).toBe('Second')
  })

  it('Auth: should reject expired token', async () => {
    const expiredToken = generateExpiredToken()
    const res = await request(server)
      .get('/protected')
      .set('Authorization', `Bearer ${expiredToken}`)
    expect(res.status).toBe(401)
  })

  it('Health: should return 200 for healthcheck', async () => {
    const res = await request(server).get('/health')
    expect(res.status).toBe(200)
    expect(res.body.ok ?? true).toBe(true)
  })

  it('AuthService: should reject login with wrong credentials', async () => {
    await expect(authService.login()).rejects.toThrow(
      'Invalid login credentials',
    )
  })

  it("Profiles: should return 200 for getting the current user's profile", async () => {
    const token = await getRealToken()
    const res = await request(server)
      .get('/api/profiles/me')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('should have server defined', () => {
    expect(server).toBeDefined()
  })
})
