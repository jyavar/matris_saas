<!--
STRATO MODULE HEADER
{
  "module": "RUNTIME",
  "objective": "Orquestar la ejecución, scheduling y lógica central de agentes, jobs y procesos internos del monorepo STRATO.",
  "paths": [
    "apps/backend/src/services/runtime.service.ts",
    "apps/backend/src/routes/runtime.routes.ts",
    "scripts/agents/orchestrator.ts",
    "apps/web/src/app/control-tower/runtime/"
  ],
  "deps": ["zod", "node-cron", "typescript", "next", "react"],
  "status": "100%",
  "last_synced": "2025-06-26",
  "last_validated": "2025-06-26",
  "responsible": "José + IA STRATO",
  "rules": {
    "no-any": true,
    "strict-types": true,
    "eslint": "on",
    "context-guard": "on"
  }
}
-->
# ~M_RUNTIME.md

**Dominio funcional:** Runtime & Orquestación (apps/backend, scripts/agents, apps/web)
**Incluye:** Scheduling, ejecución de jobs, orquestación de agentes, endpoints de control, integración con Control Tower (opcional)

---

## Tabla de Origen y Dependencias

| Módulo Origen      | Archivo Original      | Dependencias Técnicas (carpetas/código)         |
|--------------------|----------------------|-------------------------------------------------|
| Runtime Service    | ~M_RUNTIME.md        | apps/backend/src/services/runtime.service.ts, apps/backend/src/routes/runtime.routes.ts |
| Orchestrator Agent | ~M_ORCHESTRATOR.md   | scripts/agents/orchestrator.ts |
| Control Tower      | ~M_CONTROL_TOWER.md  | apps/web/src/app/control-tower/runtime/ |

---

## % de avance global (según checklists fusionados)
- Estructura modular: ✅
- Endpoints REST claros: ✅
- Scheduling y ejecución funcional: ✅
- Orquestación de agentes: ✅
- Integración con Control Tower: (opcional, fullstack)
- Documentación viva: ✅
- Tests completos y cobertura: ✅
- Cumple cultura STRATO: ✅

**Avance estimado:** 100%

---

## Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Service            | ✅     |
| Routes             | ✅     |
| Orchestrator       | ✅     |
| Control Tower UI   | (opcional) |
| Tests              | ✅     |
| Documentación      | ✅     |

---

## Checklist Elite
- [x] Estructura modular
- [x] Endpoints REST claros
- [x] Scheduling y ejecución funcional
- [x] Orquestación de agentes
- [x] Integración con Control Tower (opcional)
- [x] Documentación viva
- [x] Tests completos y cobertura
- [x] Cumple cultura STRATO

---

## Siguiente paso para mantener 100% STRATO READY
- Mantener cobertura, checklist y docs tras cada cambio.

---

## Última validación
- Fecha: 2025-06-26
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test` 