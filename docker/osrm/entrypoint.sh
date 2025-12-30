#!/usr/bin/env bash
set -euo pipefail

PBF_FILE="/data/${OSRM_PBF}"
DATA_BASE="/data/${OSRM_DATA_BASENAME}"

if [ ! -f "$PBF_FILE" ]; then
  echo "[OSRM] ERRO: arquivo $PBF_FILE não encontrado"
  exit 1
fi

SIZE=$(stat -c%s "$PBF_FILE" || echo 0)

if [ "$SIZE" -lt $((50 * 1024 * 1024)) ]; then
  echo "[OSRM] ERRO: PBF pequeno demais ($SIZE bytes). Provavelmente corrompido."
  exit 1
fi

if [ ! -f "${DATA_BASE}.osrm" ] || [ "$PBF_FILE" -nt "${DATA_BASE}.osrm" ]; then
  echo "[OSRM] Processando mapa..."
  osrm-extract -p "$OSRM_PROFILE" "$PBF_FILE"
  osrm-partition "${DATA_BASE}.osrm"
  osrm-customize "${DATA_BASE}.osrm"
fi

echo "[OSRM] Iniciando servidor..."
exec osrm-routed --algorithm "$OSRM_ALGORITHM" "${DATA_BASE}.osrm"
