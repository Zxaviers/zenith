# Zenith Rework — Progress Log

Autonomous mode active per `ZENITH_PLAYBOOK.md` §7. Working branch:
`feature/zenith-nextjs-rework`. Remote `origin` = `Zxaviers/zenith` (new repo).
Remote `zxaviers-origin` = original `Zxaviers/Zxaviers` (untouched, read-only
reference, never pushed to during this rework).

## Done

### Fase 0 — Audit & Branch ✅
- Branch `feature/zenith-nextjs-rework` created.
- Full audit written to `REBRAND_AUDIT.md` (all "zxaviers" occurrences,
  section/component map, deployment findings).
- Confirmed decisions logged in `ZENITH_PLAYBOOK.md` §0.1.

### Fase 0.5 — Split Repo ✅
- Created `Zxaviers/zenith` (private) via `gh repo create`.
- Pushed `feature/zenith-nextjs-rework` → `zenith` repo's `main` branch.
- Local remotes remapped (reversible, no destructive remote ops):
  - `origin` → `https://github.com/Zxaviers/zenith.git`
  - `zxaviers-origin` → `https://github.com/Zxaviers/Zxaviers.git` (untouched)
- Committed `REBRAND_AUDIT.md` + `ZENITH_PLAYBOOK.md` to the branch.

### Fase 1 — Scaffold Next.js ✅
- Scaffolded Next.js 15 (App Router, TypeScript, Tailwind v4, ESLint) via
  `create-next-app` into a temp sibling folder (`zenith-scaffold-tmp`),
  then merged the needed config into `personal-page/` root and deleted the
  temp folder. Avoided running the generator directly in a non-empty repo.
- Added: `app/layout.tsx`, `app/page.tsx`, `app/globals.css` (minimal
  placeholders — real content lands in Fase 3/4), plus route skeletons
  `app/devlog/page.tsx` and `app/devlog/[slug]/page.tsx` so the `/devlog`
  URL shape survives the routing migration.
- Added `tsconfig.json`, `next.config.mjs` (see decisions below for why
  `.mjs` instead of `.ts`).
- `package.json`: added `next`, `lucide-react`, `clsx`, `tailwind-merge` as
  dependencies; `typescript@^5`, `@types/node`, `@netlify/plugin-nextjs` as
  devDependencies. Added scripts `dev:next` / `build:next` / `start:next`
  alongside the untouched Vite scripts (`dev` / `build` / `preview` still
  run Vite — nothing switched over yet, by design, so the site stays
  deployable from this branch at every point).
- `.gitignore`: added Next.js entries (`/.next/`, `/out/`, `next-env.d.ts`,
  `*.tsbuildinfo`).
- `eslint.config.js`: added `.next` to `globalIgnores` (build output was
  getting linted otherwise).
- Validated: `npm run build:next` (Next production build, 4 routes, all
  static/prerendered as expected) ✅, `npm run build` (Vite, unchanged) ✅,
  `npm run test` (24/24 vitest tests still passing) ✅, `npm run lint`
  (0 errors, 1 pre-existing warning unrelated to this migration) ✅.

### Fase 2 — Design System "Warm Nebula" ✅
- Tokens implemented Tailwind-v4-native, via a CSS `@theme` block in
  `app/globals.css` (not a `tailwind.config.ts` — see decision below),
  which auto-generates matching utilities (`bg-comet`, `text-void`,
  `font-display`, etc). Verified in the compiled CSS output.
- Colors: `comet` `#FF8B4C`, `star` `#FFC857`, `void` `#1B1235`, `nebula`
  `#3E2A63`, `starchart` `#F5E9D6`, `aurora` `#6FCF97`.
- Fonts wired in `app/layout.tsx` via `next/font/google` (Press Start 2P /
  Nunito / VT323), exposed as `--font-display` / `--font-body` /
  `--font-stat` CSS vars consumed by the `@theme` block — see decision
  below on why `next/font/google` instead of `next/font/local`.
