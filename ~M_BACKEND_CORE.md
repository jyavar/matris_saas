# ~M_BACKEND_CORE.md

**Dominio funcional:** Backend Core (apps/backend)
**Incluye:** Routes, Controllers, Services, Middlewares, Libs, Utils

---

## Tabla de Origen y Dependencias

| Módulo Origen      | Archivo Original      | Dependencias Técnicas (carpetas/código)         |
|--------------------|----------------------|-------------------------------------------------|
| Task Core          | ~M_TASK_CORE.md      | apps/backend/src/services/task-core.service.ts, ... |
| Tenants            | ~M_TENANTS.md        | apps/backend/src/middleware/auth.middleware.ts, supabase/migrations/ |
| Billing            | ~M_BILLING.md        | apps/backend/src/services/billing.service.ts, ... |
| Clone              | ~M_CLONE.md          | scripts/create-saas-clone.ts, scripts/init-project.ts |

---

## % de avance global (según checklists fusionados)
- Estructura modular: 🟡
- Endpoints REST claros: 🟡
- Validación robusta de inputs: 🟡
- Seguridad (auth, RLS, webhooks): 🟡
- Documentación viva: 🟡
- Tests completos y cobertura: 🟡
- Cumple cultura STRATO: 🟡

**Avance estimado:** ~55% (según los checklists de los módulos fusionados)

---

## Contenido completo fusionado (con trazabilidad)

---

<!-- ORIGEN: ~M_TASK_CORE.md -->
# ~M_TASK_CORE.md

## 1. Propósito del módulo
Gestiona el core funcional de tareas (Task Core) para el SaaS. Permite a los usuarios crear, listar, actualizar y eliminar tareas, con lógica robusta, validaciones y seguridad, alineado a la plantilla elite STRATO y considerado módulo funcional núcleo.

## 2. Archivos clave
- `src/services/task-core.service.ts`
- `src/controllers/task-core.controller.ts`
- `src/routes/task-core.routes.ts`
- `src/tests/backend.coverage.extended.test.ts` (cubre flujos de task core)

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Service            | ✅     |
| Controller         | ✅     |
| Routes             | ✅     |
| Types              | 🟡     |
| Tests              | ✅     |
| Documentación      | 🟡     |

## 4. Tests presentes / pendientes
- [x] Tests unitarios de servicios y controladores
- [x] Tests de integración de endpoints
- [x] Mock de datos y validaciones
- [x] Cobertura ≥80%

## 5. Integraciones
- Base de datos (simulada o real)
- Endpoints protegidos por autenticación

## 6. Dependencias
- `zod`
- Variables de entorno: (ninguna crítica, depende de la persistencia)

## 7. Workarounds
- Simulación de base de datos en memoria para algunos flujos
- Validación parcial de inputs (mejorar con Zod en todos los endpoints)

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [x] Estructura modular
- [x] Endpoints REST claros
- [ ] Validación robusta de inputs
- [x] Documentación viva
- [x] Tests completos y cobertura
- [x] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Completar validación de inputs con Zod en todos los endpoints.
- Mejorar documentación y ejemplos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro (ver ~16_MODULOS.md). 

---

<!-- ORIGEN: ~M_TENANTS.md -->
# ~M_TENANTS.md

## 1. Propósito del módulo
Aislar datos y operaciones por cliente (tenant) usando Row-Level Security (RLS) en Supabase y lógica multi-tenant en backend. Es crítico para SaaS multi-cliente y cumplimiento de privacidad.

## 2. Archivos clave
- `src/middleware/auth.middleware.ts` (validación de tenant)
- `src/services/profiles.service.ts` (ejemplo de queries multi-tenant)
- `supabase/migrations/*` (políticas RLS)

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Middleware         | 🔲     |
| Servicios          | 🔲     |
| Migrations RLS     | 🔲     |
| Tests              | 🔲     |
| Documentación      | 🔲     |

## 4. Tests presentes / pendientes
- [ ] Tests de queries multi-tenant
- [ ] Mock de usuarios y tenants
- [ ] Cobertura ≥80%

## 5. Integraciones
- Supabase (RLS)
- Backend (validación de tenant en JWT)

## 6. Dependencias
- `@supabase/supabase-js`
- Variables de entorno: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

## 7. Workarounds
- Ninguno

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [ ] Estructura modular
- [ ] Endpoints REST claros
- [ ] Validación robusta de inputs
- [ ] Documentación viva
- [ ] Tests completos y cobertura
- [ ] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Completar lógica de RLS y validación de tenant en todos los endpoints.
- Documentar ejemplos y casos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 

---

<!-- ORIGEN: ~M_BILLING.md -->
# ~M_BILLING.md

## 1. Propósito del módulo
Implementa la lógica de pagos y suscripciones SaaS usando Stripe. Gestiona la creación de clientes, sesiones de pago, webhooks y el estado de la suscripción, siguiendo la plantilla elite STRATO.

## 2. Archivos clave
- `src/services/billing.service.ts`
- `src/controllers/billing.controller.ts`
- `src/routes/billing.routes.ts`
- `src/services/stripe.service.ts`
- `src/tests/billing.controller.test.ts` (pendiente de cobertura total)

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Service            | ✅     |
| Controller         | ✅     |
| Routes             | ✅     |
| Stripe Integration | ✅     |
| Webhooks           | ✅     |
| DB Simulada        | ✅     |
| Validación Zod     | ✅     |
| Tests              | 🟡     |
| Documentación      | ✅     |

## 4. Tests presentes / pendientes
- [x] Estructura de tests creada
- [ ] Tests unitarios de servicios y controladores
- [ ] Mock de Stripe SDK
- [ ] Simulación de webhooks
- [ ] Cobertura ≥80%

## 5. Integraciones
- Stripe (API, webhooks, checkout)
- Simulación de DB en memoria

## 6. Dependencias
- `stripe`
- `zod`
- Variables de entorno: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`

## 7. Workarounds
- Persistencia simulada en memoria para clientes y suscripciones (reemplazar por DB real en producción).
- Validación de usuario dummy si no hay autenticación real.

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [x] Estructura modular
- [x] Endpoints REST claros
- [x] Validación robusta de inputs
- [x] Seguridad en webhooks
- [x] Documentación viva
- [x] Integración Stripe
- [ ] Tests completos y cobertura
- [x] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Implementar y cubrir con tests unitarios e integración todos los flujos críticos (checkout, webhooks, status).
- Reemplazar la simulación de DB por persistencia real.
- Validar el módulo con casos reales y dejarlo en `✅ READY` en el checklist maestro. 

---

<!-- ORIGEN: ~M_CLONE.md -->
# ~M_CLONE.md

## 1. Propósito del módulo
Automatizar la clonación, replicación y bootstrap de nuevos SaaS usando scripts y plantillas configurables.

## 2. Archivos clave
- `scripts/create-saas-clone.ts`
- `scripts/init-project.ts`

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Scripts            | 🔲     |
| Templates          | 🔲     |
| Tests              | 🔲     |
| Documentación      | 🔲     |

## 4. Tests presentes / pendientes
- [ ] Tests de scripts de clonación
- [ ] Mock de templates y setups
- [ ] Cobertura ≥80%

## 5. Integraciones
- Node.js, pnpm

## 6. Dependencias
- `inquirer`, `pnpm`, `typescript`

## 7. Workarounds
- Ninguno

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [ ] Estructura modular
- [ ] Scripts funcionales
- [ ] Documentación viva
- [ ] Tests completos y cobertura
- [ ] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Completar scripts y templates de clonación.
- Documentar ejemplos y casos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 