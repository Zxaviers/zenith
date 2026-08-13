# Rebrand Audit — Zxaviers → Zenith

Branch created: `feature/zenith-nextjs-rework` (from `main`, working tree was clean at time of branching).

This is an **audit only**. No source files have been modified yet.

---

## 1. Stack confirmation

- Build tool: **Vite 7** (`vite.config.js`), plugins: `@vitejs/plugin-react`, `vite-plugin-image-optimizer`.
- Styling: **Tailwind CSS v4** (`@import 'tailwindcss'` in `src/index.css`, not the old `tailwind.config.js` theme-based v3 style — `tailwind.config.js` only sets `content` paths, no custom theme yet).
- Routing: `react-router-dom` v7 (`BrowserRouter`, routes for `/`, `/projects/:slug`, `/devlog`, `/devlog/:slug`, `*`).
- Animation: `framer-motion` v12.
- Testing: `vitest` + `@testing-library/react`, several `*.test.jsx` files already exist (`Navbar`, `Projects`, `Skills`, `Contact`, `ScrollProgress`, `SecretGame`, `App`, pages).
- `kaboom` is also a dependency — used by `SecretGame.jsx` (an existing hidden mini-game / easter egg, referenced from the Playbook's audit as "secret level" devlog post).

## 2. Deployment — correction to Playbook's assumption

⚠️ The master playbook assumes GitHub Pages deploy via `.github/workflows`. That assumption **does not hold**:

- `.github/workflows/ci.yml` only runs `lint` → `test` → `build`. **There is no deploy step at all** (no `gh-pages`, no `actions/deploy-pages`, no `peaceiris/actions-gh-pages`).
- `public/_redirects` exists — this is a **Netlify-specific** SPA fallback file (`/*  /index.html  200`), not something GitHub Pages/Vercel use natively.
- `src/Sections/Experience.jsx` and `src/data/projects.js` explicitly say the site is built with "React, Tailwind CSS, and **Netlify Hosting**", with "CI/CD pipelines using GitHub and Vercel" mentioned for a *different* project (PCB Custom Malang), not this portfolio itself.
- No `homepage` field in `package.json`, no `base`/`build.outDir` override in `vite.config.js` — consistent with Netlify (root-domain deploy, no base-path needed) rather than GitHub Pages (which would typically need a `/repo-name/` base path unless using a custom domain + CNAME).

**Conclusion: current hosting is almost certainly Netlify, not GitHub Pages.** Fase 6 (SEO/Deployment) should ask you to confirm Netlify vs. Vercel vs. GitHub Pages explicitly — the "keep GitHub Pages" trade-off branch in the playbook likely doesn't apply as-is.

## 3. Section/component map

| Playbook role | Actual file(s) |
|---|---|
| Navbar | `src/Sections/Navbar.jsx` (+ `Navbar.test.jsx`) |
| Hero | `src/Sections/Hero.jsx` |
| About | `src/Sections/About.jsx` — already framed as a "dialogue" between `Headquarters` and `Zxaviers` (agent-profile briefing style) |
| Skills | `src/Sections/Skills.jsx` (+ `Skills.test.jsx`) — **a skill-tree-like UI already exists** (`SKILL_DATA` grouped into `web` / `iot` / `tools`, grid-positioned `SkillNode`s with `row`/`col`, connector lines via `.skill-line-h`/`.skill-line-v` in `index.css`, tooltip on hover, level-based coloring). This is a strong head start for the Fase 4 "Constellation" signature component — likely evolve/restyle rather than build from scratch. |
| Projects | `src/Sections/Projects.jsx` (+ test), data in `src/data/projects.js`, detail page `src/pages/ProjectDetail.jsx` |
| Experience | `src/Sections/Experience.jsx` — already uses "Mission Log" heading + RPG-stat-card framing (`AGENT STATUS`, `Level`, `Class`, achievements/badges) |
| Contact | `src/Sections/Contact.jsx` (+ test) |
| Footer | `src/Sections/Footer.jsx` |
| Extra pages (not in playbook's original scope) | `src/pages/Home.jsx`, `DevlogList.jsx`, `DevlogPost.jsx` (+ tests), `NotFound.jsx` — a devlog/blog system exists (`src/data/devlogPosts.js`) and isn't mentioned anywhere in the playbook. Needs an explicit decision on whether Zenith keeps a devlog section. |
| Other components | `src/components/Preloader.jsx` (boot/intro animation — already displays "Zxaviers" wordmark), `StarsBackground.jsx` (parallax starfield — already exists, relevant for Fase 4 hero work), `ScrollProgress.jsx`, `SecretGame.jsx` (kaboom-based hidden mini-game) |

**Note:** Much of the "space theme" and "RPG/agent" framing described in the Design Brief (Fase 3/2. of playbook) is **already partially implemented** in the current codebase (dialogue-style About, Mission Log heading, Agent Status card, skill tree, starfield background, pixel-border panels via `.pixel-border-box`). The rework should treat this as an evolution/reskin of existing patterns, not a from-scratch build.

## 4. All "zxaviers" / "Zxaviers" / "ZXAVIERS" occurrences (case-insensitive) inside `personal-page/`

### `README.md`
- L3: typing-SVG image alt text `I'm+Zxaviers`
- L20: "Creator of **zxaviers.site**"
- L31, L33: GitHub stats/top-langs badge URLs using `username=Zxaviers`
- L51: GitHub profile-trophy badge URL using `username=Zxaviers`
- L69: "Website: **https://zxaviers.site**"
- L78: "Crafted with ❤️ by Zxaviers — Powered by Pixel Art & Space Vibes 🚀"

### `index.html`
- L8: `<title>Zxaviers | Computer Engineering Student & Web Developer</title>`
- L11: meta description "Portfolio Zxaviers (Rizky Mardhani) …"
- L14: `<link rel="canonical" href="https://zxaviers.site/">`
- L17-18: `og:url`, `og:title`
- L21: `og:description`
- L23: `og:image` → `https://zxaviers.site/og-image.png`
- L28: `twitter:title`
- L31: `twitter:description`
- L33: `twitter:image`
- L52-53: JSON-LD `name: "Rizky Mardhani"`, `alternateName: "Zxaviers"`
- L54-55: JSON-LD `url`, `image` → `zxaviers.site`
- L59: JSON-LD `sameAs` → `https://github.com/zxaviers`

### `public/manifest.json`
- L2: `name: "Zxaviers | Computer Engineering Student & Web Developer"`
- L3: `short_name: "Zxaviers"`
- L4: `description` mentions "Portfolio Zxaviers (Rizky Mardhani) …"

### `public/robots.txt`
- L4: `Sitemap: https://zxaviers.site/sitemap.xml`

### `public/sitemap.xml`
- All `<loc>` entries use `https://zxaviers.site/...` (5 URLs total: home, `/devlog`, 2 devlog posts, 2 project pages — 6 actually, see file)

### `src/Sections/About.jsx`
- L16: dialogue line "Analyzing agent profile... Zxaviers. Status: Online."
- L19, L23: `speaker: "Zxaviers"` (×2 dialogue lines)
- L35: `speakerIcons` object key `"Zxaviers"`

### `src/Sections/Contact.jsx`
- L34: GitHub link `href="https://github.com/zxaviers"`

### `src/Sections/Experience.jsx`
- L150: description text "Developed the website zxaviers.site and pcb-custom-malang.web.app …"

### `src/Sections/Footer.jsx`
- L21: `© {year} Zxaviers | All rights reserved.`

### `src/Sections/Navbar.jsx`
- L90: `<h1 className="...">Zxaviers</h1>` (wordmark next to logo)

### `src/components/Preloader.jsx`
- L51 (comment), L64: renders "Zxaviers" as the boot-sequence wordmark

### `src/data/projects.js`
- L28: project link `https://zxaviers.github.io/Personal/`

### `src/pages/DevlogList.jsx`
- L10: `document.title = 'Devlog | Zxaviers'`

### `src/pages/DevlogPost.jsx`
- L14: `document.title = \`${post.title} | Zxaviers Devlog\``

### `src/pages/Home.jsx`
- L30: `document.title = 'Zxaviers | Computer Engineering Student & Web Developer'`

### `src/pages/NotFound.jsx`
- L7: `document.title = '404 — Lost in Space | Zxaviers'`

### `src/pages/ProjectDetail.jsx`
- L14: `document.title = \`${project.title} — ${project.desc} | Zxaviers\``

**Not found anywhere in `personal-page/`:** references to Vercel/Netlify/GitHub-Pages deploy config using the "zxaviers" string, and no `package.json` `name` field uses it (`package.json` name is already the generic `"personal-page"`).

## 5. Identity items to KEEP as-is (per Playbook assumption #2 — confirm before Fase 3)

- Real name: **Rizky Mardhani**
- Email: `riskimardhani@gmail.com`
- Instagram: `https://instagram.com/sza.vy1st`
- LinkedIn: `https://linkedin.com/in/rizky-mardhani1st`
- GitHub handle: `zxaviers` / `Zxaviers` — ⚠️ **this one is ambiguous**: it's simultaneously (a) a personal identity/handle to keep, and (b) the brand name to rebrand. Links like `github.com/zxaviers` should almost certainly stay pointed at the real GitHub account (unless you rename that account too), but wordmarks/titles/`alternateName` referring to the *brand* should become "Zenith". **Needs your explicit confirmation on where the line is.**

## 6. Open questions before Fase 1 (migration) starts

1. **Hosting target for Next.js** — Netlify (supports Next.js SSR via their adapter), Vercel (native), or static export? This affects Fase 1 scaffold decisions early, not just Fase 6.
2. **Repo strategy** — playbook recommends *not* renaming `Zxaviers/Zxaviers` (to preserve the GitHub profile README feature) and creating a new repo for the site. Confirm: keep working in this same repo under a new name later, or actually split into a new repo now?
3. **Devlog/blog system** (`/devlog`, `/devlog/:slug`) and the hidden `SecretGame` easter egg aren't mentioned in the playbook at all — confirm both should be preserved and migrated (they appear to be a deliberate part of the site's personality, not leftover cruft).
4. **GitHub handle vs. brand name** — see point 5 above.
5. Domain: confirm still `zxaviers.site` for now (per playbook assumption #3), or should sitemap/canonical/OG URLs change too?

---

**Nothing has been committed.** Once you confirm/correct the assumptions above, I'll proceed to Fase 1 (Next.js scaffold).