- Built `components/ui/`:
  - `PixelPanel.tsx` — notched-corner "pixel frame" (shared `.pixel-frame`
    CSS: two clipped pseudo-layers for border + fill, hard offset
    box-shadow, no blur), `nebula`/`starchart` variants.
  - `PixelButton.tsx` — same pixel-frame base + `.pixel-frame-pressable`
    (press-to-launch effect: translates into its own shadow on `:active`,
    shadow disappears), `comet`/`ghost` variants, visible
    `:focus-visible` aurora outline (not the blurry default).
  - `StarNode.tsx` — small glowing circular node, `locked` / `unlocked` /
    `active` states, accessible (`aria-label`, keyboard-operable button,
    `disabled` when locked). Visual-only primitive for now; grouping +
    connector lines + rich tooltips are a Fase 4 concern (Constellation).
  - `StarfieldBackground.tsx` — pure-CSS layered dot field + nebula haze,
    `intensity: 'low' | 'medium' | 'high'` prop, server-renderable (no
    client JS needed since it's CSS-animation only), animation gated
    behind `prefers-reduced-motion: no-preference` so it degrades to a
    static field rather than disappearing.
  - `lib/utils.ts` — `cn()` helper (`clsx` + `tailwind-merge`), standard
    convention for the primitives above and whatever composes them later.
- Added `app/style-guide/page.tsx` showing all tokens + components live.
- Validated: `npm run build:next` (5 routes now, including `/style-guide`,
  all compiling/prerendering cleanly) ✅, `npm run build` (Vite, still
  unaffected) ✅, `npm run lint` (0 errors, same 1 pre-existing warning) ✅.

### Fase 3 — Rebranding Konten ✅
- **`app/layout.tsx`** (Next.js): metadata title/description finalized to
  the real Zenith wording (matches `index.html`/`manifest.json` below).
- **`package.json`**: `name` → `"zenith"`.
- **`README.md`**: fully rewritten — was a GitHub-profile-card-style
  README (stats badges, snake contribution graph, quote widget) that
  didn't describe this project at all; now describes the actual Zenith
  site/stack/dev commands, credits Rizky Mardhani explicitly.
- **`index.html`**: title/meta description/OG/Twitter tags → "Zenith |
  Computer Engineering Student & Web Developer" wording. JSON-LD Person
  block: kept `name: "Rizky Mardhani"` and `alternateName: "Zxaviers"` as
  personal identity (per §0.1), added a `description` mentioning Zenith
  as the project (there was a duplicate `description` key in the
  original JSON-LD from a first pass — caught and fixed before commit).
- **`public/manifest.json`**: `name`/`short_name`/`description` → Zenith.
- Favicon/app icons: left the existing PNGs as-is after checking — the
  mark is an abstract pixel planet/ring glyph with no literal "Zxaviers"
  text baked in, so it already works as a generic Zenith mark. A proper
  redesigned wordmark OG image is explicitly a Fase 6 task
  (`app/opengraph-image.tsx`, generated in code via `next/og` rather than
  a manually-edited binary asset) — deferred there rather than duplicating
  effort now.
- **Section copy + nav remap** (the biggest part of this phase): the
  existing code already used space/mission themed headings, but assigned
  differently than §0.1's canonical mapping (e.g. "Mission Log" was
  Experience's heading, not Projects'). Remapped throughout:
  - `About.jsx`: heading "Agent Info" → "Mission Control"; now accepts an
    `id` prop (defaults `'mission-control'`) instead of a hardcoded
    `id="agents"` that a passed-in prop silently couldn't override before.
  - `Skills.jsx`: heading "Skill Tree" → "Constellation".
  - `Projects.jsx`: heading "Discovered Artifacts" → "Mission Log".
  - `Experience.jsx`: heading "Mission Log" → "Flight Path".
  - `Contact.jsx`: heading "Get in Touch" → "Send a Transmission".
  - `views/Home.jsx`: updated the `id` props passed to each section to
    match (`mission-control`, `constellation`, `flight-path`,
    `mission-log`, `send-a-transmission`), and `document.title` → Zenith.
  - `Navbar.jsx`: `menuItems` updated to the new label set, **added "Send
    a Transmission"** (Contact previously had no nav entry at all despite
    being a real section — added it now for star-map completeness since
    Fase 3 explicitly specs all 5 non-Home labels). Wordmark text
    "Zxaviers" → "Zenith". Also fixed `.replace(' ', '-')` →
    `.replace(/\s+/g, '-')` when deriving the scroll-target id from a
    label, since "Send a Transmission" has more than one space (the old
    single-replace would have produced the wrong id).
  - `views/NotFound.jsx`, `ProjectDetail.jsx`, `DevlogList.jsx`,
    `DevlogPost.jsx`: `document.title` → Zenith wording.
  - `Footer.jsx`: "© {year} Zxaviers | All rights reserved." → "© {year}
    Zenith | Crafted by Rizky Mardhani" — makes the personal credit
    explicit rather than ambiguous, per §0.1.
  - `components/Preloader.jsx`: boot-sequence wordmark "Zxaviers" →
    "Zenith".
  - `About.jsx` dialogue: kept the Headquarters↔Zxaviers format exactly as
    instructed, reframed content so Zxaviers = operator/pilot callsign,
    Zenith = the mission name ("Mission designation: Zenith" / "Zenith is
    my ongoing mission: …"). `speakerIcons` key `"Zxaviers"` and the two
    `speaker: "Zxaviers"` dialogue entries are unchanged — that's the
    personal operator identity, not brand text.
  - Left unchanged (personal identity / accurate historical fact, not
    brand text, per §0.1): `Contact.jsx`'s `github.com/zxaviers` link,
    `Experience.jsx`'s "zxaviers.site" domain mention in a description
    bullet, `data/projects.js`'s `zxaviers.github.io/Personal/` link.
- Updated `Navbar.test.jsx` for the new label set (was asserting the old
  labels, 1 test failing after the rename) and softened the "no Contact
  link" test's comment now that "Send a Transmission" *is* in the nav
  (the assertion itself — no link literally named "Contact" — still holds).
- Verified with a full-repo case-insensitive grep for "zxaviers": every
  remaining hit is either (a) intentional personal identity (GitHub
  link/handle, domain mention, dialogue speaker name) or (b) inside
  `REBRAND_AUDIT.md`/`ZENITH_PLAYBOOK.md`, which are historical/reference
  docs, not site content (and `REBRAND_AUDIT.md` gets deleted in Fase 6
  per the plan anyway).
- Validated: `npm run build:next` ✅, `npm run build` (Vite) ✅,
  `npm run test` (24/24 after fixing the one Navbar test) ✅, `npm run
  lint` (0 errors) ✅.

### Fase 4 — Bangun Section & Signature Component ✅
Ported the entire Vite/React site into the Next.js `app/` structure on the
Fase 2 design system. All content/copy carried over from Fase 3 unchanged
unless noted.

- **Assets**: copied `src/assets/*.png`/`*.gif` → `public/sprites/` (kept
  original filenames). Next components reference them as plain
  `/sprites/...` paths via `<img>` for now, not `next/image` —
  `next/image` adoption is explicitly a Fase 5 task, so deferred there
  rather than doing it twice.
- **`lib/data/projects.ts`, `lib/data/devlogPosts.ts`**: ported from the
  `.js` originals verbatim (content unchanged), typed, image references
  updated to `/sprites/...` paths.
- **`components/layout/`**: `Navbar.tsx` (react-router →
  `next/navigation`'s `usePathname`/`useRouter`, same smooth-scroll +
  hash-navigation-from-other-routes behavior), `Footer.tsx`,
  `ScrollProgress.tsx`, `Preloader.tsx` — all straightforward ports onto
  design-system tokens.
- **`components/sections/`** (one file per star-map section):
  - `Hero.tsx` — now uses `StarfieldBackground` (intensity `high`)
    instead of the old canvas starfield; added a `PixelButton` "Launch
    into Mission Log" CTA (the original had no CTA at all — new, per
    Fase 4 §1).
  - `MissionControl.tsx` (About) — dialogue system ported as-is.
  - `Constellation.tsx` (Skills, **signature component**) — rebuilt from
    scratch rather than 1:1 ported: replaced the old CSS-grid +
    div-based connector lines with `StarNode`s positioned by percentage
    coordinates inside a relative container, connected by an SVG overlay
    (gradient dashed lines from a center point, so it reads as an actual
    small constellation/star cluster instead of a grid). Node **size and
    opacity now encode skill level** (Proficient/Familiar/Basic — bigger,
    brighter stars for stronger skills), which doubles as a nice
    "brighter = more proficient" astronomy metaphor the old grid version
    didn't have. Category tabs (Web/IoT/Tools) and the side detail panel
    are kept from the original. All node buttons are keyboard-operable
    (native `<button>` via `StarNode`) with visible focus rings.
  - `MissionLog.tsx` (Projects) — ported onto `PixelPanel` + `next/link`.
  - `FlightPath.tsx` (Experience) — ported the animated stat counters
    (`useSpring`/`useInView`), achievement badges, and log entries as-is.
  - `Transmission.tsx` (Contact) — **added a real contact form** (name/
    email/message, basic validation, `idle`/`submitting`/`success`/
    `error` states) since the original only had social links + a CV
    download, but Fase 4 §6 explicitly asked for a form with these
    states. There's no email-sending backend/API key available, so
    "submitting" hands off to the visitor's own mail client via a
    pre-filled `mailto:` link rather than faking an async server call —
    documented inline in the component. Kept the social links + CV
    download below the form.
  - `SecretLevel.tsx` — Kaboom.js mini-game ported 1:1 (same dynamic
    import so mobile never downloads it), still not linked from the nav
    (intentional "secret" bonus section per §0.1).
