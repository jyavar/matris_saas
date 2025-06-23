import { strict as assert } from 'node:assert'
import { describe, test } from 'node:test'
import supertest from 'supertest'

import { app } from '../index.js'

describe('GET /health', () => {
  test('should respond with a 200 status code and a health message', async () => {
    const response = await supertest(app).get('/health')
    assert.strictEqual(response.status, 200)
    assert.deepStrictEqual(response.body, {
      status: 'healthy',
      message: 'STRATO Engine is running',
    })
  })
})
