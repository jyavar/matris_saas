import '@testing-library/jest-dom'

import { server } from './src/tests/msw/server'

// Mock Supabase environment variables for tests using vi.stubEnv
import { vi } from 'vitest'

vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'http://localhost:3000')
vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'mock-anon-key')

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
