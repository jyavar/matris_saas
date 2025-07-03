<!-- STRATO MODULE HEADER
{
  "module": "CAMPAIGNS",
  "description": "Módulo CAMPAIGNS de STRATO",
  "paths": [
    "apps/backend/src/services/campaigns.service.ts",
    "apps/backend/src/routes/campaigns.routes.ts",
    "apps/backend/dist/services/campaigns.service.js",
    "apps/backend/dist/routes/campaigns.routes.js",
    "apps/backend/dist/src/services/campaigns.service.js",
    "apps/backend/dist/src/routes/campaigns.routes.js"
  ],
  "tests": [
    "apps/backend/src/tests/campaigns.routes.test.ts",
    "apps/backend/dist/tests/campaigns.routes.test.js",
    "apps/backend/dist/src/tests/campaigns.routes.test.js"
  ],
  "routes": [],
  "docs": [],
  "last_synced": "2025-07-01",
  "responsible": "José + IA STRATO",
  "coverage": 50,
  "status": "active",
  "criticality": "medium"
}
-->

---
Estado Técnico: Parcial
Deuda Técnica: Alta
Avance: 40%
Tests: Básicos, cobertura < 40%
Última actualización: 2025-06-30
Responsable: José + IA STRATO
Paths:
  - apps/backend/src/controllers/campaigns.controller.ts
  - apps/backend/src/services/campaigns.service.ts
  - apps/backend/src/routes/campaigns.routes.ts
---

## Archivos clave
- apps/backend/src/controllers/campaigns.controller.ts
- apps/backend/src/services/campaigns.service.ts
- apps/backend/src/routes/campaigns.routes.ts
- apps/backend/src/tests/campaigns.routes.test.ts

# ~M_CAMPAIGNS.md

**Dominio funcional:** Campañas y automatización
**Incluye:** Controllers, Services, Routes

---

## ESTADO ACTUAL
- Estructura lista, lógica pendiente
- Endpoints: `/campaigns/*`
- Tests: Básicos, falta integración

---

## CHECKLIST DE CALIDAD
- [x] Estructura modular
- [ ] Lógica de negocio
- [ ] Tests unitarios y de integración
- [ ] Cobertura ≥ 90%
- [ ] Documentación sincronizada

---

## PRÓXIMOS PASOS
1. Completar lógica de campañas
2. Agregar tests y cobertura
3. Documentar endpoints 






## 📁 ARCHIVOS CLAVE

