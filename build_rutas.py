#!/usr/bin/env python3
# Genera rutas.js para "Por dónde voy" a partir de Natural Earth 50m (dominio público).
# Uso: python3 build_rutas.py <ne_50m_land.geojson> <salida rutas.js>
import json, sys, math

# ---------- regiones (mapas): bbox y etiquetas de ciudades ----------
REGIONES = {
  "canarias": {
    "bbox": (26.7, 42.2, -19.3, -2.9),
    "labels": [(38.72,-9.14,"Lisboa"),(37.39,-5.99,"Sevilla"),(40.42,-3.7,"Madrid"),
               (33.6,-7.62,"Casablanca"),(31.63,-8.0,"Marrakech"),(30.42,-9.6,"Agadir"),
               (32.4,-17.0,"Madeira"),(29.35,-13.35,"Lanzarote"),(28.6,-16.9,"Tenerife")],
  },
  "baleares": {
    "bbox": (37.6, 41.9, -4.6, 4.9),
    "labels": [(40.42,-3.7,"Madrid"),(40.07,-2.13,"Cuenca"),(39.47,-0.38,"Valencia"),
               (38.35,-0.48,"Alicante"),(38.9,1.43,"Ibiza"),(39.57,2.65,"Palma"),(39.95,4.1,"Menorca")],
  },
  "bcn": {
    "bbox": (39.7, 42.9, -4.6, 3.4),
    "labels": [(40.42,-3.7,"Madrid"),(41.65,-0.88,"Zaragoza"),(41.61,0.62,"Lleida"),
               (41.12,1.25,"Tarragona"),(39.47,-0.38,"Valencia")],
  },
  "lisboa": {
    "bbox": (37.5, 41.5, -10.3, -2.8),
    "labels": [(40.42,-3.7,"Madrid"),(39.47,-6.37,"Cáceres"),(38.88,-6.97,"Badajoz"),
               (37.39,-5.99,"Sevilla"),(41.15,-8.61,"Oporto")],
  },
  "paris": {
    "bbox": (39.8, 49.6, -8.0, 7.0),
    "labels": [(40.42,-3.7,"Madrid"),(42.35,-3.7,"Burgos"),(43.32,-1.98,"San Sebastián"),
               (44.84,-0.58,"Burdeos"),(47.22,-1.55,"Nantes"),(47.9,1.9,"Orleans")],
  },
  "londres": {
    "bbox": (39.8, 52.3, -8.5, 8.0),
    "labels": [(40.42,-3.7,"Madrid"),(43.26,-2.93,"Bilbao"),(44.84,-0.58,"Burdeos"),
               (48.11,-1.68,"Rennes"),(48.85,2.35,"París"),(50.9,-1.4,"Southampton")],
  },
  "roma": {
    "bbox": (37.8, 44.6, -4.6, 13.4),
    "labels": [(40.42,-3.7,"Madrid"),(41.39,2.17,"Barcelona"),(43.30,5.37,"Marsella"),
               (41.93,8.74,"Ajaccio"),(39.22,9.12,"Cagliari"),(39.57,2.65,"Palma")],
  },
}

