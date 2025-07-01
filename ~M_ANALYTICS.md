---
Estado Técnico: Parcial
Deuda Técnica: Media
Avance: 60%
Tests: Unitarios, cobertura 60%
Última actualización: 2025-06-30
Responsable: José + IA STRATO
Paths:
  - apps/backend/src/controllers/analytics.controller.ts
  - apps/backend/src/services/analytics.service.ts
  - apps/backend/src/routes/analytics.routes.ts
  - apps/frontend/src/services/analytics.api.ts
---

## Archivos clave
- apps/backend/src/controllers/analytics.controller.ts
- apps/backend/src/services/analytics.service.ts
- apps/backend/src/routes/analytics.routes.ts
- apps/backend/src/tests/analytics.controller.test.ts
- apps/frontend/src/services/analytics.api.ts
- apps/frontend/src/components/ui/AnalyticsPanel.tsx
- apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx
- apps/frontend/src/tests/AnalyticsPanel.test.tsx

# ~M_ANALYTICS.md

**Dominio funcional:** Analytics y reporting
**Incluye:** Controllers, Services, API, Integración frontend

---

## ESTADO ACTUAL
- Endpoints básicos implementados
- Integración básica con frontend
- Tests: Unitarios, falta integración

---

## CHECKLIST DE CALIDAD
- [x] Endpoints REST
- [x] Integración frontend
- [ ] Tests de integración
- [ ] Cobertura ≥ 90%
- [ ] Documentación sincronizada

---

## PRÓXIMOS PASOS
1. Completar integración y tests
2. Mejorar cobertura y documentación 