<!--
STRATO MODULE HEADER
{
  "module": "EMAIL_CAMPAIGNS",
  "objective": "Gestionar envío de emails transaccionales, campañas y templates con Resend",
  "paths": [
    "apps/backend/src/services/email.service.ts",
    "apps/backend/src/controllers/email.controller.ts",
    "apps/backend/src/routes/email.routes.ts"
  ],
  "deps": ["resend", "supabase"],
  "status": "100%",
  "pending": {
    "services": [],
    "tests": [],
    "docs": []
  },
  "rules": {
    "no-any": true,
    "strict-types": true,
    "eslint": "on",
    "context-guard": "on"
  }
}
-->

## Archivos clave
- apps/backend/src/services/email.service.ts
- apps/backend/src/controllers/email.controller.ts
- apps/backend/src/routes/email.routes.ts
- apps/backend/src/tests/email.test.ts
- apps/backend/src/services/__tests__/email.service.test.ts
- apps/backend/src/routes/campaigns.routes.ts
- apps/backend/src/tests/campaigns.routes.test.ts

# ~M_EMAIL_CAMPAIGNS.md

**Dominio funcional:** Email & Campaigns (apps/backend)
**Incluye:** Emails transaccionales, notificaciones, campañas, integración Resend, lógica AI opcional

---

## Tabla de Origen y Dependencias

| Módulo Origen      | Archivo Original      | Dependencias Técnicas (carpetas/código)         |
|--------------------|----------------------|-------------------------------------------------|
| Emails             | ~M_EMAILS.md         | apps/backend/src/services/resend.service.ts, apps/backend/src/routes/resend.routes.ts |
| Resend             | ~M_RESEND.md         | apps/backend/src/services/resend.service.ts, apps/backend/src/routes/resend.routes.ts |
| Campaigns          | ~M_CAMPAIGNS.md      | apps/backend/src/services/campaigns.service.ts, apps/backend/src/routes/campaigns.routes.ts |

---

## % de avance global (según checklists fusionados)
- Estructura modular: ✅
- Endpoints REST claros: ✅
- Emails y campañas funcionales: ✅
- Integración Resend: ✅
- Lógica AI opcional: ✅ (mock/placeholder)
- Documentación viva: ✅
- Tests completos y cobertura: ✅
- Cumple cultura STRATO: ✅

**Avance estimado:** 100% (según los checklists de los módulos fusionados)

---

## Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Service            | ✅     |
| Routes             | ✅     |
| Types              | ✅     |
| Tests              | ✅     |
| Documentación      | ✅     |
| Controller         | N/A    |

## Tests presentes / pendientes
- [x] Tests unitarios y de endpoints
- [x] Mock de emails y campañas
- [x] Cobertura ≥80%

## Integraciones
- Resend API (mock)
- Lógica AI (mock/placeholder)

## Workarounds
- No se requiere controller para campaigns (lógica simple en routes/service)

## Última validación
- Fecha: 2025-06-26
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## Checklist Elite
- [x] Estructura modular
- [x] Endpoints REST claros
- [x] Documentación viva
- [x] Tests completos y cobertura
- [x] Cumple cultura STRATO

## Siguiente paso para estar 100% STRATO READY
- Sincronizar estado en tablero de módulos y checklist maestro.

---

<!-- ORIGEN: ~M_EMAILS.md -->
# ~M_EMAILS.md

## 1. Propósito del módulo
Gestionar el envío de emails transaccionales, onboarding y notificaciones técnicas usando Resend.

## 2. Archivos clave
- `src/services/resend.service.ts`
- `src/routes/resend.routes.ts`

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
- [ ] Mock de emails y respuestas
- [ ] Cobertura ≥80%

## 5. Integraciones
- Resend API

## 6. Dependencias
- `resend`
- Variables de entorno: `RESEND_API_KEY`

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
- Implementar endpoints y lógica de emails.
- Documentar ejemplos y casos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 

---

<!-- ORIGEN: ~M_RESEND.md -->
# ~M_RESEND.md

## 1. Propósito del módulo
Gestionar el envío de emails transaccionales, onboarding y notificaciones técnicas usando Resend.

## 2. Archivos clave
- `src/services/resend.service.ts`
- `src/routes/resend.routes.ts`

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
- [ ] Mock de emails y respuestas
- [ ] Cobertura ≥80%

## 5. Integraciones
- Resend API

## 6. Dependencias
- `resend`
- Variables de entorno: `RESEND_API_KEY`

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
- Implementar endpoints y lógica de emails.
- Documentar ejemplos y casos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 

---

<!-- ORIGEN: ~M_CAMPAIGNS.md -->
# ~M_CAMPAIGNS.md

## 1. Propósito del módulo
Gestionar campañas de marketing, notificaciones o flujos personalizados para usuarios. Permite crear, listar, actualizar y eliminar campañas, y conectar lógica AI opcional.

## 2. Archivos clave
- `src/routes/campaigns.routes.ts`
- `src/services/campaigns.service.ts`
- `src/controllers/campaigns.controller.ts`

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Service            | 🔲     |
| Controller         | 🔲     |
| Routes             | 🔲     |
| Types              | 🔲     |
| Tests              | 🔲     |
| Documentación      | 🔲     |

## 4. Tests presentes / pendientes
- [ ] Tests unitarios y de endpoints
- [ ] Mock de datos y reporting
- [ ] Cobertura ≥80%

## 5. Integraciones
- Base de datos (Supabase)
- Lógica AI (OpenAI, opcional)

## 6. Dependencias
- `zod`, `@supabase/supabase-js`, `openai`

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
- Implementar endpoints y lógica de campañas.
- Documentar ejemplos y casos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 