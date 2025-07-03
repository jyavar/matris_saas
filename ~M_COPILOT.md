<!-- STRATO MODULE HEADER
{
  "module": "COPILOT",
  "description": "Módulo COPILOT de STRATO",
  "paths": [
    "apps/backend/src/services/openai.service.ts",
    "apps/backend/src/routes/openai.routes.ts",
    "apps/backend/dist/services/openai.service.js",
    "apps/backend/dist/routes/openai.routes.js",
    "apps/backend/node_modules/openai/version.js",
    "apps/backend/node_modules/openai/version.d.ts",
    "apps/backend/node_modules/openai/uploads.js",
    "apps/backend/node_modules/openai/uploads.d.ts",
    "apps/backend/node_modules/openai/streaming.js",
    "apps/backend/node_modules/openai/streaming.d.ts",
    "apps/backend/node_modules/openai/resources.js",
    "apps/backend/node_modules/openai/resources.d.ts",
    "apps/backend/node_modules/openai/resource.js",
    "apps/backend/node_modules/openai/resource.d.ts",
    "apps/backend/node_modules/openai/pagination.js",
    "apps/backend/node_modules/openai/pagination.d.ts",
    "apps/backend/node_modules/openai/index.js",
    "apps/backend/node_modules/openai/index.d.ts",
    "apps/backend/node_modules/openai/error.js",
    "apps/backend/node_modules/openai/error.d.ts",
    "apps/backend/node_modules/openai/client.js",
    "apps/backend/node_modules/openai/client.d.ts",
    "apps/backend/node_modules/openai/azure.js",
    "apps/backend/node_modules/openai/azure.d.ts",
    "apps/backend/node_modules/openai/api-promise.js",
    "apps/backend/node_modules/openai/api-promise.d.ts",
    "apps/backend/dist/src/services/openai.service.js",
    "apps/backend/dist/src/routes/openai.routes.js"
  ],
  "tests": [
    "apps/backend/src/tests/openai.routes.test.ts",
    "apps/backend/dist/tests/openai.routes.test.js",
    "apps/backend/src/services/__tests__/openai.service.test.ts",
    "apps/backend/dist/src/tests/openai.routes.test.js",
    "apps/backend/dist/services/__tests__/openai.service.test.js",
    "apps/backend/dist/src/services/__tests__/openai.service.test.js"
  ],
  "routes": [],
  "docs": [
    "apps/backend/node_modules/openai/README.md",
    "apps/backend/node_modules/openai/CHANGELOG.md"
  ],
  "last_synced": "2025-07-01",
  "responsible": "José + IA STRATO",
  "coverage": 21,
  "status": "active",
  "criticality": "medium"
}
-->

---
Estado Técnico: Pendiente
Deuda Técnica: Máxima
Avance: 0%
Tests: Sin tests
Última actualización: 2025-06-30
Responsable: José + IA STRATO
Paths:
  - scripts/agents/
---

## Archivos clave
- scripts/agents/
- scripts/agents/context-watchdog.ts
- scripts/agents/context-watchdog.watch.ts
- scripts/agents/refactor/autofix.ts
- scripts/agents/security/audit.ts
- scripts/agents/ui/audit.ts
- scripts/agents/strato.logic.ts
- apps/backend/src/services/openai.service.ts
- apps/backend/src/controllers/openai.controller.ts
- apps/backend/src/routes/openai.routes.ts
- apps/backend/src/tests/openai.test.ts
- apps/backend/src/services/__tests__/openai.service.test.ts

# ~M_COPILOT.md

**Dominio funcional:** Agente Copilot (IA, automatización)
**Incluye:** Scripts de IA, lógica de copiloto, integración

---

## ESTADO ACTUAL
- No implementado

---

## CHECKLIST DE CALIDAD
- [ ] Scripts de IA
- [ ] Integración
- [ ] Tests
- [ ] Cobertura ≥ 90%
- [ ] Documentación sincronizada

---

## PRÓXIMOS PASOS
1. Definir lógica de copiloto
2. Implementar scripts y tests
3. Documentar módulo 






## 📁 ARCHIVOS CLAVE

