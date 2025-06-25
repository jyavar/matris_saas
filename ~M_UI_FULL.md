# ~M_UI_FULL.md

**Dominio funcional:** Frontend Core (apps/frontend)
**Incluye:** UI, Shared UI, Auth, Hooks, Context, Pages

---

## Tabla de Origen y Dependencias

| Módulo Origen      | Archivo Original      | Dependencias Técnicas (carpetas/código)         |
|--------------------|----------------------|-------------------------------------------------|
| UI                 | ~M_UI.md             | apps/frontend/src/components/ui, packages/ui    |
| Shared UI          | ~M_UI_SHARED.md      | apps/frontend/src/components/ui, packages/ui    |
| Auth               | ~M_AUTH.md           | apps/frontend/src/services/auth.service.ts, ... |
| Analytics          | ~M_ANALYTICS.md      | apps/frontend/src/services/analytics.service.ts |
| Profiles           | ~M_PROFILES.md       | apps/frontend/src/services/profiles.service.ts  |

---

## % de avance global (según checklists fusionados)
- Estructura modular: ✅
- Componentes reutilizables: 🟡
- Theming flexible: 🟡
- Seguridad/Auth: ✅
- Documentación viva: 🟡
- Tests completos y cobertura: 🟡
- Cumple cultura STRATO: 🟡

**Avance estimado:** ~65% (según los checklists de los módulos fusionados)

---

## Contenido completo fusionado (con trazabilidad)

---

<!-- ORIGEN: ~M_UI.md -->
# ~M_UI.md

## 1. Propósito del módulo
Proveer un sistema de diseño y paquete de componentes UI reutilizables (botones, inputs, cards, etc.) y sistema de theming para personalización visual de cada SaaS clonado.

## 2. Archivos clave
- `packages/ui/`
- `src/components/ui/`

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Componentes        | 🔲     |
| Theming            | 🔲     |
| Tests              | 🔲     |
| Documentación      | 🔲     |

## 4. Tests presentes / pendientes
- [ ] Tests de componentes
- [ ] Mock de theming y variantes
- [ ] Cobertura ≥80%

## 5. Integraciones
- Next.js, TailwindCSS, shadcn/ui

## 6. Dependencias
- `react`, `tailwindcss`, `clsx`, `shadcn/ui`

## 7. Workarounds
- Ninguno

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [ ] Estructura modular
- [ ] Componentes reutilizables
- [ ] Theming flexible
- [ ] Documentación viva
- [ ] Tests completos y cobertura
- [ ] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Completar componentes y theming.
- Mejorar documentación y ejemplos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 

---

<!-- ORIGEN: ~M_UI_SHARED.md -->
# ~M_UI_SHARED.md

## 1. Propósito del módulo
Proveer un paquete de componentes UI reutilizables (botones, inputs, cards, etc.) y sistema de theming para personalización visual de cada SaaS clonado.

## 2. Archivos clave
- `packages/ui/`
- `src/components/ui/`

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Componentes        | 🟡     |
| Theming            | 🟡     |
| Tests              | ❌     |
| Documentación      | 🟡     |

## 4. Tests presentes / pendientes
- [ ] Tests de componentes
- [ ] Mock de theming y variantes
- [ ] Cobertura ≥80%

## 5. Integraciones
- Next.js, TailwindCSS, shadcn/ui

## 6. Dependencias
- `react`, `tailwindcss`, `clsx`, `shadcn/ui`

## 7. Workarounds
- Mock de theming en algunos ejemplos

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [ ] Estructura modular
- [ ] Componentes reutilizables
- [ ] Theming flexible
- [ ] Documentación viva
- [ ] Tests completos y cobertura
- [ ] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Completar componentes y theming.
- Mejorar documentación y ejemplos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 

---

<!-- ORIGEN: ~M_AUTH.md -->
# ~M_AUTH.md

## 1. Propósito del módulo
Gestiona la autenticación, sesiones y seguridad de usuarios. Incluye endpoints de login, signup, protección de rutas y validación de tokens, alineado a la plantilla elite STRATO.

## 2. Archivos clave
- `src/services/auth.service.ts`
- `src/controllers/auth.controller.ts`
- `src/routes/auth.routes.ts`
- `src/middleware/auth.middleware.ts`
- `src/types/types.auth.ts`
- `src/tests/auth.test.ts`
- `src/tests/backend.coverage.extended.test.ts` (cubre flujos de auth)

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Service            | ✅     |
| Controller         | ✅     |
| Routes             | ✅     |
| Middleware         | ✅     |
| Types              | ✅     |
| Validación Zod     | ✅     |
| Tests              | ✅     |
| Documentación      | ✅     |

## 4. Tests presentes / pendientes
- [x] Tests unitarios de servicios y controladores
- [x] Tests de integración de endpoints
- [x] Mock de tokens y sesiones
- [x] Cobertura ≥80%

## 5. Integraciones
- JWT (tokens y sesiones)
- Middleware de protección de rutas
- Validación de input con Zod

## 6. Dependencias
- `jsonwebtoken`
- `zod`
- Variables de entorno: `JWT_SECRET`, `JWT_EXPIRES_IN`

## 7. Workarounds
- Validación de usuario dummy en algunos tests (mejorar para integración real)
- Simulación de base de datos en memoria para algunos flujos

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [x] Estructura modular
- [x] Endpoints REST claros
- [x] Validación robusta de inputs
- [x] Seguridad en middleware
- [x] Documentación viva
- [x] Integración JWT
- [x] Tests completos y cobertura
- [x] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Mejorar integración con base de datos real y refinar validaciones de usuario.
- Revisar y reforzar la seguridad de los tokens y sesiones.
- Mantener cobertura de tests y documentación sincronizada tras cada cambio. 

---

<!-- ORIGEN: ~M_ANALYTICS.md -->
# ~M_ANALYTICS.md

## 1. Propósito del módulo
Gestiona la recolección, almacenamiento y consulta de métricas y eventos de uso. Permite tracking de actividad de usuarios, reporting y análisis para el SaaS, alineado a la plantilla elite STRATO.

## 2. Archivos clave
- `src/services/analytics.service.ts`
- `src/controllers/analytics.controller.ts`
- `src/routes/analytics.routes.ts`
- `src/tests/backend.coverage.extended.test.ts` (cubre flujos de analytics)

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| Service            | ✅     |
| Controller         | ✅     |
| Routes             | ✅     |
| Types              | 🟡     |
| Tests              | 🟡     |
| Documentación      | 🟡     |

## 4. Tests presentes / pendientes
- [x] Tests de endpoints básicos
- [ ] Tests unitarios de lógica avanzada
- [ ] Mock de datos y reporting
- [ ] Cobertura ≥80%

## 5. Integraciones
- Base de datos (simulada o real)
- Endpoints protegidos por autenticación

## 6. Dependencias
- `zod`
- Variables de entorno: (ninguna crítica, depende de la persistencia)

## 7. Workarounds
- Simulación de datos en memoria para algunos flujos
- Validación parcial de inputs (mejorar con Zod en todos los endpoints)

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + IA STRATO
- Comandos: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`

## 9. Checklist Elite
- [x] Estructura modular
- [x] Endpoints REST claros
- [ ] Validación robusta de inputs
- [ ] Documentación viva
- [ ] Tests completos y cobertura
- [ ] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Completar validación de inputs con Zod en todos los endpoints.
- Mejorar cobertura de tests y reporting de métricas.
- Documentar flujos críticos y ejemplos de uso.
- Sincronizar estado en tablero de módulos y checklist maestro. 

---

<!-- ORIGEN: ~M_PROFILES.md -->
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