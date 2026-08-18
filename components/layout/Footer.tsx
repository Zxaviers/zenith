import { siteConfig } from '@/lib/config/siteConfig'

export function Footer() {
  return (
    <footer
      className="relative py-12 text-center text-sm glint-top"
      style={{
        background: 'rgba(27, 18, 53, 0.97)',
        borderTop: '1px solid rgba(255, 200, 87, 0.2)',
        color: 'rgba(245, 233, 214, 0.75)',
        boxShadow: '0 -4px 0 0 #000',
      }}
    >
      <div className="mx-auto max-w-4xl px-4 flex flex-col items-center justify-center gap-4">
        {/* Orbital Station Badge — planet sprite dari Void pack */}
        <div className="flex items-center gap-3">
          {/* Animated planet-earth sprite from Foozle */}
          <div
            className="pixel-asset animate-planet-spin"
            style={{
              width: 36,
              height: 36,
              backgroundImage: 'url(/sprites/void/planet-earth.png)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '0 0',
              backgroundSize: '2772px 36px',
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0 0 8px rgba(255, 200, 87, 0.4))',
              animationDuration: '8s',
            }}
            aria-hidden="true"
          />
          <span
            className="font-display text-xs tracking-widest text-[var(--color-star)]"
          >
            {siteConfig.handle.toUpperCase()} ORBITAL STATION // ALL SYSTEMS NOMINAL
          </span>
        </div>

        {/* Orbit Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 py-2">
          {[
            { href: siteConfig.socials.github, label: '⚡ GitHub' },
            { href: siteConfig.socials.linkedin, label: `💼 LinkedIn // ${siteConfig.name}` },
            { href: siteConfig.socials.instagram, label: '📸 Instagram // @ryzennth_' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-orbit-link font-stat text-xs px-3 py-1.5 rounded transition-all hover:text-[var(--color-star)]"
            >
              {label}
            </a>
          ))}
        </div>

        <p className="font-stat text-xs text-[var(--color-ink-muted)] opacity-60">
          © {new Date().getFullYear()} {siteConfig.handle} // Crafted with precision by {siteConfig.name}
        </p>
      </div>
    </footer>
  )
}
