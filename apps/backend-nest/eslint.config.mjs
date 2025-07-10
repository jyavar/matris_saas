// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // STRATO TypeScript Standards - Progressive enforcement
      '@typescript-eslint/no-explicit-any': 'warn', // Gradual enforcement
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unsafe-argument': 'warn', // Gradual enforcement
      '@typescript-eslint/no-unsafe-assignment': 'warn', // Gradual enforcement
      '@typescript-eslint/no-unsafe-call': 'warn', // Gradual enforcement
      '@typescript-eslint/no-unsafe-member-access': 'warn', // Gradual enforcement
      '@typescript-eslint/no-unsafe-return': 'warn', // Gradual enforcement
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn', // Gradual enforcement
      '@typescript-eslint/prefer-optional-chain': 'warn', // Gradual enforcement
      '@typescript-eslint/strict-boolean-expressions': 'off', // Too strict for gradual adoption
      // Import organization
      'simple-import-sort/imports': 'warn', // Gradual enforcement
      'simple-import-sort/exports': 'warn', // Gradual enforcement
    },
  },
);