# ~AUDIT_FRONTEND_VERCEL.md

## 🧠 Auditoría Frontend Vercel AI (apps/frontend)

### 1. Archivos detectados (`.ts`, `.tsx`, `.json`, `.css`)

```
apps/frontend/.next/fallback-build-manifest.json
apps/frontend/.next/build-manifest.json
apps/frontend/.next/server/pages-manifest.json
apps/frontend/.next/server/app/page/react-loadable-manifest.json
apps/frontend/.next/server/app/page/build-manifest.json
apps/frontend/.next/server/app/page/app-paths-manifest.json
apps/frontend/.next/server/app/page/app-build-manifest.json
apps/frontend/.next/server/app/page/server-reference-manifest.json
apps/frontend/.next/server/app/page/next-font-manifest.json
apps/frontend/.next/server/middleware-manifest.json
apps/frontend/.next/server/app-paths-manifest.json
apps/frontend/.next/server/server-reference-manifest.json
apps/frontend/.next/server/next-font-manifest.json
apps/frontend/.next/package.json
apps/frontend/.next/static/development/_clientMiddlewareManifest.json
apps/frontend/.next/static/chunks/apps_frontend_src_app_globals_css_f9ee138c._.single.css
apps/frontend/.next/static/chunks/[next]_internal_font_google_geist_e531dabc_module_css_f9ee138c._.single.css
apps/frontend/.next/static/chunks/[next]_internal_font_google_geist_mono_68a01160_module_css_f9ee138c._.single.css
apps/frontend/.next/static/chunks/[root-of-the-server]__8dfc4896._.css
apps/frontend/.next/app-build-manifest.json
apps/frontend/next-env.d.ts
apps/frontend/package.json
apps/frontend/tsconfig.json
apps/frontend/next.config.ts
apps/frontend/src/app/layout.tsx
apps/frontend/src/app/page.tsx
apps/frontend/src/app/globals.css
```

- **Total archivos relevantes:** 27

---

### 2. Lógica de backend residual
- No se detectaron carpetas `app/api/`, ni archivos `actions.ts`, `server.ts`, `llm.ts`, `route.ts` en el frontend.
- **Estado:** ✅ Sin backend residual

---

### 3. Carpetas de utilidad/SDK
- No existen carpetas `util/`, `lib/`, `helpers/`, `providers/`, `hooks/` en el frontend.
- **Estado:** ⚠️ No se detectaron utilidades avanzadas para extraer

---

### 4. Ejemplos en `examples/next/`
- No existe la carpeta `examples/next/` en el frontend.
- **Estado:** ✅ Sin ejemplos residuales

---

## ✅ Archivos confirmados útiles
- `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `package.json`, `tsconfig.json`, `next.config.ts`

## ⚠️ Archivos dudosos o pesados
- Todos los archivos dentro de `.next/` (son generados, no deben comitearse)

## 🗑️ Archivos a eliminar
- `.next/` completo
- Cualquier archivo generado por build o dependencias

## 🧱 Recomendación de estructura final STRATO

```
apps/frontend/
  src/
    app/
      layout.tsx
      page.tsx
      globals.css
  package.json
  tsconfig.json
  next.config.ts
  next-env.d.ts
```

- Mantener solo archivos fuente y configuración.
- Ignorar y limpiar `.next/`, `node_modules/`, archivos de build y temporales.

---

**Informe generado automáticamente.** 