---
name: Por dónde voy
description: Cockpit-instrument navy-and-cyan system for a family flight-tracking PWA
colors:
  bg: "#051424"
  surface-1: "#0d1c2d"
  surface-2: "#122131"
  surface-3: "#1c2b3c"
  line: "rgba(212,228,250,.14)"
  text: "#d4e4fa"
  muted: "#8fa3bd"
  accent: "#00e5ff"
  accent-ink: "#03222c"
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
  container-padding: "16px"
  card-gap: "12px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.xl}"
    padding: "18px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  status-pill:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.full}"
    padding: "5px 12px"
---

# Design System: Por dónde voy

## Overview

**Creative North Star: "Cockpit instrumentation"**

Por dónde voy tracks a real flight in real time with zero data or wifi, so it already behaves like an instrument panel — live altitude, speed, and ETA updating every second. The redesign commits to that instead of softening it into a generic travel-app blue: a deep aviation-navy field, a single cyan telemetry accent used for anything "live" (position, active state, primary action), and every data value or label set in a monospace stack so numbers read like a readout, not decoration.

The two highest-priority entry points (Mi vuelo, Planes de viaje, and every destination-catalog card) sit on elevated near-white cards — the one deliberate departure from the dark field, reserved for "here is where you tap next." Everything else — setup forms, the flight HUD, the noticias/podcast panels — lives on tonal dark surfaces stepped up from the base navy.

This system was adopted from a "Horizon Ethos" reference the user commissioned externally (Google Stitch), then adapted to this project's real constraints: no build step, no Tailwind, self-hosted fonts only, and a much smaller font/color surface than the source reference specified.

**Key Characteristics:**
- Deep navy base (#051424) with cyan (#00e5ff) as the only saturated accent, used sparingly
- All data values, labels, timestamps, and status pills set in a system monospace stack
- Hanken Grotesk (self-hosted, bold only) for every headline and title; system sans for body copy
- Drawn line-icon set (no emoji) for every functional icon
- White/cloud cards for the two top-level entry widgets and every destination-catalog card; everything else stays on the dark tonal surfaces

## Colors

Two color worlds by design: a dark navy field for the app chrome and flight instrumentation, and near-white elevated cards for the two things a user actually taps into (Mi vuelo / Planes de viaje, and every catalog card).

### Primary
- **Cyan Pulse** (`#00e5ff`): the only saturated accent in the system. Live map trail and traveled waypoints, active toggle/pace states, the takeoff button, status pills (flight phase), progress bar fill, mono data values, "Nuevo" catalog badges, focus rings, text selection.

### Neutral (dark field)
- **Base Navy** (`#051424` — `--bg`): the app background on every dark screen.
- **Surface 1** (`#0d1c2d` — `--surface-1`): first-level cards (setup form cards, stat tiles, situation card, noticias/podcast list items on the dark panels).
- **Surface 2** (`#122131` — `--surface-2`): inputs, selects, progress-bar track, nested ep rows.
- **Surface 3** (`#1c2b3c` — `--surface-3`): reserved for a third elevation step if a future component needs it (not yet used).
- **Hairline** (`rgba(212,228,250,.14)` — `--line`): every border on a dark surface.
- **Text** (`#d4e4fa` — `--text`): primary text on dark surfaces.
- **Muted** (`#8fa3bd` — `--muted`): secondary text, labels, placeholders on dark surfaces. Tinted from the navy hue, never plain gray (7.2:1 on `--bg`).
- **Accent Ink** (`#03222c` — `--accent-ink`): the only text color ever placed on the cyan accent (buttons, active pills, badges) — 10.8:1 contrast.

### Neutral (card field)
- **Card Surface** (`#f8f9fa`): the two entry widgets and every plan-catalog card.
- **Card Text** (`#0a1a2b`): titles on card surfaces (16.7:1).
- **Card Body** (`#425975`): body copy on card surfaces (6.8:1).

### Status
- **Ok** (`#35c98e`): "listas para el vuelo" / downloaded states. Unchanged from the prior system; still passes on both the dark field and card surfaces.

### Named Rules
**The One Accent Rule.** Cyan means "live, active, or primary." It never appears as decoration — if something is cyan, it's the thing currently happening (the plane's traveled path, the active pace toggle, the button that starts the flight) or the thing to act on next (a badge, a link, a focus ring).

## Typography

**Display Font:** Hanken Grotesk (self-hosted, weight 700 only), falling back to the system sans stack.
**Body Font:** the existing system stack — `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`. Kept deliberately: this is an Operate-mode surface (glance at a stat, tap a form field), and body copy already reads instantly in the platform's native voice.
**Label/Mono Font:** `ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace` — no font file shipped; every platform resolves to its own native monospace.

**Character:** Hanken Grotesk's tight, geometric bold carries every headline and card title — it's the one place the system spends a real display face. Everything else stays in the device's own voice, and any value that came off an instrument (speed, altitude, ETA, a timestamp, a flight code, a section label) drops into monospace so it reads as measured rather than written.

### Hierarchy
- **Display** (Hanken Grotesk 700, 19–20px on cards/headers, up to 34px on the splash): screen titles, widget titles, panel headers, plan-card titles.
- **Body** (system sans 400, 13–16px): paragraph copy, form labels, descriptions.
- **Label** (mono 600, 11–12px, uppercase, 0.04–0.08em tracking): section numbers ("1 · TU DESTINO"), region counts, news source tags, footer.
- **Data** (mono 600–700, 11–17px): stat values (velocidad/altitud/ETA), progress-bar percentage, flight status pill, resumen figures, episode durations.

### Named Rules
**The Instrument Rule.** If a value came off a sensor, a clock, or a counter, it is set in mono. If it was written by a person, it is not.

