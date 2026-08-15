import Image from 'next/image'

export function Footer() {
  return (
    <footer
      className="relative py-12 text-center text-sm glint-top"
      style={{
        background: 'rgba(19,13,26,0.97)',
        borderTop: '1px solid rgba(0,245,196,0.2)',
        color: 'rgba(240,238,255,0.75)',
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
              backgroundSize: '5544px 36px',  /* 7392*36/48 = 5544 at 36px height */
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0 0 8px rgba(0,245,196,0.4))',
              animationDuration: '8s',
            }}
            aria-hidden="true"
          />
          <span
            className="font-display text-xs tracking-widest"
            style={{ color: 'var(--color-teal)' }}
          >
            ZENITH ORBITAL STATION // ALL SYSTEMS NOMINAL
          </span>
        </div>

        {/* Orbit Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 py-2">
          {[
            { href: 'https://github.com/zxaviers', label: '⚡ GitHub // @zxaviers' },
            { href: 'https://linkedin.com/in/rizky-mardhani1st', label: '💼 LinkedIn // Rizky Mardhani' },
            { href: 'https://instagram.com/sza.vy1st', label: '📸 Instagram // @sza.vy1st' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-orbit-link font-stat text-xs px-3 py-1.5 rounded transition-all"
            >
              {label}
            </a>
          ))}
        </div>

        <p className="font-body text-base md:text-lg" style={{ color: 'var(--color-ink)', opacity: 0.85 }}>
          Made with ❤️ and stardust ✨
        </p>

        <p className="font-stat text-xs" style={{ color: 'var(--color-ink-muted)', opacity: 0.6 }}>
          © {new Date().getFullYear()} Zenith // Crafted with precision by Rizky Mardhani
        </p>

        {/* Wajib: credit CC0 asset — praktik baik meski tidak diwajibkan lisensi */}
        <p className="font-stat text-[10px]" style={{ color: 'var(--color-ink-muted)', opacity: 0.4 }}>
          Space assets by{' '}
          <a
            href="https://foozle.io"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-opacity hover:opacity-70"
          >
            Foozle (foozle.io)
          </a>
        </p>
      </div>
    </footer>
  )
}

