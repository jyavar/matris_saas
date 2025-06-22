# **PLAYBOOK STRATO – FUNDADOR SOLO 10/10™**

Este es un documento maestro que funcionará como:

- Guía de inicio limpio para cualquier clon SaaS
- Blindaje estructural desde el minuto 1
- Escudo contra deuda técnica, errores invisibles y caos arquitectónico
- Manual operativo para ti, agentes AI y cualquier desarrollador que se sume

---

## **SECCIÓN 1 – Setup Base Blindado**

Esto se ejecuta **antes de escribir una sola línea de código** para garantizar que cada proyecto nace sobre una fundación sólida y a prueba de errores.

1.  **Crear repo nuevo con plantilla STRATO Core OS™:**

    - Monorepo con `frontend/`, `backend/`, `agent/`, `scripts/`, `packages/`.
    - `tsconfig.base.json` con `strict: true`, `noImplicitAny: true`, `exactOptionalPropertyTypes: true`.
    - ESLint y Prettier con reglas STRATO (`no-console`, `no-any`, `sort-imports`, `max-lines-per-file`).
    - `.gitignore` robusto.

2.  **Instalar defensas automáticas:**

    - `Husky`, `lint-staged`, `commitlint` para blindar cada `commit`.
    - `prettier-plugin-organize-imports` para ordenamiento automático.
    - Scripts de validación: `scripts/validate-repo.ts`, `scripts/run-all-tests.ts`, `scripts/check-blindaje-real.ts`.

3.  **Configurar CI/CD desde el inicio:**

    - GitHub Actions con validación en cada `push` y `PR`: `lint`, `tsc`, `test`.
    - Workflows por cada `workspace` (`/frontend`, `/backend`, `/agent`).

4.  **Conexiones core:**
    - Conexión a servicios como Supabase, Stripe, Resend con tipado estricto desde el día cero.
    - `scripts/validate-env.ts` como guardia para asegurar que todas las variables necesarias están presentes en el entorno de desarrollo.

---

### **Variables de Entorno (.env)**

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=

# Resend (Email)
RESEND_API_KEY=

# Other
DATABASE_URL=
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## **SECCIÓN 2 – Guardias Técnicos Activos**

Estos son los guardianes que protegen activamente el código en cada etapa del ciclo de vida del desarrollo.

1.  **Defensa Pre-commit:**

    - **Tecnología:** `Husky` + `lint-staged`.
    - **Misión:** Bloquear cualquier commit que intente introducir código que no cumpla con las reglas STRATO.
    - **Checks Activos:**
      - `Prettier`: Formatea el código automáticamente.
      - `ESLint`: Impide commits con `console.log`, `any`, imports sin ordenar o cualquier otro error de linting.
    - **Estado:** Activo y verificado en combate.

2.  **Capa de Tests en CI/CD:**

    - **Tecnología:** `GitHub Actions` + `Vitest`.
    - **Misión:** Ejecutar toda la suite de tests unitarios en cada `push` y `PR` a `main`.
    - **Checks Activos:** Un `merge` a `main` es imposible si un test falla.
    - **Estado:** Activo. El job `test` ejecuta `npm test` y valida la lógica de negocio.

3.  **Runtime Defense System™:**

    - **Tecnología:** Scripts de `Node.js/TypeScript` ejecutados con `tsx`.
    - **Misión:** Proveer un sistema de auditoría continua sobre la salud y arquitectura del proyecto.
    - **Artefactos:** Todos los logs y reportes se centralizan en la carpeta `audit-artifacts/`.
    - **Guardianes Desplegados (Placeholders):**
      - `scripts/angel-vigilante.ts`: Futuro guardián de la integridad arquitectónica.
      - `scripts/validate-test-templates.ts`: Futuro guardián de la calidad y cobertura de los tests.
      - `scripts/report-strato-defense.ts`: Genera un reporte del estado de las defensas.
    - **Estado:** Infraestructura y scripts base creados.

