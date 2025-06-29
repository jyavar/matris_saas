# 🚀 GUÍA DE DEPLOY STRATO

## 📋 PREREQUISITOS

1. **Cuenta en Vercel**: https://vercel.com
2. **Cuenta en Railway**: https://railway.app
3. **Cuenta en Supabase**: https://supabase.com
4. **GitHub conectado** a ambos servicios

---

## 🚂 DEPLOY BACKEND EN RAILWAY

### 1. Preparar Supabase
1. Crear proyecto en Supabase
2. Obtener las credenciales:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### 2. Deploy en Railway
1. **Conectar GitHub**:
   - Ir a Railway Dashboard
   - Click "New Project" → "Deploy from GitHub repo"
   - Seleccionar tu repositorio

2. **Configurar el servicio**:
   - **Root Directory**: `apps/backend`
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `pnpm start`

3. **Variables de entorno** (Railway Dashboard → Variables):
```env
NODE_ENV=production
PORT=3001
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=24h
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info

# Opcionales (para funcionalidades avanzadas)
OPENAI_API_KEY=your-openai-api-key
POSTHOG_API_KEY=your-posthog-api-key
RESEND_API_KEY=your-resend-api-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

4. **Deploy**:
   - Railway detectará automáticamente el Dockerfile
   - El deploy se iniciará automáticamente
   - URL del backend: `https://your-app.railway.app`

### 3. Verificar el deploy
```bash
curl https://your-app.railway.app/health
# Debería responder: {"status":"healthy","message":"STRATO Engine is running"}
```

---

## 🌐 DEPLOY FRONTEND EN VERCEL

### 1. Conectar GitHub
1. Ir a Vercel Dashboard
2. Click "New Project" → "Import Git Repository"
3. Seleccionar tu repositorio

### 2. Configurar el proyecto
1. **Framework Preset**: Next.js
2. **Root Directory**: `apps/frontend`
3. **Build Command**: `pnpm build`
4. **Output Directory**: `.next`
5. **Install Command**: `pnpm install`

### 3. Variables de entorno (Vercel Dashboard → Settings → Environment Variables):
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### 4. Deploy
- Vercel detectará automáticamente la configuración
- El deploy se iniciará automáticamente
- URL del frontend: `https://your-app.vercel.app`

---

## 🔧 CONFIGURACIÓN ADICIONAL

### CORS Configuration (si es necesario)
Si tienes problemas de CORS, agregar en el backend:

```typescript
// En apps/backend/src/start.ts
app.use(cors({
  origin: [
    'https://your-frontend.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

### Health Check
El backend ya tiene un endpoint de health en `/health` que Railway usará automáticamente.

### Logs y Monitoreo
- **Railway**: Logs automáticos en el dashboard
- **Vercel**: Logs en el dashboard y Analytics
- **Supabase**: Logs en el dashboard de Supabase

---

## 🧪 TESTING DEL DEPLOY

### 1. Backend (Railway)
```bash
# Health check
curl https://your-backend.railway.app/health

# Auth endpoint (debería dar 401 sin token)
curl https://your-backend.railway.app/auth/login

# Todos endpoint (debería dar 401 sin token)
curl https://your-backend.railway.app/todos
```

### 2. Frontend (Vercel)
1. Visitar `https://your-frontend.vercel.app`
2. Verificar que carga correctamente
3. Probar login/registro
4. Verificar conexión con backend

---

## 🔄 CI/CD AUTOMÁTICO

### Railway
- Deploy automático en cada push a `main`
- Preview deployments en PRs

### Vercel
- Deploy automático en cada push a `main`
- Preview deployments en PRs
- Branch deployments automáticos

---

## 🚨 TROUBLESHOOTING

### Backend no arranca
1. Verificar variables de entorno en Railway
2. Revisar logs en Railway Dashboard
3. Verificar que `pnpm build` funciona localmente

### Frontend no conecta con backend
1. Verificar `NEXT_PUBLIC_API_URL` en Vercel
2. Verificar CORS configuration
3. Verificar que el backend está funcionando

### Variables de entorno
1. Verificar que todas las variables están configuradas
2. Reiniciar el servicio después de cambiar variables
3. Verificar que no hay espacios extra en las variables

---

## 📊 MONITOREO

### Railway
- CPU/Memory usage
- Request logs
- Error logs
- Health check status

### Vercel
- Page views
- Performance metrics
- Error tracking
- Analytics

---

## 🔐 SEGURIDAD

### Variables de entorno
- ✅ Nunca commitear variables de entorno
- ✅ Usar variables de entorno en Railway/Vercel
- ✅ Rotar JWT_SECRET regularmente

### CORS
- ✅ Configurar origins específicos
- ✅ No usar `*` en producción

### Rate Limiting
- ✅ Ya configurado en el backend
- ✅ Monitorear logs de rate limiting

---

**¡Listo! Tu aplicación STRATO estará desplegada en:**
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.railway.app`
- **Base de datos**: Supabase Cloud 