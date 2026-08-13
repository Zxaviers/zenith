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

## In progress

Nothing — Fase 1 complete, moving to Fase 2 next.

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

## Credential/tooling status

- `gh` CLi: ✅ authenticated as `Zxaviers`.
- Netlify CLI: ❌ not installed/linked as of Fase 1 start. Expected to hit
  Mode Otonom stop condition #1 at Fase 6 unless resolved before then.
- Node v24.9.0 / npm 11.8.0 available.

## Next up
Fase 2 — Design System "Warm Nebula" (tokens, PixelPanel/PixelButton/
StarNode/StarfieldBackground primitives, `/style-guide` preview page).
