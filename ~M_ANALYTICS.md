<!-- STRATO MODULE HEADER
{
  "module": "ANALYTICS",
  "description": "Módulo ANALYTICS de STRATO",
  "paths": [
    "apps/frontend/src/services/analytics.api.ts",
    "apps/backend/src/services/analytics.service.ts",
    "apps/backend/src/routes/analytics.routes.ts",
    "apps/backend/src/controllers/analytics.controller.ts",
    "apps/backend/dist/services/analytics.service.js",
    "apps/backend/dist/routes/analytics.routes.js",
    "apps/backend/dist/controllers/analytics.controller.js",
    "apps/frontend/src/components/ui/AnalyticsPanel.tsx",
    "apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx",
    "apps/backend/dist/src/services/analytics.service.js",
    "apps/backend/dist/src/controllers/analytics.controller.js",
    "apps/backend/dist/src/routes/analytics.routes.js",
    "apps/backend/dist/apps/backend/src/services/analytics.service.js",
    "apps/backend/dist/apps/backend/src/routes/analytics.routes.js",
    "apps/backend/dist/apps/backend/src/controllers/analytics.controller.js"
  ],
  "tests": [
    "apps/frontend/src/tests/AnalyticsPanel.test.tsx",
    "apps/backend/dist/tests/analytics.controller.test.js",
    "apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js"
  ],
  "routes": [],
  "docs": [],
  "last_synced": "2025-07-01",
  "responsible": "José + IA STRATO",
  "coverage": 20,
  "status": "active",
  "criticality": "medium"
}
-->

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






## 📁 ARCHIVOS CLAVE

### **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.d.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/dto/create-report.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/dto/create-report.dto.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/dto/create-report.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/dto/create-report.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/dto/create-report.dto.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/dto/create-report.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/dto/create-report.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/dto/create-report.dto.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/dto/create-report.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/dto/create-report.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/dto/create-report.dto.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/dto/create-report.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.d.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/dto/create-report.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/dto/create-report.dto.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/dto/create-report.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.d.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/dto/create-report.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/dto/create-report.dto.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/dto/create-report.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/dto/create-report.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/dto/create-report.dto.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/dto/create-report.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/dto/create-report.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/dto/create-report.dto.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/dto/create-report.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/analytics-reporting.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend-nest/src/analytics-reporting/dto/create-report.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/dto/create-report.dto.js` - Archivo fuente
- `apps/backend-nest/dist/analytics-reporting/dto/create-report.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.d.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.d.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.service.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.module.ts` - Archivo fuente
- `apps/backend-nest/src/analytics/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.js` - Archivo fuente
- `apps/backend-nest/dist/analytics/analytics.controller.d.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `scripts/agents/analytics/report.ts` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test
- `scripts/agents/analytics/__tests__/report.test.ts` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics-reporting.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics-reporting.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics-reporting.service.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics-reporting.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/services/analytics-reporting.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/routes/analytics-reporting.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics-reporting.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics-reporting.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/debug-analytics.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/debug-analytics.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.unit.test.js` - Archivo de test
- `apps/backend/dist/src/tests/analytics.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/src/tests/analytics.unit.test.ts` - Archivo de test
- `apps/backend/src/tests/analytics.test.ts` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/frontend/src/services/analytics.api.ts` - Archivo fuente
- `apps/backend/src/routes/analytics.routes.ts` - Archivo fuente
- `apps/backend/src/services/analytics.service.ts` - Archivo fuente
- `apps/backend/src/controllers/analytics.controller.ts` - Archivo fuente
- `apps/backend/dist/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/analytics.controller.js` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx` - Archivo fuente
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx` - Archivo fuente
- `apps/backend/dist/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/analytics.controller.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/services/analytics.service.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js` - Archivo fuente
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js` - Archivo fuente

