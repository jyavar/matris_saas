<!-- ORIGEN: ~5_PLAYBOOK.md -->
# PLAYBOOK STRATO – FUNDADOR SOLO 10/10™


Guía de inicio limpio para cualquier clon SaaS. Blindaje estructural desde el minuto 1. Escudo contra deuda técnica, errores invisibles y caos arquitectónico. Manual operativo para ti, agentes AI y cualquier desarrollador que se sume.

---

## ESTRUCTURA DEL PLAYBOOK

1. Setup Base Blindado
2. Guardias Técnicos Activos
3. Estrategia Modular Clonable
4. Flujo Real de Desarrollo AI-Assistido
5. Validaciones, Reporting y Alertas
6. Reglas de Oro para el Founder
7. Desarrollo Funcional Robusto (Frontend y Backend)
8. Integraciones Estratégicas y Capas de AI
9. Escalabilidad Real y Multi-SaaS
10. Comercialización, Pricing y Control Operativo
11. Sistema Modular de Productos SaaS
12. Sistema de AI Interna y Orquestación Avanzada

---### SECCIÓN 1 – Setup Base Blindado

Antes de escribir una sola línea de código:
- Crear repo nuevo con plantilla STRATO Core OS™ (monorepo, tsconfig.base.json estricto, ESLint, Prettier, .gitignore)
- Instalar defensas automáticas: Husky, lint-staged, commitlint, scripts de validación
- Configurar CI/CD desde el inicio (GitHub Actions, workflows por carpeta)
- Conexiones core: Supabase, Stripe, Resend conectados con tipado estricto
- .env.example obligatorio y validado

---
### SECCIÓN 2 – Guardias Técnicos Activos

- Pre-commit: Lint + Prettier + tsc sin errores, bloquea commits inseguros
- CI/CD Layer: Validaciones estrictas de tipos + test unitarios, rechaza merge si no pasan los checks
- Runtime Defense System™: Scripts de defensa, logs estructurados
- Autofix Agents: Agentes de corrección y QA activables en CI o manualmente

---

### SECCIÓN 3 – Estrategia Modular Clonable

- Todo módulo debe ser independiente, clonable y auditable
- Cada nuevo SaaS parte con create-saas-clone.ts, personalización mínima y módulos activables

### SECCIÓN 4 – Flujo Real de Desarrollo AI-Assistido

- Estrategia Prompt a Prompt (Cursor, Copilot, GPT)
- Prohibido hacer commits sin haber corrido validaciones y tests
- Ramas: feat/experimento, prod/estable; nunca subir a main sin snapshot y revisión

### SECCIÓN 5 – Validaciones, Reporting y Alertas

- Scripts obligatorios por módulo: validate-module.ts, audit-lint.ts, report-health.ts, generate-snapshot.ts
- Reporting estructurado en audit-artifacts/reports/
- Dashboard STRATO CONTROL TOWER™ para visualizar estado técnico

### SECCIÓN 6 – Reglas de Oro para el Founder

1. Nunca subestimes un bug oculto: costará 5x más después.
2. Toda funcionalidad debe tener test, validación y rollback posible.
3. No existe módulo "simple": todos pasan por defensa estructural.
4. No desarrolles de noche sin CI activo y control de versiones claro.
5. Si una feature tarda más de 2h sin feedback, detén, audita y reestructura.
6. Siempre ten al menos un agente validando cada push.

### SECCIÓN 7 – Desarrollo Funcional Robusto (Frontend y Backend)

- Frontend: Componentes UI reutilizables, rutas productivas, validaciones visuales, dark mode, loading states, conexión API tipada
- Backend: Endpoints REST seguros, integración real con servicios externos, logging estructurado, middleware de autorización, tests unitarios y E2E
- Interconexión API real: Tipado por endpoint, seguridad en cada request, validación manual y automática de flujos

### SECCIÓN 8 – Integraciones Estratégicas y Capas de AI

- OpenAI/LLM Layer: Cliente OpenAI como servicio, agentes por módulo, embeddings, prompts modulares
- Integraciones: Stripe, Supabase, Resend, GitHub, PostHog/Amplitude


### SECCIÓN 9 – Escalabilidad Real y Multi-SaaS

