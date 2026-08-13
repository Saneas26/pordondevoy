---
name: Por dónde voy
description: Spacious cockpit-instrument navy-and-cyan system for a family flight-tracking PWA
colors:
  bg: "#051424"
  surface-1: "#0d1c2d"
  surface-2: "#122131"
  surface-3: "#1c2b3c"
  surface-bright: "#2c3a4c"
  line: "rgba(212,228,250,.14)"
  ring: "#273647"
  text: "#d4e4fa"
  muted: "#99adc5"
  accent: "#00e5ff"
  accent-ink: "#03222c"
  num-bg: "#001a33"
  num-text: "#7fa0c9"
  ok: "#35c98e"
  card-surface: "#f8f9fa"
  card-text: "#0a1a2b"
  card-body: "#425975"
typography:
  display:
    fontFamily: "Hanken Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontWeight: 700
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontWeight: 400
  label:
    fontFamily: "ui-monospace, SF Mono, JetBrains Mono, Menlo, Consolas, monospace"
    fontWeight: 600
    letterSpacing: "0.06em"
    textTransform: uppercase
rounded:
  sm: "10px"
  md: "16px"
  lg: "20px"
  xl: "26px"
  full: "9999px"
spacing:
  unit: "4px"
  container-padding: "24px"
  card-gap: "16px"
  section-gap: "20px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.xl}"
    padding: "20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
  status-pill:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.full}"
    padding: "6px 14px"
  numbered-badge:
    backgroundColor: "{colors.num-bg}"
    textColor: "{colors.num-text}"
    rounded: "{rounded.full}"
    size: "32px"
---

# Design System: Por dónde voy

## Overview

**Creative North Star: "Cockpit instrumentation, generously spaced"**

Por dónde voy tracks a real flight in real time with zero data or wifi, so it already behaves like an instrument panel — live altitude, speed, and ETA updating every second. The system commits to that instead of a generic travel-app blue: a deep aviation-navy field, a single cyan telemetry accent reserved for anything "live" or "primary," and every data value or label set in a monospace stack so numbers read like a readout, not decoration.

This second pass exists because the first one, while on-palette, stayed too dense and too small. The user pointed at a reference comp (a Google Stitch concept he commissioned) and said the visual result — generous air, large type, tall centered-icon cards, a persistent bottom tab bar — took priority over preserving the previous compact layout. This system now reproduces that comp's composition closely: one continuous scrolling "home" screen (portada + setup form merged, where the previous version kept them as separate full-screen swaps), numbered section cards with a circular badge + bottom-border header, and a fixed mobile tab bar with an elevated primary action.

