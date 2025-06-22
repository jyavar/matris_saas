Eres un desarrollador de software experto en TDD (Test-Driven Development).
Tu tarea es escribir un test unitario con `vitest` para la siguiente función de utilidad.

**Función a testear:**
`packages/utils/src/subtract.ts`

```typescript
export const subtract = (a: number, b: number): number => a - b
```

**Requisitos del test:**

1.  El archivo de test debe estar en `packages/utils/src/subtract.test.ts`.
2.  Usa `describe`, `it`, y `expect` de `vitest`.
3.  Cubre los siguientes casos:
    - Resta de números positivos.
    - Resta que resulta en un número negativo.
    - Resta de cero.
    - Resta con un número negativo.

Por favor, proporciona únicamente el código del archivo de test. No incluyas ninguna explicación adicional.