### **Source Files**
- `apps/backend-nest/src/email-campaigns/email-campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.d.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/update-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/create-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/index.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/create-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend-nest/src/campaigns/campaigns.service.spec.ts` - Archivo de test
- `apps/backend-nest/src/campaigns/campaigns.controller.spec.ts` - Archivo de test
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend-nest/src/email-campaigns/email-campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/update-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/create-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/index.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/create-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend-nest/src/campaigns/campaigns.service.spec.ts` - Archivo de test
- `apps/backend-nest/src/campaigns/campaigns.controller.spec.ts` - Archivo de test
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend-nest/src/email-campaigns/email-campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/update-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/create-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/index.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/create-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend-nest/src/campaigns/campaigns.service.spec.ts` - Archivo de test
- `apps/backend-nest/src/campaigns/campaigns.controller.spec.ts` - Archivo de test
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend-nest/src/email-campaigns/email-campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/update-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/create-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/index.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/create-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend-nest/src/campaigns/campaigns.service.spec.ts` - Archivo de test
- `apps/backend-nest/src/campaigns/campaigns.controller.spec.ts` - Archivo de test
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend-nest/src/email-campaigns/email-campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.d.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/update-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/create-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/index.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/create-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend-nest/src/campaigns/campaigns.service.spec.ts` - Archivo de test
- `apps/backend-nest/src/campaigns/campaigns.controller.spec.ts` - Archivo de test
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend-nest/src/email-campaigns/email-campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.d.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/update-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/create-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/index.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/create-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend-nest/src/campaigns/campaigns.service.spec.ts` - Archivo de test
- `apps/backend-nest/src/campaigns/campaigns.controller.spec.ts` - Archivo de test
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend-nest/src/email-campaigns/email-campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/update-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/create-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/index.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/create-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend-nest/src/campaigns/campaigns.service.spec.ts` - Archivo de test
- `apps/backend-nest/src/campaigns/campaigns.controller.spec.ts` - Archivo de test
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend-nest/src/email-campaigns/email-campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/update-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/create-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/index.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/create-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend-nest/src/campaigns/campaigns.service.spec.ts` - Archivo de test
- `apps/backend-nest/src/campaigns/campaigns.controller.spec.ts` - Archivo de test
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend-nest/src/email-campaigns/email-campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/update-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/create-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/index.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/create-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend-nest/src/campaigns/campaigns.service.spec.ts` - Archivo de test
- `apps/backend-nest/src/campaigns/campaigns.controller.spec.ts` - Archivo de test
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend-nest/src/email-campaigns/email-campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/update-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/create-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/index.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/create-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend-nest/src/email-campaigns/email-campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/email-campaigns.controller.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/update-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/email-campaigns/dto/create-email-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/index.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/create-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/update-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/email-campaigns/dto/create-email-campaign.dto.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend-nest/src/campaigns/campaigns.service.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.module.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/campaigns.controller.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.service.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.module.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/campaigns.controller.d.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/index.ts` - Archivo fuente
- `apps/backend-nest/src/campaigns/dto/create-campaign.dto.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/index.d.ts` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.js` - Archivo fuente
- `apps/backend-nest/dist/campaigns/dto/create-campaign.dto.d.ts` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/email-campaigns.service.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/email-campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/email-campaigns.controller.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/email-campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/email-campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/email-campaigns.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/email-campaigns.test.ts` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/email-campaigns.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## **Source Files**
- `apps/backend/src/routes/campaigns.routes.ts` - Archivo fuente
- `apps/backend/src/services/campaigns.service.ts` - Archivo fuente
- `apps/backend/dist/services/campaigns.service.js` - Archivo fuente
- `apps/backend/dist/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/routes/campaigns.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/campaigns.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/tests/campaigns.routes.test.ts` - Archivo de test
- `apps/backend/dist/tests/campaigns.routes.test.js` - Archivo de test
- `apps/backend/dist/src/tests/campaigns.routes.test.js` - Archivo de test

### **Config Files**


### **Doc Files**
## Source Files
- `apps/backend/src/services/campaigns.service.ts`
- `apps/backend/src/routes/campaigns.routes.ts`
- `apps/backend/dist/services/campaigns.service.js`
- `apps/backend/dist/routes/campaigns.routes.js`
- `apps/backend/dist/src/services/campaigns.service.js`
- `apps/backend/dist/src/routes/campaigns.routes.js`

### Test Files
- `apps/backend/src/tests/campaigns.routes.test.ts`
- `apps/backend/dist/tests/campaigns.routes.test.js`
- `apps/backend/dist/src/tests/campaigns.routes.test.js`

### Config Files


### Doc Files


### Scripts

### Source Files
- `apps/backend/src/routes/campaigns.routes.ts`
- `apps/backend/src/services/campaigns.service.ts`
- `apps/backend/dist/services/campaigns.service.js`
- `apps/backend/dist/routes/campaigns.routes.js`
- `apps/backend/dist/src/services/campaigns.service.js`
- `apps/backend/dist/src/routes/campaigns.routes.js`

### Test Files
- `apps/backend/src/tests/campaigns.routes.test.ts`
- `apps/backend/dist/tests/campaigns.routes.test.js`
- `apps/backend/dist/src/tests/campaigns.routes.test.js`

### Config Files


### Doc Files


### Scripts

### Source Files
- `apps/backend/src/services/campaigns.service.ts`
- `apps/backend/src/routes/campaigns.routes.ts`
- `apps/backend/dist/services/campaigns.service.js`
- `apps/backend/dist/routes/campaigns.routes.js`
- `apps/backend/dist/src/services/campaigns.service.js`
- `apps/backend/dist/src/routes/campaigns.routes.js`

### Test Files
- `apps/backend/src/tests/campaigns.routes.test.ts`
- `apps/backend/dist/tests/campaigns.routes.test.js`
- `apps/backend/dist/src/tests/campaigns.routes.test.js`

### Config Files


### Doc Files


### Scripts

### Source Files
- `apps/backend/src/services/campaigns.service.ts`
- `apps/backend/src/routes/campaigns.routes.ts`
- `apps/backend/dist/services/campaigns.service.js`
- `apps/backend/dist/routes/campaigns.routes.js`
- `apps/backend/dist/src/services/campaigns.service.js`
- `apps/backend/dist/src/routes/campaigns.routes.js`

### Test Files
- `apps/backend/src/tests/campaigns.routes.test.ts`
- `apps/backend/dist/tests/campaigns.routes.test.js`
- `apps/backend/dist/src/tests/campaigns.routes.test.js`

### Config Files


### Doc Files


### Scripts

### Source Files
- `apps/backend/src/services/campaigns.service.ts`
- `apps/backend/src/routes/campaigns.routes.ts`
- `apps/backend/dist/services/campaigns.service.js`
- `apps/backend/dist/routes/campaigns.routes.js`
- `apps/backend/dist/src/services/campaigns.service.js`
- `apps/backend/dist/src/routes/campaigns.routes.js`

### Test Files
- `apps/backend/src/tests/campaigns.routes.test.ts`
- `apps/backend/dist/tests/campaigns.routes.test.js`
- `apps/backend/dist/src/tests/campaigns.routes.test.js`

### Config Files


### Doc Files


### Scripts

### Source Files
- `apps/backend/src/services/campaigns.service.ts`
- `apps/backend/src/routes/campaigns.routes.ts`
- `apps/backend/dist/services/campaigns.service.js`
- `apps/backend/dist/routes/campaigns.routes.js`
- `apps/backend/dist/src/services/campaigns.service.js`
- `apps/backend/dist/src/routes/campaigns.routes.js`

### Test Files
- `apps/backend/src/tests/campaigns.routes.test.ts`
- `apps/backend/dist/tests/campaigns.routes.test.js`
- `apps/backend/dist/src/tests/campaigns.routes.test.js`

### Config Files


### Doc Files


### Scripts

### Source Files
- `apps/backend/src/services/campaigns.service.ts`
- `apps/backend/src/routes/campaigns.routes.ts`
- `apps/backend/dist/services/campaigns.service.js`
- `apps/backend/dist/routes/campaigns.routes.js`
- `apps/backend/dist/src/routes/campaigns.routes.js`
- `apps/backend/dist/src/services/campaigns.service.js`

### Test Files
- `apps/backend/src/tests/campaigns.routes.test.ts`
- `apps/backend/dist/tests/campaigns.routes.test.js`
- `apps/backend/dist/src/tests/campaigns.routes.test.js`

### Config Files


### Doc Files


### Scripts

