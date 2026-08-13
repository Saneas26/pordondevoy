# Por dónde voy

## What it is
A personal PWA for Óscar and his family: track a flight in real time with zero data/wifi (airplane mode, dead-reckoning from scheduled times + great-circle math), and browse self-contained travel guides for destinations they've visited or are planning. Static multi-page site, no build step, no framework, deployed to Vercel from `Saneas26/pordondevoy`.

## Audience & scene
Óscar and his family, on their own phones, mostly in two moments: (1) mid-flight in airplane mode, glancing at the screen occasionally during a multi-hour flight; (2) at home planning a trip, browsing destination guides on a couch. Non-technical audience — the UI must read instantly, no jargon.

## Surfaces in scope for this redesign
- `index.html` — portada (landing), Mi vuelo (flight setup form), En vuelo (flight-tracking HUD), Entretenimiento (Noticias del día + Podcast, both backed by real `/api/noticias.js` and `/api/podcast.js`)
- `planes/index.html` — destination catalog, collapsible sections by region (Canarias, Península, Baleares, Italia, Francia, Inglaterra, Holanda, Alemania, Bélgica, Grecia, Portugal)

## Explicitly out of scope
The 6 individual destination guides (`planes/gran-canaria`, `lanzarote`, `tenerife`, `la-palma`, `bilbao`, `barcelona`) each carry their own bespoke, client-approved editorial identity and palette per island/city. They stay untouched by this redesign.

## Brand commitment (pinned by the user)
Visual direction is pinned to "Horizon Ethos": a dark aviation-instrument navy (`#051424` base) with a cyan accent (`~#00e5ff`), Hanken Grotesk display type, Inter body, JetBrains Mono for data/labels, tonal surface layering, rounded-xl cards. Sourced from a Google Stitch concept the user commissioned and approved (some concept screenshots had real layout bugs — overlapping text — treated as loose visual reference, not literal spec).

## Technical constraints
No build step, no framework, no Tailwind/CDN dependencies. Fonts self-hosted as local woff2 (existing precedent: `quicksand-bold.woff2`, `montserrat-bold.woff2` at repo root, loaded via local `@font-face`). Service worker (`sw.js`) precaches a fixed `ASSETS` array under a versioned `CACHE` constant — bump the version on every asset change. Deploy path: local browser verification → direct-to-`main` commit via `gh api` (blob → tree → commit → PATCH ref) → SHA-256 hash check against what GitHub actually stored.
