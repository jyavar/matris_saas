# ~17_PROTOCOLO_CURSOR.md

## PROTOCOLO CURSOR – Colaboración Humano + IA

> Este documento define el protocolo de trabajo entre humanos y la IA en el monorepo STRATO. Es la fuente de verdad sobre cómo colaboramos, tomamos decisiones y mantenemos la excelencia, siempre sincronizados con los archivos ~1 a ~16.

---

### 1. Propósito y Alcance
- Garantizar orden, trazabilidad y calidad en cada avance.
- Permitir onboarding instantáneo de cualquier colaborador (humano o IA).
- Evitar deuda técnica, desincronización y caos en el repo.

---

### 2. Principios del Protocolo Cursor
- Toda instrucción humana es prioritaria y debe ser ejecutada por la IA, salvo que contradiga las reglas de oro o la documentación viva.
- Ningún cambio se realiza sin validar y sincronizar la documentación (~1 a ~16).
- La IA debe auditar, sugerir mejoras y documentar cada decisión relevante.

---

### 3. Flujo de trabajo humano-IA
1. El humano da la instrucción (clara, concisa y trazable).
2. La IA ejecuta, valida y documenta el avance.
3. Se actualizan los archivos de referencia y el tablero de módulos.
4. Se realiza commit solo si todo está validado y sincronizado.

---

### 4. Reglas de oro para la colaboración
- Sincroniza siempre la lógica de negocio, el checklist maestro y el tablero tras cada avance.
- No se permite deuda técnica ni workarounds sin documentar.
- Todo commit debe pasar lint, typecheck, tests y checklist de módulo.
- Las decisiones clave y excepciones deben quedar registradas en los `.md` correspondientes.

---

### 5. Referencias cruzadas obligatorias
- Antes de cualquier cambio, consulta y sincroniza con:
  - ~12_CHECKLIST_MAESTRO.md
  - ~13_LOGICA_NEGOCIO.md
  - ~14_REGLAS_DE_ORO.md
  - ~16_MODULOS.md
  - Y cualquier otro `.md` relevante al módulo/feature.

---

### 6. Checklist de sincronización
- [ ] ¿La instrucción está clara y trazable?
- [ ] ¿La documentación viva está actualizada?
- [ ] ¿El tablero de módulos refleja el avance?
- [ ] ¿Se documentaron workarounds y decisiones?
- [ ] ¿Se pasó lint, typecheck y tests?
- [ ] ¿Se hizo commit solo tras validar todo?

---

### 7. Mejoras elite para el protocolo
1. **Sincronización automática de documentación:** Cada avance relevante debe reflejarse en los archivos de referencia (~1 a ~16) antes de cerrar cualquier tarea.
2. **Validación cruzada antes de cada commit:** No se permite mergear código sin pasar lint, typecheck, tests y checklist de módulo/documentación.
3. **Workarounds y excepciones siempre documentados:** Ningún workaround puede existir sin estar registrado en el archivo correspondiente y con plan de remoción.
4. **Onboarding instantáneo:** El protocolo debe permitir que cualquier humano o IA pueda entender el estado y reglas del repo en menos de 10 minutos leyendo los `.md` clave.
5. **Evolución iterativa, nunca caótica:** Cada mejora o refactor debe ser incremental, con trazabilidad y sin romper rutas, dependencias ni convenciones.
6. **Revisión y refuerzo del protocolo cada sprint:** El protocolo debe revisarse y mejorarse periódicamente, documentando cada ajuste y su motivo.
7. **Stack moderno, simple y estable:** Se prioriza la estabilidad y claridad sobre la complejidad o la "feature-itis". Menos es más.
8. **Auditoría y reporting automatizados:** Scripts y validaciones automáticas deben alertar sobre desincronización, deuda técnica o errores de estructura.
9. **Decisiones y contexto siempre trazables:** Cada decisión clave debe quedar registrada en el protocolo y/o lógica de negocio, con fecha y responsable.
10. **Cultura de excelencia y aprendizaje continuo:** Todo colaborador (humano o IA) debe proponer mejoras, detectar errores y contribuir a la evolución del protocolo y del repo.

---

### 8. Historial de actualizaciones
| Fecha       | Responsable | Cambio realizado                |
|-------------|-------------|---------------------------------|
| 2024-06-25  | José + IA   | Creación inicial y sincronización con ~1 a ~16 |

---

> **Este protocolo es obligatorio para todo colaborador humano o IA. Si alguna vez hay duda, consulta este archivo y los `.md` de referencia antes de avanzar.** 