# PLANTILLA CREACIÓN Y AUDITORÍA DE MÓDULO

> Esta plantilla guía la creación, validación y auditoría de cualquier nuevo módulo del monorepo, asegurando que cumple con los estándares de calidad, trazabilidad y robustez definidos. Todo error debe estar explicado en lenguaje natural, con recomendaciones claras para humanos y agentes AI.

---

## ⚠️ Validación obligatoria antes de cada commit/merge

**Antes de commitear o mergear cualquier módulo, debes ejecutar y pasar sin errores:**
- `pnpm run lint` (estilo y sintaxis)
- `pnpm run typecheck` o `tsc --noEmit` (tipos)
- `pnpm run test` (tests unitarios y de integración)

Si alguno falla, **no se debe commitear ni mergear** hasta corregir todos los errores. Esto es obligatorio para mantener la sanidad y calidad del monorepo.

---

## 1. ESTRUCTURA MÍNIMA DEL MÓDULO

**Ubicación:** `packages/modules/X/` (reemplaza `X` por el nombre del módulo)
- Esta ruta está permitida por el Context Guard y alineada con `.strato-manifest.json`.

**Estructura de archivos:**
- `src/config.ts` → Configuración del módulo
- `src/logic.ts` → Lógica interna (ej. Zustand, hooks, stores)
- `src/ui.tsx` → Componentes visuales (Tailwind + shadcn/ui)
- `src/types.ts` → Tipos TypeScript
- `src/utils.ts` → Funciones auxiliares
- `src/__tests__/*.test.ts(x)` → Tests para lógica, UI y errores
- `src/index.ts` → Punto de exportación
- `README.md` → Documentación de uso y arquitectura
- `tsconfig.json` → Configuración TypeScript
- `package.json` → Configuración de paquete
- `.eslintrc.js` → Reglas de lint específicas

---

## 2. CHECKLIST DE VALIDACIÓN AUTOMÁTICA

### 🔹 ESTRUCTURA Y ARCHIVOS
- [ ] ¿Existen todos los archivos esperados?
    - [ ] `src/config.ts`
    - [ ] `src/logic.ts`
    - [ ] `src/ui.tsx`
    - [ ] `src/types.ts`
    - [ ] `src/utils.ts`
    - [ ] `src/__tests__/*.test.ts(x)`
    - [ ] `src/index.ts`
    - [ ] `README.md`
    - [ ] `.eslintrc.js`
    - [ ] `package.json`
    - [ ] `tsconfig.json`

### 🔹 LINTER Y TSC
- [ ] Ejecuta `pnpm install` (o `npm install --legacy-peer-deps` solo si es necesario)
- [ ] Ejecuta `pnpm run lint` y reporta errores o ✅ sin errores
- [ ] Ejecuta `pnpm run typecheck` o `tsc --noEmit` y verifica que compile sin errores de tipo

### 🔹 TESTING
- [ ] Ejecuta `pnpm run test` (o `npm run test` si aplica)
    - [ ] ¿Todos los tests pasan? ✅
    - [ ] ¿Hay tests que fallan? ❌ (detalla mensaje de error)
    - [ ] ¿Cobertura es ≥80%? (opcional)

### 🔹 ANÁLISIS FINAL
- [ ] ¿El módulo está marcado como ✅ LISTO para producción?
- [ ] ¿Faltan paths en tsconfig?
- [ ] ¿Hay imports rotos o sin resolver?
- [ ] ¿Faltan tests importantes (errores, estado, UI)?

---

## 3. INFORME TÉCNICO DE AUDITORÍA (FORMATO RECOMENDADO)

### 🔍 ESTRUCTURA Y ARCHIVOS
- Responde: ¿Existen todos los archivos esperados? Si falta alguno, explica cuál y por qué es crítico.

### 🔍 LINTER Y TSC
- ¿`pnpm run lint` arroja errores? Enuméralos y explica cómo resolverlos.
- ¿`pnpm run typecheck` o `tsc` arroja errores de tipo? Explica cada error en lenguaje natural y cómo corregirlo.

### 🔍 TESTING
- ¿Todos los tests pasan? Si alguno falla, muestra el mensaje y explica el motivo y la solución.
- ¿Cobertura es suficiente? Si no, recomienda tests adicionales.

### 🔍 ANÁLISIS FINAL
- Estado del módulo:
    - `✅ READY` (empaquetable y funcional)
    - `🟡 Parcial` (faltan ajustes menores)
    - `❌ Incompleto` (tests rotos, errores críticos)
- Recomendaciones específicas para dejarlo 100% funcional.

---

## 4. CONCLUSIÓN Y RECOMENDACIONES

- Si el módulo está `✅ READY`, puede ser publicado, versionado y usado en producción o por otros equipos.
- Si está `🟡 Parcial` o `❌ Incompleto`, sigue las recomendaciones y vuelve a auditar.
- Documenta cualquier workaround, excepción o decisión especial en el README y en la lógica de negocio global (`~13_LOGICA_NEGOCIO.md`).
- Mantén la estructura y convenciones alineadas con el resto del monorepo y las reglas de oro.

---

> **Este archivo debe usarse como checklist y guía en cada nuevo módulo. Adjunta el informe técnico de auditoría en cada PR o revisión de módulo.** 