# Ejemplo de Feature: Añadir Función de Suma

> Este es un ejemplo de cómo usar la plantilla para una tarea simple.

---

### **[Contexto]**

- **Objetivo General:** Necesitamos una función de utilidad básica y reutilizable que pueda sumar dos números. Es una función puramente matemática.
- **Ubicación del Código:** En el paquete `@strato-core/utils`, dentro de la carpeta `packages/utils/src/`.
- **Requerimientos No Funcionales:** La función debe ser pura (sin efectos secundarios) y no debe tener dependencias externas.
- **Filosofía STRATO a Aplicar:** Cero `any`, tipado estricto para argumentos y valor de retorno.

---

### **[Instrucciones Claras]**

1.  **Crear Archivo `packages/utils/src/add.ts`:**

    - Crea una función exportada llamada `add`.
    - La función debe aceptar dos argumentos: `a` y `b`.
    - Ambos argumentos deben ser de tipo `number`.
    - La función debe retornar un valor de tipo `number`.
    - La lógica debe ser `return a + b;`.
    - Añade un comentario JSDoc explicando lo que hace la función, sus parámetros y lo que retorna.

2.  **Crear Archivo `packages/utils/src/add.test.ts`:**
    - Importa la función `add` y las utilidades `describe`, `it`, `expect` de `vitest`.
    - Crea una suite de tests con `describe('add function', ...)`
    - Añade casos de prueba (`it(...)`) para:
      - Suma de dos números positivos.
      - Suma de un número positivo y uno negativo.
      - Suma de un número y su inverso (debe dar cero).
      - Suma con cero.

---

### **[Resultado Esperado]**

- [x] Un nuevo archivo `packages/utils/src/add.ts` con el contenido especificado.
- [x] Un nuevo archivo `packages/utils/src/add.test.ts` que cubre todos los casos mencionados.
- [x] Todo el código nuevo debe pasar las validaciones de `eslint`, `prettier` y `tsc --noEmit`.
- [x] Todos los tests deben pasar al ejecutar `npm test`.

---

### **[Commit Sugerido]**

```
feat(utils): add number addition function with tests
```
