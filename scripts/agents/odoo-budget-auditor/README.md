# @odoo-budget-auditor

Agente autónomo para auditar presupuestos vs movimientos contables reales en Odoo.

## 🎯 Funcionalidades

- **Conexión Odoo**: API JSON-RPC con autenticación segura
- **Auditoría de Presupuestos**: Comparación `planned_amount` vs `practical_amount`
- **Alertas Automáticas**: Desviaciones > 10% generan alertas
- **Reportes JSON**: Estructurados y detallados
- **Multiempresa**: Soporte para múltiples empresas
- **Logs Estructurados**: Con Pino para observabilidad

## 🚀 Uso

### Variables de Entorno

```bash
# Configuración Odoo
ODOO_HOST=localhost
ODOO_PORT=8069
ODOO_DATABASE=your_database
ODOO_USERNAME=your_username
ODOO_PASSWORD=your_password
ODOO_PROTOCOL=http

# Configuración Opcional
ODOO_TIMEOUT=30000
ODOO_MAX_RETRIES=3
ODOO_OUTPUT_PATH=audit-artifacts/odoo/budget-report.json
LOG_LEVEL=info
```

### Ejecución Directa

```bash
# Desde el directorio del agente
pnpm audit

# O con configuración personalizada
pnpm tsx index.ts
```

### Programático

```typescript
import { runAgent } from './index'

const report = await runAgent({
  host: 'localhost',
  port: 8069,
  database: 'my_db',
  username: 'my_user',
  password: 'my_pass'
})

console.log(`Audit completed: ${report.summary.total_alerts} alerts found`)
```

## 📊 Estructura del Reporte

```json
{
  "generated_at": "2024-01-15T10:30:00.000Z",
  "config": { /* configuración usada */ },
  "summary": {
    "total_budgets": 25,
    "total_alerts": 3,
    "total_deviation_amount": 45000,
    "average_deviation_percentage": 5.2
  },
  "comparisons": [
    {
      "budget_id": 1,
      "budget_name": "Presupuesto Marketing Q1",
      "account_name": "Gastos de Marketing",
      "planned_amount": 100000,
      "practical_amount": 115000,
      "deviation_amount": 15000,
      "deviation_percentage": 15,
      "is_alert": true,
      "alert_threshold": 10,
      "date_range": {
        "from": "2024-01-01",
        "to": "2024-03-31"
      },
      "company_name": "Mi Empresa"
    }
  ],
  "alerts": [ /* solo comparaciones con alertas */ ],
  "companies": {
    "1": {
      "name": "Mi Empresa",
      "budgets_count": 25,
      "alerts_count": 3
    }
  }
}
```

## 🔧 Configuración

### Umbral de Alertas

Por defecto, las alertas se generan cuando la desviación es > 10%. Puedes modificar esto en `config/odoo.ts`:

```typescript
export const ALERT_THRESHOLD = 15 // 15% en lugar de 10%
```

### Modelos Odoo

Los modelos utilizados están definidos en `config/odoo.ts`:

```typescript
export const BUDGET_MODELS = {
  BUDGET: 'account.budget',
  ACCOUNT_MOVE: 'account.move',
  ACCOUNT: 'account.account',
  COMPANY: 'res.company'
} as const
```

## 🧪 Tests

```bash
# Ejecutar tests
pnpm test

# Tests en modo watch
pnpm test:watch
```

## 📁 Estructura del Proyecto

```
odoo-budget-auditor/
├── config/
│   └── odoo.ts              # Tipos y configuración
├── services/
│   ├── odoo.service.ts      # Servicio de conexión Odoo
│   └── budget-auditor.service.ts # Lógica de auditoría
├── __tests__/
│   └── odoo-budget-auditor.test.ts
├── index.ts                 # Agente principal
├── package.json
└── README.md
```

## 🔍 Monitoreo

### Logs Estructurados

El agente usa Pino para logs estructurados:

```json
{
  "level": 30,
  "time": 1705312200000,
  "pid": 12345,
  "hostname": "server-1",
  "name": "odoo-budget-auditor",
  "msg": "Starting Odoo Budget Auditor"
}
```

### Métricas Clave

- `total_budgets`: Total de presupuestos auditados
- `total_alerts`: Presupuestos con desviación > 10%
- `average_deviation_percentage`: Desviación promedio
- `companies_affected`: Empresas con alertas

## 🚨 Alertas

### Niveles de Riesgo

- **Bajo**: Desviación ≤ 10%
- **Medio**: 10% < Desviación ≤ 20%
- **Alto**: Desviación > 20%

### Tipos de Alertas

- **Críticas**: Desviación > 20%
- **Moderadas**: 10% < Desviación ≤ 20%

## 🔐 Seguridad

- Credenciales via variables de entorno
- Timeout configurable para requests
- Reintentos automáticos
- Logs sin información sensible

## 📈 Integración

### Dashboard

Para integrar con el dashboard `/dashboard/budget`, el reporte se guarda en:
```
audit-artifacts/odoo/budget-report.json
```

### CI/CD

```yaml
# GitHub Actions
- name: Run Budget Audit
  run: |
    cd scripts/agents/odoo-budget-auditor
    pnpm audit
  env:
    ODOO_HOST: ${{ secrets.ODOO_HOST }}
    ODOO_DATABASE: ${{ secrets.ODOO_DATABASE }}
    ODOO_USERNAME: ${{ secrets.ODOO_USERNAME }}
    ODOO_PASSWORD: ${{ secrets.ODOO_PASSWORD }}
```

## 🐛 Troubleshooting

### Error de Autenticación

```bash
Error: Authentication failed: No user ID returned
```

**Solución**: Verificar credenciales y permisos de usuario en Odoo.

### Timeout en Requests

```bash
Error: HTTP 408: Request Timeout
```

**Solución**: Aumentar `ODOO_TIMEOUT` o verificar conectividad.

### Sin Presupuestos Encontrados

```bash
WARN: No budgets found for audit
```

**Solución**: Verificar que existan presupuestos confirmados en Odoo.

## 📝 Licencia

MIT - STRATO Core OS™ 