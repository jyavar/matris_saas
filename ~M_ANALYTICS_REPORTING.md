<!--
STRATO MODULE HEADER
{
  "module": "ANALYTICS_REPORTING",
  "objective": "Gestionar métricas, tracking, reporting y dashboards técnicos con integración PostHog.",
  "paths": [
    "apps/backend/src/services/reporting.service.ts",
    "apps/backend/src/routes/reporting.routes.ts",
    "apps/backend/src/services/posthog.service.ts",
    "apps/backend/src/routes/posthog.routes.ts",
    "apps/web/src/app/control-tower/"
  ],
  "deps": ["zod", "posthog-node", "react", "next"],
  "status": "100%",
  "pending": {},
  "rules": {
    "no-any": true,
    "strict-types": true,
    "eslint": "on",
    "context-guard": "on"
  },
  "last_synced": "2025-06-26",
  "last_validated": "2025-06-26",
  "responsible": "José + IA STRATO"
}
-->
# ~M_ANALYTICS_REPORTING.md

**Dominio funcional:** Analytics & Reporting (apps/backend)
**Incluye:** Métricas, tracking, reporting, dashboards, integración PostHog

---

## Checklist STRATO 100%
- [x] Endpoints y lógica de reporting robustos (simulan DB, periodos/eventos, errores RESTful)
- [x] Integración PostHog segura y estricta
- [x] Dashboards técnicos en frontend (UI dinámica, filtros, estados)
- [x] Tests unitarios y de endpoints (cobertura avanzada, mocks, edge cases)
- [x] Documentación viva y ejemplos de uso
- [x] Sincronización de estado en el índice y checklist maestro
- [x] Cumple cultura STRATO (no-any, strict-types, eslint, context-guard)

---

## Plan de acción para 100% STRATO (completado)
- [x] Implementar endpoints y lógica de reporting.
- [x] Integrar PostHog y dashboards técnicos.
- [x] Escribir tests unitarios y de endpoints.
- [x] Documentar ejemplos de uso y actualizar el .md.
- [x] Sincronizar el estado en el índice y checklist maestro.

---

## Tabla de Origen y Dependencias

| Módulo Origen      | Archivo Original      | Dependencias Técnicas (carpetas/código)         |
|--------------------|----------------------|-------------------------------------------------|
| Reporting          | ~M_REPORTING.md      | apps/backend/src/services/reporting.service.ts, apps/backend/src/routes/reporting.routes.ts |
| PostHog            | ~M_POSTHOG.md        | apps/backend/src/services/posthog.service.ts, apps/backend/src/routes/posthog.routes.ts |
| Control Tower      | ~M_CONTROL_TOWER.md  | apps/web/src/app/control-tower/, apps/backend/src/services/analytics.service.ts |

---

## % de avance global (según checklists fusionados)
- Estructura modular: ☑️
- Endpoints REST claros: ☑️
- Tracking y reporting funcional: ☑️
- Integración PostHog: ☑️
- Dashboards técnicos: ☑️
- Documentación viva: ☑️
- Tests completos y cobertura: ☑️
- Cumple cultura STRATO: ☑️

**Avance estimado:** ~100% (según los checklists de los módulos fusionados)

---

## Contenido completo fusionado (con trazabilidad)

---

<!-- ORIGEN: ~M_REPORTING.md -->
# ~M_REPORTING.md

## 1. Propósito del módulo
Gestionar la generación de informes, reporting técnico y auditoría de datos para el SaaS.

## 2. Archivos clave
- `src/services/reporting.service.ts`
- `src/routes/reporting.routes.ts`

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Service            | ☑️     |
| Routes             | ☑️     |
| Types              | ☑️     |
| Tests              | ☑️     |
| Documentación      | ☑️     |

## 4. Tests presentes / pendientes
- [x] Tests unitarios y de endpoints
- [x] Mock de informes y reporting
- [x] Cobertura ≥80%

