#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const ROUTES_DIR = path.join(__dirname, '../apps/backend/src/routes')
const ROUTE_REGEX = /router\.(get|post|put|delete|patch)\(([^)]*)/g

function isBadPath(arg) {
  if (!arg) return true
  const raw = arg.trim()
  // Not a string literal
  if (!raw.startsWith("'") && !raw.startsWith('"') && !raw.startsWith('`')) return true
  // Remove quotes
  const clean = raw.replace(/^['"`]/, '').replace(/['"`]$/, '')
  if (clean === '' || clean === undefined) return true
  if (clean === ':' || clean === '*') return true
  if (clean.startsWith(':') && clean.length === 1) return true
  // Path with only spaces
  if (clean.trim() === '') return true
  // Path with suspicious chars
  if (/\s|\*|\{|\}|\(|\)/.test(clean)) return true
  return false
}

fs.readdirSync(ROUTES_DIR).forEach(file => {
  if (!file.endsWith('.ts')) return
  const filePath = path.join(ROUTES_DIR, file)
  const lines = fs.readFileSync(filePath, 'utf8').split('\n')
  lines.forEach((line, idx) => {
    let match = line.match(/router\.(get|post|put|delete|patch)\((.*)/)
    if (match) {
      const args = match[2].split(',')
      const pathArg = args[0]
      if (isBadPath(pathArg)) {
        console.log(`\n[!] Posible ruta inválida en ${file}:${idx+1}`)
        console.log('  >', line.trim())
        console.log('  Sugerencia: El primer argumento debe ser un string literal válido (ej: "/recurso", "/:id"). No uses variables, templates, ni expresiones.')
      }
    }
  })
})
console.log('\nAnálisis de rutas completado.') 