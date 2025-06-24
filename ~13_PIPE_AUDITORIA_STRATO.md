# ~13_PIPE_AUDITORIA_STRATO.md

## PIPE DE AUDITORÍA STRATO CORE OS™

### Propósito
El PIPE de auditoría técnica de STRATO Core OS™ permite automatizar la verificación, scoring y trazabilidad del cumplimiento técnico de todos los requisitos y features del monorepo. Su objetivo es lograr **cero deuda técnica**, máxima transparencia y control continuo sobre la calidad y cobertura del sistema.

---

### Alcance
- Aplica a todo el monorepo STRATO (backend, frontend, scripts, infra, etc.).
- Permite auditar features, tests, cobertura, lógica y existencia real de cada requisito.
- Genera reportes JSON estructurados, listos para visualización, CI/CD, dashboards o auditoría externa.

---

### Funcionamiento: Pasos del PIPE

1. **Extracción de Expectativas**
   - **Script:** (ejemplo) `scripts/audit/extract-audit.ts`
   - **Output:** `matrix.audit.json`
   - **Descripción:** Extrae todos los features/requisitos esperados desde los checklists markdown (`~CHECKLIST_*.md`, etc.) y los serializa en un JSON estructurado.

2. **Verificación de Existencia**
   - **Script:** (ejemplo) `scripts/audit/verify-exists.ts`
   - **Output:** `matrix.verified.json`
   - **Descripción:** Verifica si cada feature/requirement existe realmente en el código fuente (archivos, rutas, módulos, etc.).

3. **Verificación de Test y Cobertura**
   - **Script:** (ejemplo) `scripts/audit/verify-coverage.ts`
   - **Output:** `matrix.coverage.json`
   - **Descripción:** Para cada feature, verifica si tiene tests asociados y si esos tests tienen cobertura.

4. **Verificación de Lógica**
   - **Script:** `scripts/audit/verify-logic.ts`
   - **Output:** `matrix.logic.json`
   - **Descripción:** Usa heurísticas (búsqueda de palabras clave, regex, AST, mocks) para verificar si la lógica de cada feature está implementada en el código fuente.

5. **Fusión y Scoring**
   - **Script:** `scripts/audit/fuse-report.ts`
   - **Output:** `matrix.report.json`
   - **Descripción:** Fusiona todos los resultados anteriores por feature, y calcula un **score técnico** (0-4) según:
     - Si existe
     - Si tiene test
     - Si tiene cobertura
     - Si la lógica está verificada

---

### Archivos Generados
- `matrix.audit.json` — Expectativas extraídas de los checklists.
- `matrix.verified.json` — Verificación de existencia real en el código.
- `matrix.coverage.json` — Estado de tests y cobertura por feature.
- `matrix.logic.json` — Verificación heurística de lógica implementada.
- `matrix.report.json` — Fusión y scoring final por feature.

---

### Ejecución del PIPE

- **Manual:**
  ```sh
  pnpm exec tsx scripts/audit/verify-logic.ts
  pnpm exec tsx scripts/audit/fuse-report.ts
  # (y los scripts previos de extracción/verificación si los tienes)
  ```
- **Automatizado:**
  - Mediante API route (`/api/refresh-audit`) o script maestro.
  - Puede integrarse en CI/CD, pre-commit, o ejecutarse desde el dashboard visual.

---

### ¿Para qué sirve?
- Permite saber, de forma objetiva y automatizada, **qué tan alineado está el código con los requisitos y mejores prácticas**.
- Facilita la detección de deuda técnica, gaps de test, cobertura y lógica.
- Es base para reporting, dashboards, y mejora continua.
- Permite auditoría externa y validación de cumplimiento en tiempo real.

---

### Ejemplo de Flujo Completo

1. Se extraen los features esperados desde los checklists.
2. Se verifica si existen en el código.
3. Se verifica si tienen tests y cobertura.
4. Se verifica si la lógica está implementada.
5. Se fusionan los resultados y se calcula el score técnico.
6. El resultado puede visualizarse en el dashboard, exportarse o integrarse en CI/CD.

---

### Notas
- El PIPE es extensible: puedes agregar más scripts, validaciones o integraciones según las necesidades del proyecto.
- Todos los scripts y outputs están versionados y auditados para máxima trazabilidad.

## PIPE STRATO: Dashboard, CI/CD y Overrides

### 1. Visualización en Dashboard
- Accede a `/control-tower` para ver el estado técnico de cada feature en tiempo real.
- Puedes filtrar y buscar por nombre, estado, score o fuente de verificación.
- El score y semáforo global se calculan automáticamente.

### 2. Validación en CI/CD
- Usa el script `scripts/audit/validate-audit-score.ts` en tu pipeline:
  ```yaml
  - name: Validar auditoría técnica
    run: pnpm exec tsx scripts/audit/validate-audit-score.ts
  ```
- El pipeline fallará si:
  - Algún feature crítico o `tag:core` está en ⬜️
  - El score global es menor al 80%
- El output muestra un resumen y los pendientes exactos.

### 3. Overrides y Hints
- Para forzar la verificación de un feature, agrega un override en `logic.overrides.json`:
  ```json
  {
    "feature_id": { "detalle": "Override: verificado manualmente." }
  }
  ```
- Para mejorar la detección lógica, agrega un campo `hint` en `matrix.audit.json`:
  ```json
  {
    "id": "...",
    "nombre": "Validación de inputs de login",
    "hint": "validateLoginForm|useLoginValidator"
  }
  ```
- Reejecuta el PIPE para ver los cambios reflejados.

### 4. Mejores Prácticas
- Mantén los overrides al mínimo y documentados.
- Usa hints solo cuando la heurística no detecte la lógica real.
- Revisa el dashboard tras cada cambio importante.
- Corre el validador CI/CD antes de cada merge.

---

**PIPE STRATO™ = Auditoría continua, cero deuda, máxima trazabilidad.** 