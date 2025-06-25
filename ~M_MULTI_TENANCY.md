# ~M_MULTI_TENANCY.md

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