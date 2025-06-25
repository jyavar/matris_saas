# ~M_PROFILES.md

## 1. Propósito del módulo
Gestiona la creación, edición y consulta de perfiles de usuario. Permite actualizar datos personales, consultar el perfil propio y de otros, y soporta validaciones y seguridad, alineado a la plantilla elite STRATO.

## 2. Archivos clave
- `src/services/profiles.service.ts`
- `src/controllers/profiles.controller.ts`
- `src/routes/profiles.routes.ts`
- `src/types/types.profiles.ts`
- `src/tests/backend.coverage.extended.test.ts` (cubre flujos de profiles)

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Service            | ✅     |
| Controller         | ✅     |
| Routes             | ✅     |
| Types              | ✅     |
| Tests              | ✅     |
| Documentación      | ✅     |

## 4. Tests presentes / pendientes
- [x] Tests unitarios de servicios y controladores
- [x] Tests de integración de endpoints
- [x] Mock de datos y validaciones
- [x] Cobertura ≥80%

## 5. Integraciones
- Base de datos (simulada o real)
- Endpoints protegidos por autenticación

## 6. Dependencias
- `zod`
- Variables de entorno: (ninguna crítica, depende de la persistencia)

## 7. Workarounds
- Simulación de base de datos en memoria para algunos flujos
- Validación de usuario dummy en algunos tests

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [x] Estructura modular
- [x] Endpoints REST claros
- [x] Validación robusta de inputs
- [x] Documentación viva
- [x] Tests completos y cobertura
- [x] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Mejorar integración con base de datos real y refinar validaciones de usuario.
- Mantener cobertura de tests y documentación sincronizada tras cada cambio. 