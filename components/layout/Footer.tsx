import Image from 'next/image'

export function Footer() {
  return (
    <footer className="relative border-t-2 border-star/40 bg-void/95 py-12 text-center text-sm text-starchart/80 glint-top shadow-[0_-4px_0_0_#000]">
      <div className="mx-auto max-w-4xl px-4 flex flex-col items-center justify-center gap-4">
        {/* Orbital Station Badge */}
        <div className="flex items-center gap-2.5">
          <Image
            src="/sprites/planetBiru.png"
            alt=""
            width={36}
            height={36}
            aria-hidden="true"
            className="h-9 w-9 pixel-asset animate-float-slow drop-shadow-[0_0_12px_rgba(255,200,87,0.35)]"
          />
          <span className="font-display text-xs text-star tracking-widest">
            ZENITH ORBITAL STATION // ALL SYSTEMS NOMINAL
          </span>
        </div>

        {/* Orbit Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 py-2">
          <a
            href="https://github.com/zxaviers"
            target="_blank"
            rel="noopener noreferrer"
            className="font-stat text-xs px-3 py-1.5 rounded bg-nebula border border-white/10 hover:border-star text-starchart transition-colors shadow-[2px_2px_0_0_#000]"
          >
            ⚡ GitHub // @zxaviers
          </a>
          <a
            href="https://linkedin.com/in/rizky-mardhani1st"
            target="_blank"
            rel="noopener noreferrer"
            className="font-stat text-xs px-3 py-1.5 rounded bg-nebula border border-white/10 hover:border-star text-starchart transition-colors shadow-[2px_2px_0_0_#000]"
          >
            💼 LinkedIn // Rizky Mardhani
          </a>
          <a
            href="https://instagram.com/sza.vy1st"
            target="_blank"
            rel="noopener noreferrer"
            className="font-stat text-xs px-3 py-1.5 rounded bg-nebula border border-white/10 hover:border-star text-starchart transition-colors shadow-[2px_2px_0_0_#000]"
          >
            📸 Instagram // @sza.vy1st
          </a>
        </div>

        <p className="font-body text-base md:text-lg text-starchart/90">
          Made with ❤️ and stardust ✨
        </p>

        <p className="font-stat text-xs text-starchart/60">
          © {new Date().getFullYear()} Zenith // Crafted with precision by Rizky Mardhani
        </p>
      </div>
    </footer>
  )
}
