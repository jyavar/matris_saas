# Roadmap de la Matriz SaaS

> **Este archivo debe mantenerse sincronizado con ~13_LOGICA_NEGOCIO.md y ~12_CHECKLIST_MAESTRO.md. Cualquier cambio relevante en la matriz debe reflejarse en los tres.**
> 
> **Última sincronización: 2024-06-22**

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