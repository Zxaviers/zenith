import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray lockfile elsewhere on this machine makes Next.js misdetect the
  // workspace root (see the "multiple lockfiles" warning). Pin it here so
  // file tracing / bundling stays scoped to this project only.
  outputFileTracingRoot: __dirname,
  eslint: {
    // The Vite/React source under src/ uses its own flat ESLint config
    // (eslint.config.js) that isn't Next-aware yet. Revisit wiring a
    // combined config in a later phase; don't let that block `next build`.
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
