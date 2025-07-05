import { afterAll,beforeAll, describe, expect, it } from 'vitest'

import { createTestServer, testUtils } from './test-helper.js'

// Types for API responses
type ApiResponse = {
  success: boolean
  data?: unknown
  error?: string
  message?: string
  count?: number
}

type TodoData = {
  id: number
  task: string
  description?: string
  is_completed: boolean
  priority: string
  due_date?: string
  created_at: string
  updated_at: string
}

describe('Todo Controller', () => {
  const testServer = createTestServer()
  const { createTestUser, createTestTodo } = testUtils

  let authToken: string
  let testUser: ReturnType<typeof createTestUser>

  beforeAll(async () => {
    await testServer.start()
    
    // Create test user and get auth token
    testUser = createTestUser()
    await testServer.post('/api/auth/signup', testUser)
    const signInResponse = await testServer.post('/api/auth/signin', testUser)
    const signInBody = signInResponse.body as ApiResponse
    authToken = (signInBody.data as { access_token: string })?.access_token
  })

  afterAll(async () => {
    await testServer.stop()
  })

  describe('GET /api/todos', () => {
    it('should get all todos for authenticated user', async () => {
      const response = await testServer.get('/api/todos', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const body = response.body as ApiResponse

      expect(response.status).toBe(200)
      expect(body.success).toBe(true)
      expect(Array.isArray(body.data)).toBe(true)
      expect(typeof body.count).toBe('number')
    })

    it('should fail to get todos without authentication', async () => {
      const response = await testServer.get('/api/todos')
      const body = response.body as ApiResponse

      expect(response.status).toBe(401)
      expect(body.success).toBe(false)
      expect(body.error).toBe('User not authenticated')
    })
  })

  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const todoData = createTestTodo()

      const response = await testServer.post('/api/todos', todoData, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const body = response.body as ApiResponse

      expect(response.status).toBe(201)
      expect(body.success).toBe(true)
      expect(body.data).toHaveProperty('id')
      expect((body.data as TodoData)?.task).toBe(todoData.title)
      expect((body.data as TodoData)?.is_completed).toBe(todoData.completed)
    })

    it('should fail to create todo with invalid data', async () => {
      const invalidTodo = { title: '' } // Empty title should fail validation

      const response = await testServer.post('/api/todos', invalidTodo, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const body = response.body as ApiResponse

      expect(response.status).toBe(400)
      expect(body.success).toBe(false)
      expect(body.error).toBe('Invalid todo data')
    })

    it('should fail to create todo without authentication', async () => {
      const todoData = createTestTodo()

      const response = await testServer.post('/api/todos', todoData)
      const body = response.body as ApiResponse

      expect(response.status).toBe(401)
      expect(body.success).toBe(false)
      expect(body.error).toBe('User not authenticated')
    })
  })

  describe('GET /api/todos/:id', () => {
    it('should get todo by ID', async () => {
      // First create a todo
      const todoData = createTestTodo()
      const createResponse = await testServer.post('/api/todos', todoData, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const createdTodo = (createResponse.body as ApiResponse).data as TodoData

      // Then get it by ID
      const response = await testServer.get(`/api/todos/${createdTodo.id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const body = response.body as ApiResponse

      expect(response.status).toBe(200)
      expect(body.success).toBe(true)
      expect((body.data as TodoData)?.id).toBe(createdTodo.id)
      expect((body.data as TodoData)?.task).toBe(todoData.title)
    })

    it('should return 404 for non-existent todo', async () => {
      const response = await testServer.get('/api/todos/999999', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const body = response.body as ApiResponse

      expect(response.status).toBe(404)
      expect(body.success).toBe(false)
      expect(body.error).toBe('Todo not found')
    })
  })

  describe('PUT /api/todos/:id', () => {
    it('should update todo', async () => {
      // First create a todo
      const todoData = createTestTodo()
      const createResponse = await testServer.post('/api/todos', todoData, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const createdTodo = (createResponse.body as ApiResponse).data as TodoData

      // Then update it
      const updateData = {
        title: 'Updated Todo Title',
        completed: true,
        priority: 'high'
      }

      const response = await testServer.put(`/api/todos/${createdTodo.id}`, updateData, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const body = response.body as ApiResponse

      expect(response.status).toBe(200)
      expect(body.success).toBe(true)
      expect((body.data as TodoData)?.task).toBe(updateData.title)
      expect((body.data as TodoData)?.is_completed).toBe(updateData.completed)
      expect((body.data as TodoData)?.priority).toBe(updateData.priority)
    })

    it('should fail to update non-existent todo', async () => {
      const updateData = { title: 'Updated Title' }

      const response = await testServer.put('/api/todos/999999', updateData, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const body = response.body as ApiResponse

      expect(response.status).toBe(404)
      expect(body.success).toBe(false)
      expect(body.error).toBe('Todo not found')
    })
  })

  describe('DELETE /api/todos/:id', () => {
    it('should delete todo', async () => {
      // First create a todo
      const todoData = createTestTodo()
      const createResponse = await testServer.post('/api/todos', todoData, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const createdTodo = (createResponse.body as ApiResponse).data as TodoData

      // Then delete it
      const response = await testServer.delete(`/api/todos/${createdTodo.id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const body = response.body as ApiResponse

      expect(response.status).toBe(200)
      expect(body.success).toBe(true)
      expect(body.message).toBe('Todo deleted successfully')
    })

    it('should fail to delete non-existent todo', async () => {
      const response = await testServer.delete('/api/todos/999999', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const body = response.body as ApiResponse

      expect(response.status).toBe(404)
      expect(body.success).toBe(false)
      expect(body.error).toBe('Todo not found')
    })
  })
}) 