4.  **Autofix Agents:**
    - **Tecnología:** `npm scripts`.
    - **Misión:** Proveer atajos para tareas comunes y futuras integraciones con IA.
    - **Agentes Disponibles:**
      - `npm run @fixmasivo`: Formatea y corrige errores de linting en todo el proyecto.
      - `npm run @report:defense`: Ejecuta el script de reporte de defensas.
      - `@qa`, `@ux`, `@data`, `@refactor`: Placeholders para futuros agentes de IA.
    - **Estado:** Activos y listos para usar.

---

## **SECCIÓN 3 – Estrategia Modular Clonable**

El objetivo de STRATO Core OS no es ser un monolito, sino una "fábrica de SaaS". Esta sección define cómo creamos nuevos proyectos de forma rápida, segura y consistente.

1.  **Filosofía de Módulos Activables:**

    - **Concepto:** Las funcionalidades no core (dashboard, billing, etc.) no viven en el proyecto principal. Residen en la carpeta `/modules` como plantillas autocontenidas y listas para ser activadas.
    - **Estructura de un Módulo:** Cada módulo en `/modules` debe ser un paquete independiente con su propio `package.json`, código fuente en `/src` y, fundamentalmente, sus propios tests. Un módulo sin tests es un módulo inválido.
    - **Propósito:** Evitar el "bloatware" en la plantilla base. Cada nuevo SaaS empieza siendo minimalista y solo activa la funcionalidad que necesita.

2.  **El Clonador STRATO (`@clone:saas`):**
    - **Tecnología:** Un script interactivo (`scripts/create-saas-clone.ts`) que orquesta la creación de nuevos proyectos.
    - **Comando:** `npm run @clone:saas`
    - **Funcionamiento:**
      1.  El script te pide un nombre para tu nuevo proyecto.
      2.  Te presenta una lista de todos los módulos disponibles en la carpeta `/modules`.
      3.  Clona la estructura completa y limpia de STRATO Core OS en un nuevo directorio.
      4.  Copia los módulos que seleccionaste a la carpeta `/packages` del nuevo proyecto.
      5.  Actualiza automáticamente el `package.json` del clon para incluir los nuevos módulos en los `workspaces` del monorepo.
    - **Resultado:** En menos de un minuto, tienes un nuevo repositorio, configurado, con sus defensas activas y con los módulos de funcionalidad que elegiste, listo para empezar a desarrollar.

---

## **SECCIÓN 4 – Flujo Real de Desarrollo AI-Assistido**

Esta sección define el "cómo": el proceso diario y las reglas inquebrantables para escribir código dentro del ecosistema STRATO.

1.  **Estrategia "Prompt a Prompt" (Paso a Paso):**
    - **Principio:** No se le pide a una IA "haz una feature". Se le dan instrucciones atómicas y verificables.
    - **Proceso:**
        1.  Copia `prompts/template-feature.md` a un nuevo archivo (ej: `prompts/nombre-feature.md`).
        2.  Rellena cada sección con el máximo detalle. Sé explícito sobre la ubicación, los tipos, la lógica y los casos de test.
        3.  Usa estas instrucciones para guiar a tu asistente de IA (Cursor, Copilot, etc.).
    - **Repositorio de Prompts:** La carpeta `/prompts` actúa como un registro de arquitectura. Al verla, cualquiera puede entender qué se ha construido y con qué especificaciones.

2.  **La Regla de Oro: El "Preflight Check"**
    - **Comando:** `npm run @preflight-check`
    - **Misión:** Este comando es el guardián final antes de que tu código intente integrarse con la base principal. Ejecuta las validaciones de `linting`, `type-checking` y `tests` en secuencia.
    - **Regla Inquebrantable:** **NUNCA** se debe hacer `git push` a una rama si `@preflight-check` no pasa con un 100% de éxito. No hay excusas. No hay "lo arreglo después".

3.  **Exploración vs. Producción (Gestión de Ramas):**
    - **`feat/nombre-experimento`:** Ramas para exploración, pruebas y desarrollo de nuevas funcionalidades. Aquí es donde vives el 99% del tiempo.
    - **`main`:** Rama sagrada. Representa el código estable y validado.
    - **Proceso de Merge:** Absolutamente ningún código se fusiona a `main` sin haber pasado el `@preflight-check` y una revisión (aunque sea por ti mismo o un agente AI) vía Pull Request.
