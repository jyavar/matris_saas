# ROADMAP STRATO – FULL CLEAN & COVERAGE 100/100™

> **Este archivo debe mantenerse sincronizado con ~13_LOGICA_NEGOCIO.md y ~12_CHECKLIST_MAESTRO.md.**
> 
> **Última sincronización: 2024-06-25**
> 
> **Hito reciente:** Monorepo conectado y subido a GitHub en main. Estado listo para colaboración y despliegue profesional. URL: https://github.com/jyavar/matris_saas
> 
> **Stack consolidado:** Next.js + React puro.

## Sección 1: Auditoría Técnica Completa
- Ejecutar `tsc --noEmit` en todo el monorepo y corregir errores de tipo.
- Ejecutar `eslint . --ext .ts,.tsx` y dejar output en `audit-artifacts/eslint-report.json`.
- Validar que `context-watchdog.ts` esté corriendo en cada pre-commit.
- Auditar `console.log`, `any`, imports relativos, rutas rotas o duplicadas.
- Revisar `.env.example` y variables en `.env.local`, `.env.production`.

## Sección 2: FIX COVERAGE – Backend & Logic
- Generar tests unitarios y de integración para todos los servicios con cobertura < 70%.
- Usar @qa agent para autogenerar tests en:
  - `users.service.ts`
  - `todo.service.ts`
  - `analytics.service.ts`
- Validar coverage con `vitest run --coverage` y dejar reportes en `audit-artifacts/coverage-final.json`.

## Sección 3: FIX COVERAGE – Frontend & UI
- Validar que todos los componentes visuales tengan `__tests__/componente.test.tsx`.
- Revisar con @ux agent accesibilidad (a11y), estados aria-*, dark mode, navegación.
- Usar playwright o @testing-library/react para testear rutas y flujos críticos.

## Sección 4: CLEAN PATHS, FILES & DEPENDENCIES
- Usar depcheck para detectar:
  - Dependencias instaladas no utilizadas
  - Archivos no importados por ningún entry point
- Eliminar:
  - Dependencias de frontend/backend no utilizadas
  - Assets sin referencia
  - Scripts obsoletos en /scripts
  - Test duplicados o vacíos
- Validar package.json limpio, sin duplicados de versión, con scripts reales en uso

## Sección 5: BLINDAJE TÉCNICO AVANZADO
- Verificar `.strato-manifest.json` tenga TODAS las rutas actuales y sus convenciones
- Validar husky, lint-staged, runtime-defense.ts, validate-test-templates.ts
- Agregar prepush con:
  - `tsc --noEmit`
  - `eslint`
  - `vitest --coverage`
  - `context-watchdog`
- Agregar `scripts/validate-clean-system.ts` para correr CI local completo

## Sección 6: VALIDACIÓN FINAL
- Ejecutar todos los tests (`vitest run`, `playwright`, etc.)
- Validar que coverage global sea >= 90% líneas / 80% funciones
- Generar reporte final con status + semáforo por módulo
- Commit final:

```
chore: sistema validado – listo para construir módulos STRATO
``` 