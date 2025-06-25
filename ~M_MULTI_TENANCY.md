# ~M_MULTI_TENANCY.md

**Dominio funcional:** Multi-Tenancy & DB Types (apps/backend, packages/db-types)
**Incluye:** Lógica multi-tenant, RLS, tipado de base de datos, Supabase types

---

## Tabla de Origen y Dependencias

| Módulo Origen      | Archivo Original      | Dependencias Técnicas (carpetas/código)         |
|--------------------|----------------------|-------------------------------------------------|
| Multi-Tenancy      | ~M_MULTI_TENANCY.md  | apps/backend/src/middleware/auth.middleware.ts, apps/backend/src/services/profiles.service.ts, supabase/migrations/ |
| DB Types           | packages/db-types/   | packages/db-types/index.d.ts, packages/db-types/src/index.ts, apps/backend/src/types/supabase.types.ts |

---

## % de avance global (según checklists fusionados)
- Lógica multi-tenant: 🟡
- RLS en Supabase: 🟡
- Tipado estricto DB: 🟡
- Documentación viva: 🟡
- Tests completos y cobertura: ❌
- Cumple cultura STRATO: 🟡

**Avance estimado:** ~35% (según los checklists de los módulos fusionados)

---

## Contenido completo fusionado (con trazabilidad)

---

## 1. Propósito del módulo
Aislar datos y operaciones por cliente (tenant) usando Row-Level Security (RLS) en Supabase y lógica multi-tenant en backend. Es crítico para SaaS multi-cliente y cumplimiento de privacidad.

## 2. Archivos clave
- `src/middleware/auth.middleware.ts` (validación de tenant)
- `src/services/profiles.service.ts` (ejemplo de queries multi-tenant)
- `supabase/migrations/*` (políticas RLS)

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Middleware         | 🟡     |
| Servicios          | 🟡     |
| Migrations RLS     | 🟡     |
| Tests              | ❌     |
| Documentación      | 🟡     |

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
- Validación de tenant_id dummy en algunos tests

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

<!-- ORIGEN: packages/db-types/ -->
# DB Types (Supabase)

## 1. Propósito del módulo
Proveer tipado estricto y seguro para todas las tablas, vistas y funciones de la base de datos (Supabase), facilitando queries type-safe y evitando errores en tiempo de compilación.

## 2. Archivos clave
- `packages/db-types/index.d.ts`
- `packages/db-types/src/index.ts`
- `apps/backend/src/types/supabase.types.ts`

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Tipos DB           | 🟡     |
| Integración        | 🟡     |
| Documentación      | 🟡     |

## 4. Tests presentes / pendientes
- [ ] Validación de tipos en queries reales
- [ ] Mock de datos y fixtures
- [ ] Cobertura ≥80%

## 5. Integraciones
- Supabase (generación automática de tipos)
- Backend (importación de tipos en servicios y controladores)

## 6. Dependencias
- `@supabase/supabase-js`
- `typescript`

## 7. Workarounds
- Ninguno

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`

## 9. Checklist Elite
- [ ] Tipado estricto DB
- [ ] Integración en todos los servicios
- [ ] Documentación viva
- [ ] Tests completos y cobertura
- [ ] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Validar tipos en todos los servicios y queries.
- Documentar ejemplos y casos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 