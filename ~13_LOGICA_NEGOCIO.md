# ~13_LOGICA_NEGOCIO.md

## MEMORIA VIVA – LÓGICA DE NEGOCIO & CONTEXTO STRATO SAFE STACK™

> Este documento es la fuente de verdad viva para la lógica de negocio, arquitectura, convenciones, decisiones clave y estado real del monorepo. Debe mantenerse actualizado junto al Checklist Maestro (~12_CHECKLIST_MAESTRO.md), las Reglas de Oro (~14_REGLAS_DE_ORO.md) y ser leído por todo colaborador, IA o humano, antes de trabajar en el repo.

---

## Índice
- [x] 1. Propósito y Alcance
- [x] 2. Estructura del Documento
- [ ] 3. Convenciones y Arquitectura Global
- [ ] 4. Estado y Lógica de Cada Módulo Crítico
- [ ] 5. Workarounds y Decisiones Temporales
- [ ] 6. Integraciones Externas y Dependencias Clave
- [ ] 7. Flujos de Usuario y Ejemplos de Uso
- [ ] 8. Checklist de Actualización Diaria/Sprint
- [ ] 9. Referencias Cruzadas al Checklist Maestro y otros docs
- [ ] 10. Estructura de Carpetas y Subcarpetas Principal
- [ ] 11. Recomendaciones Elite para una Lógica de Negocio Sólida
- [ ] 12. Infraestructura y Carpetas Técnicas
- [ ] 13. Historial de Actualizaciones

---

## 1. PROPÓSITO Y ALCANCE
- Centralizar el conocimiento crítico del proyecto.
- Evitar pérdida de contexto entre sesiones, cambios de equipo o IA.
- Facilitar onboarding, auditoría, escalabilidad y continuidad.
- Servir como guía para founders no técnicos y para IA colaborativa.

---

## 2. ESTRUCTURA DEL DOCUMENTO
- [x] **Resumen ejecutivo y visión de negocio**
- [ ] **Convenciones y arquitectura global**
- [ ] **Estado y lógica de cada módulo crítico**
- [ ] **Workarounds y decisiones temporales**
- [ ] **Integraciones externas y dependencias clave**
- [ ] **Flujos de usuario y ejemplos de uso**
- [ ] **Checklist de actualización diaria/sprint**
- [ ] **Referencias cruzadas al Checklist Maestro y otros docs**

---

## 3. CONVENCIONES Y ARQUITECTURA GLOBAL
- **Estructura de carpetas:**
  - `/apps/backend/`, `/apps/frontend/`, `/apps/web/`, `/packages/`, `/scripts/`, etc.
- **Convenciones de nombres:**
  - Rutas, controladores, servicios, tests, etc.
- **Patrones de modularidad:**
  - Ej: Cada feature tiene su carpeta en `/routes`, `/services`, `/controllers`.
- **Stack tecnológico:**
  - Node.js, TypeScript, Next.js, Express, Supabase, Stripe, Resend, OpenAI, PostHog, Vitest, etc.
- **CI/CD y automatización:**
  - [Describe aquí los pipelines, scripts y convenciones de deploy.]
- **Naming conventions:**
  - [Ejemplo: archivos de test terminan en `.test.ts`, componentes en `.tsx`, rutas en `route.ts`]
- **Estrategia de ramas y Git:**
  - [Describe aquí la convención de ramas, PR, squash, etc.]

---

## 4. ESTADO Y LÓGICA DE CADA MÓDULO CRÍTICO

| Módulo      | Estado      | Archivo principal         | Workaround | Fecha revisión |
|-------------|-------------|--------------------------|------------|---------------|
| Auth        | ✅ Validado | auth.service.ts          | ⚠️ tenant_id test | 2024-06-25    |
| Profiles    | ✅ Validado | profiles.controller.ts   |            | 2024-06-25    |
| Billing     | [ ]         | billing.service.ts       | [ ]        |               |
| OpenAI      | [ ]         | openai.service.ts        | [ ]        |               |
| Resend      | [ ]         | resend.service.ts        | [ ]        |               |
| PostHog     | [ ]         | posthog.service.ts       | [ ]        |               |
| Frontend    | [ ]         | /components/ui/          | [ ]        |               |
| Tests       | [ ]         | tests/                   | [ ]        |               |
| SEO         | [ ]         | next-seo.config.ts       | [ ]        |               |