- **`app/page.tsx`**: composes all of the above in the same order as the
  old `src/views/Home.jsx` (Hero → Mission Control → Constellation →
  Flight Path → Mission Log → Secret Level → Transmission).
- **`app/devlog/page.tsx`, `app/devlog/[slug]/page.tsx`**: real content
  now (were Fase 1 placeholders), server components, `generateStaticParams`
  for SSG, `notFound()` for unknown slugs (replacing react-router's
  `<Navigate>` redirect-to-list behavior with a proper 404 instead — a
  small, deliberate UX improvement: a bad devlog link should 404, not
  silently bounce to the list).
- **`app/projects/[slug]/page.tsx`** (new route, mirrors the Vite app's
  `/projects/:slug`): same treatment — SSG + `notFound()`.
- **`app/not-found.tsx`**: ported from `src/views/NotFound.jsx`.
- Fixed a real TS/Kaboom typing gap: `spawnLoop.time = ...` doesn't exist
  on Kaboom's declared `EventController` type even though it's a real,
  working mutable field at runtime — cast through `unknown` to assign it
  rather than suppressing the whole file's type-checking.
- Validated: `npm run build:next` ✅ (10 routes: `/`, `/devlog`,
  2 SSG devlog posts, 2 SSG project pages, `/style-guide`, `/_not-found`),
  `npm run build` (Vite, still untouched and working) ✅, `npm run lint`
  (0 errors) ✅, `npm run test` (24/24) ✅. Also smoke-tested
  `next start` directly: homepage HTML contains all 5 section headings +
  brand name, `/devlog`, a devlog post, and a project page all return
  200, an unknown route returns 404 — confirmed by curl against a
  temporary local server (stopped after the check).

