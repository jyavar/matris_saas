#!/bin/bash
# scripts/audit/local-workarounds-audit.sh
# Busca workarounds, hacks y TODOs temporales en el código y docs

set -e

ROOT_DIR="$(git rev-parse --show-toplevel)"

# Palabras clave a buscar
KEYWORDS=(
  'WORKAROUND' 
  'HACK' 
  'TEMPORAL' 
  'TODO' 
  'FIXME' 
  'DUMMY' 
  'SOLO LOCAL' 
  'SOLO TEST' 
  'ELIMINAR ANTES DE PRODUCCION' 
  'REMOVE BEFORE PROD' 
)

echo "\n==== AUDITORÍA DE WORKAROUNDS Y HACKS TEMPORALES ===="
for kw in "${KEYWORDS[@]}"; do
  echo -e "\n--- Buscando: $kw ---"
  grep -rni --color=always "$kw" "$ROOT_DIR" || true
done

echo -e "\nRevisa también el archivo ~11_LOCAL_WORKAROUNDS.md para detalles.\n" 