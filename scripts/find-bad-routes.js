#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const ROUTES_DIR = path.join(__dirname, '../apps/backend/src/routes')
const ROUTE_REGEX = /router\.(get|post|put|delete|patch)\(([^)]*)/g

function isBadPath(arg) {
  if (!arg) return true
  // Remove whitespace and quotes
  const clean = arg.trim().replace(/^['"`]/, '').replace(/['"`]$/, '')
  if (clean === '' || clean === undefined) return true
  if (clean.startsWith(':') && clean.length === 1) return true
  if (clean.startsWith('*')) return true
  if (!arg.trim().startsWith("'")) return true // not a string literal
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
        console.log('  Sugerencia: Asegúrate de que el primer argumento sea un string literal válido (ej: "/recurso" o "/:id")')
      }
    }
  })
})
console.log('\nAnálisis de rutas completado.') 