# ~M_WEB.md

## 1. Propósito del módulo
Frontend principal del sistema STRATO Core OS™. Implementa la interfaz pública y de dashboard, usando Next.js, React y TailwindCSS, alineado a la plantilla elite STRATO.

## 2. Archivos clave
- `src/app/page.tsx`
- `src/components/landing/Cta.tsx`
- `src/components/landing/Features.tsx`
- `src/components/landing/Hero.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `tailwind.config.ts`
- `tsconfig.json`
- `next-env.d.ts`

## 3. Estado por componente
| Componente         | Estado |
|--------------------|--------|
| App/Page           | ✅     |
| UI Components      | ✅     |
| Tailwind Config    | ✅     |
| TypeScript Config  | ✅     |
| Next.js Integración| ✅     |
| Tests              | ❌     |
| Documentación      | ✅     |

## 4. Tests presentes / pendientes
- [ ] Tests unitarios de componentes UI
- [ ] Tests de integración de rutas y páginas
- [ ] Tests E2E (Playwright)

## 5. Integraciones
- Next.js (App Router)
- TailwindCSS
- shadcn/ui
- Lucide React Icons

## 6. Dependencias
- `next`
- `react`, `react-dom`
- `tailwindcss`, `postcss`, `autoprefixer`
- `lucide-react`, `class-variance-authority`, `@radix-ui/react-slot`

## 7. Workarounds
- Se usa `// @ts-nocheck` en `tailwind.config.ts` por incompatibilidad de tipos con moduleResolution actual.
- Imports relativos con extensión `.js` por compatibilidad con Node16.

## 8. Última validación
- Fecha: 2025-06-25
- Responsable: José + STRATO AI
- Comandos: `pnpm run lint`, `npx tsc --noEmit`

## 9. Checklist Elite
- [x] Estructura modular Next.js
- [x] UI desacoplada y reutilizable
- [x] Configuración moderna de TypeScript
- [x] TailwindCSS y PostCSS integrados
- [x] Documentación viva
- [x] Imports y módulos limpios
- [x] Cumple cultura STRATO

## 10. Siguiente paso para estar 100% STRATO READY
- Agregar tests unitarios y E2E para componentes y rutas clave.
- Mantener cobertura y documentación sincronizada tras cada cambio.

## 11. Validación Técnica
- Fecha: 2025-06-25
- Resultado: 100% sano
- Validado por: José + STRATO AI
- Verificado en: audit-artifacts/reports/web-validation-20250625.md 