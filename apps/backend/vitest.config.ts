/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: './vitest.setup.ts',
    envFile: '../../.env.test',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'json', 'json-summary'],
    },
  },
})
