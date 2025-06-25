<!-- ORIGEN: ~3_MATRIX_ROADMAP.md -->
# 🚀 StratoSaaS - Plan de Transformación a Matriz

> **Este archivo debe mantenerse sincronizado con ~13_LOGICA_NEGOCIO.md y ~12_CHECKLIST_MAESTRO.md.**
> 
> **Última sincronización: 2024-06-25**
> 
> **Hito reciente:** Monorepo conectado y subido a GitHub en main. Estado listo para colaboración y despliegue profesional. URL: https://github.com/jyavar/matris_saas
> 
> **Stack consolidado:** Next.js + React puro.

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

---

Este documento traza la hoja de ruta para convertir este repositorio en una plantilla ("Matriz") robusta, genérica y lista para producción para lanzar nuevos proyectos SaaS.

Cada paso completado será marcado y confirmado en un commit individual para mantener un historial limpio y reversible.

---

## ✅ Fase 0: Planificación (Commit: `docs: create saas matrix transformation roadmap`)

- [x] Crear este archivo `MATRIX_ROADMAP.md` para documentar y seguir el progreso.

---

## Fase 1: Completar y Generalizar el Núcleo de Funcionalidades

El objetivo es tener un sistema de backend completo, seguro y con funcionalidades genéricas listas para cualquier SaaS.

-   **1.1: Implementar Middleware de Autenticación**
    -   [ ] Crear `apps/backend/src/middleware/auth.middleware.ts`.
    -   [ ] Implementar la lógica para extraer y validar el token JWT de Supabase desde las cabeceras `Authorization`.
    -   [ ] Si el token es válido, adjuntar la información del usuario al objeto `Request`.
    -   [ ] Si el token es inválido o no existe, devolver un error `401 Unauthorized`.
    -   [ ] **Commit:** `feat(auth): implement jwt authentication middleware`

-   **1.2: Proteger Rutas y Crear Rutas de Perfil**
    -   [ ] Aplicar el nuevo `authMiddleware` a las rutas de `users` (que se convertirán en `profiles`).
    -   [ ] Crear una ruta protegida `GET /api/v1/users/me` para obtener el perfil del usuario autenticado.
    -   [ ] Actualizar los tests E2E (`auth.test.ts`) para verificar la ruta protegida (casos con y sin token).
    -   [ ] **Commit:** `feat(auth): protect user routes and add /me endpoint`

-   **1.3: Refactorizar `users` a `profiles`**
    -   [ ] Renombrar `users.controller.ts`, `users.service.ts`, y `users.router.ts` a `profiles.*.ts`.
    -   [ ] Crear una tabla `profiles` en la base de datos de Supabase que tenga una relación `one-to-one` con `auth.users`.
    -   [ ] Modificar los servicios para que interactúen con la tabla `profiles` en lugar de una tabla genérica `users`.
    -   [ ] Actualizar todos los schemas, controladores y tests correspondientes.
    -   [ ] **Commit:** `refactor(data): migrate from users entity to profiles`

---

## Fase 2: Automatización y Experiencia de Desarrollador (DX)

El objetivo es que un desarrollador pueda clonar esta matriz y tener un nuevo proyecto SaaS funcionando en minutos.

-   **2.1: Script de Inicialización de Proyecto**
    -   [ ] Crear `scripts/init-project.ts`.
    -   [ ] El script debe ser interactivo (`inquirer` o similar).
    -   [ ] Tareas del script:
        -   [ ] Preguntar el nombre del nuevo proyecto.
        -   [ ] Actualizar el `name` en todos los `package.json`.
        -   [ ] Actualizar `pnpm-workspace.yaml`.
        -   [ ] Copiar `.env.example` a `.env` e instruir al usuario para que lo rellene.
        -   [ ] (Opcional) Limpiar el historial de `git` y crear un commit inicial.
    -   [ ] Añadir el script a `package.json` como `pnpm run project:init`.
    -   [ ] **Commit:** `feat(dx): create interactive project initialization script`

-   **2.2: Seeding de Base de Datos**
    -   [ ] Crear un script (`pnpm run db:seed`) que utilice Supabase para poblar la base de datos con datos esenciales.
    -   [ ] Ejemplos: roles de usuario, un usuario administrador de prueba, etc.
    -   [ ] La configuración del seed debe estar en un archivo legible (JSON o TS).
    -   [ ] **Commit:** `feat(db): implement database seeding script`

---

## Fase 3: Documentación Exhaustiva

Una plantilla es tan buena como su documentación.

