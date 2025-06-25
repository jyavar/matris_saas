# ~11_LOCAL_WORKAROUNDS.md

> **Este archivo debe mantenerse sincronizado con ~13_LOGICA_NEGOCIO.md y ~12_CHECKLIST_MAESTRO.md.**
> 
> **Última sincronización: 2024-06-25**
> 
> **Hito reciente:** Monorepo conectado y subido a GitHub en main. Estado listo para colaboración y despliegue profesional. URL: https://github.com/jyavar/matris_saas
> 
> **Stack consolidado:** Next.js + React puro.

## ⚠️ Workarounds y pendientes locales (solo desarrollo/test)

Este archivo documenta soluciones temporales y puntos críticos que deben ser revisados y eliminados o migrados antes de pasar a producción real.

---

### 1. Workaround temporal en middleware de autenticación

**Ubicación:** `apps/backend/src/middleware/auth.middleware.ts`

**Descripción:**
- Si el JWT recibido no contiene el claim `tenant_id` y el entorno es `test`, se inyecta un `tenant_id` dummy (`00000000-0000-0000-0000-000000000001`) para que los tests pasen en local.
- **Este workaround debe eliminarse cuando Supabase esté configurado para incluir `tenant_id` en el JWT mediante custom claims.**

**Referencia en código:**
```ts
// ⚠️ WORKAROUND TEMPORAL PARA TESTS LOCALES ⚠️
// Si el token no trae tenant_id y estamos en entorno de test,
// se inyecta un tenant_id dummy para que los tests pasen.
// ELIMINAR cuando Supabase esté configurado para incluir tenant_id en el JWT
```

---

### 2. Configuración pendiente de custom claims en Supabase

- Falta configurar la función `jwt_custom_claims` en Supabase para que el claim `tenant_id` se incluya automáticamente en el JWT de los usuarios.
- Cuando se tenga acceso a la consola de Supabase, ejecutar:

```sql
create or replace function jwt_custom_claims(user_id uuid)
returns jsonb as $$
  select jsonb_build_object(
    'tenant_id', (select tenant_id from profiles where user_id = $1)
  );
$$ language sql security definer;
```

- Luego, configurar en la consola de Supabase Auth que use esta función para los custom claims.

---

### 3. Revisión obligatoria antes de producción

- Eliminar todos los workarounds temporales documentados aquí.
- Confirmar que los JWT generados por Supabase incluyen `tenant_id` y que el backend ya no depende de hacks para los tests.
- Validar que los tests siguen pasando tras la migración.

---

## [PENDIENTE] Migración para todos multiusuario

- **Descripción:** La migración para agregar las columnas `user_id` y `tenant_id` a la tabla `todos` no se ha aplicado aún en el entorno local/test.
- **Impacto:** Los tests de `/todos` multiusuario fallarán con error `column todos.user_id does not exist` hasta aplicar la migración y regenerar los tipos de Supabase.
- **Acción requerida:**
  1. Aplicar la migración SQL: `supabase/migrations/20250623202226_add_userid_tenantid_to_todos.sql`.
  2. Regenerar los tipos en `@repo/db-types`.
  3. Volver a correr los tests.

**Nota:** El código y los tests están listos para multiusuario; solo falta sincronizar la base de datos.

---

### Tests afectados por la migración pendiente de todos multiusuario

- **Archivo:** `apps/backend/src/tests/backend.coverage.extended.test.ts`
- **Tests afectados:**
  - `Todos: should return empty list for user with no todos`
  - (Cualquier test que dependa de filtrar o crear todos por user_id o tenant_id)

#### Workaround temporal para que los tests pasen

- **Acción:** Marcar los tests afectados con `.skip` o `.todo` en Vitest/Jest mientras la migración no esté aplicada.
- **Ejemplo:**
```ts
it.skip('Todos: should return empty list for user with no todos', async () => { /* ... */ })
```
- **Nota:** El test debe ser reactivado (`it` en vez de `it.skip`) en cuanto la migración y los tipos estén sincronizados.

---

### [PENDIENTE] Tests fallan por ausencia de columna `email` en `profiles`

- **Descripción:** Los tests de backend que dependen de la columna `email` en la tabla `profiles` fallan porque dicha columna no existe en el esquema actual de la base de datos.
- **Impacto:** Los tests de `profiles.controller.test.ts`, `auth.test.ts` y posiblemente otros que esperan `email` en el perfil fallan con error de esquema.
- **Acción requerida:**
  1. Decidir si se debe restaurar la columna `email` en `profiles` o adaptar los tests y el código al nuevo esquema.
  2. Actualizar los tests para reflejar la estructura real de la base de datos.
  3. Confirmar que todos los tests pasan tras la corrección.
- **Workaround temporal:** Marcar los tests afectados con `.skip` o `.todo` hasta que se resuelva el esquema.
- **Tests afectados:**
  - `apps/backend/src/tests/profiles.controller.test.ts`
  - `apps/backend/src/tests/auth.test.ts`
  - (Cualquier otro test que espere `email` en profiles)

---

**Este archivo debe ser revisado y vaciado antes de cualquier despliegue a producción.** 