# PROMPT: Feature - TODO List en Dashboard

## 1. Contexto

**Objetivo:** Implementar una funcionalidad básica de "TODO List" dentro del módulo `dashboard`. Esta será la primera feature real construida siguiendo el Playbook STRATO y servirá como prueba de fuego para nuestro flujo de trabajo.

**Módulo Afectado:** `modules/dashboard`

**Principios a Demostrar:**

- Desarrollo guiado por tests (TDD).
- Componentes funcionales sin estado (en lo posible).
- Tipado estricto en todo el flujo (estado, props, eventos).
- Cero deuda técnica: sin `any`, `console.log` o atajos.

## 2. Instrucciones de Implementación

### Fase 1: Estructura y Tipos

1.  **Crear Archivos:**

    - `modules/dashboard/src/components/TodoList.tsx`
    - `modules/dashboard/src/components/TodoItem.tsx`
    - `modules/dashboard/src/hooks/useTodos.ts`
    - `modules/dashboard/src/tests/useTodos.test.ts`

2.  **Definir Tipos (en `TodoList.tsx` por ahora):**
    - Crear una interfaz `Todo`
      ```typescript
      interface Todo {
        id: number
        text: string
        completed: boolean
      }
      ```

### Fase 2: Lógica de Estado (el Hook `useTodos`)

1.  **Crear el hook `useTodos` en `modules/dashboard/src/hooks/useTodos.ts`:**
    - Debe manejar un estado interno `todos`, que será un `Todo[]`.
    - Inicializar con 2-3 todos de ejemplo.
    - Debe exponer las siguientes funciones:
      - `addTodo(text: string)`: Añade un nuevo `Todo` (con `completed: false`).
      - `toggleTodo(id: number)`: Cambia el estado `completed` de un `Todo`.
      - `removeTodo(id: number)`: Elimina un `Todo` de la lista.

### Fase 3: Tests para el Hook (TDD)

1.  **Escribir tests en `modules/dashboard/src/tests/useTodos.test.ts` ANTES de implementar la UI:**
    - Test para `addTodo`: verificar que el nuevo todo se añade a la lista.
    - Test para `toggleTodo`: verificar que el estado `completed` cambia correctamente.
    - Test para `removeTodo`: verificar que el todo se elimina de la lista.
    - Usar `vitest` y `@testing-library/react`.

### Fase 4: Componentes de UI

1.  **Componente `TodoItem.tsx`:**

    - Recibe un `todo: Todo` y las funciones `toggleTodo` y `removeTodo` como props.
    - Muestra el texto del todo. Tachar el texto si `todo.completed` es `true`.
    - Tendrá un `checkbox` para llamar a `toggleTodo`.
    - Tendrá un `botón` para llamar a `removeTodo`.

2.  **Componente `TodoList.tsx`:**
    - Usará el hook `useTodos()` para obtener la lista y las funciones.
    - Tendrá un `input` de texto y un `botón` "Add" para llamar a `addTodo`.
    - Renderizará una lista de componentes `TodoItem`, pasando los props necesarios.

### Fase 5: Integración

1.  **Modificar `modules/dashboard/src/index.tsx`:**
    - Importar y renderizar el componente `TodoList`.

## 3. Resultado Esperado

- Una lista de TODOs funcional en el módulo `dashboard`.
- El 100% de la lógica del hook `useTodos` debe estar cubierta por tests.
- El código debe pasar el `@preflight-check` (lint, tsc, test) sin errores.
- Al final, el módulo `dashboard` debe pasar la auditoría `@audit:module`.

## 4. Commit Esperado

**`feat(dashboard): implement todo list functionality`**

- Implements a fully tested TODO list feature.
- Adds `useTodos` hook for state management with full test coverage.
- Creates `TodoList` and `TodoItem` components for the UI.
- Follows STRATO playbook guidelines for type safety and code quality.
