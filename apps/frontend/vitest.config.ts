import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'json', 'json-summary'],
    },
  },
})
