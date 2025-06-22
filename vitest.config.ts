/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: './vitest.setup.ts',
    exclude: [
      ...configDefaults.exclude,
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      'frontend/tests-e2e/**',
    ],
  },
  resolve: {
    alias: {
      // No tenemos alias por ahora, pero la estructura está lista.
    },
  },
  plugins: [react(), tsconfigPaths()],
})
