# ~M_ANALYTICS_REPORTING.md

**Dominio funcional:** Analytics & Reporting (apps/backend)
**Incluye:** Métricas, tracking, reporting, dashboards, integración PostHog

---

## Tabla de Origen y Dependencias

| Módulo Origen      | Archivo Original      | Dependencias Técnicas (carpetas/código)         |
|--------------------|----------------------|-------------------------------------------------|
| Reporting          | ~M_REPORTING.md      | apps/backend/src/services/reporting.service.ts, apps/backend/src/routes/reporting.routes.ts |
| PostHog            | ~M_POSTHOG.md        | apps/backend/src/services/posthog.service.ts, apps/backend/src/routes/posthog.routes.ts |
| Control Tower      | ~M_CONTROL_TOWER.md  | apps/web/src/app/control-tower/, apps/backend/src/services/analytics.service.ts |

---

## % de avance global (según checklists fusionados)
- Estructura modular: 🔲
- Endpoints REST claros: 🔲
- Tracking y reporting funcional: 🔲
- Integración PostHog: 🔲
- Dashboards técnicos: 🔲
- Documentación viva: 🔲
- Tests completos y cobertura: 🔲
- Cumple cultura STRATO: 🔲

**Avance estimado:** ~25% (según los checklists de los módulos fusionados)

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
| Service            | 🔲     |
| Routes             | 🔲     |
| Types              | 🔲     |
| Tests              | 🔲     |
| Documentación      | 🔲     |

## 4. Tests presentes / pendientes
- [ ] Tests unitarios y de endpoints
- [ ] Mock de informes y reporting
- [ ] Cobertura ≥80%

## 5. Integraciones
- Base de datos
- Analytics

## 6. Dependencias
- `zod`

## 7. Workarounds
- Ninguno

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [ ] Estructura modular
- [ ] Endpoints REST claros
- [ ] Documentación viva
- [ ] Tests completos y cobertura
- [ ] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Implementar endpoints y lógica de reporting.
- Documentar ejemplos y casos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 

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
| Service            | 🔲     |
| Routes             | 🔲     |
| Types              | 🔲     |
| Tests              | 🔲     |
| Documentación      | 🔲     |

## 4. Tests presentes / pendientes
- [ ] Tests unitarios y de endpoints
- [ ] Mock de eventos y tracking
- [ ] Cobertura ≥80%

## 5. Integraciones
- PostHog API

## 6. Dependencias
- `posthog-node`
- Variables de entorno: `POSTHOG_API_KEY`

## 7. Workarounds
- Ninguno

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [ ] Estructura modular
- [ ] Endpoints REST claros
- [ ] Documentación viva
- [ ] Tests completos y cobertura
- [ ] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Implementar endpoints y lógica de tracking.
- Documentar ejemplos y casos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 

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
| UI                 | 🔲     |
| Servicios          | 🔲     |
| Endpoints          | 🔲     |
| Tests              | 🔲     |
| Documentación      | 🔲     |

## 4. Tests presentes / pendientes
- [ ] Tests de UI y endpoints
- [ ] Mock de datos y dashboards
- [ ] Cobertura ≥80%

## 5. Integraciones
- Analytics
- Profiles
- Multi-tenancy

## 6. Dependencias
- `react`, `next`, `zod`

## 7. Workarounds
- Ninguno

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [ ] Estructura modular
- [ ] UI clara y funcional
- [ ] Endpoints REST claros
- [ ] Documentación viva
- [ ] Tests completos y cobertura
- [ ] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Completar UI y lógica de dashboards.
- Integrar datos reales y reporting.
- Sincronizar estado en tablero de módulos y checklist maestro. 