-   **3.1: Crear `TEMPLATE_README.md`**
    -   [ ] Crear un archivo `TEMPLATE_README.md` que servirá como la plantilla para el README del nuevo proyecto.
    -   [ ] El script `project:init` deberá renombrar este archivo a `README.md`.
    -   [ ] El `README` debe incluir:
        -   [ ] Filosofía y decisiones de arquitectura.
        -   [ ] Guía de inicio rápido (`git clone` -> `pnpm install` -> `pnpm dev`).
        -   [ ] Descripción de todos los scripts (`dev`, `test`, `lint`, `audit`, `guardian`).
        -   [ ] Guía de contribución (cómo añadir rutas, cómo funciona el Context Guard, etc.).
    -   [ ] **Commit:** `docs(template): create comprehensive project readme template`

---

## Fase 4: Finalización y Distribución

-   **4.1: Limpieza Final**
    -   [ ] Revisar y eliminar cualquier código, log o artefacto específico del desarrollo de la matriz.
    -   [ ] Asegurarse de que todos los tests pasan y que el build es limpio.
    -   [ ] **Commit:** `chore(template): final cleanup before release`

-   **4.2: Convertir a Repositorio Plantilla de GitHub**
    -   [ ] Ir a la configuración del repositorio en GitHub.
    -   [ ] Marcar la casilla "Template repository".
    -   [ ] **Acción Manual** 

<!-- ORIGEN: ~7_SAAS_MATRIX_ROADMAP.md -->
# Roadmap de la Matriz SaaS

> **Este archivo debe mantenerse sincronizado con ~13_LOGICA_NEGOCIO.md y ~12_CHECKLIST_MAESTRO.md.**
> 
> **Última sincronización: 2024-06-25**
> 
> **Hito reciente:** Monorepo conectado y subido a GitHub en main. Estado listo para colaboración y despliegue profesional. URL: https://github.com/jyavar/matris_saas
> 
> **Stack consolidado:** Next.js + React puro.

## Visión

El objetivo de este proyecto no es construir un único producto, sino una **fábrica de productos**: una Matriz SaaS que nos permita clonar, configurar y lanzar nuevos productos SaaS de forma rápida, segura y estandarizada.

La arquitectura y filosofía **STRATO SAFE STACK™** están diseñadas explícitamente para este propósito.

---

## Módulos Clave de la Matriz

Para que la plataforma esté completa y lista para ser clonada, debemos desarrollar los siguientes módulos como paquetes reutilizables dentro de la carpeta `packages/`.

### 1. Módulo de Autenticación y Autorización (AuthN/AuthZ)
- **Descripción:** Lógica completa de registro, inicio de sesión, cierre de sesión, y recuperación de contraseña. Incluirá la gestión de roles y permisos (ej: `admin`, `miembro`, `invitado`).
- **Estado:** 🚧 **Pendiente**
- **Prioridad:** **Crítica**

### 2. Módulo de Multi-Tenancy (Aislamiento de Clientes)
- **Descripción:** Implementar el mecanismo que asegura que los datos de un cliente (tenant) sean completamente inaccesibles para otros. Con Supabase, esto se logrará mediante **Row-Level Security (RLS)**.
- **Estado:** 🚧 **Pendiente**
- **Prioridad:** **Crítica**

### 3. Módulo de Facturación (Billing)
- **Descripción:** Integración con un proveedor de pagos como **Stripe**. Incluirá la creación de planes de suscripción, gestión de pagos, y manejo de webhooks para eventos clave (pago exitoso/fallido, cancelación).
- **Estado:** 🚧 **Pendiente**
- **Prioridad:** **Alta**

### 4. Módulo de UI Compartida y Theming
- **Descripción:** Un paquete (`packages/ui`) que contenga todos los componentes de React (Botones, Inputs, Cards, etc.). Debe incluir un sistema de "theming" para personalizar la apariencia (logo, colores) de cada SaaS clonado editando un único archivo de configuración.
- **Estado:** 🚧 **Pendiente**
- **Prioridad:** **Media**

### 5. Módulo de Administración (Admin Dashboard)
- **Descripción:** Un panel de control interno para los operadores de la matriz. Permitirá ver estadísticas de uso, gestionar usuarios de todos los tenants, y configurar aspectos globales de las aplicaciones.
- **Estado:** 🚧 **Pendiente**
- **Prioridad:** **Media**

---

## Proceso de Lanzamiento de un Nuevo SaaS

Una vez que estos módulos estén completos, el proceso para lanzar un nuevo producto será:

1.  Clonar el repositorio de la matriz.
2.  Configurar el "tema" (colores, fuentes, logo).
3.  Definir los planes de suscripción en Stripe y en la configuración.
4.  Desplegar en la infraestructura de producción.
5.  ¡Lanzar! 