**Key Characteristics:**
- Deep navy base (#051424) with cyan (#00e5ff) as the only saturated accent, used sparingly
- Generous spacing throughout: 24px container padding, 16–24px gaps, cards with 24–28px internal padding — the previous 12–16px compact spacing is gone
- A large two-line hero headline (clamp 30–40px, Hanken Grotesk 700) with the second line in cyan
- Two tall, centered-icon entry cards (not the earlier side-by-side wide widgets) for Mi vuelo / Planes de viaje
- Numbered form sections: a circular navy badge with the step number, a bottom-border header row, then the fields
- A fixed bottom tab bar on mobile (Estado / Planes / Volar / Media), the primary "Volar" tab raised as a pill above the bar line
- All data values, labels, timestamps, and status pills set in a system monospace stack
- Drawn line-icon set (no emoji) for every functional icon
- Neutral (non-colored) shadows only — a colored glow shadow was tried and removed; depth reads as offset + blur, never as tinted light

## Colors

Two color worlds by design: a dark navy field for the app chrome and flight instrumentation, and near-white elevated cards for the two things a user actually taps into (Mi vuelo / Planes de viaje, and every catalog card).

### Primary
- **Cyan Pulse** (`#00e5ff`): the only saturated accent in the system. Live map trail and traveled waypoints, active toggle/pace states, the takeoff button, the "Volar" tab pill, status pills (flight phase), progress bar fill, mono data values, hero headline emphasis, focus rings, text selection.

### Neutral (dark field)
- **Base Navy** (`#051424` — `bg`): the app background on every dark screen.
- **Surface 1** (`#0d1c2d` — `surface-1`): first-level cards — entry cards, numbered form-section cards, stat rows, situation card.
- **Surface 2** (`#122131` — `surface-2`): progress-bar track, episode list rows.
- **Surface Bright** (`#2c3a4c` — `surface-bright`): form inputs/selects, the Noticias/Podcast sub-cards inside the Entretenimiento section — one step brighter than surface-1, marking "this is where you type or choose," not just read.
- **Ring** (`#273647` — `ring`): the 1px inset ring combined with a soft shadow on every card, and the bottom border under numbered section headers.
- **Hairline** (`rgba(212,228,250,.14)` — `line`): borders on form fields, ghost buttons, dividers.
- **Text** (`#d4e4fa` — `text`): primary text on dark surfaces.
- **Muted** (`#99adc5` — `muted`): secondary text, labels, placeholders, tab-bar labels on dark surfaces — tinted from the navy hue, never plain gray (passes 4.5:1 against both `bg` and `surface-bright`).
- **Accent Ink** (`#03222c` — `accent-ink`): the only text color ever placed on the cyan accent (buttons, active pills, active tab).
- **Numbered Badge** (`#001a33` bg / `#7fa0c9` text — `num-bg` / `num-text`): the circular step-number badge in each form section header (1 / 2 / 3).

### Neutral (card field)
Kept for the destination-catalog cards in `/planes/` only — the app-shell entry cards moved to the dark `surface-1` treatment in this pass (see Components → Entry Cards), so this palette no longer applies to the home screen.
- **Card Surface** (`#f8f9fa`): every destination-catalog card.
- **Card Text** (`#0a1a2b`): catalog card titles.
- **Card Body** (`#425975`): catalog card body copy.

### Status
- **Ok** (`#35c98e`): "listas para el vuelo" / downloaded states.
- **Warn** (`#f4c542`): amber status text (e.g. noticias "Ya cargadas") — a secondary, non-interactive attention color, distinct from the accent.

### Named Rules
**The One Accent Rule.** Cyan means "live, active, or primary." It never appears as decoration — if something is cyan, it's the thing currently happening or the thing to act on next. **Exception, explicitly requested by Óscar:** the four in-flight action buttons (Ajustar GPS / Terminar vuelo / Noticias del día / Podcast, `.accionbtn`) use a dedicated amber-gold treatment (`#ffe27a`→`#f4c542`→`#d99f1c` gradient, `#3a2600` ink) so they stop reading as low-priority ghost buttons mid-flight. This is a second, deliberately loud accent scoped only to that one 2×2 action grid — don't extend gold to any other control.

**The No-Glow Rule.** Shadows are neutral (`rgba(1,10,20,X)`), never accent-tinted. An early pass gave the takeoff button and the tab bar's raised "Volar" pill a cyan-tinted shadow; it read as a generic AI-glow effect and was replaced with the same neutral shadow every other elevated surface uses. Depth comes from offset + blur, never from colored light. **Exception:** `.accionbtn`'s warm inset bevel (`rgba(120,75,0,.4)`) is not a glow — it's an embossed/marbled relief on a bright gold surface, where a neutral navy shadow would look dirty rather than raised. Scoped to that component only.

## Typography

**Display Font:** Hanken Grotesk (self-hosted, weight 700 only), falling back to the system sans stack.
**Body Font:** the existing system stack — `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.
**Label/Mono Font:** `ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace` — no font file shipped; every platform resolves to its own native monospace.

**Character:** Hanken Grotesk's tight, geometric bold carries the hero headline and every card/section title — bigger now than the first pass (hero clamps 30–40px, card titles 24px, section titles 20px). Body copy stays in the device's own voice. Anything that came off an instrument (speed, altitude, ETA, a timestamp, a flight code, a section number) drops into monospace.

### Hierarchy
- **Hero** (Hanken Grotesk 700, `clamp(30px,8vw,40px)`/1.15, -0.02em): the one-per-screen headline on the home screen only.
- **Card title** (Hanken Grotesk 600, 24px/1.25): entry-card titles (Mi vuelo, Planes de viaje).
- **Section title** (Hanken Grotesk 600, 20px): numbered form-section headers, sub-card headers (Noticias del día, Podcast), panel headers.
- **Body** (system sans 400, 14–16px): paragraph copy, descriptions, form labels.
- **Label** (mono 600, 11–12px, uppercase, 0.04–0.08em tracking): numbered-section step badge, tab-bar labels, news source tags, OFFLINE badge, footer. 11px is the floor — nothing functional goes smaller, including the tab bar (the source comp used 10px; raised to 11px to clear the legibility floor).
- **Data** (mono 600–700, 12–22px): stat values (velocidad/altitud/ETA — now full-width rows, not a cramped 3-column grid, so long values never wrap), progress-bar percentage, flight status pill, resumen figures, episode durations.

### Named Rules
**The Instrument Rule.** If a value came off a sensor, a clock, or a counter, it is set in mono. If it was written by a person, it is not.

## Layout

Single-column mobile-first flow, `max-width: 600px` (widened from the previous 480px to give the comp's spacious composition room), centered on wider viewports. **The home screen was restructured**: the previous version had three full-screen swaps (portada → setup → flight); the portada and setup screens are now one continuous scroll (`#scr-home`), matching the reference comp. The flight HUD (`#scr-flight`) stays a separate full-screen swap — it still fully replaces the view when a flight starts. `container-padding` is 24px (was 16px); card-to-card gaps are 16–20px (was 8px). At ≥640px, the two entry cards and the two-field form rows switch to a 2-column grid, matching the comp's `md:` breakpoint behavior.

### Named Rules
**The Air Rule.** When in doubt, add space rather than shrink type. This system was explicitly corrected once for being too dense; the fix was never "make it fit," it was "give it room."

## Elevation & Depth

Tonal layering on the dark field (surfaces step from `bg` through `surface-1`/`surface-bright`), each card also carrying a soft neutral shadow + 1px inset ring in `ring` color — `box-shadow: 0 10px 24px -6px rgba(1,10,20,.3), inset 0 0 0 1px var(--ring)`. No colored shadows anywhere (see The No-Glow Rule). The bottom tab bar sits above everything (`z-index: 45`) with its own upward neutral shadow and a backdrop-blur; its "Volar" tab is the one raised element in the system, floating 10px above the bar's top edge as a pill.

### Shadow Vocabulary
- **Card lift** (`0 10px 24px -6px rgba(1,10,20,.3), inset 0 0 0 1px #273647`): entry cards, numbered form-section cards, stat rows.
- **Button lift** (`0 10px 24px -6px rgba(1,10,20,.5)`): the takeoff CTA and the tab bar's raised "Volar" pill — same neutral shadow, just stronger, no tint.
- **Bar shadow** (`0 -8px 20px rgba(1,10,20,.3)`): the fixed bottom tab bar's upward shadow.

## Shapes

Rounded throughout: `10px` inputs, `14–18px` sub-cards and stat rows, `20px` main cards, `26px` reserved only for the app's own icon corner treatment. Full radius (`9999px`) for status pills, badges, and the tab bar's active pill. Icons are 24×24 viewBox line-drawings, 1.8–1.9px stroke, round caps/joins; two (plane, play) are filled silhouettes instead of strokes.

## Components

### Buttons
- **Primary (takeoff CTA):** full-width, cyan background, accent-ink text, Hanken Grotesk 700 20px, `rounded.xl` (18px), generous 20px padding, neutral shadow.
- **Ghost:** transparent, hairline border, muted text, drawn icon + label, `rounded.sm`.
- **Direction toggle (dirbtn):** ghost by default; active state fills cyan with accent-ink text.

### Entry Cards (signature component)
Tall, centered-top-icon cards — the biggest structural change from the first pass, which used wide side-by-side icon-left widgets. Each entry card: 72px circular icon badge (tinted 10–12% accent color background, full-color icon), 24px Hanken Grotesk title in the accent color, 16px muted description below. Stack single-column under 640px, 2-column grid at ≥640px.

### Numbered Form Sections
Every setup card opens with a header row: a 32px circular badge (`num-bg` background, `num-text` mono digit) + a 20px section title, separated from the fields below by a bottom border in `ring` color with 16px padding. Three of these in sequence (Tu destino / Tu vuelo / Entretenimiento para el vuelo) plus a conditional fourth (Resumen, no number).

### Sub-cards (Entretenimiento)
Inside the Entretenimiento section, Noticias and Podcast each get their own `surface-bright` bordered box (`rounded.md`, 18px padding) with an icon + title header row — cyan for Noticias, light-cyan (`#bdf4ff`) for Podcast, plus an "OFFLINE" mono badge.

### Bottom Tab Bar (signature component)
Fixed, mobile-only (`display:none` at ≥720px), 4 items: Estado, Planes, **Volar** (raised, filled cyan pill, the primary action), Media. Backdrop-blurred navy background, neutral upward shadow, 11px mono uppercase labels. Sits inside `.bottombar` above an optional mini-player strip (see Media Player below). "Estado" always closes any open panel first; if a flight is active it also scrolls to the top of the flight screen, and if not, it toasts that there's no flight yet instead of doing nothing silently. "Volar" scrolls to the destino card when idle (no-op mid-flight, since you're already there). "Planes" is a real link to `/planes/`; "Media" opens the podcast panel. There is no fifth "Config" tab from the source comp — nothing in this app exists behind it yet, so it was dropped rather than shipped as dead chrome.

