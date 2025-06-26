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
  "status": "70%",
  "pending": {
    "services": ["Implementar scheduling de jobs", "Endpoints de control de runtime", "Orquestación de agentes"],
    "tests": ["Cobertura de runtime y orquestador"],
    "docs": ["Ejemplos de uso y flujos de orquestación"]
  },
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
**Incluye:** Scheduling, ejecución de jobs, orquestación de agentes, endpoints de control, integración con Control Tower

---

## Tabla de Origen y Dependencias

| Módulo Origen      | Archivo Original      | Dependencias Técnicas (carpetas/código)         |
|--------------------|----------------------|-------------------------------------------------|
| Runtime Service    | ~M_RUNTIME.md        | apps/backend/src/services/runtime.service.ts, apps/backend/src/routes/runtime.routes.ts |
| Orchestrator Agent | ~M_ORCHESTRATOR.md   | scripts/agents/orchestrator.ts |
| Control Tower      | ~M_CONTROL_TOWER.md  | apps/web/src/app/control-tower/runtime/ |

---

## % de avance global (según checklists fusionados)
- Estructura modular: ☑️
- Endpoints REST claros: ☑️
- Scheduling y ejecución funcional: 🔲
- Orquestación de agentes: 🔲
- Integración con Control Tower: 🔲
- Documentación viva: 🔲
- Tests completos y cobertura: 🔲
- Cumple cultura STRATO: ☑️

**Avance estimado:** ~70%

---

## Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Service            | ☑️     |
| Routes             | ☑️     |
| Orchestrator       | 🔲     |
| Control Tower UI   | 🔲     |
| Tests              | 🔲     |
| Documentación      | 🔲     |

---

## Checklist Elite
- [x] Estructura modular
- [x] Endpoints REST claros
- [ ] Scheduling y ejecución funcional
- [ ] Orquestación de agentes
- [ ] Integración con Control Tower
- [ ] Documentación viva
- [ ] Tests completos y cobertura
- [x] Cumple cultura STRATO

---

## Siguiente paso para estar 100% STRATO READY
- Implementar scheduling de jobs y orquestación de agentes.
- Integrar con Control Tower (UI y backend).
- Escribir tests unitarios y de endpoints.
- Documentar ejemplos de uso y flujos de orquestación.
- Sincronizar estado en tablero de módulos y checklist maestro.

---

## Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test` 