# ---------- rutas: destino, región, duración típica (min), desfase horario destino-Madrid (min) ----------
W = lambda lat, lon, name, desc: {"lat": lat, "lon": lon, "name": name, "desc": desc}
CORREDOR_CAN = [
  W(40.472,-3.561,"Madrid-Barajas","¡Despegue! El avión gira hacia el suroeste."),
  W(39.86,-4.02,"Toledo","El Tajo y la ciudad imperial quedan abajo."),
  W(38.9,-4.6,"Castilla-La Mancha","Llanuras, viñedos y molinos mientras seguimos subiendo."),
  W(37.88,-4.78,"Córdoba","El Guadalquivir serpentea hacia el mar. Ya en altitud de crucero."),
  W(37.4,-5.9,"Sevilla","La Giralda queda bajo el ala derecha."),
  W(37.0,-6.55,"Doñana y la costa de Huelva","Última tierra peninsular: marismas, playas y el Atlántico por delante."),
  W(36.1,-7.4,"Golfo de Cádiz","Mar abierto. La costa de Marruecos aparecerá a la izquierda."),
  W(33.9,-8.4,"Frente a Casablanca","La costa marroquí se dibuja en el horizonte, a tu izquierda."),
  W(31.6,-10.3,"Frente a Essaouira","Crucero tranquilo sobre el Atlántico marroquí."),
]
RUTAS = {
  "lpa": {"nombre":"Gran Canaria","codigo":"LPA","region":"canarias","dur":165,"tz":-60,
    "wp": CORREDOR_CAN + [
      W(30.1,-11.4,"Frente a Agadir","El Sáhara queda al este. Las islas ya no están lejos."),
      W(29.0,-13.2,"Lanzarote a la vista","¡Las primeras islas! Lanzarote y Fuerteventura por la izquierda."),
      W(28.35,-14.6,"Descenso sobre Fuerteventura","Empieza la bajada. Se nota en los oídos."),
      W(27.932,-15.387,"Gran Canaria — Gando","¡Bienvenido a Gran Canaria! Tomando tierra en Gando."),
    ]},
  "tfn": {"nombre":"Tenerife","codigo":"TFN","region":"canarias","dur":170,"tz":-60,
    "wp": CORREDOR_CAN + [
      W(30.1,-11.4,"Frente a Agadir","El Sáhara queda al este. Las islas ya no están lejos."),
      W(29.0,-13.2,"Lanzarote a la vista","¡Las primeras islas! Lanzarote y Fuerteventura por la izquierda."),
      W(28.5,-14.3,"Sobre Fuerteventura","Cruzamos Fuerteventura, con sus playas de arena clara."),
      W(28.35,-15.35,"Gran Canaria a la izquierda","La isla redonda queda al sur. El Teide ya asoma al frente."),
      W(28.48,-16.34,"Tenerife — Los Rodeos","¡Bienvenido a Tenerife! Aterrizando bajo el Teide."),
    ]},
  "ace": {"nombre":"Lanzarote","codigo":"ACE","region":"canarias","dur":155,"tz":-60,
    "wp": CORREDOR_CAN + [
      W(30.4,-11.6,"Descenso sobre el Atlántico","Empieza la bajada hacia las islas."),
      W(29.5,-12.9,"La Graciosa al frente","Los volcanes de Timanfaya se dibujan en el horizonte."),
      W(28.95,-13.6,"Lanzarote — Arrecife","¡Bienvenido a Lanzarote! Tomando tierra en Arrecife."),
    ]},
  "fue": {"nombre":"Fuerteventura","codigo":"FUE","region":"canarias","dur":160,"tz":-60,
    "wp": CORREDOR_CAN + [
      W(30.2,-11.5,"Frente a Agadir","El Sáhara queda al este. Las islas ya no están lejos."),
      W(29.2,-12.8,"Descenso hacia las islas","Lanzarote asoma por la derecha. Empieza la bajada."),
      W(28.45,-13.86,"Fuerteventura — El Matorral","¡Bienvenido a Fuerteventura! Aterrizando junto a las dunas."),
    ]},
  "pmi": {"nombre":"Palma de Mallorca","codigo":"PMI","region":"baleares","dur":80,"tz":0,
    "wp":[
      W(40.472,-3.561,"Madrid-Barajas","¡Despegue! Rumbo este, hacia el Mediterráneo."),
      W(40.35,-2.8,"La Alcarria","Campos de lavanda y miel mientras ganamos altura."),
      W(40.05,-1.9,"Serranía de Cuenca","Pinares y hoces. Ya casi en altitud de crucero."),
      W(39.9,-0.9,"Sierra de Javalambre","Las montañas de Teruel quedan a la izquierda."),
      W(39.6,-0.2,"Costa de Valencia","¡El Mediterráneo! Dejamos la península por Sagunto."),
      W(39.45,0.9,"Mar Balear","Agua azul en todas direcciones. Mallorca ya está cerca."),
      W(39.4,1.9,"Ibiza a la derecha","Al sur se adivinan Ibiza y la silueta de la sierra de Tramuntana al frente."),
      W(39.5,2.55,"Bahía de Palma","La catedral y el puerto de Palma bajo el ala. Bajando."),
      W(39.55,2.74,"Palma — Son Sant Joan","¡Bienvenido a Mallorca! Tomando tierra en Palma."),
    ]},
  "ibz": {"nombre":"Ibiza","codigo":"IBZ","region":"baleares","dur":70,"tz":0,
    "wp":[
      W(40.472,-3.561,"Madrid-Barajas","¡Despegue! Rumbo sureste, hacia el Mediterráneo."),
      W(40.05,-2.1,"Serranía de Cuenca","Pinares y hoces mientras seguimos subiendo."),
      W(39.6,-1.3,"La Manchuela","Viñedos entre Cuenca y Albacete. Crucero alcanzado."),
      W(39.4,-0.6,"Valle del Turia","Naranjos y huerta anuncian la costa."),
      W(39.2,-0.1,"Costa valenciana","¡El Mediterráneo! Dejamos la península por Cullera."),
      W(39.0,0.6,"Mar Balear","Empieza el descenso sobre el azul."),
      W(38.87,1.2,"Es Vedrà","El islote mágico de Ibiza a la derecha. Bajando."),
      W(38.87,1.37,"Ibiza — Es Codolar","¡Bienvenido a Ibiza! Tomando tierra junto a las salinas."),
    ]},
  "mah": {"nombre":"Menorca","codigo":"MAH","region":"baleares","dur":90,"tz":0,
    "wp":[
      W(40.472,-3.561,"Madrid-Barajas","¡Despegue! Rumbo este, hacia el Mediterráneo."),
      W(40.35,-2.7,"La Alcarria","Campos de Guadalajara mientras ganamos altura."),
      W(40.1,-1.8,"Serranía de Cuenca","Pinares y hoces. Ya en altitud de crucero."),
      W(39.95,-0.6,"Interior de Castellón","El Maestrazgo queda a la izquierda."),
      W(39.9,0.0,"Costa de Castellón","¡El Mediterráneo! Dejamos la península."),
      W(39.9,1.2,"Mar Balear","Agua azul en todas direcciones."),
      W(39.85,2.9,"Bahía de Alcúdia","Cruzamos el norte de Mallorca. Menorca al frente."),
      W(39.9,3.8,"Canal de Menorca","Empieza la bajada sobre el canal."),
      W(39.86,4.22,"Menorca — Maó","¡Bienvenido a Menorca! Tomando tierra en Maó."),
    ]},
  "bcn": {"nombre":"Barcelona","codigo":"BCN","region":"bcn","dur":75,"tz":0,
    "wp":[
      W(40.472,-3.561,"Madrid-Barajas","¡Despegue! Rumbo nordeste, siguiendo el corredor del Ebro."),
      W(41.0,-2.65,"Sigüenza","La sierra de Guadalajara y su castillo quedan abajo."),
      W(41.35,-1.65,"Calatayud","Ya en crucero, sobre las vegas del Jalón."),
      W(41.65,-0.9,"Zaragoza","El Ebro y el Pilar a la izquierda."),
      W(41.55,-0.2,"Los Monegros","El desierto aragonés, ocre y infinito."),
      W(41.6,0.6,"Lleida","La huerta del Segre. Empieza la bajada."),
      W(41.4,1.3,"El Penedès","Viñedos hasta el mar. Barcelona al frente."),
      W(41.27,1.85,"Costa del Garraf","El Mediterráneo bajo el ala derecha. Bajando fuerte."),
      W(41.30,2.08,"Barcelona — El Prat","¡Bienvenido a Barcelona! Tomando tierra junto al mar."),
    ]},
  "lis": {"nombre":"Lisboa","codigo":"LIS","region":"lisboa","dur":80,"tz":-60,
    "wp":[
      W(40.472,-3.561,"Madrid-Barajas","¡Despegue! Rumbo oeste, siguiendo el Tajo."),
      W(39.96,-4.83,"Talavera de la Reina","El valle del Tajo nos guía hacia Portugal."),
      W(39.8,-5.9,"Monfragüe","El parque nacional de los buitres, a vista de pájaro."),
      W(39.47,-6.37,"Cáceres","La ciudad monumental queda a la izquierda. Crucero."),
      W(39.5,-7.2,"Embalse de Alcántara","Cruzamos la frontera: ¡Portugal!"),
      W(39.3,-7.9,"Alentejo","Alcornoques y llanuras doradas portuguesas."),
      W(39.15,-8.7,"Valle del Tajo — Santarém","El río vuelve a aparecer. Empieza la bajada."),
      W(38.9,-9.0,"Estuario del Tajo","El puente Vasco da Gama cruza el agua. Lisboa al frente."),
      W(38.77,-9.13,"Lisboa — Humberto Delgado","¡Bem-vindo a Lisboa! Tomando tierra sobre la ciudad."),
    ]},
  "par": {"nombre":"París","codigo":"ORY","region":"paris","dur":125,"tz":0,
    "wp":[
      W(40.472,-3.561,"Madrid-Barajas","¡Despegue! Rumbo norte, cruzando la meseta."),
      W(41.15,-3.6,"Somosierra","El Sistema Central queda atrás."),
      W(42.35,-3.7,"Burgos","La catedral gótica, en miniatura allá abajo. Crucero."),
      W(42.85,-2.7,"Vitoria","Montes vascos, cada vez más verdes."),
      W(43.3,-2.0,"San Sebastián","La Concha y el Cantábrico. Dejamos España."),
      W(44.1,-1.55,"Golfo de Vizcaya","Las Landas francesas: pinares y playas infinitas."),
      W(44.85,-0.6,"Burdeos","El estuario del Garona y los viñedos más famosos del mundo."),
      W(46.6,0.3,"Poitiers","La campiña francesa, un tablero verde."),
      W(47.4,0.7,"Valle del Loira","Tierra de castillos: Tours, Amboise, Chenonceau."),
      W(47.9,1.9,"Orleans","El Loira de nuevo. Empieza la bajada."),
      W(48.72,2.38,"París — Orly","Bienvenue à Paris! La torre Eiffel, al norte, si hay suerte."),
    ]},
  "lon": {"nombre":"Londres","codigo":"LHR","region":"londres","dur":150,"tz":-60,
    "wp":[
      W(40.472,-3.561,"Madrid-Barajas","¡Despegue! Rumbo norte, cruzando la meseta."),
      W(41.7,-3.7,"Ribera del Duero","Viñedos castellanos mientras subimos."),
      W(42.85,-3.2,"Montes vascos","El verde del norte sustituye a la meseta. Crucero."),
      W(43.35,-3.0,"Bilbao","El Guggenheim brilla junto a la ría. Dejamos España."),
      W(44.6,-3.2,"Golfo de Vizcaya","Mar Cantábrico abierto, rumbo a Francia."),
      W(46.3,-2.6,"Frente a La Rochelle","La costa francesa reaparece a la derecha."),
      W(47.5,-2.2,"Bretaña sur","Golfo de Morbihan y campos bretones."),
      W(48.6,-1.8,"Monte Saint-Michel","La abadía en su isla, a la derecha, si hay suerte."),
      W(49.7,-1.4,"Canal de la Mancha","Cruzamos el Canal. Inglaterra al frente."),
      W(50.85,-1.35,"Southampton","La costa inglesa. Empieza la bajada."),
      W(51.47,-0.46,"Londres — Heathrow","Welcome to London! Tomando tierra en Heathrow."),
    ]},
  "rom": {"nombre":"Roma","codigo":"FCO","region":"roma","dur":150,"tz":0,
    "wp":[
      W(40.472,-3.561,"Madrid-Barajas","¡Despegue! Rumbo este, hacia el Mediterráneo."),
      W(41.35,-1.65,"Calatayud","El valle del Jalón mientras ganamos altura."),
      W(41.65,-0.9,"Zaragoza","El Ebro y el Pilar quedan abajo. Crucero."),
      W(41.1,1.25,"Costa de Tarragona","¡El Mediterráneo! Salimos al mar por la Costa Daurada."),
      W(41.0,3.5,"Mar Balear","Azul profundo. Menorca queda al sur."),
      W(41.6,5.6,"Golfo de León","Marsella y la Provenza, al norte."),
      W(41.9,8.5,"Córcega","Los acantilados de la isla de la belleza, a la izquierda."),
      W(41.4,9.3,"Estrecho de Bonifacio","Entre Córcega y Cerdeña, un paso de postal."),
      W(41.5,10.9,"Mar Tirreno","Última etapa sobre el mar. Empieza la bajada."),
      W(41.75,11.9,"Costa del Lacio","La costa italiana al frente. Roma te espera."),
      W(41.80,12.24,"Roma — Fiumicino","Benvenuto a Roma! Tomando tierra junto al Tirreno."),
    ]},
}

