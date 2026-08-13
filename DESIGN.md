# 🌌 Zenith — Design Specification (Stitch by Google Protocol)

> **Vibe Statement:** *"A warm, cozy, yet cutting-edge retro-futuristic astronomical observatory cockpit. It feels like an indie space-exploring RPG console crossed with a clean, high-precision engineering workstation."*

---

## 1. Aesthetic Vibe & Emotional Goals

- **Atmospheric Warmth:** Move away from cold, sterile sci-fi blues. Zenith embraces the **"Warm Nebula"** universe: deep void indigos illuminated by comet oranges, starlight golds, and delicate aurora greens.
- **Crafted Retro-Futurism:** 9-slice clipped pixel-panel geometry, hard 4px offset drop shadows (tactile physical feel), CRT scanline overlays, and soundless kinetic snap physics on all buttons.
- **Living Star Map Telemetry:** Interfaces are not static boxes. Constellations have pulsing neon connections, trajectory paths follow orbital vectors, and live audio frequency waveforms react during com-link transmissions.

---

## 2. Core Color & Atmosphere Palette

```
--color-void:       #1B1235  /* Deep Cosmos Background */
--color-nebula:     #3E2A63  /* Ionized Cloud Panels */
--color-comet:      #FF8B4C  /* Primary Kinetic / Ignition Accent */
--color-star:       #FFC857  /* Secondary Celestial Gold Accent */
--color-starchart:  #F5E9D6  /* High-legibility Warm Cream Typography */
--color-aurora:     #6FCF97  /* Live Signal / Telemetry Green */
```

### Gradients & Atmosphere Orbs
- **Nebula Glow:** `radial-gradient(circle, rgba(62, 42, 99, 0.35) 0%, rgba(27, 18, 53, 0) 70%)`
- **Comet Core:** `radial-gradient(circle, rgba(255, 139, 76, 0.20) 0%, rgba(27, 18, 53, 0) 60%)`
- **CRT Glass Glare:** `linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 60%)`

---

## 3. Typography Hierarchy

| Level | Family | Variable | Usage |
| :--- | :--- | :--- | :--- |
| **Display Header** | `Press Start 2P` | `--font-display` | Section titles, brand wordmark, launch buttons, HUD callouts |
| **Body Content** | `Nunito` (Rounded Sans) | `--font-body` | Paragraf narasi, deskripsi proyek, curriculum vitae, dialog text |
| **Telemetry & Stats** | `VT323` | `--font-stat` | Koordinat rasi bintang, level XP, frekuensi radio, timestamp, tag stack |

---

## 4. Component Guidelines & Micro-Interactions

### A. Constellation Asterism Map
- **SVG Vector Links:** Dashed lines (`stroke-dasharray="3 3"`) connecting skills in authentic geometric asterisms.
- **Active / Hover State:** Connected lines switch to solid starlight gold (`#FFC857`) with an SVG gaussian blur filter glow (`feGaussianBlur`).
- **Power Mastery Gauge:** Side telemetry card dynamically fills an animated multi-stop gradient bar (`from-comet via-star to-aurora`) representing skill proficiency.

### B. Cockpit Terminal Dialogue (Mission Control)
- **Live Signal Visualizer:** 7-bar audio frequency equalizer animating with staggered sine waves.
- **Status Beacon:** Pulsing aurora green signal node (`#6FCF97`) indicating active communication frequency.
- **Paging Telemetry:** Interactive step indicators with glow states and soundless next/replay actions.

### C. Orbital Flight Path (Experience Timeline)
- **Waypoint Guidance:** Vertical gradient trajectory line with illuminated `StarNode` waypoints triggered sequentially on viewport intersection (`whileInView`).
- **Telemetry Cards:** Level 20 System Engineer status panel and hover-elevated achievement badges.

### D. Tactile PixelButton (Launch Engine)
- **Kinetics:** On `:active`, element translates `4px 4px` directly into its shadow with zero blur.
- **Accessibility:** High-contrast `:focus-visible` outline in aurora green (`outline-3 outline-aurora`).

---

## 5. Polish Checklist

- [x] Organic multi-coordinate starfield with no repeating grid patterns.
- [x] Full accessibility with WCAG AA/AAA contrast compliance across all elements.
- [x] Edge-rendered Dynamic OpenGraph artwork.
- [x] Zero third-party SSR dependency issues (React 19 native).
