#!/usr/bin/env python3
"""Por dónde voy · genera el icono y el splash de iOS a partir de icon-original-2000.png
(el original de Óscar), mismo tratamiento que scripts/iconos_android.py: fondo navy de marca
#041e3f, icono completo centrado (no es una marca aislable sobre fondo plano). El AppIcon de
iOS debe ser opaco (sin alfa) y SIN esquinas redondeadas (las pone el propio iOS).
Uso: python3 scripts/iconos_ios.py (necesita Pillow)."""
import os
from PIL import Image, ImageDraw

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
ASSETS = os.path.join(RAIZ, 'ios', 'App', 'App', 'Assets.xcassets')
NAVY = (0x04, 0x1e, 0x3f, 255)
src_full = Image.open(os.path.join(RAIZ, 'icon-original-2000.png')).convert('RGBA')
# el original es un cuadrado de esquinas redondeadas sobre fondo blanco opaco (sin alfa real):
# recortar al bbox del icono deja las ESQUINAS blancas del rectángulo (fuera de la curva, dentro
# del bbox). Se recorta y además se aplica una máscara de esquinas redondeadas (supersampleada,
# geometría limpia) para que esas esquinas salgan transparentes y se vea el navy, no blanco.
src = src_full.crop((95, 80, 1905, 1965))


def mascara_esquinas_redondas(w, h, radio_frac=0.27, factor=4):
    """máscara L de esquinas redondeadas, dibujada a 4x y reducida para bordes limpios"""
    bw, bh = w * factor, h * factor
    m = Image.new('L', (bw, bh), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, bw - 1, bh - 1), radius=int(min(bw, bh) * radio_frac), fill=255)
    return m.resize((w, h), Image.LANCZOS)


src.putalpha(mascara_esquinas_redondas(*src.size))


def lienzo_con_icono(lado, escala_icono):
    """lienzo cuadrado navy opaco con el icono centrado a escala_icono del lado"""
    im = Image.new('RGBA', (lado, lado), NAVY)
    alto = int(lado * escala_icono)
    esc = alto / src.size[1]
    w = max(1, round(src.size[0] * esc)); h = max(1, round(src.size[1] * esc))
    si = src.resize((w, h), Image.LANCZOS)
    im.alpha_composite(si, ((lado - w) // 2, (lado - h) // 2))
    return im.convert('RGB')


# AppIcon: 1024x1024, al 72% (mismo encuadre que el adaptive foreground de Android)
icono = lienzo_con_icono(1024, 0.72)
icono.save(os.path.join(ASSETS, 'AppIcon.appiconset', 'AppIcon-512@2x.png'))
print('AppIcon 1024x1024 OK')

# Splash: 2732x2732, icono al 34% del lado (igual que el splash de Android)
splash = lienzo_con_icono(2732, 0.34)
carpeta = os.path.join(ASSETS, 'Splash.imageset')
for nombre in ('splash-2732x2732.png', 'splash-2732x2732-1.png', 'splash-2732x2732-2.png'):
    splash.save(os.path.join(carpeta, nombre), optimize=True)
print('Splash 2732x2732 OK (x3 escalas, misma imagen)')
