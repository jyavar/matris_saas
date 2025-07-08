module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'simple-import-sort/imports': 'off', // Deshabilitado temporalmente
    'simple-import-sort/exports': 'off', // Deshabilitado temporalmente
    '@typescript-eslint/no-unused-vars': 'off', // Deshabilitado temporalmente
    '@typescript-eslint/no-explicit-any': 'off', // Deshabilitado temporalmente
    '@typescript-eslint/no-unsafe-function-type': 'off', // Deshabilitado temporalmente
  },
  ignorePatterns: [
    'src/tests/',
    'src/services/__tests__/',
    'vitest.setup.ts',
    '**/*.test.ts',
    '**/*.spec.ts',
    '**/*.test.tsx',
    '**/*.spec.tsx'
  ]
}; 