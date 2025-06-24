import * as fs from 'fs/promises'

const REPORT_PATH = 'matrix.report.json'
const SCORE_MIN = 0.8 // 80%

async function main() {
  const report = JSON.parse(await fs.readFile(REPORT_PATH, 'utf-8'))
  let failed = false
  let total = 0,
    ok = 0,
    score = 0,
    max = 0
  const fallos: { id: string; feature: string; estado: string }[] = []
  for (const f of report) {
    total++
    const s =
      (f.verificado ? 1 : 0) +
      (f.con_test ? 1 : 0) +
      (f.con_coverage ? 1 : 0) +
      (f.logica_verificada ? 1 : 0)
    score += s
    max += 4
    if ((f.critico || f.tag === 'core') && f.estado_final !== '✅') {
      failed = true
      fallos.push({
        id: f.id,
        feature: f.feature || f.nombre,
        estado: f.estado_final,
      })
    }
    if (f.estado_final === '✅') ok++
  }
  const pct = Math.round((score / max) * 100)
  console.log(`\n=== STRATO AUDIT SCORE ===`)
  console.log(`Features OK: ${ok}/${total}`)
  console.log(`Score global: ${pct}%`)
  if (fallos.length > 0) {
    console.log(`\nFeatures críticos/tag:core pendientes:`)
    for (const f of fallos) {
      console.log(`- [${f.estado}] ${f.id} :: ${f.feature}`)
    }
  }
  if (failed || pct < SCORE_MIN * 100) {
    console.error(
      `\n❌ Auditoría técnica NO aprobada. Corrige los pendientes antes de mergear.`,
    )
    process.exit(1)
  } else {
    console.log(
      `\n✅ Auditoría técnica aprobada. Puedes mergear con confianza.`,
    )
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