### **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/openai.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/openai.controller.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.test.ts` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/openai.routes.ts` - Archivo fuente
- `apps/backend/src/services/openai.service.ts` - Archivo fuente
- `apps/backend/node_modules/openai/version.js` - Archivo fuente
- `apps/backend/node_modules/openai/version.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.js` - Archivo fuente
- `apps/backend/node_modules/openai/uploads.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.js` - Archivo fuente
- `apps/backend/node_modules/openai/streaming.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resources.js` - Archivo fuente
- `apps/backend/node_modules/openai/resources.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/resource.js` - Archivo fuente
- `apps/backend/node_modules/openai/resource.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.js` - Archivo fuente
- `apps/backend/node_modules/openai/pagination.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/index.js` - Archivo fuente
- `apps/backend/node_modules/openai/index.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/error.js` - Archivo fuente
- `apps/backend/node_modules/openai/error.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/client.js` - Archivo fuente
- `apps/backend/node_modules/openai/client.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/azure.js` - Archivo fuente
- `apps/backend/node_modules/openai/azure.d.ts` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.js` - Archivo fuente
- `apps/backend/node_modules/openai/api-promise.d.ts` - Archivo fuente
- `apps/backend/dist/services/openai.service.js` - Archivo fuente
- `apps/backend/dist/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/openai.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/openai.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/openai.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/openai.service.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/openai.routes.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/openai.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/openai.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/openai/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/openai/README.md` - Archivo de documentación
- `apps/backend/node_modules/openai/CHANGELOG.md` - Archivo de documentación## Source Files
- `apps/backend/src/services/openai.service.ts`
- `apps/backend/src/routes/openai.routes.ts`
- `apps/backend/dist/services/openai.service.js`
- `apps/backend/dist/routes/openai.routes.js`
- `apps/backend/node_modules/openai/version.js`
- `apps/backend/node_modules/openai/version.d.ts`
- `apps/backend/node_modules/openai/uploads.js`
- `apps/backend/node_modules/openai/uploads.d.ts`
- `apps/backend/node_modules/openai/streaming.js`
- `apps/backend/node_modules/openai/streaming.d.ts`
- `apps/backend/node_modules/openai/resources.js`
- `apps/backend/node_modules/openai/resources.d.ts`
- `apps/backend/node_modules/openai/resource.js`
- `apps/backend/node_modules/openai/resource.d.ts`
- `apps/backend/node_modules/openai/pagination.js`
- `apps/backend/node_modules/openai/pagination.d.ts`
- `apps/backend/node_modules/openai/index.js`
- `apps/backend/node_modules/openai/index.d.ts`
- `apps/backend/node_modules/openai/error.js`
- `apps/backend/node_modules/openai/error.d.ts`
- `apps/backend/node_modules/openai/client.js`
- `apps/backend/node_modules/openai/client.d.ts`
- `apps/backend/node_modules/openai/azure.js`
- `apps/backend/node_modules/openai/azure.d.ts`
- `apps/backend/node_modules/openai/api-promise.js`
- `apps/backend/node_modules/openai/api-promise.d.ts`
- `apps/backend/dist/src/services/openai.service.js`
- `apps/backend/dist/src/routes/openai.routes.js`

### Test Files
- `apps/backend/src/tests/openai.routes.test.ts`
- `apps/backend/dist/tests/openai.routes.test.js`
- `apps/backend/src/services/__tests__/openai.service.test.ts`
- `apps/backend/dist/src/tests/openai.routes.test.js`
- `apps/backend/dist/services/__tests__/openai.service.test.js`
- `apps/backend/dist/src/services/__tests__/openai.service.test.js`

### Config Files
- `apps/backend/node_modules/openai/package.json`

### Doc Files
- `apps/backend/node_modules/openai/README.md`
- `apps/backend/node_modules/openai/CHANGELOG.md`

### Scripts

### Source Files
- `apps/backend/src/routes/openai.routes.ts`
- `apps/backend/src/services/openai.service.ts`
- `apps/backend/node_modules/openai/version.js`
- `apps/backend/node_modules/openai/version.d.ts`
- `apps/backend/node_modules/openai/uploads.js`
- `apps/backend/node_modules/openai/uploads.d.ts`
- `apps/backend/node_modules/openai/streaming.js`
- `apps/backend/node_modules/openai/streaming.d.ts`
- `apps/backend/node_modules/openai/resources.js`
- `apps/backend/node_modules/openai/resources.d.ts`
- `apps/backend/node_modules/openai/resource.js`
- `apps/backend/node_modules/openai/resource.d.ts`
- `apps/backend/node_modules/openai/pagination.js`
- `apps/backend/node_modules/openai/pagination.d.ts`
- `apps/backend/node_modules/openai/index.js`
- `apps/backend/node_modules/openai/index.d.ts`
- `apps/backend/node_modules/openai/error.js`
- `apps/backend/node_modules/openai/error.d.ts`
- `apps/backend/node_modules/openai/client.js`
- `apps/backend/node_modules/openai/client.d.ts`
- `apps/backend/node_modules/openai/azure.js`
- `apps/backend/node_modules/openai/azure.d.ts`
- `apps/backend/node_modules/openai/api-promise.js`
- `apps/backend/node_modules/openai/api-promise.d.ts`
- `apps/backend/dist/services/openai.service.js`
- `apps/backend/dist/routes/openai.routes.js`
- `apps/backend/dist/src/services/openai.service.js`
- `apps/backend/dist/src/routes/openai.routes.js`

### Test Files
- `apps/backend/src/tests/openai.routes.test.ts`
- `apps/backend/dist/tests/openai.routes.test.js`
- `apps/backend/src/services/__tests__/openai.service.test.ts`
- `apps/backend/dist/services/__tests__/openai.service.test.js`
- `apps/backend/dist/src/tests/openai.routes.test.js`
- `apps/backend/dist/src/services/__tests__/openai.service.test.js`

### Config Files
- `apps/backend/node_modules/openai/package.json`

### Doc Files
- `apps/backend/node_modules/openai/README.md`
- `apps/backend/node_modules/openai/CHANGELOG.md`

### Scripts

### Source Files
- `apps/backend/src/services/openai.service.ts`
- `apps/backend/src/routes/openai.routes.ts`
- `apps/backend/node_modules/openai/version.js`
- `apps/backend/node_modules/openai/version.d.ts`
- `apps/backend/node_modules/openai/uploads.js`
- `apps/backend/node_modules/openai/uploads.d.ts`
- `apps/backend/node_modules/openai/streaming.js`
- `apps/backend/node_modules/openai/streaming.d.ts`
- `apps/backend/node_modules/openai/resources.js`
- `apps/backend/node_modules/openai/resources.d.ts`
- `apps/backend/node_modules/openai/resource.js`
- `apps/backend/node_modules/openai/resource.d.ts`
- `apps/backend/node_modules/openai/pagination.js`
- `apps/backend/node_modules/openai/pagination.d.ts`
- `apps/backend/node_modules/openai/index.js`
- `apps/backend/node_modules/openai/index.d.ts`
- `apps/backend/node_modules/openai/error.js`
- `apps/backend/node_modules/openai/error.d.ts`
- `apps/backend/node_modules/openai/client.js`
- `apps/backend/node_modules/openai/client.d.ts`
- `apps/backend/node_modules/openai/azure.js`
- `apps/backend/node_modules/openai/azure.d.ts`
- `apps/backend/node_modules/openai/api-promise.js`
- `apps/backend/node_modules/openai/api-promise.d.ts`
- `apps/backend/dist/services/openai.service.js`
- `apps/backend/dist/routes/openai.routes.js`
- `apps/backend/dist/src/services/openai.service.js`
- `apps/backend/dist/src/routes/openai.routes.js`

### Test Files
- `apps/backend/src/tests/openai.routes.test.ts`
- `apps/backend/dist/tests/openai.routes.test.js`
- `apps/backend/src/services/__tests__/openai.service.test.ts`
- `apps/backend/dist/services/__tests__/openai.service.test.js`
- `apps/backend/dist/src/tests/openai.routes.test.js`
- `apps/backend/dist/src/services/__tests__/openai.service.test.js`

### Config Files
- `apps/backend/node_modules/openai/package.json`

### Doc Files
- `apps/backend/node_modules/openai/README.md`
- `apps/backend/node_modules/openai/CHANGELOG.md`

### Scripts

### Source Files
- `apps/backend/src/services/openai.service.ts`
- `apps/backend/src/routes/openai.routes.ts`
- `apps/backend/dist/services/openai.service.js`
- `apps/backend/dist/routes/openai.routes.js`
- `apps/backend/node_modules/openai/version.js`
- `apps/backend/node_modules/openai/version.d.ts`
- `apps/backend/node_modules/openai/uploads.js`
- `apps/backend/node_modules/openai/uploads.d.ts`
- `apps/backend/node_modules/openai/streaming.js`
- `apps/backend/node_modules/openai/streaming.d.ts`
- `apps/backend/node_modules/openai/resources.js`
- `apps/backend/node_modules/openai/resources.d.ts`
- `apps/backend/node_modules/openai/resource.js`
- `apps/backend/node_modules/openai/resource.d.ts`
- `apps/backend/node_modules/openai/pagination.js`
- `apps/backend/node_modules/openai/pagination.d.ts`
- `apps/backend/node_modules/openai/index.js`
- `apps/backend/node_modules/openai/index.d.ts`
- `apps/backend/node_modules/openai/error.js`
- `apps/backend/node_modules/openai/error.d.ts`
- `apps/backend/node_modules/openai/client.js`
- `apps/backend/node_modules/openai/client.d.ts`
- `apps/backend/node_modules/openai/azure.js`
- `apps/backend/node_modules/openai/azure.d.ts`
- `apps/backend/node_modules/openai/api-promise.js`
- `apps/backend/node_modules/openai/api-promise.d.ts`
- `apps/backend/dist/src/services/openai.service.js`
- `apps/backend/dist/src/routes/openai.routes.js`

### Test Files
- `apps/backend/src/tests/openai.routes.test.ts`
- `apps/backend/dist/tests/openai.routes.test.js`
- `apps/backend/src/services/__tests__/openai.service.test.ts`
- `apps/backend/dist/src/tests/openai.routes.test.js`
- `apps/backend/dist/services/__tests__/openai.service.test.js`
- `apps/backend/dist/src/services/__tests__/openai.service.test.js`

### Config Files
- `apps/backend/node_modules/openai/package.json`

### Doc Files
- `apps/backend/node_modules/openai/README.md`
- `apps/backend/node_modules/openai/CHANGELOG.md`

### Scripts

### Source Files
- `apps/backend/src/services/openai.service.ts`
- `apps/backend/src/routes/openai.routes.ts`
- `apps/backend/dist/services/openai.service.js`
- `apps/backend/dist/routes/openai.routes.js`
- `apps/backend/node_modules/openai/version.js`
- `apps/backend/node_modules/openai/version.d.ts`
- `apps/backend/node_modules/openai/uploads.js`
- `apps/backend/node_modules/openai/uploads.d.ts`
- `apps/backend/node_modules/openai/streaming.js`
- `apps/backend/node_modules/openai/streaming.d.ts`
- `apps/backend/node_modules/openai/resources.js`
- `apps/backend/node_modules/openai/resources.d.ts`
- `apps/backend/node_modules/openai/resource.js`
- `apps/backend/node_modules/openai/resource.d.ts`
- `apps/backend/node_modules/openai/pagination.js`
- `apps/backend/node_modules/openai/pagination.d.ts`
- `apps/backend/node_modules/openai/index.js`
- `apps/backend/node_modules/openai/index.d.ts`
- `apps/backend/node_modules/openai/error.js`
- `apps/backend/node_modules/openai/error.d.ts`
- `apps/backend/node_modules/openai/client.js`
- `apps/backend/node_modules/openai/client.d.ts`
- `apps/backend/node_modules/openai/azure.js`
- `apps/backend/node_modules/openai/azure.d.ts`
- `apps/backend/node_modules/openai/api-promise.js`
- `apps/backend/node_modules/openai/api-promise.d.ts`
- `apps/backend/dist/src/services/openai.service.js`
- `apps/backend/dist/src/routes/openai.routes.js`

### Test Files
- `apps/backend/src/tests/openai.routes.test.ts`
- `apps/backend/dist/tests/openai.routes.test.js`
- `apps/backend/src/services/__tests__/openai.service.test.ts`
- `apps/backend/dist/services/__tests__/openai.service.test.js`
- `apps/backend/dist/src/tests/openai.routes.test.js`
- `apps/backend/dist/src/services/__tests__/openai.service.test.js`

### Config Files
- `apps/backend/node_modules/openai/package.json`

### Doc Files
- `apps/backend/node_modules/openai/README.md`
- `apps/backend/node_modules/openai/CHANGELOG.md`

### Scripts

### Source Files
- `apps/backend/src/services/openai.service.ts`
- `apps/backend/src/routes/openai.routes.ts`
- `apps/backend/node_modules/openai/version.js`
- `apps/backend/node_modules/openai/version.d.ts`
- `apps/backend/node_modules/openai/uploads.js`
- `apps/backend/node_modules/openai/uploads.d.ts`
- `apps/backend/node_modules/openai/streaming.js`
- `apps/backend/node_modules/openai/streaming.d.ts`
- `apps/backend/node_modules/openai/resources.js`
- `apps/backend/node_modules/openai/resources.d.ts`
- `apps/backend/node_modules/openai/resource.js`
- `apps/backend/node_modules/openai/resource.d.ts`
- `apps/backend/node_modules/openai/pagination.js`
- `apps/backend/node_modules/openai/pagination.d.ts`
- `apps/backend/node_modules/openai/index.js`
- `apps/backend/node_modules/openai/index.d.ts`
- `apps/backend/node_modules/openai/error.js`
- `apps/backend/node_modules/openai/error.d.ts`
- `apps/backend/node_modules/openai/client.js`
- `apps/backend/node_modules/openai/client.d.ts`
- `apps/backend/node_modules/openai/azure.js`
- `apps/backend/node_modules/openai/azure.d.ts`
- `apps/backend/node_modules/openai/api-promise.js`
- `apps/backend/node_modules/openai/api-promise.d.ts`
- `apps/backend/dist/services/openai.service.js`
- `apps/backend/dist/routes/openai.routes.js`
- `apps/backend/dist/src/services/openai.service.js`
- `apps/backend/dist/src/routes/openai.routes.js`

### Test Files
- `apps/backend/src/tests/openai.routes.test.ts`
- `apps/backend/dist/tests/openai.routes.test.js`
- `apps/backend/src/services/__tests__/openai.service.test.ts`
- `apps/backend/dist/src/tests/openai.routes.test.js`
- `apps/backend/dist/services/__tests__/openai.service.test.js`
- `apps/backend/dist/src/services/__tests__/openai.service.test.js`

### Config Files
- `apps/backend/node_modules/openai/package.json`

### Doc Files
- `apps/backend/node_modules/openai/README.md`
- `apps/backend/node_modules/openai/CHANGELOG.md`

### Scripts

### Source Files
- `apps/backend/src/services/openai.service.ts`
- `apps/backend/src/routes/openai.routes.ts`
- `apps/backend/node_modules/openai/version.js`
- `apps/backend/node_modules/openai/version.d.ts`
- `apps/backend/node_modules/openai/uploads.js`
- `apps/backend/node_modules/openai/uploads.d.ts`
- `apps/backend/node_modules/openai/streaming.js`
- `apps/backend/node_modules/openai/streaming.d.ts`
- `apps/backend/node_modules/openai/resources.js`
- `apps/backend/node_modules/openai/resources.d.ts`
- `apps/backend/node_modules/openai/resource.js`
- `apps/backend/node_modules/openai/resource.d.ts`
- `apps/backend/node_modules/openai/pagination.js`
- `apps/backend/node_modules/openai/pagination.d.ts`
- `apps/backend/node_modules/openai/index.js`
- `apps/backend/node_modules/openai/index.d.ts`
- `apps/backend/node_modules/openai/error.js`
- `apps/backend/node_modules/openai/error.d.ts`
- `apps/backend/node_modules/openai/client.js`
- `apps/backend/node_modules/openai/client.d.ts`
- `apps/backend/node_modules/openai/azure.js`
- `apps/backend/node_modules/openai/azure.d.ts`
- `apps/backend/node_modules/openai/api-promise.js`
- `apps/backend/node_modules/openai/api-promise.d.ts`
- `apps/backend/dist/services/openai.service.js`
- `apps/backend/dist/routes/openai.routes.js`
- `apps/backend/dist/src/routes/openai.routes.js`
- `apps/backend/dist/src/services/openai.service.js`

### Test Files
- `apps/backend/src/tests/openai.routes.test.ts`
- `apps/backend/dist/tests/openai.routes.test.js`
- `apps/backend/src/services/__tests__/openai.service.test.ts`
- `apps/backend/dist/src/tests/openai.routes.test.js`
- `apps/backend/dist/services/__tests__/openai.service.test.js`
- `apps/backend/dist/src/services/__tests__/openai.service.test.js`

### Config Files
- `apps/backend/node_modules/openai/package.json`

### Doc Files
- `apps/backend/node_modules/openai/README.md`
- `apps/backend/node_modules/openai/CHANGELOG.md`

### Scripts

