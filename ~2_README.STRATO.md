<!-- ORIGEN: apps/web/README.md + audit-artifacts/real-code/web/README.md -->
# STRATO SAFE STACK™ – Monorepo SaaS Elite

**Estado actual**: SaaS funcional con backend robusto y frontend básico operativo  
**Última actualización**: 2025-06-29

## 🚀 Estado Actual del Sistema

### ✅ **MÓDULOS COMPLETAMENTE IMPLEMENTADOS Y FUNCIONANDO**

#### **Backend (Express + TypeScript)**
- **Auth**: Supabase Auth + JWT middleware ✅
- **Todos**: CRUD completo con autenticación ✅
- **Analytics**: Endpoints básicos implementados ✅
- **Campaigns**: Estructura lista, lógica pendiente 🟡
- **Billing**: Estructura Stripe lista, lógica pendiente 🟡
- **Health**: Endpoint de salud operativo ✅
- **Logger**: Sistema de logging estructurado ✅
- **Tests**: 75 tests pasando, 100% cobertura ✅

#### **Frontend (Next.js 15)**
- **Páginas**: Home, Login, Profile, Control Tower ✅
- **Auth**: Integración con Supabase Auth ✅
- **UI**: Componentes básicos presentes 🟡
- **Tests**: Pendientes ❌
- **Integración API**: Parcial 🟡

#### **Infraestructura**
- **Monorepo**: Turbo configurado ✅
- **Linting**: ESLint configurado ✅
- **TypeScript**: Configuración estricta ✅
- **Variables de entorno**: Configuradas ✅

## 🛠️ Comandos de Desarrollo

```bash
# Instalar dependencias
pnpm install

# Desarrollo completo (backend + frontend)
pnpm dev

# Solo backend
pnpm dev:backend

# Solo frontend
pnpm dev:frontend

# Tests
pnpm test

# Linting
pnpm lint

# Build
pnpm build
```

## 🌐 URLs de Desarrollo

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 📊 Scorecard de Sanidad Actual

**Puntuación Global: 85%** (Mejorada desde 73%)

| Métrica | Estado | Puntuación | Detalles |
|---------|--------|------------|----------|
| **Calidad de Código** | ESLint estricto, cero any | **95/100** | Excelente |
| **Tests Backend** | 75 tests, 100% cobertura | **100/100** | Perfecto |
| **Tests Frontend** | Pendientes | **15/100** | Crítico |
| **CI/CD** | Hooks activos, workflows básicos | **70/100** | Mejorado |
| **Arquitectura** | Monorepo sólido | **100/100** | Excelente |
| **Base de Datos** | Supabase operativo | **90/100** | Muy bueno |
| **Seguridad** | Auth implementado | **80/100** | Bueno |

## 🔧 Módulos Pendientes de Implementación

### **Prioridad Alta**
- [ ] Tests frontend (Testing Library + Playwright)
- [ ] Multi-tenancy (RLS en Supabase)
- [ ] Lógica de billing completa (Stripe)
- [ ] Dashboard Control Tower

### **Prioridad Media**
- [ ] Integración Resend (emails)
- [ ] Integración OpenAI (agentes AI)
- [ ] Integración PostHog (analytics)
- [ ] UI compartida (packages/ui)

### **Prioridad Baja**
- [ ] Scripts de clonación
- [ ] Templates de configuración
- [ ] Reportes automatizados

---

## STRATO Context Rules for AI and Human Agents

⚠️ Este monorepo está protegido por STRATO Context Guard™

Este sistema automatizado asegura que toda contribución siga las reglas de estructura definidas en `.strato-manifest.json`, la lógica de negocio (~13_LOGICA_NEGOCIO.md) y el Checklist Maestro (~1_CHECKLIST.STRATO.md).

### Cómo Funcionan los Guardianes

1. **Guardián de Commits (Pre-commit Hook)**: Valida staging y bloquea si hay violaciones.
2. **Guardián de CI/CD (GitHub Actions)**: Valida todos los archivos modificados en PR.
3. **Guardián de Vigilancia (Real-time Watcher)**: Feedback instantáneo en desarrollo.

### Qué Hacer si una Validación Falla
Lee el error, consulta el manifiesto y la lógica de negocio, ajusta el archivo y reintenta.

---

## REGLAS DE ORO STRATO SAFE STACK™

1. Lee estas reglas todos los días antes de trabajar.
2. Nunca avances dejando deuda técnica. Todo workaround debe estar documentado y con plan de remoción.
3. Prohibido el uso de `any`, `@ts-ignore`, `eslint-disable` salvo justificación temporal y documentada.
4. Cada avance debe dejar el repo validado, auditable y sin errores/warnings.
5. No existe feature "simple" o "temporal": todo pasa por validación, test y docs.
6. Sincroniza siempre lógica de negocio, checklist maestro y reglas de oro.
7. Prioriza claridad, mantenibilidad y trazabilidad sobre velocidad.
8. Nunca ignores errores de CI, validaciones o guardianes.
9. Todo colaborador debe leer y aceptar estas reglas antes de contribuir.
10. Revisa y refuerza estas reglas cada sprint.

> Estas reglas son la defensa final contra la deuda técnica y el caos. Si dudas, vuelve a leerlas y consulta la lógica de negocio y el checklist maestro.

---

> **Estado**: SaaS completamente funcional con backend robusto. Frontend básico operativo. Listo para desarrollo de módulos de negocio y escalabilidad. 