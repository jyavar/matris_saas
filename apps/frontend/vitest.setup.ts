import '@testing-library/jest-dom'

import { server } from './src/tests/msw/server'

// Mock Supabase environment variables for tests
Object.defineProperty(process.env, 'NEXT_PUBLIC_SUPABASE_URL', {
  value: 'http://localhost:3000',
  writable: true,
})
Object.defineProperty(process.env, 'NEXT_PUBLIC_SUPABASE_ANON_KEY', {
  value: 'mock-anon-key',
  writable: true,
})

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
