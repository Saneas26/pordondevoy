const CACHE = "pdv-v40";
const ASSETS = ["./", "index.html", "rutas.js", "manifest.json", "icon-192.png", "icon-512.png", "quicksand-bold.woff2", "montserrat-bold.woff2", "hanken-grotesk-bold.woff2",
  "js/24-grupo-saneas.js", "js/25-recarga.js", "img/app-saneas-web.png", "img/app-saneas-s.png", "img/app-asesorias.png", "img/app-pordondevoy.png", "img/app-activala.png", "img/app-laora.png", "img/app-acumula.png",
  "planes/", "planes/index.html",
  "planes/lanzarote/", "planes/lanzarote/index.html", "planes/lanzarote/lanzarote.css", "planes/lanzarote/lanzarote.js", "planes/lanzarote/lanzarote-og.png", "planes/lanzarote/lanzarote-card.png", "planes/lanzarote/lanzarote-favicon.svg",
  "planes/gran-canaria/", "planes/gran-canaria/index.html", "planes/gran-canaria/gc.css", "planes/gran-canaria/gc.js", "planes/gran-canaria/og.png", "planes/gran-canaria/favicon.svg",
  "planes/tenerife/", "planes/tenerife/index.html", "planes/tenerife/tenerife.css", "planes/tenerife/tenerife.js", "planes/tenerife/tenerife-card.png", "planes/tenerife/favicon.svg",
  "planes/la-palma/", "planes/la-palma/index.html", "planes/la-palma/la-palma.css", "planes/la-palma/la-palma.js", "planes/la-palma/la-palma-card.png", "planes/la-palma/favicon.svg",
  "planes/bilbao/", "planes/bilbao/index.html", "planes/bilbao/bilbao.css", "planes/bilbao/bilbao.js", "planes/bilbao/bilbao-card.png", "planes/bilbao/favicon.svg",
  "planes/barcelona/", "planes/barcelona/index.html", "planes/barcelona/barcelona.css", "planes/barcelona/barcelona.js", "planes/barcelona/barcelona-card.png", "planes/barcelona/favicon.svg"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.allSettled(ASSETS.map(a => c.add(a)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  if (new URL(e.request.url).pathname.startsWith("/api/")) return;   // API siempre por red; la app guarda copia local
  e.respondWith(
    caches.match(e.request, {ignoreSearch: true}).then(hit => {
      const red = fetch(e.request).then(res => {
        if (res && res.ok && new URL(e.request.url).origin === location.origin) {
          const copia = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copia));
        }
        return res;
      }).catch(() => hit);
      return hit || red;
    })
  );
});