### Fase 5 — Aksesibilitas & Performa ✅
- **Contrast Audit**: Checked opacity-based text color tokens. Upgraded `text-starchart/60` and `/70` to `text-starchart/80` (and `text-comet/80`) for all text smaller than 24px across multiple files to ensure WCAG AA compliance.
- **Keyboard Navigation**: Verified focus-visible styles exist and are properly configured with custom outline (`focus-visible:outline-aurora`) on interactive components (`StarNode`, `PixelButton`, form inputs).
- **Images & Alt Text**: Replaced all `<img>` tags with `next/image` (`<Image>`) components to enable automatic lazy loading. Verified that all sprites have descriptive `alt` text or `aria-hidden="true"` for decorative elements.
- **Font Subsetting**: Verified that `next/font/google` configurations for `Press_Start_2P`, `Nunito`, and `VT323` specify `subsets: ['latin']`.
- **Bundle Size**: Ran Next.js production build (`npm run build:next`). All 10 routes compiled successfully. `/` route First Load JS is 173 kB, others around 106-111 kB. Shared JS is 103 kB.

## In progress

### Fase 6 — SEO, Metadata, Deployment (Netlify) (Partial)
- **Metadata API**: Implemented title template, dynamic OG image (`app/opengraph-image.tsx`), `sitemap.ts`, `robots.ts`, and JSON-LD schema (Person + WebSite) in `app/layout.tsx`.
- **Netlify Setup**: Created `netlify.toml` with `@netlify/plugin-nextjs`. Cleared Vite-era `public/_redirects` to avoid routing conflicts with Next.js App Router.
- **CI/CD**: Updated `.github/workflows/ci.yml` to run `npm run build:next`.
- **Blocker**: Netlify CLI is not installed/authenticated in this environment. Stopping here for user intervention as instructed in Mode Otonom condition #1.

## Small decisions made along the way (not pre-specified in §0.1)

- Reused `https://github.com/Zxaviers/zenith.git` (no `-portfolio` suffix)
  since the name was available.