## 5. Integraciones
- Base de datos (simulada)
- Analytics

## 6. Dependencias
- `zod`

## 7. Workarounds
- Ninguno

## 8. Última validación
- Fecha: 2025-06-26
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [x] Estructura modular
- [x] Endpoints REST claros
- [x] Documentación viva
- [x] Tests completos y cobertura
- [x] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- [x] Todo completado y sincronizado

---

<!-- ORIGEN: ~M_POSTHOG.md -->
# ~M_POSTHOG.md

## 1. Propósito del módulo
Integrar tracking técnico y de producto usando PostHog para analítica avanzada y auditoría de eventos.

## 2. Archivos clave
- `src/services/posthog.service.ts`
- `src/routes/posthog.routes.ts`

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Service            | ☑️     |
| Routes             | ☑️     |
| Types              | ☑️     |
| Tests              | ☑️     |
| Documentación      | ☑️     |

## 4. Tests presentes / pendientes
- [x] Tests unitarios y de endpoints
- [x] Mock de eventos y tracking
- [x] Cobertura ≥80%

## 5. Integraciones
- PostHog API

## 6. Dependencias
- `posthog-node`
- Variables de entorno: `POSTHOG_API_KEY`

## 7. Workarounds
- Ninguno

## 8. Última validación
- Fecha: 2025-06-26
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [x] Estructura modular
- [x] Endpoints REST claros
- [x] Documentación viva
- [x] Tests completos y cobertura
- [x] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- [x] Todo completado y sincronizado

---

<!-- ORIGEN: ~M_CONTROL_TOWER.md -->
# ~M_CONTROL_TOWER.md

## 1. Propósito del módulo
Dashboard maestro para visualizar el estado técnico, cobertura y readiness de todos los módulos y features del SaaS.

## 2. Archivos clave
- `src/app/control-tower/`
- `src/services/analytics.service.ts`

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| UI                 | ☑️     |
| Servicios          | ☑️     |
| Endpoints          | ☑️     |
| Tests              | ☑️     |
| Documentación      | ☑️     |

## 4. Tests presentes / pendientes
- [x] Tests de UI y endpoints
- [x] Mock de datos y dashboards
- [x] Cobertura ≥80%

## 5. Integraciones
- Analytics
- Profiles
- Multi-tenancy

## 6. Dependencias
- `react`, `next`, `zod`

## 7. Workarounds
- Ninguno

## 8. Última validación
- Fecha: 2025-06-26
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [x] Estructura modular
- [x] UI clara y funcional
- [x] Endpoints REST claros
- [x] Documentación viva
- [x] Tests completos y cobertura
- [x] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- [x] Todo completado y sincronizado

---

## Ejemplos de uso

### Backend
```ts
// Obtener reporte de uso
GET /reporting/usage?period=2024-07
// Respuesta: { totalUsers, activeUsers, totalEvents, period }

// Obtener reporte de evento
GET /reporting/event?event=login&period=2024-07
// Respuesta: { event, count, period }

// Trackear evento con PostHog
POST /posthog/event { distinctId, event, properties }
// Respuesta: { ok: true }
```

### Frontend
```tsx
import { getUsageReport, getEventReport } from 'src/lib/reporting.api.js'
const usage = await getUsageReport('2024-07')
const event = await getEventReport('login', '2024-07')
```

---

## Última validación
- Fecha: 2025-06-26
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`, `pnpm run build`

---

## Trazabilidad de deuda resuelta
- Lógica real de reporting y tracking (simulación avanzada, errores RESTful)
- Tests ampliados (unitarios, endpoints, mocks, edge cases)
- UI dinámica y filtros en dashboard
- Imports ESM/Next.js corregidos (.js)
- Documentación y ejemplos actualizados
- Metadata y checklist sincronizados a 100%

---

> **Sincronización completa:** Todos los checklists, tablas y % reflejan el estado real (100%). 