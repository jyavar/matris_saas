import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: [],
    testTimeout: 10000,
    hookTimeout: 5000,
    teardownTimeout: 2000,
    threads: {
      enabled: true,
      maxThreads: 2,
      minThreads: 1,
    },
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'json'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/coverage/**',
        '**/*.d.ts',
        '**/vitest.config.ts',
        '**/tsconfig.json',
        '**/package.json'
      ],
    },
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
  },
}) 