### Stats (flight HUD)
Full-width rows (label left, mono value right), not a 3-column grid — the grid wrapped long values ("846 km/h", "10.850 m") awkwardly at the larger type size this pass introduced. One row per stat: velocidad, altitud, aterrizaje en.

### Flight Action Grid (`.accionbtn`, signature exception)
Four equal-size buttons in a 2×2 grid below the stats (Ajustar GPS, Terminar vuelo, Noticias del día, Podcast) — icon stacked above a 13.5px bold label. Óscar flagged the original inline ghost-button pairs as easy to miss mid-flight, so this grid trades the app's restrained ghost-button language for a loud, glossy amber-gold treatment (see Colors → Status and the One Accent Rule exception) with an embossed/marbled relief: layered radial-gradient highlights over a `#ffe27a→#f4c542→#d99f1c` linear gradient, plus a warm inset bevel (not the neutral shadow rule — see The No-Glow Rule exception) and `#3a2600` ink for contrast (6.1:1 minimum against the darkest gradient stop). This is the one place in the app shell that intentionally breaks both the One Accent Rule and The No-Glow Rule — don't reuse `.accionbtn` styling elsewhere without the same conscious trade-off.

### Media Player (mini + full)
Full player (`#pnlPodcast`): a "now playing" hero card (168px art tile, title/podcast name, custom scrubber with elapsed/total time, skip-back-15s / circular play-pause / skip-forward-15s), a compact `.ep-row` playlist below (small icon tile + title/podcast + delete), auto-advances to the next downloaded episode on end. The `<audio>` element lives as static markup outside the panel's repainted innerHTML so playback state survives repaints. Mini player (`.miniplayer`, inside `.bottombar` above the tab bar): shows only while an episode is loaded, compact icon + title/podcast + play-pause; tapping it (outside the toggle button) reopens the full panel. Playback is never paused by closing the panel or switching between `#scr-home` and `#scr-flight` — only an explicit pause/stop stops it. Navigating away to a real separate page (`/planes/` or a destination guide) still stops it, since those are different HTML documents; this is a known limitation of the static multi-page architecture, not a bug.