## Layout

Unchanged from the incumbent system: a single mobile-first column (`max-width: 480px`), centered on wider viewports with the navy field filling the remaining width. Screens are toggled via a `.screen.active` class, not routes. Card padding stayed at 16px; the new corner radius step (see Shapes) is the only structural change.

## Elevation & Depth

Two elevation strategies coexist by design. The dark field uses **tonal layering** — surfaces step from `--bg` through `--surface-1`/`--surface-2` with a 1px hairline border, no shadow. The two entry widgets and every catalog card use a **lifted white card** instead: `box-shadow: 0 14px 30px rgba(1,10,20,.4)` against the dark field, because they are the two things in the whole app meant to look tappable-and-elevated rather than embedded-in-the-instrument-panel.

### Shadow Vocabulary
- **Widget lift** (`box-shadow: 0 14px 30px rgba(1,10,20,.4)`): the two entry widgets, the Saneas.es cross-promo card.
- **Catalog card lift** (`box-shadow` inherited from the plan-card's `border: 1px solid #e2e8f0` treatment — flat, no shadow — the catalog cards sit directly on the dark field without a shadow, relying on the white-on-navy contrast alone): destination-catalog cards.

## Shapes

Rounded throughout, scaled by role: `10–12px` for inputs and pills-that-aren't-pills, `16–20px` for cards, `26px` for the two entry widgets (the single largest radius in the system, reserved for the two most important taps), and `9999px` (full) for status pills and badges. Icons are 24×24 viewBox line-drawings, 1.8–1.9px stroke, round caps/joins, single-weight throughout — two icons (plane, play triangle) are filled silhouettes instead of strokes, the only exception, because a paper-plane and a play triangle read better solid.

## Components

### Buttons
- **Shape:** `rounded.xl` (18px) for the primary takeoff button, `rounded.sm` (12px) for ghost buttons.
- **Primary:** cyan background, accent-ink text, Hanken Grotesk 800, icon + label, flex-centered.
- **Ghost:** transparent, hairline border, muted text, drawn icon + label. Used for GPS/terminar/noticias/podcast/panel-close actions.
- **Direction toggle (dirbtn):** ghost by default; the active state fills cyan with accent-ink text — the same "cyan = active" rule as everywhere else.

### Status Pills
- Cyan background, accent-ink text, mono 700, uppercase, full radius. Used for the flight-phase tag (Ascenso/Crucero/Descenso/Aterrizando/En tierra) and the "Nuevo" catalog badge.

### Cards / Containers
- **Dark-surface cards** (setup form sections, situation card, stat tiles, noticias/ep rows): `surface-1` background, `rounded.lg` (16–20px), 1px hairline border.
- **White entry widgets:** `rounded.xl` (26px), `rgba(248,249,250,.96)` background with a light backdrop-blur, no border beyond a faint white hairline, icon badge (44px, `rounded.md`, dark-navy background, cyan icon) + Hanken Grotesk title + muted description.
- **Catalog cards:** `#f8f9fa` background, `rounded.lg` (20px), 1px `#e2e8f0` border, photo at the delivered aspect ratio inset with its own 14px radius, cyan "Nuevo" badge floating on the photo when present.

### Inputs / Fields
- `surface-2` background, hairline border, `rounded.sm` (12px), 16px text (prevents iOS zoom-on-focus). Focus state: 2px cyan outline, 2px offset, applied globally via `:focus-visible`.

### Navigation
- Header: brand mark + Hanken Grotesk title + muted subtitle, Grupo Saneas menu button top-right (shared cross-app component, styled by its own injected stylesheet — not part of this system).
- Catalog: `<details>`-based collapsible regions, mono uppercase count + drawn chevron that rotates 180° on open. Canarias starts open; every other region starts collapsed.

### Icon System (signature component)
A single inline SVG `<symbol>` sprite (`#i-plane`, `#i-map`, `#i-newspaper`, `#i-headphones`, `#i-satellite`, `#i-flag`, `#i-chevron-down`, `#i-close`, `#i-download`, `#i-check`, `#i-play`, `#i-trash`) referenced via `<use>` everywhere a functional icon is needed — replaces every emoji that previously stood in for navigation or action icons. `.icon` sets `1em × 1em`, `stroke: currentColor`, `stroke-width: 1.8`; `.icon.fill` switches to solid fill for the plane and play glyphs.

## Do's and Don'ts

### Do:
- **Do** keep cyan rare — the One Accent Rule. If a screen has more than two or three cyan elements, something that isn't actually "live" or "primary" has been colored cyan by habit.
- **Do** set any sensor-derived or counted value (speed, altitude, ETA, percentages, timestamps, flight codes, durations) in the mono stack, uppercase labels included.
- **Do** use the drawn icon sprite (`#i-*` symbols) for any new functional icon; extend the sprite rather than reaching for an emoji or a new icon library.
- **Do** keep the two entry widgets and catalog cards as the only white/light surfaces in the app — that contrast is what marks them as "the two things to tap."

### Don't:
- **Don't** touch the Grupo Saneas shared menu (`js/24-grupo-saneas.js`) or the Saneas.es cross-promo card's teal/white brand colors — both are shared, cross-app brand assets locked outside this system.
- **Don't** restyle the six individual destination guides (Gran Canaria, Lanzarote, Tenerife, La Palma, Bilbao, Barcelona) to this palette — each carries its own bespoke, client-approved editorial identity, explicitly out of scope for this system.
- **Don't** add a shadow to a dark-surface card. Depth on the dark field comes from tonal layering (background steps + hairline border) only; shadows are reserved for the white card family.
- **Don't** introduce a second accent color. If a new status needs distinguishing from "live/primary," reach for the existing `--ok` green before adding a new hue.