# ---------- geometría ----------
def clip_poly(pts, bbox):
    """Sutherland-Hodgman: recorta un polígono [(lat,lon),...] al bbox."""
    latmin, latmax, lonmin, lonmax = bbox
    def clip_edge(poly, inside, intersect):
        out = []
        for i, cur in enumerate(poly):
            prev = poly[i-1]
            cin, pin = inside(cur), inside(prev)
            if cin:
                if not pin: out.append(intersect(prev, cur))
                out.append(cur)
            elif pin:
                out.append(intersect(prev, cur))
        return out
    def inter_lat(v):
        return lambda a, b: (v, a[1] + (b[1]-a[1]) * (v-a[0]) / (b[0]-a[0]))
    def inter_lon(v):
        return lambda a, b: (a[0] + (b[0]-a[0]) * (v-a[1]) / (b[1]-a[1]), v)
    p = pts
    for ins, itr in [
        (lambda q: q[0] >= latmin, inter_lat(latmin)),
        (lambda q: q[0] <= latmax, inter_lat(latmax)),
        (lambda q: q[1] >= lonmin, inter_lon(lonmin)),
        (lambda q: q[1] <= lonmax, inter_lon(lonmax)),
    ]:
        if not p: return []
        p = clip_edge(p, ins, itr)
    return p

