import { after, before, describe, test } from 'node:test'

import { Server } from 'http'
import supertest from 'supertest'

import { app } from '../index.js'

let server: Server

before((t, done) => {
  server = app.listen(0, done) // Listen on a random free port
})

after((t, done) => {
  server.close(done)
})

describe('GET /health', () => {
  test('should respond with a 200 status code', async () => {
    await supertest(server).get('/health').expect(200)
  })
})