- Soporte multi-tenant, validación de sesión con tenantId/org_id, dashboard multi-instancia
- Sistema de clonación inteligente, templates preconfigurados, orquestador de agentes


### SECCIÓN 10 – Comercialización, Pricing y Control Operativo

- Planes y precios desde Stripe Dashboard, enforcement real, fallback visual, sistema de lanzamientos, métricas y control operativo, documentación pública y soporte AI


### SECCIÓN 11 – Sistema Modular de Productos SaaS

- Matriz de módulos estratégicos y complementarios, ciclo de vida blindado, validación y reporting por módulo

### SECCIÓN 12 – Sistema de AI Interna y Orquestación Avanzada

- AI Runtime Layer™: Multi-agente modular, scripts y memoria local, auditoría continua
- AI Prompt Layer™: Prompts modulares, inyección de contexto, feedback y refactor automatizado

## REGLAS Y RESTRICCIONES DEL STACK STRATO SAFE

### ✅ COSAS QUE DEBES HACER (STACK OFICIAL)
- Usa pnpm y pnpm-workspace.yaml bien definido
- tsconfig.base.json en raíz y extendido en todos los módulos
- Usa tsx para ejecutar .ts sin transpilar
- Vitest solo en frontend o utils
- Backend: tsup o tsc como bundler
- Monorepo: frontend/, backend/, packages/, agents/
- Cada módulo con su package.json, tsconfig.json, vitest.config.ts
- Usa zod como validador único
- shadcn/ui + TailwindCSS en frontend
- clsx para clases
- turbo para orquestación de scripts
- audit:full como script único de validación
- Integrar audit:full en CI/CD
- Paquetes centrales: @repo/typescript-config, @repo/eslint-config
- ESLint con parserOptions.project
- Tipado estricto en todo el sistema
- Tests en todos los módulos
- Cero any, eslint-disable, @ts-ignore (auditable)
- Logging estructurado, sin console.log
- Rutas con alias, nunca ../

### ❌ COSAS QUE NO PUEDES USAR (BLACKLIST)
- No uses vitest en backend
- No uses vite como bundler backend
- No uses babel, ts-node, esbuild crudo
- No uses yarn, npm (solo pnpm)
- No uses patch-package
- No uses eslint-disable, @ts-ignore, any
- No uses ../ como rutas de import
- No uses class-validator, typeorm, mongoose sin validación externa
- No uses UI frameworks cerrados (Chakra, MUI)
- No uses redux, react-router, recoil, zustand
- No uses console.log en producción
- No uses agentes sin tests ni package.json
- No uses pnpm sin packageManager declarado
- No uses pnpm sin definir workspaces correctamente
- No ignores los errores de CI o fallas de audit:full
- No permitas CI sin auditoría completa automatizada
- No uses dependencias sin declarar
- No ejecutes node archivo.ts directamente
- No uses alias no resueltos en tsconfig.json

### Instrucciones Finales para el Sistema AI
- Antes de crear cualquier archivo, valida si las reglas están correctamente inicializadas.
- Si algún paso no se puede ejecutar por problemas estructurales, no continúes. Devuelve un error y explica qué está mal.
- Cada carpeta debe tener tests mínimos, sin ellos el sistema se considera incompleto.
- La primera acción será crear la raíz del monorepo con estructura segura (apps/, packages/, etc.).
- Asegúrate de que la estructura de tipos y la inferencia se mantengan en todo el sistema.

---

### 🔄 Sincronización técnica y de proceso (Strato AI Monorepo)

**Última actualización:** 2024-06-25 22:07 CLT  
**Hito:** Tests unitarios robustos, lint 0 errores, context guard solo valida archivos existentes, commit exitoso.  
**Workaround aplicado:** El Context Guard fue ajustado para validar solo archivos que existen físicamente, evitando bloqueos por archivos eliminados o fantasmas en el index.  
**Tests:** Todos los tests unitarios pasan (mock de fetch robusto), lint y typecheck 100% OK, estructura alineada, sin deuda técnica.  
**Tests E2E:** Excluidos de Vitest, listos para Playwright.  
**Porcentaje de sanidad global:** **100%**

- **Referencia cruzada:**  
  - [~13_LOGICA_NEGOCIO.md](~13_LOGICA_NEGOCIO.md)  
  - [~10_CHECKLIST_FULL_STRATO.md](~10_CHECKLIST_FULL_STRATO.md)  
  - [~14_REGLAS_DE_ORO.md](~14_REGLAS_DE_ORO.md)

