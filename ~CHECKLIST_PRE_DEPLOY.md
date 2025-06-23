# Checklist Pre-Deploy 100/100

Este checklist asegura que el monorepo está limpio, seguro y listo para deploy profesional.

## 1. Builds limpias
- [ ] `pnpm --filter web build` (Frontend)
- [ ] `pnpm --filter backend build` (Backend)

## 2. Tests automáticos
- [ ] `pnpm --filter web test:ui`
- [ ] `pnpm --filter web test:e2e`
- [ ] `pnpm --filter backend test`
- [ ] Revisar cobertura (coverage) si está configurado

## 3. Lint y formato
- [ ] `pnpm --filter web lint`
- [ ] `pnpm --filter backend lint` (si existe)
- [ ] `pnpm format` o Prettier (si existe)

## 4. TypeScript estricto
- [ ] `pnpm --filter web tsc --noEmit`
- [ ] `pnpm --filter backend tsc --noEmit`

## 5. Dependencias
- [ ] Sin dependencias duplicadas ni warnings de seguridad
- [ ] `pnpm install` no muestra errores

## 6. Variables de entorno
- [ ] `.env.example` actualizado
- [ ] `.env` con todos los valores requeridos para backend y frontend

## 7. Archivos y estructura
- [ ] Sin archivos temporales, logs, ni basura en el repo
- [ ] `.gitignore` bien configurado

## 8. Readme y documentación
- [ ] `README.md` actualizado
- [ ] Roadmaps y scorecards presentes

## 9. CI/CD
- [ ] Workflows de GitHub Actions o similar configurados (opcional, pero recomendado)

---

> Marca cada punto antes de hacer deploy para asegurar calidad, seguridad y cero deuda técnica. 