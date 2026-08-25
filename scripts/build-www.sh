#!/usr/bin/env bash
# Por dónde voy · construye la carpeta www/ que Capacitor mete DENTRO del binario Android.
# El sitio es multipágina y estático en la raíz del repo: aquí solo se COPIA lo que la app
# necesita para funcionar sin red (vuelo, guías, herramientas). A diferencia de Saneas, aquí
# SÍ se incluye sw.js: sirve los mp3 de podcast cacheados para el modo avión (offline).
# /api/* (noticias, podcast) no existe dentro del binario: index.html llama a la URL absoluta
# de Vercel cuando detecta que corre en Capacitor (ver la constante API en index.html).
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf www
mkdir -p www
cp index.html manifest.json icon-192.png icon-512.png sw.js rutas.js *.woff2 www/
cp -R js img planes herramientas www/
# Comprobaciones mínimas: lo que cada página HTML referencia en local (js/css/img relativos
# a su propia carpeta) tiene que existir de verdad dentro de www/.
fallo=0
while IFS= read -r -d '' html; do
  dir=$(dirname "$html")
  for ref in $(grep -oE '(src|href)="[a-zA-Z0-9_.-]+\.(js|css|png|svg|webp|woff2)"' "$html" | sed -E 's/^(src|href)="//;s/"$//'); do
    if [ ! -f "$dir/$ref" ]; then echo "FALTA: $dir/$ref (referenciado desde $html)"; fallo=1; fi
  done
done < <(find www -name "*.html" -print0)
[ "$fallo" = 0 ] || { echo "build-www: referencias rotas"; exit 1; }
echo "www/ listo: $(find www -type f | wc -l | tr -d ' ') ficheros, $(du -sh www | cut -f1)"
