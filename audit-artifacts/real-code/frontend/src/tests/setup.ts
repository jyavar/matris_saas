// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

import fetch, { Headers, Request, Response } from 'node-fetch'

import { server } from './mocks/server.js'

if (!globalThis.fetch) {
  // @ts-expect-error: node-fetch no es exactamente igual a fetch de browser, pero es suficiente para tests
  globalThis.fetch = fetch
  // @ts-expect-error: node-fetch Headers no es exactamente igual a Headers de browser
  globalThis.Headers = Headers
  // @ts-expect-error: node-fetch Request no es exactamente igual a Request de browser
  globalThis.Request = Request
  // @ts-expect-error: node-fetch Response no es exactamente igual a Response de browser
  globalThis.Response = Response
}

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
