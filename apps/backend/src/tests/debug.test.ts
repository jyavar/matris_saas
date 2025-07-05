import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { server } from '../index.js'

describe('Debug Test', () => {
  it('should test basic app setup', async () => {
    const response = await request(server).get('/health')
    
    // Siempre mostrar la respuesta para debug
    console.log('Response status:', response.status)
    console.log('Response body:', response.body)
    console.log('Response headers:', response.headers)
    
    // Por ahora solo verificamos que no sea 500
    expect(response.status).not.toBe(500)
  })
}) 