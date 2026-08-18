# 🌌 Zenith — Design Specification (Stitch by Google Protocol)

> **Vibe Statement:** *"A warm, cozy, yet cutting-edge retro-futuristic astronomical observatory cockpit — an indie space-exploring RPG console crossed with a clean, high-precision engineering workstation."*

Derived from the Stitch project **"Zenith Redo Hero Navbar — Codedex Relaxed"** (design system *Cosmic Explorer*), and implemented across the whole site.

---

## 1. Aesthetic Vibe & Emotional Goals

- **Atmospheric Warmth:** Deep void indigos illuminated by **comet orange**, **star gold**, and delicate **aurora green** — warmth over cold sci-fi. "Hygge in orbit": safe, inviting, sparky.
- **Crafted Retro-Futurism:** notched 9-slice pixel panels, hard 4px offset drop shadows, an organic gold starfield (no rigid grid), and soundless kinetic snap on buttons.
- **Living Star Map Telemetry:** constellations with glowing connections, an orbital flight path, a com-link dialogue terminal, and a live equalizer.

---

## 2. Core Color & Atmosphere Palette

Tokens are defined Tailwind-v4-native in the `@theme` block of `app/globals.css`.

```
--color-void:      #1B1235  /* Deep cosmos background (html + body) */
--color-nebula:    #3E2A63  /* Ionized cloud panels / cards / elevated surfaces */
--color-comet:     #FF8B4C  /* Primary driver — CTAs, key accents, kinetic highlights */
--color-star:      #FFC857  /* Spotlight — badges, active nav, borders, glows, starlight */
--color-starchart: #F5E9D6  /* The voice — warm off-white typography */
--color-aurora:    #6FCF97  /* Affirmation — success / "open to work" / positive status */
```

> Legacy "Void Teal" token names (`--color-teal`, `--color-void-deep`, `--color-ink`, …) remain in `@theme` as **compatibility aliases mapped onto this palette** (`teal → star`, `ink → starchart`, `void-deep → void`, `pink/teal-dim → comet`), so older sections stay themed without renaming every class. New work should use the Warm Nebula names above.

### Elevation & Depth
Tonal layers + glows instead of soft shadows. Level 0 = void. Level 1 = nebula panels with a 1px `starchart`-10% edge. Active elements gain a **star glow** (soft outer blur of `star` at ~30%). Hard 4px offset black shadow for the pixel-frame tactility.

---

## 3. Typography Hierarchy

| Level | Family | Variable | Usage |
| :--- | :--- | :--- | :--- |
| **Pixel Display** | `Press Start 2P` | `--font-display` | Hero headline, section titles, brand wordmark, HUD labels |
| **Headline / Label** | `Space Grotesk` | `--font-headline` | Nav links, badges, buttons, small strong labels |
| **Body** | `Quicksand` (rounded sans) | `--font-body` / `--font-cozy` | Paragraphs, descriptions, dialogue, form text |
| **Telemetry / Stat** | `VT323` | `--font-stat` | Coordinates, level/XP, radio frequency, timestamps, tags |

---

## 4. Component Guidelines & Micro-Interactions

- **Hero:** organic **twinkling** gold starfield, nebula glows, gold "Lv. 20 Explorer" pill, pixel headline "Hello, I'm Rizky" (Rizky in comet), a **rotating typewriter** subtitle, comet + outlined CTAs, and a right-side orbit ring + illustrated cozy planet + floating rocket.
- **Navbar:** translucent nebula pill (blur + glow), rocket logo icon + pixel "Zenith" wordmark (comet), star-gold active underline, and an aurora "Open to work" status pill.
- **Constellation (Skills):** star nodes glow **comet/gold** scaled by mastery, connected by dashed/solid gold asterism lines; side telemetry panel with a comet→star mastery bar.
- **Mission Control (About):** cockpit com-link terminal — typewriter dialogue, live equalizer, gold "Continue" button.
- **Flight Path (Experience):** vertical trajectory rail with glowing gold waypoints, operator profile + achievement badges.
- **Buttons:** Primary = comet fill / void text. Secondary = star fill / void text. Ghost = starchart border + text. `:active` translates 4px into its own shadow. `:focus-visible` = star outline.

---

## 5. Motion & Accessibility

- **Reduced motion:** honored globally (CSS safety net + Framer Motion `useReducedMotion`) — decorative motion (starfield twinkle, parallax, typewriter, spins) degrades to static; content and function stay intact.
- **Keyboard:** visible `:focus-visible` star rings on every interactive control; nav links carry plain-language `aria-label`s (e.g. "Constellation — Skills").
- **Contrast:** starchart / star / comet on void/nebula meet WCAG AA (verify any new combination before shipping).
