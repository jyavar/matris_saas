import '@testing-library/jest-dom'
import { vi, beforeAll, afterEach, afterAll } from 'vitest'

import { server } from './src/tests/msw/server'

// Load test environment variables
vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://test.supabase.co')
vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0')
vi.stubEnv('STRIPE_PUBLISHABLE_KEY', 'pk_test_51234567890abcdef')
vi.stubEnv('NEXT_PUBLIC_POSTHOG_KEY', 'phc_test_1234567890abcdef')
vi.stubEnv('NEXT_PUBLIC_POSTHOG_HOST', 'https://app.posthog.com')

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
