# 🚀 StratoSaaS - Plan de Transformación a Matriz

> **Este archivo debe mantenerse sincronizado con ~13_LOGICA_NEGOCIO.md y ~12_CHECKLIST_MAESTRO.md. Cualquier cambio relevante en la matriz debe reflejarse en los tres.**
> 
> **Última sincronización: 2024-06-22**

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