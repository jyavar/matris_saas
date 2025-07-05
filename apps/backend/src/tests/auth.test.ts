import { afterAll,beforeAll, describe, expect, it } from 'vitest'

import { createTestServer, testUtils } from './test-helper.js'

// Type for API responses
type ApiResponse = {
  success: boolean
  data?: unknown
  error?: string
  message?: string
}

// Type for user data
type UserData = {
  id: string
  email: string
  tenant_id: string
}

// Type for auth response data
type AuthResponseData = {
  access_token: string
  user: UserData
}

describe('Auth Controller', () => {
  const testServer = createTestServer()
  const { createTestUser } = testUtils

  beforeAll(async () => {
    await testServer.start()
  })

  afterAll(async () => {
    await testServer.stop()
  })

  it('should sign up a new user', async () => {
    const userData = createTestUser()

    const response = await testServer.post('/api/auth/signup', userData)
    const body = response.body as ApiResponse

    expect(response.status).toBe(201)
    expect(body.success).toBe(true)
    expect(body.data).toHaveProperty('id')
    expect((body.data as UserData)?.email).toBe(userData.email)
  })

  it('should sign in the user and return an access token', async () => {
    const userData = createTestUser()

    // First, ensure the user is created
    await testServer.post('/api/auth/signup', userData)

    const response = await testServer.post('/api/auth/signin', userData)
    const body = response.body as ApiResponse

    expect(response.status).toBe(200)
    expect(body.success).toBe(true)
    expect(body.data).toHaveProperty('access_token')
    expect(body.data).toHaveProperty('user')
    expect((body.data as AuthResponseData)?.user?.email).toBe(userData.email)
  })

  it('should fail to sign in with wrong password', async () => {
    const userData = createTestUser()
    
    // Create user first
    await testServer.post('/api/auth/signup', userData)

    const response = await testServer.post('/api/auth/signin', {
      email: userData.email,
      password: 'wrongpassword'
    })
    const body = response.body as ApiResponse

    expect(response.status).toBe(401)
    expect(body.success).toBe(false)
  })

  it('should fail to access protected route without a token', async () => {
    const response = await testServer.get('/api/profiles/me')
    const body = response.body as ApiResponse
    
    expect(response.status).toBe(401)
    expect(body.success).toBe(false)
    expect(body.error).toBe('No authentication token provided.')
  })

  it('should access protected route with a valid token', async () => {
    const userData = createTestUser()

    // Sign up and sign in to get the token
    await testServer.post('/api/auth/signup', userData)
    const signInResponse = await testServer.post('/api/auth/signin', userData)
    const signInBody = signInResponse.body as ApiResponse

    const token = (signInBody.data as AuthResponseData)?.access_token
    const response = await testServer.get('/api/profiles/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    const body = response.body as ApiResponse

    expect(response.status).toBe(200)
    expect(body.success).toBe(true)
    expect(body.data).toHaveProperty('id')
    expect((body.data as UserData)?.email).toBe(userData.email)
  })
})