def dp(pts, tol):
    """Douglas-Peucker sobre lista [(lat,lon)]."""
    if len(pts) < 3: return pts
    a, b = pts[0], pts[-1]
    dmax, idx = 0, 0
    for i in range(1, len(pts)-1):
        p = pts[i]
        dx, dy = b[0]-a[0], b[1]-a[1]
        if dx == dy == 0:
            d = math.hypot(p[0]-a[0], p[1]-a[1])
        else:
            d = abs(dy*(p[1]-a[1])*0 + dx*(p[1]-a[1]) - dy*(p[0]-a[0])) / math.hypot(dx, dy)
        if d > dmax: dmax, idx = d, i
    if dmax > tol:
        l = dp(pts[:idx+1], tol); r = dp(pts[idx:], tol)
        return l[:-1] + r
    return [a, b]

def area(pts):
    s = 0
    for i in range(len(pts)):
        j = (i+1) % len(pts)
        s += pts[i][1]*pts[j][0] - pts[j][1]*pts[i][0]
    return abs(s)/2

def main(src, dst):
    data = json.load(open(src))
    rings = []
    for f in data["features"]:
        g = f["geometry"]
        polys = g["coordinates"] if g["type"] == "MultiPolygon" else [g["coordinates"]]
        for poly in polys:
            for ring in poly[:1]:              # solo anillo exterior
                rings.append([(c[1], c[0]) for c in ring])

    out_regions = {}
    for rid, reg in REGIONES.items():
        bbox = reg["bbox"]
        polys = []
        for ring in rings:
            c = clip_poly(ring, bbox)
            if len(c) < 3: continue
            c = dp(c, 0.02)
            if len(c) < 3 or area(c) < 0.004: continue   # descarta motas, conserva islas
            polys.append([[round(p[0], 2), round(p[1], 2)] for p in c])
        out_regions[rid] = {
            "bbox": list(bbox),
            "land": polys,
            "labels": [[la, lo, n] for la, lo, n in reg["labels"]],
        }
        print(f"{rid}: {len(polys)} polígonos, {sum(len(p) for p in polys)} puntos")

    js = "// Generado por build_rutas.py — datos de costas: Natural Earth (dominio público)\n"
    js += "const REGIONES = " + json.dumps(out_regions, ensure_ascii=False, separators=(",", ":")) + ";\n"
    js += "const RUTAS = " + json.dumps(RUTAS, ensure_ascii=False, separators=(",", ":")) + ";\n"
    with open(dst, "w") as f:
        f.write(js)
    print(f"→ {dst} ({len(js)//1024} KB)")

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
