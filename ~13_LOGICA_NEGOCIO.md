# ~13_LOGICA_NEGOCIO.md

## MEMORIA VIVA – LÓGICA DE NEGOCIO & CONTEXTO STRATO SAFE STACK™

> Este documento es la fuente de verdad viva para la lógica de negocio, arquitectura, convenciones, decisiones clave y estado real del monorepo. Debe mantenerse actualizado junto al Checklist Maestro (~12_CHECKLIST_MAESTRO.md) y ser leído por todo colaborador, IA o humano, antes de trabajar en el repo.

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

## 3. RESUMEN EJECUTIVO Y VISIÓN DE NEGOCIO

**STRATO AI** es la matriz tecnológica de la empresa Strato Artificial Intelligence, fundada por José (founder, no dev). El objetivo de este monorepo es construir una plataforma base (“matriz”) para lanzar múltiples SaaS de productividad con inteligencia artificial, de forma rápida, escalable y segura.

- **Visión:** Permitir a un solo founder (sin ser dev) lanzar, operar y escalar múltiples SaaS de IA, con la ayuda de IA (como este chat) y una arquitectura robusta, documentada y fácil de clonar.
- **Producto:** Cada SaaS es un clon de la matriz, con personalización mínima, y puede ser lanzado en Product Hunt, Indie Hackers y otras plataformas.
- **Control y monitoreo:** Se construirá un dashboard (“Control Tower”) para visualizar el estado de todos los SaaS lanzados: activos, features, usuarios, métricas clave, etc.
- **Filosofía:** No se busca hacer simple por simple, sino hacer bien, robusto y escalable, pero sin sobrecargar de features innecesarios. La prioridad es la claridad, la mantenibilidad y la facilidad de onboarding para no técnicos.
- **Checklist Maestro:** El archivo ~12_CHECKLIST_MAESTRO.md es la brújula del proyecto. Todo avance debe reflejarse ahí y en este archivo de lógica de negocio.

---

## 4. CONVENCIONES Y ARQUITECTURA GLOBAL
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

---

## 5. ESTADO Y LÓGICA DE CADA MÓDULO CRÍTICO

### 5.1. **Autenticación y Multi-Tenancy**
- **Stack:** Supabase Auth, JWT, RLS.
- **Estado:** [Describe si está implementado, parcial, pendiente.]
- **Convenciones:** [Ej: Todos los endpoints protegidos usan `authMiddleware`.]
- **Workarounds:** [Ej: Inyección de tenant_id en tests locales.]
- **Archivos clave:** `/middleware/auth.middleware.ts`, `/services/auth.service.ts`, etc.

### 5.2. **Billing y Stripe**
- **Stack:** Stripe API, webhooks, enforcement por plan.
- **Estado:** [Describe si está implementado, parcial, pendiente.]
- **Convenciones:** [Ej: Todos los endpoints de pago usan `billingService`.]
- **Workarounds:** [Ej: Uso de claves dummy en desarrollo.]
- **Archivos clave:** `/services/billing.service.ts`, `/routes/billing.routes.ts`, etc.

### 5.3. **Integraciones Externas**
- **Resend:** [Estado, archivos, convenciones.]
- **OpenAI:** [Estado, archivos, convenciones.]
- **PostHog:** [Estado, archivos, convenciones.]
- **Supabase:** [Estado, archivos, convenciones.]

### 5.4. **Frontend y UI Compartida**
- **Stack:** Next.js, shadcn/ui, TailwindCSS, Context Guard.
- **Estado:** [Describe si está implementado, parcial, pendiente.]
- **Convenciones:** [Ej: Componentes UI en `/components/ui/`.]
- **Theming y personalización:** [Estado y convenciones.]

### 5.5. **Tests y Cobertura**
- **Stack:** Vitest, Testing Library, Playwright.
- **Estado:** [Cobertura actual, áreas fuertes y débiles.]
- **Convenciones:** [Dónde van los tests, cómo se nombran.]

### 5.6. **SEO y Marketing**
- **Stack:** Next.js Head, sitemap, metatags, OpenGraph.
- **Estado:** [Describe si está implementado, parcial, pendiente.]
- **Convenciones:** [Dónde se configuran los metatags, etc.]

---

## 6. WORKAROUNDS Y DECISIONES TEMPORALES
- [Lista de workarounds activos, por qué existen, cuándo se deben eliminar.]

---

## 7. FLUJOS DE USUARIO Y EJEMPLOS DE USO
- [Describe los flujos críticos: signup, login, pago, upgrade, etc.]
- [Incluye ejemplos de requests/responses, rutas, payloads.]

---

## 8. CHECKLIST DE ACTUALIZACIÓN DIARIA/SPRINT
- [ ] ¿Se actualizó este archivo tras cada avance relevante?
- [ ] ¿Se revisó el Checklist Maestro?
- [ ] ¿Se documentaron nuevos workarounds o decisiones?
- [ ] ¿Se actualizaron referencias cruzadas?

---

## 9. REFERENCIAS CRUZADAS
- **Checklist Maestro:** `~12_CHECKLIST_MAESTRO.md`
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