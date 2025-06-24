import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '../index.js'

describe('Auth Controller', () => {
  const tenantId = '00000000-0000-0000-0000-000000000001'
  const userCredentials = {
    email: `test-${Date.now()}@example.com`,
    password: 'password123',
    tenant_id: tenantId,
  }

  it('should sign up a new user', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send(userCredentials)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.email).toBe(userCredentials.email)
  })

  it('should sign in the user and return an access token', async () => {
    // First, ensure the user is created
    await request(app).post('/auth/signup').send(userCredentials)

    const response = await request(app)
      .post('/auth/signin')
      .send(userCredentials)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('access_token')
    expect(response.body).toHaveProperty('user')
    expect(response.body.user.email).toBe(userCredentials.email)
  })

  it('should fail to sign in with wrong password', async () => {
    const response = await request(app)
      .post('/auth/signin')
      .send({ email: userCredentials.email, password: 'wrongpassword' })

    expect(response.status).toBe(401)
  })

  it('should fail to access protected route without a token', async () => {
    const response = await request(app).get('/profiles/me')
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('No authentication token provided.')
  })

  it('should access protected route with a valid token', async () => {
    // Sign in to get the token
    await request(app).post('/auth/signup').send(userCredentials)
    const signInResponse = await request(app)
      .post('/auth/signin')
      .send(userCredentials)

    const token = signInResponse.body.access_token
    const response = await request(app)
      .get('/profiles/me')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body.email).toBe(userCredentials.email)
  })
})