### **Test Files**
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx` - Archivo de test
- `apps/backend/dist/tests/analytics.controller.test.js` - Archivo de test
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## Source Files
- `apps/frontend/src/services/analytics.api.ts`
- `apps/backend/src/services/analytics.service.ts`
- `apps/backend/src/routes/analytics.routes.ts`
- `apps/backend/src/controllers/analytics.controller.ts`
- `apps/backend/dist/services/analytics.service.js`
- `apps/backend/dist/routes/analytics.routes.js`
- `apps/backend/dist/controllers/analytics.controller.js`
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx`
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx`
- `apps/backend/dist/src/services/analytics.service.js`
- `apps/backend/dist/src/controllers/analytics.controller.js`
- `apps/backend/dist/src/routes/analytics.routes.js`
- `apps/backend/dist/apps/backend/src/services/analytics.service.js`
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js`
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js`

### Test Files
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx`
- `apps/backend/dist/tests/analytics.controller.test.js`
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js`

### Config Files


### Doc Files


### Scripts

### Source Files
- `apps/frontend/src/services/analytics.api.ts`
- `apps/backend/src/routes/analytics.routes.ts`
- `apps/backend/src/services/analytics.service.ts`
- `apps/backend/src/controllers/analytics.controller.ts`
- `apps/backend/dist/services/analytics.service.js`
- `apps/backend/dist/routes/analytics.routes.js`
- `apps/backend/dist/controllers/analytics.controller.js`
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx`
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx`
- `apps/backend/dist/src/services/analytics.service.js`
- `apps/backend/dist/src/routes/analytics.routes.js`
- `apps/backend/dist/src/controllers/analytics.controller.js`
- `apps/backend/dist/apps/backend/src/services/analytics.service.js`
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js`
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js`

### Test Files
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx`
- `apps/backend/dist/tests/analytics.controller.test.js`
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js`

### Config Files


### Doc Files


### Scripts

### Source Files
- `apps/frontend/src/services/analytics.api.ts`
- `apps/backend/src/services/analytics.service.ts`
- `apps/backend/src/routes/analytics.routes.ts`
- `apps/backend/src/controllers/analytics.controller.ts`
- `apps/backend/dist/services/analytics.service.js`
- `apps/backend/dist/routes/analytics.routes.js`
- `apps/backend/dist/controllers/analytics.controller.js`
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx`
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx`
- `apps/backend/dist/src/services/analytics.service.js`
- `apps/backend/dist/src/routes/analytics.routes.js`
- `apps/backend/dist/src/controllers/analytics.controller.js`
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js`
- `apps/backend/dist/apps/backend/src/services/analytics.service.js`
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js`

### Test Files
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx`
- `apps/backend/dist/tests/analytics.controller.test.js`
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js`

### Config Files


### Doc Files


### Scripts

### Source Files
- `apps/frontend/src/services/analytics.api.ts`
- `apps/backend/src/services/analytics.service.ts`
- `apps/backend/src/routes/analytics.routes.ts`
- `apps/backend/src/controllers/analytics.controller.ts`
- `apps/backend/dist/services/analytics.service.js`
- `apps/backend/dist/routes/analytics.routes.js`
- `apps/backend/dist/controllers/analytics.controller.js`
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx`
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx`
- `apps/backend/dist/src/services/analytics.service.js`
- `apps/backend/dist/src/routes/analytics.routes.js`
- `apps/backend/dist/src/controllers/analytics.controller.js`
- `apps/backend/dist/apps/backend/src/services/analytics.service.js`
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js`
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js`

### Test Files
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx`
- `apps/backend/dist/tests/analytics.controller.test.js`
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js`

### Config Files


### Doc Files


### Scripts

### Source Files
- `apps/frontend/src/services/analytics.api.ts`
- `apps/backend/src/services/analytics.service.ts`
- `apps/backend/src/routes/analytics.routes.ts`
- `apps/backend/src/controllers/analytics.controller.ts`
- `apps/backend/dist/services/analytics.service.js`
- `apps/backend/dist/routes/analytics.routes.js`
- `apps/backend/dist/controllers/analytics.controller.js`
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx`
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx`
- `apps/backend/dist/src/services/analytics.service.js`
- `apps/backend/dist/src/controllers/analytics.controller.js`
- `apps/backend/dist/src/routes/analytics.routes.js`
- `apps/backend/dist/apps/backend/src/services/analytics.service.js`
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js`
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js`

### Test Files
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx`
- `apps/backend/dist/tests/analytics.controller.test.js`
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js`

### Config Files


### Doc Files


### Scripts

### Source Files
- `apps/frontend/src/services/analytics.api.ts`
- `apps/backend/src/services/analytics.service.ts`
- `apps/backend/src/routes/analytics.routes.ts`
- `apps/backend/src/controllers/analytics.controller.ts`
- `apps/backend/dist/services/analytics.service.js`
- `apps/backend/dist/routes/analytics.routes.js`
- `apps/backend/dist/controllers/analytics.controller.js`
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx`
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx`
- `apps/backend/dist/src/services/analytics.service.js`
- `apps/backend/dist/src/routes/analytics.routes.js`
- `apps/backend/dist/src/controllers/analytics.controller.js`
- `apps/backend/dist/apps/backend/src/services/analytics.service.js`
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js`
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js`

### Test Files
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx`
- `apps/backend/dist/tests/analytics.controller.test.js`
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js`

### Config Files


### Doc Files


### Scripts

### Source Files
- `apps/frontend/src/services/analytics.api.ts`
- `apps/backend/src/services/analytics.service.ts`
- `apps/backend/src/routes/analytics.routes.ts`
- `apps/backend/src/controllers/analytics.controller.ts`
- `apps/backend/dist/services/analytics.service.js`
- `apps/backend/dist/routes/analytics.routes.js`
- `apps/backend/dist/controllers/analytics.controller.js`
- `apps/frontend/src/components/ui/AnalyticsPanel.tsx`
- `apps/frontend/src/components/ui/AnalyticsPanel.stories.tsx`
- `apps/backend/dist/src/routes/analytics.routes.js`
- `apps/backend/dist/src/services/analytics.service.js`
- `apps/backend/dist/src/controllers/analytics.controller.js`
- `apps/backend/dist/apps/backend/src/services/analytics.service.js`
- `apps/backend/dist/apps/backend/src/controllers/analytics.controller.js`
- `apps/backend/dist/apps/backend/src/routes/analytics.routes.js`

### Test Files
- `apps/frontend/src/tests/AnalyticsPanel.test.tsx`
- `apps/backend/dist/tests/analytics.controller.test.js`
- `apps/backend/dist/apps/backend/src/tests/analytics.controller.test.js`

### Config Files


### Doc Files


### Scripts

