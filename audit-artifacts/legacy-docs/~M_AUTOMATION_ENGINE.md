<!--
STRATO MODULE HEADER
{
  "module": "AUTOMATION_ENGINE",
  "objective": "Automatizar onboarding, agentes IA, scripts y lógica avanzada (OpenAI, CLI, onboarding)",
  "paths": [
    "apps/backend/src/services/openai.service.ts",
    "apps/backend/src/routes/openai.routes.ts",
    "scripts/init-project.ts",
    "scripts/validate-backend.ts",
    "apps/backend/src/services/onboarding.service.ts",
    "apps/backend/src/routes/onboarding.routes.ts"
  ],
  "deps": ["openai", "inquirer", "typescript", "zod", "resend"],
  "status": "20%",
  "pending": {
    "services": ["Implementar endpoints IA", "Completar scripts CLI"],
    "tests": ["Cobertura onboarding y scripts"],
    "docs": ["Ejemplos de uso"]
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
- apps/backend/src/services/openai.service.ts
- apps/backend/src/routes/openai.routes.ts
- scripts/init-project.ts
- scripts/validate-backend.ts
- apps/backend/src/services/onboarding.service.ts
- apps/backend/src/routes/onboarding.routes.ts

# ~M_AUTOMATION_ENGINE.md

**Dominio funcional:** Task Engine & Automatización (apps/backend)
**Incluye:** Agentes IA, scripts, onboarding, automatización, integración OpenAI

---

## Tabla de Origen y Dependencias

| Módulo Origen      | Archivo Original      | Dependencias Técnicas (carpetas/código)         |
|--------------------|----------------------|-------------------------------------------------|
| OpenAI             | ~M_OPENAI.md         | apps/backend/src/services/openai.service.ts, apps/backend/src/routes/openai.routes.ts |
| Scripts            | ~M_SCRIPTS.md        | scripts/init-project.ts, scripts/validate-backend.ts |
| Onboarding         | ~M_ONBOARDING.md     | apps/backend/src/services/onboarding.service.ts, apps/backend/src/routes/onboarding.routes.ts |

---

## % de avance global (según checklists fusionados)
- Estructura modular: 🔲
- Endpoints REST claros: 🔲
- Automatización y scripts funcionales: 🔲
- Integración OpenAI: 🔲
- Onboarding robusto: 🔲
- Documentación viva: 🔲
- Tests completos y cobertura: 🔲
- Cumple cultura STRATO: 🔲

**Avance estimado:** ~20% (según los checklists de los módulos fusionados)

---

## Contenido completo fusionado (con trazabilidad)

---

<!-- ORIGEN: ~M_OPENAI.md -->
# ~M_OPENAI.md

## 1. Propósito del módulo
Integrar capacidades de IA (OpenAI) para agentes, prompts, generación de texto y lógica avanzada en el SaaS.

## 2. Archivos clave
- `src/services/openai.service.ts`
- `src/routes/openai.routes.ts`

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
- [ ] Mock de prompts y respuestas
- [ ] Cobertura ≥80%

## 5. Integraciones
- OpenAI API

## 6. Dependencias
- `openai`
- Variables de entorno: `OPENAI_API_KEY`

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
- Implementar endpoints y lógica de IA.
- Documentar ejemplos y casos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 

---

<!-- ORIGEN: ~M_SCRIPTS.md -->
# ~M_SCRIPTS.md

## 1. Propósito del módulo
Automatizar el onboarding, setup y clonación de nuevos SaaS mediante scripts CLI y utilidades internas.

## 2. Archivos clave
- `scripts/init-project.ts`
- `scripts/validate-backend.ts`

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| CLI                | 🔲     |
| Scripts            | 🔲     |
| Tests              | 🔲     |
| Documentación      | 🔲     |

## 4. Tests presentes / pendientes
- [ ] Tests de scripts CLI
- [ ] Mock de setup y validaciones
- [ ] Cobertura ≥80%

## 5. Integraciones
- Node.js, pnpm

## 6. Dependencias
- `inquirer`, `pnpm`, `typescript`

## 7. Workarounds
- Ninguno

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [ ] Estructura modular
- [ ] CLI funcional
- [ ] Documentación viva
- [ ] Tests completos y cobertura
- [ ] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Completar scripts y CLI de onboarding.
- Documentar ejemplos y casos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 

---

<!-- ORIGEN: ~M_ONBOARDING.md -->
# ~M_ONBOARDING.md

## 1. Propósito del módulo
Gestionar los flujos de alta de usuario, bienvenida y activación inicial para nuevos clientes y usuarios del SaaS.

## 2. Archivos clave
- `src/services/onboarding.service.ts`
- `src/routes/onboarding.routes.ts`

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
- [ ] Mock de flujos de onboarding
- [ ] Cobertura ≥80%

## 5. Integraciones
- Base de datos
- Emails (Resend)

## 6. Dependencias
- `zod`, `resend`

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
- Implementar endpoints y lógica de onboarding.
- Documentar ejemplos y casos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 