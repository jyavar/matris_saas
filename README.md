# 🚀 StratoSaaS - SaaS Boilerplate

Un boilerplate completo para construir aplicaciones SaaS escalables con Next.js, Express y Supabase.

## ✨ Características

- **Frontend**: Next.js 15 con App Router
- **Backend**: Express.js con TypeScript
- **Base de datos**: Supabase (PostgreSQL)
- **Autenticación**: JWT con Supabase Auth
- **Tests**: Vitest + Playwright (100% coverage)
- **Monorepo**: Turbo para gestión eficiente

## 🚀 Inicio Rápido

### 1. Instalar dependencias
```bash
pnpm install
```

### 2. Configurar variables de entorno
Crea un archivo `.env` en la raíz:
```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# JWT
JWT_SECRET=your_jwt_secret
```

### 3. Ejecutar en desarrollo
```bash
# Todo junto
pnpm dev

# O por separado
pnpm dev:frontend  # http://localhost:3000
pnpm dev:backend   # http://localhost:3001
```

### 4. Ejecutar tests
```bash
pnpm test          # Todos los tests
pnpm test:coverage # Con coverage
```

## 📁 Estructura del Proyecto

```
apps/
├── frontend/          # Next.js App Router
│   ├── src/app/       # Páginas y rutas
│   ├── src/components/# Componentes React
│   └── src/services/  # APIs y servicios
├── backend/           # Express.js API
│   ├── src/routes/    # Endpoints
│   ├── src/services/  # Lógica de negocio
│   └── src/middleware/# Middlewares
└── web/              # Landing page pública

packages/
├── utils/            # Utilidades compartidas
├── db-types/         # Tipos de base de datos
└── eslint-config/    # Configuración ESLint
```

## 🔧 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia frontend y backend |
| `pnpm build` | Construye para producción |
| `pnpm test` | Ejecuta todos los tests |
| `pnpm lint` | Verifica código |
| `pnpm format` | Formatea código |

## 🌐 Endpoints del Backend

- `GET /health` - Health check
- `POST /auth/login` - Login
- `GET /todos` - Lista de todos (protegido)
- `POST /todos` - Crear todo (protegido)

## 🧪 Tests

- **Unitarios**: Vitest con 100% coverage
- **E2E**: Playwright para flujos críticos
- **Integración**: Supertest para APIs

## 📚 Documentación

- `~1_CHECKLIST.STRATO.md` - Checklist de funcionalidades
- `~2_README.STRATO.md` - Documentación técnica
- `~3_PLAYBOOK.STRATO.md` - Guías de desarrollo
- `~ALL_MODULES.md` - Módulos del sistema

## 🚀 Despliegue

### Vercel (Frontend)
```bash
pnpm build:frontend
```

### Railway/Render (Backend)
```bash
pnpm build:backend
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/amazing`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para detalles. 