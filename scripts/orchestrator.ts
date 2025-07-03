// @AgentMeta
// name: orchestrator
// purpose: Orquestador central de agentes STRATO Core OS™
// usage: pnpm tsx scripts/orchestrator.ts
// tags: orchestrator, agents, strato

import fs from 'fs'

interface AgentInfo {
  name: string
  importPath: string
  reportPath: string
}

const agents: AgentInfo[] = [
  {
    name: '@refactor',
    importPath: './agents/refactor/autofix',
    reportPath: 'audit-artifacts/reports/refactor-report.json',
  },
  {
    name: '@qa',
    importPath: './agents/qa/autotest',
    reportPath: 'audit-artifacts/reports/qa-report.json',
  },
  {
    name: '@data',
    importPath: './agents/data/backup',
    reportPath: 'audit-artifacts/reports/data-report.json',
  },
  {
    name: '@docs',
    importPath: './agents/docs/docgen',
    reportPath: 'audit-artifacts/reports/docs-report.json',
  },
  {
    name: '@support',
    importPath: './agents/support/analyze',
    reportPath: 'audit-artifacts/reports/support-report.json',
  },
  {
    name: '@ux',
    importPath: './agents/ui/audit-ui',
    reportPath: 'audit-artifacts/reports/ui-report.json',
  },
  {
    name: '@env',
    importPath: './agents/env/validate-env',
    reportPath: 'audit-artifacts/reports/env-report.json',
  },
  {
    name: '@security',
    importPath: './agents/security/security-check',
    reportPath: 'audit-artifacts/reports/security-report.json',
  },
  {
    name: '@runtime',
    importPath: './agents/runtime/watchdog',
    reportPath: 'audit-artifacts/reports/runtime-report.json',
  },
  {
    name: '@analytics',
    importPath: './agents/analytics/report',
    reportPath: 'audit-artifacts/reports/analytics-report.json',
  },
  {
    name: '@perf',
    importPath: './agents/perf/benchmark',
    reportPath: 'audit-artifacts/reports/perf-report.json',
  },
  {
    name: '@licenses',
    importPath: './agents/licenses/validate-licenses',
    reportPath: 'audit-artifacts/reports/licenses-report.json',
  },
  {
    name: '@merge-strategist',
    importPath: './agents/merge-strategist/plan-merge',
    reportPath: 'audit-artifacts/reports/merge-strategist-report.json',
  },
  {
    name: '@i18n',
    importPath: './agents/i18n/detect',
    reportPath: 'audit-artifacts/reports/i18n-report.json',
  },
]

async function runOrchestration() {
  const orchestrationLog = {
    timestamp: new Date().toISOString(),
    errors: [] as string[],
    actionsPerformed: [] as string[],
    agents: {} as Record<string, unknown>,
  }
  for (const agent of agents) {
    try {
      const mod = await import(agent.importPath)
      if (typeof mod.default === 'function') {
        await mod.default()
        let output: unknown = null
        try {
          output = JSON.parse(fs.readFileSync(agent.reportPath, 'utf-8'))
          orchestrationLog.actionsPerformed.push(
            `Agente ${agent.name} ejecutado correctamente.`,
          )
        } catch (e) {
          output = { error: 'No se pudo leer el output JSON.' }
          orchestrationLog.errors.push(
            `Error leyendo output de ${agent.name}: ${(e as Error).message}`,
          )
        }
        orchestrationLog.agents[agent.name] = { status: 'ok', output }
      } else {
        orchestrationLog.agents[agent.name] = {
          status: 'fail',
          error: 'No default export',
        }
        orchestrationLog.errors.push(
          `Agente ${agent.name} no tiene default export.`,
        )
      }
    } catch (e) {
      orchestrationLog.agents[agent.name] = {
        status: 'fail',
        error: (e as Error).message,
      }
      orchestrationLog.errors.push(
        `Error ejecutando ${agent.name}: ${(e as Error).message}`,
      )
    }
  }
  fs.writeFileSync(
    'audit-artifacts/reports/orchestration.json',
    JSON.stringify(orchestrationLog, null, 2),
  )
  console.log('[orchestrator] Resultado de orquestación:', orchestrationLog)
}

runOrchestration()
