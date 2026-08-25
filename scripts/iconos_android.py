#!/usr/bin/env python3
"""Por dónde voy · genera los iconos (legacy + adaptive) y el splash de Android a partir de
icon-original-2000.png (el original de Óscar). Uso: python3 scripts/iconos_android.py
(necesita Pillow). Escribe en android/app/src/main/res/. Fondo navy de marca #041e3f.
A diferencia de Saneas, el icono aquí es una ilustración completa (avión + ruta + pin), no
una marca aislable sobre fondo plano: se usa el icono entero, escalado con margen, no una
silueta extraída."""
import os
from PIL import Image, ImageDraw

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
RES = os.path.join(RAIZ, 'android', 'app', 'src', 'main', 'res')
NAVY = (0x04, 0x1e, 0x3f, 255)
src = Image.open(os.path.join(RAIZ, 'icon-original-2000.png')).convert('RGBA')


def pega_icono(lienzo, alto):
    """pega el icono completo, centrado, con la altura indicada"""
    esc = alto / src.size[1]
    w = max(1, round(src.size[0] * esc)); h = max(1, round(src.size[1] * esc))
    si = src.resize((w, h), Image.LANCZOS)
    lw, lh = lienzo.size
    lienzo.alpha_composite(si, ((lw - w) // 2, (lh - h) // 2))


DENS = {'mdpi': 1, 'hdpi': 1.5, 'xhdpi': 2, 'xxhdpi': 3, 'xxxhdpi': 4}
for d, f in DENS.items():
    carpeta = os.path.join(RES, 'mipmap-' + d); os.makedirs(carpeta, exist_ok=True)
    n = int(48 * f)
    # legacy (Android < 8): el icono completo tal cual (ya trae sus propias esquinas redondeadas)
    src.resize((n, n), Image.LANCZOS).save(os.path.join(carpeta, 'ic_launcher.png'))
    # redondo: mismo icono con máscara circular
    ic = src.resize((n, n), Image.LANCZOS); mask = Image.new('L', (n, n), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, n - 1, n - 1), fill=255); ic.putalpha(mask)
    ic.save(os.path.join(carpeta, 'ic_launcher_round.png'))
    # adaptive foreground (108dp; zona segura = 66% central): icono completo al 72% del lienzo
    n2 = int(108 * f); fg = Image.new('RGBA', (n2, n2), (0, 0, 0, 0)); pega_icono(fg, int(n2 * 0.72))
    fg.save(os.path.join(carpeta, 'ic_launcher_foreground.png'))

# fondo del adaptive icon: navy de marca
with open(os.path.join(RES, 'values', 'ic_launcher_background.xml'), 'w') as fh:
    fh.write('<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#041E3F</color>\n</resources>\n')

# splash (Android < 12 usa estas imágenes; 12+ usa el icono sobre windowSplashScreenBackground)
for carpeta in sorted(os.listdir(RES)):
    if not carpeta.startswith('drawable'):
        continue
    p = os.path.join(RES, carpeta, 'splash.png')
    if not os.path.exists(p):
        continue
    w, h = Image.open(p).size
    im = Image.new('RGBA', (w, h), NAVY); pega_icono(im, int(min(w, h) * 0.34))
    im.convert('RGB').save(p, optimize=True)
    print('splash', carpeta, w, h)
print('iconos OK')
