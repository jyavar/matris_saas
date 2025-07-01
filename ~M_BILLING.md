<!-- STRATO MODULE HEADER
{
  "module": "BILLING",
  "description": "Módulo BILLING de STRATO",
  "paths": [
    "apps/backend/src/services/stripe.service.ts",
    "apps/backend/src/services/billing.service.ts",
    "apps/backend/src/routes/billing.routes.ts",
    "apps/backend/src/controllers/billing.controller.ts",
    "apps/backend/dist/services/stripe.service.js",
    "apps/backend/dist/services/billing.service.js",
    "apps/backend/dist/routes/billing.routes.js",
    "apps/backend/dist/controllers/billing.controller.js",
    "apps/backend/dist/src/services/stripe.service.js",
    "apps/backend/dist/src/services/billing.service.js",
    "apps/backend/dist/src/controllers/billing.controller.js",
    "apps/backend/dist/src/routes/billing.routes.js"
  ],
  "tests": [
    "apps/backend/src/services/__tests__/stripe.service.test.ts",
    "apps/backend/src/services/__tests__/billing.service.test.ts",
    "apps/backend/dist/services/__tests__/stripe.service.test.js",
    "apps/backend/dist/services/__tests__/billing.service.test.js",
    "apps/backend/dist/src/services/__tests__/stripe.service.test.js",
    "apps/backend/dist/src/services/__tests__/billing.service.test.js"
  ],
  "routes": [],
  "docs": [
    "apps/backend/node_modules/stripe/README.md",
    "apps/backend/node_modules/stripe/CHANGELOG.md",
    "apps/backend/node_modules/@types/stripe/README.md"
  ],
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
Avance: 60%
Tests: Tests básicos, cobertura < 60%
Última actualización: 2025-06-30
Responsable: José + IA STRATO
Paths:
  - apps/backend/src/controllers/billing.controller.ts
  - apps/backend/src/services/billing.service.ts
  - apps/backend/src/routes/billing.routes.ts
  - apps/backend/src/services/stripe.service.ts
---

## Archivos clave
- apps/backend/src/controllers/billing.controller.ts
- apps/backend/src/services/billing.service.ts
- apps/backend/src/routes/billing.routes.ts
- apps/backend/src/services/stripe.service.ts
- apps/backend/src/services/__tests__/billing.service.test.ts
- apps/backend/src/services/__tests__/stripe.service.test.ts
- apps/backend/src/tests/billing.controller.test.ts

# ~M_BILLING.md

**Dominio funcional:** Billing (Stripe, pagos SaaS)
**Incluye:** Controllers, Services, Routes, Stripe Integration

---

## ESTADO ACTUAL
- Estructura Stripe lista, lógica de pagos pendiente
- Endpoints: `/billing/*`
- Tests: Básicos, falta cobertura completa
- Integración: Stripe, pendiente lógica avanzada

---

## CHECKLIST DE CALIDAD
- [x] Estructura modular
- [x] Endpoints REST
- [ ] Lógica de negocio completa
- [ ] Tests unitarios y de integración
- [ ] Cobertura ≥ 90%
- [ ] Validación robusta
- [ ] Documentación sincronizada

---

## PRÓXIMOS PASOS
1. Completar lógica de pagos y suscripciones
2. Aumentar cobertura de tests
3. Documentar endpoints y flujos 






## 📁 ARCHIVOS CLAVE

### **Source Files**
- `apps/backend/src/services/stripe.service.ts` - Archivo fuente
- `apps/backend/src/services/billing.service.ts` - Archivo fuente
- `apps/backend/src/routes/billing.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/billing.controller.ts` - Archivo fuente
- `apps/backend/dist/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/billing.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/src/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/billing.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/services/__tests__/stripe.service.test.ts` - Archivo de test
- `apps/backend/src/services/__tests__/billing.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/billing.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/billing.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/stripe/package.json` - Archivo de configuración
- `apps/backend/node_modules/@types/stripe/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/stripe/README.md` - Archivo de documentación
- `apps/backend/node_modules/stripe/CHANGELOG.md` - Archivo de documentación
- `apps/backend/node_modules/@types/stripe/README.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/stripe.service.ts` - Archivo fuente
- `apps/backend/src/services/billing.service.ts` - Archivo fuente
- `apps/backend/src/routes/billing.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/billing.controller.ts` - Archivo fuente
- `apps/backend/dist/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/billing.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/src/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/billing.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/services/__tests__/stripe.service.test.ts` - Archivo de test
- `apps/backend/src/services/__tests__/billing.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/billing.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/billing.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/stripe/package.json` - Archivo de configuración
- `apps/backend/node_modules/@types/stripe/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/stripe/README.md` - Archivo de documentación
- `apps/backend/node_modules/stripe/CHANGELOG.md` - Archivo de documentación
- `apps/backend/node_modules/@types/stripe/README.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/billing.routes.ts` - Archivo fuente
- `apps/backend/src/services/stripe.service.ts` - Archivo fuente
- `apps/backend/src/services/billing.service.ts` - Archivo fuente
- `apps/backend/src/controllers/billing.controller.ts` - Archivo fuente
- `apps/backend/dist/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/controllers/billing.controller.js` - Archivo fuente
- `apps/backend/dist/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/src/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/billing.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/services/__tests__/stripe.service.test.ts` - Archivo de test
- `apps/backend/src/services/__tests__/billing.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/billing.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/billing.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/stripe/package.json` - Archivo de configuración
- `apps/backend/node_modules/@types/stripe/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/stripe/README.md` - Archivo de documentación
- `apps/backend/node_modules/stripe/CHANGELOG.md` - Archivo de documentación
- `apps/backend/node_modules/@types/stripe/README.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/stripe.service.ts` - Archivo fuente
- `apps/backend/src/services/billing.service.ts` - Archivo fuente
- `apps/backend/src/routes/billing.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/billing.controller.ts` - Archivo fuente
- `apps/backend/dist/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/controllers/billing.controller.js` - Archivo fuente
- `apps/backend/dist/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/src/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/billing.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/services/__tests__/stripe.service.test.ts` - Archivo de test
- `apps/backend/src/services/__tests__/billing.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/billing.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/billing.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/stripe/package.json` - Archivo de configuración
- `apps/backend/node_modules/@types/stripe/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/stripe/README.md` - Archivo de documentación
- `apps/backend/node_modules/stripe/CHANGELOG.md` - Archivo de documentación
- `apps/backend/node_modules/@types/stripe/README.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/stripe.service.ts` - Archivo fuente
- `apps/backend/src/services/billing.service.ts` - Archivo fuente
- `apps/backend/src/routes/billing.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/billing.controller.ts` - Archivo fuente
- `apps/backend/dist/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/billing.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/src/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/billing.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/billing.routes.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/services/__tests__/stripe.service.test.ts` - Archivo de test
- `apps/backend/src/services/__tests__/billing.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/billing.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/billing.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/stripe/package.json` - Archivo de configuración
- `apps/backend/node_modules/@types/stripe/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/stripe/README.md` - Archivo de documentación
- `apps/backend/node_modules/stripe/CHANGELOG.md` - Archivo de documentación
- `apps/backend/node_modules/@types/stripe/README.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/stripe.service.ts` - Archivo fuente
- `apps/backend/src/services/billing.service.ts` - Archivo fuente
- `apps/backend/src/routes/billing.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/billing.controller.ts` - Archivo fuente
- `apps/backend/dist/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/billing.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/src/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/billing.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/services/__tests__/stripe.service.test.ts` - Archivo de test
- `apps/backend/src/services/__tests__/billing.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/billing.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/billing.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/stripe/package.json` - Archivo de configuración
- `apps/backend/node_modules/@types/stripe/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/stripe/README.md` - Archivo de documentación
- `apps/backend/node_modules/stripe/CHANGELOG.md` - Archivo de documentación
- `apps/backend/node_modules/@types/stripe/README.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/billing.routes.ts` - Archivo fuente
- `apps/backend/src/services/stripe.service.ts` - Archivo fuente
- `apps/backend/src/services/billing.service.ts` - Archivo fuente
- `apps/backend/src/controllers/billing.controller.ts` - Archivo fuente
- `apps/backend/dist/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/billing.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/src/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/billing.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/services/__tests__/stripe.service.test.ts` - Archivo de test
- `apps/backend/src/services/__tests__/billing.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/billing.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/billing.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/stripe/package.json` - Archivo de configuración
- `apps/backend/node_modules/@types/stripe/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/stripe/README.md` - Archivo de documentación
- `apps/backend/node_modules/stripe/CHANGELOG.md` - Archivo de documentación
- `apps/backend/node_modules/@types/stripe/README.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/stripe.service.ts` - Archivo fuente
- `apps/backend/src/services/billing.service.ts` - Archivo fuente
- `apps/backend/src/routes/billing.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/billing.controller.ts` - Archivo fuente
- `apps/backend/dist/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/billing.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/src/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/billing.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/dist/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/billing.service.test.js` - Archivo de test
- `apps/backend/src/services/__tests__/stripe.service.test.ts` - Archivo de test
- `apps/backend/src/services/__tests__/billing.service.test.ts` - Archivo de test
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/billing.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/stripe/package.json` - Archivo de configuración
- `apps/backend/node_modules/@types/stripe/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/stripe/README.md` - Archivo de documentación
- `apps/backend/node_modules/stripe/CHANGELOG.md` - Archivo de documentación
- `apps/backend/node_modules/@types/stripe/README.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/stripe.service.ts` - Archivo fuente
- `apps/backend/src/services/billing.service.ts` - Archivo fuente
- `apps/backend/src/routes/billing.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/billing.controller.ts` - Archivo fuente
- `apps/backend/dist/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/billing.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/src/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/billing.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/services/__tests__/stripe.service.test.ts` - Archivo de test
- `apps/backend/src/services/__tests__/billing.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/billing.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/billing.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/stripe/package.json` - Archivo de configuración
- `apps/backend/node_modules/@types/stripe/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/stripe/README.md` - Archivo de documentación
- `apps/backend/node_modules/stripe/CHANGELOG.md` - Archivo de documentación
- `apps/backend/node_modules/@types/stripe/README.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/stripe.service.ts` - Archivo fuente
- `apps/backend/src/services/billing.service.ts` - Archivo fuente
- `apps/backend/src/routes/billing.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/billing.controller.ts` - Archivo fuente
- `apps/backend/dist/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/controllers/billing.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/src/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/billing.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/services/__tests__/stripe.service.test.ts` - Archivo de test
- `apps/backend/src/services/__tests__/billing.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/billing.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/billing.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/stripe/package.json` - Archivo de configuración
- `apps/backend/node_modules/@types/stripe/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/stripe/README.md` - Archivo de documentación
- `apps/backend/node_modules/stripe/CHANGELOG.md` - Archivo de documentación
- `apps/backend/node_modules/@types/stripe/README.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/stripe.service.ts` - Archivo fuente
- `apps/backend/src/services/billing.service.ts` - Archivo fuente
- `apps/backend/src/routes/billing.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/billing.controller.ts` - Archivo fuente
- `apps/backend/dist/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/billing.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/src/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/src/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/billing.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/services/__tests__/stripe.service.test.ts` - Archivo de test
- `apps/backend/src/services/__tests__/billing.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/billing.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/billing.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/stripe/package.json` - Archivo de configuración
- `apps/backend/node_modules/@types/stripe/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/stripe/README.md` - Archivo de documentación
- `apps/backend/node_modules/stripe/CHANGELOG.md` - Archivo de documentación
- `apps/backend/node_modules/@types/stripe/README.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/stripe.service.ts` - Archivo fuente
- `apps/backend/src/services/billing.service.ts` - Archivo fuente
- `apps/backend/src/routes/billing.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/billing.controller.ts` - Archivo fuente
- `apps/backend/dist/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/billing.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/src/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/billing.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/services/__tests__/stripe.service.test.ts` - Archivo de test
- `apps/backend/src/services/__tests__/billing.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/billing.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/billing.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/stripe/package.json` - Archivo de configuración
- `apps/backend/node_modules/@types/stripe/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/stripe/README.md` - Archivo de documentación
- `apps/backend/node_modules/stripe/CHANGELOG.md` - Archivo de documentación
- `apps/backend/node_modules/@types/stripe/README.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/services/stripe.service.ts` - Archivo fuente
- `apps/backend/src/services/billing.service.ts` - Archivo fuente
- `apps/backend/src/routes/billing.routes.ts` - Archivo fuente
- `apps/backend/src/controllers/billing.controller.ts` - Archivo fuente
- `apps/backend/dist/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/billing.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/src/controllers/billing.controller.js` - Archivo fuente
- `apps/backend/dist/src/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/src/services/billing.service.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/services/__tests__/stripe.service.test.ts` - Archivo de test
- `apps/backend/src/services/__tests__/billing.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/billing.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/billing.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/stripe/package.json` - Archivo de configuración
- `apps/backend/node_modules/@types/stripe/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/stripe/README.md` - Archivo de documentación
- `apps/backend/node_modules/stripe/CHANGELOG.md` - Archivo de documentación
- `apps/backend/node_modules/@types/stripe/README.md` - Archivo de documentación## **Source Files**
- `apps/backend/src/routes/billing.routes.ts` - Archivo fuente
- `apps/backend/src/services/stripe.service.ts` - Archivo fuente
- `apps/backend/src/services/billing.service.ts` - Archivo fuente
- `apps/backend/src/controllers/billing.controller.ts` - Archivo fuente
- `apps/backend/dist/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/controllers/billing.controller.js` - Archivo fuente
- `apps/backend/dist/src/routes/billing.routes.js` - Archivo fuente
- `apps/backend/dist/src/services/stripe.service.js` - Archivo fuente
- `apps/backend/dist/src/services/billing.service.js` - Archivo fuente
- `apps/backend/dist/src/controllers/billing.controller.js` - Archivo fuente

### **Test Files**
- `apps/backend/src/services/__tests__/stripe.service.test.ts` - Archivo de test
- `apps/backend/src/services/__tests__/billing.service.test.ts` - Archivo de test
- `apps/backend/dist/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/services/__tests__/billing.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js` - Archivo de test
- `apps/backend/dist/src/services/__tests__/billing.service.test.js` - Archivo de test

### **Config Files**
- `apps/backend/node_modules/stripe/package.json` - Archivo de configuración
- `apps/backend/node_modules/@types/stripe/package.json` - Archivo de configuración

### **Doc Files**
- `apps/backend/node_modules/stripe/README.md` - Archivo de documentación
- `apps/backend/node_modules/stripe/CHANGELOG.md` - Archivo de documentación
- `apps/backend/node_modules/@types/stripe/README.md` - Archivo de documentación## Source Files
- `apps/backend/src/services/stripe.service.ts`
- `apps/backend/src/services/billing.service.ts`
- `apps/backend/src/routes/billing.routes.ts`
- `apps/backend/src/controllers/billing.controller.ts`
- `apps/backend/dist/services/stripe.service.js`
- `apps/backend/dist/services/billing.service.js`
- `apps/backend/dist/routes/billing.routes.js`
- `apps/backend/dist/controllers/billing.controller.js`
- `apps/backend/dist/src/services/stripe.service.js`
- `apps/backend/dist/src/services/billing.service.js`
- `apps/backend/dist/src/controllers/billing.controller.js`
- `apps/backend/dist/src/routes/billing.routes.js`

### Test Files
- `apps/backend/src/services/__tests__/stripe.service.test.ts`
- `apps/backend/src/services/__tests__/billing.service.test.ts`
- `apps/backend/dist/services/__tests__/stripe.service.test.js`
- `apps/backend/dist/services/__tests__/billing.service.test.js`
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js`
- `apps/backend/dist/src/services/__tests__/billing.service.test.js`

### Config Files
- `apps/backend/node_modules/stripe/package.json`
- `apps/backend/node_modules/@types/stripe/package.json`

### Doc Files
- `apps/backend/node_modules/stripe/README.md`
- `apps/backend/node_modules/stripe/CHANGELOG.md`
- `apps/backend/node_modules/@types/stripe/README.md`

### Scripts

### Source Files
- `apps/backend/src/routes/billing.routes.ts`
- `apps/backend/src/services/stripe.service.ts`
- `apps/backend/src/services/billing.service.ts`
- `apps/backend/src/controllers/billing.controller.ts`
- `apps/backend/dist/services/stripe.service.js`
- `apps/backend/dist/services/billing.service.js`
- `apps/backend/dist/routes/billing.routes.js`
- `apps/backend/dist/controllers/billing.controller.js`
- `apps/backend/dist/src/services/stripe.service.js`
- `apps/backend/dist/src/services/billing.service.js`
- `apps/backend/dist/src/routes/billing.routes.js`
- `apps/backend/dist/src/controllers/billing.controller.js`

### Test Files
- `apps/backend/src/services/__tests__/stripe.service.test.ts`
- `apps/backend/src/services/__tests__/billing.service.test.ts`
- `apps/backend/dist/services/__tests__/stripe.service.test.js`
- `apps/backend/dist/services/__tests__/billing.service.test.js`
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js`
- `apps/backend/dist/src/services/__tests__/billing.service.test.js`

### Config Files
- `apps/backend/node_modules/stripe/package.json`
- `apps/backend/node_modules/@types/stripe/package.json`

### Doc Files
- `apps/backend/node_modules/stripe/README.md`
- `apps/backend/node_modules/stripe/CHANGELOG.md`
- `apps/backend/node_modules/@types/stripe/README.md`

### Scripts

### Source Files
- `apps/backend/src/services/stripe.service.ts`
- `apps/backend/src/services/billing.service.ts`
- `apps/backend/src/routes/billing.routes.ts`
- `apps/backend/src/controllers/billing.controller.ts`
- `apps/backend/dist/services/stripe.service.js`
- `apps/backend/dist/services/billing.service.js`
- `apps/backend/dist/routes/billing.routes.js`
- `apps/backend/dist/controllers/billing.controller.js`
- `apps/backend/dist/src/services/stripe.service.js`
- `apps/backend/dist/src/services/billing.service.js`
- `apps/backend/dist/src/routes/billing.routes.js`
- `apps/backend/dist/src/controllers/billing.controller.js`

### Test Files
- `apps/backend/src/services/__tests__/stripe.service.test.ts`
- `apps/backend/src/services/__tests__/billing.service.test.ts`
- `apps/backend/dist/services/__tests__/stripe.service.test.js`
- `apps/backend/dist/services/__tests__/billing.service.test.js`
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js`
- `apps/backend/dist/src/services/__tests__/billing.service.test.js`

### Config Files
- `apps/backend/node_modules/stripe/package.json`
- `apps/backend/node_modules/@types/stripe/package.json`

### Doc Files
- `apps/backend/node_modules/stripe/README.md`
- `apps/backend/node_modules/stripe/CHANGELOG.md`
- `apps/backend/node_modules/@types/stripe/README.md`

### Scripts

### Source Files
- `apps/backend/src/services/stripe.service.ts`
- `apps/backend/src/services/billing.service.ts`
- `apps/backend/src/routes/billing.routes.ts`
- `apps/backend/src/controllers/billing.controller.ts`
- `apps/backend/dist/services/stripe.service.js`
- `apps/backend/dist/services/billing.service.js`
- `apps/backend/dist/routes/billing.routes.js`
- `apps/backend/dist/controllers/billing.controller.js`
- `apps/backend/dist/src/services/stripe.service.js`
- `apps/backend/dist/src/services/billing.service.js`
- `apps/backend/dist/src/routes/billing.routes.js`
- `apps/backend/dist/src/controllers/billing.controller.js`

### Test Files
- `apps/backend/src/services/__tests__/stripe.service.test.ts`
- `apps/backend/src/services/__tests__/billing.service.test.ts`
- `apps/backend/dist/services/__tests__/stripe.service.test.js`
- `apps/backend/dist/services/__tests__/billing.service.test.js`
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js`
- `apps/backend/dist/src/services/__tests__/billing.service.test.js`

### Config Files
- `apps/backend/node_modules/stripe/package.json`
- `apps/backend/node_modules/@types/stripe/package.json`

### Doc Files
- `apps/backend/node_modules/stripe/README.md`
- `apps/backend/node_modules/stripe/CHANGELOG.md`
- `apps/backend/node_modules/@types/stripe/README.md`

### Scripts

### Source Files
- `apps/backend/src/services/stripe.service.ts`
- `apps/backend/src/services/billing.service.ts`
- `apps/backend/src/routes/billing.routes.ts`
- `apps/backend/src/controllers/billing.controller.ts`
- `apps/backend/dist/services/stripe.service.js`
- `apps/backend/dist/services/billing.service.js`
- `apps/backend/dist/routes/billing.routes.js`
- `apps/backend/dist/controllers/billing.controller.js`
- `apps/backend/dist/src/services/stripe.service.js`
- `apps/backend/dist/src/services/billing.service.js`
- `apps/backend/dist/src/controllers/billing.controller.js`
- `apps/backend/dist/src/routes/billing.routes.js`

### Test Files
- `apps/backend/src/services/__tests__/stripe.service.test.ts`
- `apps/backend/src/services/__tests__/billing.service.test.ts`
- `apps/backend/dist/services/__tests__/stripe.service.test.js`
- `apps/backend/dist/services/__tests__/billing.service.test.js`
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js`
- `apps/backend/dist/src/services/__tests__/billing.service.test.js`

### Config Files
- `apps/backend/node_modules/stripe/package.json`
- `apps/backend/node_modules/@types/stripe/package.json`

### Doc Files
- `apps/backend/node_modules/stripe/README.md`
- `apps/backend/node_modules/stripe/CHANGELOG.md`
- `apps/backend/node_modules/@types/stripe/README.md`

### Scripts

### Source Files
- `apps/backend/src/services/stripe.service.ts`
- `apps/backend/src/services/billing.service.ts`
- `apps/backend/src/routes/billing.routes.ts`
- `apps/backend/src/controllers/billing.controller.ts`
- `apps/backend/dist/services/stripe.service.js`
- `apps/backend/dist/services/billing.service.js`
- `apps/backend/dist/routes/billing.routes.js`
- `apps/backend/dist/controllers/billing.controller.js`
- `apps/backend/dist/src/services/stripe.service.js`
- `apps/backend/dist/src/services/billing.service.js`
- `apps/backend/dist/src/routes/billing.routes.js`
- `apps/backend/dist/src/controllers/billing.controller.js`

### Test Files
- `apps/backend/src/services/__tests__/stripe.service.test.ts`
- `apps/backend/src/services/__tests__/billing.service.test.ts`
- `apps/backend/dist/services/__tests__/stripe.service.test.js`
- `apps/backend/dist/services/__tests__/billing.service.test.js`
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js`
- `apps/backend/dist/src/services/__tests__/billing.service.test.js`

### Config Files
- `apps/backend/node_modules/stripe/package.json`
- `apps/backend/node_modules/@types/stripe/package.json`

### Doc Files
- `apps/backend/node_modules/stripe/README.md`
- `apps/backend/node_modules/stripe/CHANGELOG.md`
- `apps/backend/node_modules/@types/stripe/README.md`

### Scripts

### Source Files
- `apps/backend/src/services/stripe.service.ts`
- `apps/backend/src/services/billing.service.ts`
- `apps/backend/src/routes/billing.routes.ts`
- `apps/backend/src/controllers/billing.controller.ts`
- `apps/backend/dist/services/stripe.service.js`
- `apps/backend/dist/services/billing.service.js`
- `apps/backend/dist/routes/billing.routes.js`
- `apps/backend/dist/controllers/billing.controller.js`
- `apps/backend/dist/src/routes/billing.routes.js`
- `apps/backend/dist/src/services/stripe.service.js`
- `apps/backend/dist/src/services/billing.service.js`
- `apps/backend/dist/src/controllers/billing.controller.js`

### Test Files
- `apps/backend/src/services/__tests__/stripe.service.test.ts`
- `apps/backend/src/services/__tests__/billing.service.test.ts`
- `apps/backend/dist/services/__tests__/stripe.service.test.js`
- `apps/backend/dist/services/__tests__/billing.service.test.js`
- `apps/backend/dist/src/services/__tests__/stripe.service.test.js`
- `apps/backend/dist/src/services/__tests__/billing.service.test.js`

### Config Files
- `apps/backend/node_modules/stripe/package.json`
- `apps/backend/node_modules/@types/stripe/package.json`

### Doc Files
- `apps/backend/node_modules/stripe/README.md`
- `apps/backend/node_modules/stripe/CHANGELOG.md`
- `apps/backend/node_modules/@types/stripe/README.md`

### Scripts