**Advertencia:**  
Esta sincronización debe mantenerse viva y reflejar cualquier cambio relevante en la lógica de negocio, estructura, tests o reglas de oro.  
Si se realiza un cambio importante en los tests, context guard, estructura o reglas, debe actualizarse este bloque en los 14 archivos MD de la raíz.


> **Última sincronización: 2024-06-25**
> 
> **Hito reciente:** Monorepo conectado y subido a GitHub en main. Estado listo para colaboración y despliegue profesional. URL: https://github.com/jyavar/matris_saas
> 
> **Stack consolidado:** Next.js + React puro.


### **🧠 Instrucciones para el sistema AI:**

Eres un arquitecto técnico senior. Vas a crear un repositorio nuevo siguiendo las reglas de arquitectura **STRATO SAFE STACK™**. Debes cumplir estas condiciones estrictas:

---

### **✅ COSAS QUE**

### **DEBES HACER**

### **(STACK OFICIAL – 50 YES)**

- Usa pnpm con pnpm-workspace.yaml bien definido
- Configura un tsconfig.base.json en la raíz y extiéndelo en todos los módulos
- Usa tsx para ejecutar archivos .ts sin transpilar
- Usa vitest solo en frontend o utils (no en backend)
- Para backend, usa tsup o tsc como bundler
- Estructura como monorepo: frontend/, backend/, packages/, agents/
- Cada módulo debe tener su propio package.json, tsconfig.json, vitest.config.ts (si aplica)
- Usa zod como validador único de esquema
- Usa shadcn/ui con TailwindCSS para el frontend
- Usa clsx para composición de clases
- Integra turbo para orquestación de scripts (test, build, lint)
- Ejecuta pnpm audit:full como script único de validación
- Integra audit:full en CI/CD como paso obligatorio
- Usa @repo/typescript-config, @repo/eslint-config como paquetes centrales
- Usa eslint con parsing basado en parserOptions.project
- Tipado estricto en todo el sistema (noImplicitAny, strict, noUncheckedIndexAccess)
- Tests en todos los módulos, mínimo 1 por agente
- Cero any, eslint-disable, @ts-ignore (auditable)
- Logging estructurado, sin console.log
- Rutas con alias (@/modules/...), nunca con ../

---

### **❌ COSAS QUE**

### **NO PUEDES USAR**

### **(BLACKLIST – 50 NO)**

- ❌ No uses vitest en backend
- ❌ No uses vite como bundler backend
- ❌ No uses babel, ts-node, esbuild crudo
- ❌ No uses yarn, npm (solo pnpm)
- ❌ No uses patch-package
- ❌ No uses eslint-disable, @ts-ignore, any
- ❌ No uses ../ como rutas de import
- ❌ No uses class-validator, typeorm, mongoose sin validación externa
- ❌ No uses UI frameworks cerrados (Chakra, MUI)
- ❌ No uses redux, react-router, recoil, zustand
- ❌ No uses console.log en producción
- ❌ No uses agentes sin tests ni package.json
- ❌ No uses pnpm sin packageManager declarado
- ❌ No uses pnpm sin definir workspaces correctamente
- ❌ No ignores los errores de CI o fallas de audit:full
- ❌ No permitas CI sin auditoría completa automatizada
- ❌ No uses dependencias sin declarar (require sin import, etc.)
- ❌ No ejecutes node archivo.ts directamente
- ❌ No uses alias no resueltos en tsconfig.json
- ✅ Se permite Vitest en backend y frontend para unificar tooling, acelerar el desarrollo y mejorar la DX. Si surge una limitación real, se reevalúa.

---

### **📌 Instrucciones Finales para el Sistema AI:**

- Antes de crear cualquier archivo, valida si las reglas están correctamente inicializadas.
- Si algún paso no se puede ejecutar por problemas estructurales, no continúes. Devuelve un error y explica qué está mal.
- Cada carpeta debe tener tests mínimos, sin ellos el sistema se considera incompleto.
- La primera acción será crear la raíz del monorepo con estructura segura (apps/, packages/, etc.).
- Asegúrate de que la estructura de tipos y la inferencia se mantengan en todo el sistema.

--- 