- Para cada módulo, documentar: propósito, estado, convenciones, archivos clave, dependencias, workarounds y condiciones de eliminación.

---

## 5. WORKAROUNDS Y DECISIONES TEMPORALES

| Motivo                | Fecha       | Archivo/s afectado/s         | Condición de eliminación |
|-----------------------|-------------|------------------------------|-------------------------|
|                       |             |                              |                         |

- Consolida aquí todos los workarounds activos desde `~11_LOCAL_WORKAROUNDS.md`.

---

## 6. INTEGRACIONES EXTERNAS Y DEPENDENCIAS CLAVE
- [Describe aquí el estado y convenciones de Resend, OpenAI, PostHog, Supabase, Stripe, etc.]
- [Incluye archivos clave y dependencias.]

---

## 7. FLUJOS DE USUARIO Y EJEMPLOS DE USO

### Signup
- **Endpoint:** POST /api/auth/signup
- **Payload:** `{ email, password }`
- **Respuesta esperada:** 201 Created, userId
- **Errores comunes:** 409 Email ya registrado

### Login
- ...

### Upgrade
- ...

### Cancelación
- ...

- Para cada flujo, documentar rutas, payloads, estado esperado y errores comunes.

---

## 8. CHECKLIST DE ACTUALIZACIÓN DIARIA/SPRINT
- [ ] ¿Se actualizó este archivo tras cada avance relevante?
- [ ] ¿Se revisó el Checklist Maestro?
- [ ] ¿Se documentaron nuevos workarounds o decisiones?
- [ ] ¿Se actualizaron referencias cruzadas?

### Historial de Actualizaciones
| Fecha       | Responsable | Cambio realizado                |
|-------------|-------------|---------------------------------|
| 2025-06-24  | José        | Estructura inicial y convención |

---

## 9. REFERENCIAS CRUZADAS
- **Checklist Maestro:** `~12_CHECKLIST_MAESTRO.md`
- **Reglas de Oro:** `~14_REGLAS_DE_ORO.md`
- **Scorecard:** `~8_SCORECARD.md`
- **Playbook:** `~5_PLAYBOOK.md`
- **Workarounds:** `~11_LOCAL_WORKAROUNDS.md`
- **Roadmaps:** `~1_BACKEND_ROADMAP.md`, `~3_MATRIX_ROADMAP.md`, etc.

---

## 10. ESTRUCTURA DE CARPETAS Y SUBCARPETAS PRINCIPAL

```
/ (raíz)
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── lib/
│   │   │   ├── middleware/
│   │   │   ├── routes/
│   │   │   │   ├── router.ts
│   │   │   │   ├── dev.routes.ts
│   │   │   │   ├── profiles.routes.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── analytics.routes.ts
│   │   │   │   ├── todo.routes.ts
│   │   │   │   ├── health.routes.ts
│   │   │   ├── services/
│   │   │   ├── tests/
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   └── index.ts, start.ts
│   │   └── package.json, tsconfig.json, ...
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   ├── components/
│   │   │   │   ├── auth/
│   │   │   │   ├── ui/
│   │   │   │   ├── analytics/
│   │   │   │   ├── users/
│   │   │   │   ├── TodoItem.tsx, TodoList.tsx
│   │   │   ├── contexts/
│   │   │   ├── hooks/
│   │   │   ├── lib/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── tests/
│   │   │   └── main.tsx, App.tsx
│   │   └── package.json, tsconfig.json, ...
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── __tests__/
│   │   │   │   ├── api/
│   │   │   │   ├── control-tower/
│   │   │   │   ├── page.tsx, layout.tsx, globals.css
│   │   │   ├── components/
│   │   │   ├── lib/
│   │   │   └── package.json, tsconfig.json, ...
├── packages/
│   ├── utils/
│   │   ├── src/
│   │   ├── tests/
│   ├── db-types/
│   ├── eslint-config/
│   ├── typescript-config/
├── scripts/
├── audit-artifacts/
├── supabase/
├── logs/
├── test-results/
├── prompts/
├── modules/
├── .github/
├── .husky/
├── .turbo/
├── .idea/
├── .tmp-scripts/
├── ~12_CHECKLIST_MAESTRO.md
├── ~13_LOGICA_NEGOCIO.md
├── ...otros archivos y configuraciones
```