### Inputs / Fields
`surface-bright` background, hairline border, `rounded.sm`, 16px text (prevents iOS zoom-on-focus), 13px padding. Focus state: 2px cyan outline, 2px offset, applied globally via `:focus-visible`.

## Do's and Don'ts

### Do:
- **Do** keep cyan rare — the One Accent Rule.
- **Do** favor more padding/gap over smaller type when a section feels cramped — the Air Rule.
- **Do** set any sensor-derived or counted value in the mono stack, uppercase labels included.
- **Do** use full-width stat rows (label + value) instead of a multi-column grid for anything whose value length varies — the earlier 3-column stat grid wrapped mid-word at large type.
- **Do** keep the entry cards and destination-catalog cards as the two places with the most generous internal padding (24–28px) in the app — they're the two "come in, look around" moments.

### Don't:
- **Don't** give a shadow a color tint. Neutral only — see The No-Glow Rule.
- **Don't** touch the Grupo Saneas shared menu (`js/24-grupo-saneas.js`) or the Saneas.es cross-promo card's teal/white brand colors — both are shared, cross-app brand assets locked outside this system.
- **Don't** restyle the six individual destination guides (Gran Canaria, Lanzarote, Tenerife, La Palma, Bilbao, Barcelona) to this palette — each carries its own bespoke, client-approved editorial identity.
- **Don't** ship a tab-bar label under 11px, even if a source comp specifies smaller — the legibility floor holds regardless of where the design came from.
- **Don't** add a fifth tab or any nav destination that has nothing real behind it.
