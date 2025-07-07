/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@backend': resolve(__dirname, 'src'),
      '@backend/*': resolve(__dirname, 'src/*'),
    },
  },
  test: {
    environment: 'node',
    globals: true,
    setupFiles: './vitest.setup.ts',
    envFile: '../../.env.test',
    // Optimizaciones para tests unitarios rápidos
    testTimeout: 5000, // 5 segundos máximo por test
    hookTimeout: 2000, // 2 segundos máximo por hook
    teardownTimeout: 1000, // 1 segundo máximo para cleanup
    // Configuración de threads para paralelización
    threads: {
      enabled: true,
      maxThreads: 4,
      minThreads: 2,
    },
    // Configuración de coverage optimizada
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'json-summary'],
      // Excluir archivos que no necesitan coverage en tests unitarios
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/coverage/**',
        '**/*.d.ts',
        '**/vitest.setup.ts',
        '**/vitest.config.ts',
      ],
    },
    // Configuración de mocks globales
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
  },
})