---

## 11. RECOMENDACIONES ELITE PARA UNA LÓGICA DE NEGOCIO SÓLIDA

1. **Documenta cada decisión clave y workaround en este archivo**
   - Así nunca se pierde el "por qué" de una solución, y cualquier colaborador o IA puede entender el contexto real.

2. **Mantén el Checklist Maestro y la lógica de negocio siempre sincronizados**
   - Cada avance, bugfix o refactor debe reflejarse en ambos archivos para evitar desalineaciones y deuda técnica oculta.

3. **Haz revisiones de arquitectura y dependencias cada sprint**
   - Revisa si hay dependencias obsoletas, rutas duplicadas, o módulos que puedan ser simplificados o desacoplados.

4. **Automatiza validaciones y reporting de estado**
   - Usa scripts de auditoría, coverage y health-check para detectar problemas antes de que impacten en producción o en la clonabilidad de la matriz.

5. **Prioriza la claridad y la mantenibilidad sobre la "feature-itis"**
   - No agregues features que no puedas mantener o explicar. Prefiere menos features, pero bien documentadas, probadas y alineadas con la visión de negocio.

---

## 12. INFRAESTRUCTURA Y CARPETAS TÉCNICAS

A continuación se documenta el propósito de cada carpeta técnica y app principal del monorepo STRATO. Mantener esta sección alineada con los README de cada carpeta y con el Checklist Maestro.

- **.github/**: Workflows y configuraciones de GitHub Actions para CI/CD, validaciones automáticas y automatización de PRs.
- **.husky/**: Hooks de pre-commit y pre-push para asegurar calidad de código, linting y validaciones locales.
- **.turbo/**: Archivos de cache y configuración de TurboRepo para acelerar builds, tests y tareas.
- **.tmp-scripts/**: Scripts temporales, experimentales o de migración que no forman parte del flujo principal. Puede ser limpiada periódicamente.
- **.idea/**: Configuraciones del IDE JetBrains/WebStorm. No es necesaria para todos los colaboradores y puede ser ignorada en otros entornos.
- **prompts/**: Prompts, plantillas y recursos para IA, generación de código y automatización de tareas.
- **apps/backend/**: Backend principal: API REST, lógica de negocio, autenticación, multi-tenancy, integraciones externas y tests.
- **apps/frontend/**: Frontend principal (React/Vite): UI de usuario, paneles, componentes y lógica de cliente de los SaaS STRATO.
- **apps/web/**: App Next.js (SSR/SSG): landings, dashboard avanzado y futuro Control Tower multi-SaaS.

> Mantener los README de cada carpeta actualizados y sincronizados con esta sección y con la estructura de carpetas. Cualquier cambio relevante debe reflejarse aquí y en el Checklist Maestro para evitar confusión y facilitar el onboarding.

---

> **IMPORTANTE:** Este archivo debe ser leído y actualizado por cualquier colaborador o IA antes de trabajar en el repo. Es la memoria viva del proyecto y la clave para evitar pérdida de contexto, errores y deuda técnica.

## 13. HISTORIAL DE ACTUALIZACIONES
| Fecha       | Responsable | Cambio realizado                |
|-------------|-------------|---------------------------------|
| 2025-06-24  | José        | Estructura inicial y convención |

---
