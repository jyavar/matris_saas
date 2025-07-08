import '@testing-library/jest-dom'

import { server } from './src/tests/msw/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