- Keeping Vite's existing npm scripts as the "live" ones until Next.js is
  proven out, adding parallel `*:next` scripts instead of overwriting —
  most reversible option, avoids any window where `npm run dev`/`build`
  breaks for whoever might deploy from this branch mid-migration.
- **Renamed `src/pages/` → `src/views/`** (and updated the 5 imports in
  `src/App.jsx`). Root cause: Next.js auto-detects `src/pages` as a Pages
  Router directory whenever a `src/` folder exists at the project root,
  regardless of intent — it doesn't require a `src/app` sibling to trigger
  that check. With our new root-level `app/` *and* the old `src/pages`,
  Next enabled both routers simultaneously and tried to webpack-bundle the
  Vite pages' `*.test.jsx` files (which import `vitest`), causing a hard
  build failure (`node:module` unhandled scheme error via
  `vite/dist/node/module-runner.js`). Renaming avoids the collision
  entirely. This does touch Vite source, but only a folder name + import
  paths — Vite/React Router attach no special meaning to a folder named
  "pages", so there's no behavior change, confirmed by `npm run build` and
  `npm run test` both still passing after the rename. Considered safer
  than trying to suppress Next's directory auto-detection, which isn't
  configurable.
- Used `next.config.mjs` instead of `next.config.ts`: the `.ts` config
  variant failed to load (`Cannot read properties of undefined (reading
  'fileExists')` from Next's internal TS transpilation), a known class of
  issue unrelated to our code. Switching to plain `.mjs` sidesteps it
  entirely and we don't need TS-specific config typing yet.
- Added `outputFileTracingRoot` pinned to the project directory in
  `next.config.mjs`, because Next.js was misdetecting the workspace root
  due to an unrelated stray `package-lock.json` in the user's home
  directory (outside this repo). Harmless either way, but keeps file
  tracing correctly scoped.
- Set `eslint.ignoreDuringBuilds: true` in `next.config.mjs` for now —
  the existing `eslint.config.js` is a Vite-oriented flat config without
  the `next/core-web-vitals` plugin; wiring a proper combined ESLint setup
  is deferred to a later phase rather than blocking the Fase 1 build.
- Pinned `typescript@^5` explicitly as a devDependency after `npm install`
  initially pulled in a TypeScript 7 prerelease that Next.js 15 doesn't
  support yet ("TypeScript 7.0.2 is not supported by this version of
  Next.js").
- Note for later: `create_directory` and `copy_path` tools were both
  non-functional in this environment for this repo (consistently returned
  "outside the project" / similar errors even for root-level test paths);
  worked around using `write_file` (which creates the file but not missing
  parent dirs) plus plain shell `mkdir -p`/`mv` via the terminal tool.
- **Tokens via CSS `@theme`, not `tailwind.config.ts`.** The playbook's
  wording ("tambahkan ke tailwind.config.ts") assumes Tailwind v3-style JS
  config, but this project is already on Tailwind v4
  (`@tailwindcss/postcss`, `@import 'tailwindcss'` in CSS — set up before
  this rework started). v4's idiomatic, first-class way to extend the
  theme is a CSS `@theme {}` block, which is what generates the utility
  classes directly (confirmed `bg-comet`, `text-void`, etc. in the
  compiled output). A `tailwind.config.ts` would have been redundant/inert
  for this purpose under v4, so skipped it rather than add a file that
  does nothing.
- **`next/font/google` instead of `next/font/local`** for Press Start 2P /
  Nunito / VT323. Both approaches self-host (no runtime request to
  Google's CDN, which is the actual goal behind the playbook's wording);
  `next/font/local` would additionally require sourcing and committing the
  actual `.woff2` files ourselves with correct licensing, which is extra
  manual work for the same runtime outcome. Reversible later if we ever
  need fully offline builds or a font not on Google Fonts.

## Credential/tooling status

- `gh` CLi: ✅ authenticated as `Zxaviers`.
- Netlify CLI: ❌ not installed/linked as of Fase 1 start. Expected to hit
  Mode Otonom stop condition #1 at Fase 6 unless resolved before then.
- Node v24.9.0 / npm 11.8.0 available.

## Next up
Fase 5 — Aksesibilitas & Performa: WCAG AA contrast audit on the Warm
Nebula palette, keyboard/focus-visible audit on the new interactive
components (StarNode/PixelButton/Constellation/form), alt text audit on
sprite `<img>`s, `next/image` adoption for visual assets (deferred here
from Fase 4 on purpose), and reporting production bundle size per route.
