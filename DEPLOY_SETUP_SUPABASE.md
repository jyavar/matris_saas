# 🚀 DEPLOY_SETUP_SUPABASE.md

## 1. Proyecto Supabase
- Usar el proyecto **matriz cursor** (o el que definas como principal)
- Guarda las claves en un gestor seguro y nunca las publiques

### Claves necesarias:
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

## 2. Configuración Railway (Backend)
- Directorio raíz: `apps/backend`
- Variables de entorno:
  - SUPABASE_URL
  - SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY
  - JWT_SECRET
  - JWT_EXPIRES_IN
  - PORT
  - LOG_LEVEL
  - OPENAI_API_KEY (opcional)
- Build: `pnpm install && pnpm build`
- Start: `pnpm start`

## 3. Configuración Vercel (Frontend)
- Directorio raíz: `apps/frontend`
- Variables de entorno:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - NEXT_PUBLIC_API_URL (apunta al backend Railway)
- Build: `pnpm build`
- Output: `.next`

## 4. Flujo de claves y seguridad
- Nunca publiques las claves service_role ni JWT_SECRET
- Usa `.env.example` para documentar, `.env.railway` y `.env.vercel` para referencia
- Reemplaza los valores `<...>` por los reales en cada entorno

## 5. Validación local
- Puedes correr `pnpm dev` en la raíz y ambos servicios funcionarán con las variables correctas
- Si falta alguna variable crítica, el script `scripts/check-env.ts` lo reportará

## 6. Troubleshooting
- Si algo falla, revisa las variables de entorno y los logs de Railway/Vercel
- Consulta este archivo y `.env.example` para referencia rápida

---

**STRATO READY™** 