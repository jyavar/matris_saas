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