import Image from 'next/image'
import { PixelButton } from '@/components/ui/PixelButton'

export function Footer() {
  return (
    <footer className="relative border-t-2 border-star/30 bg-void/90 py-10 text-center text-sm text-starchart/80 glint-top">
      <div className="mx-auto max-w-4xl px-4 flex flex-col items-center justify-center gap-4">
        {/* Planet Icon & Transmission Tag */}
        <div className="flex items-center gap-2">
          <Image
            src="/sprites/planetBiru.png"
            alt=""
            width={36}
            height={36}
            aria-hidden="true"
            className="h-9 w-9 pixel-asset animate-float-slow drop-shadow-[0_0_12px_rgba(255,200,87,0.3)]"
          />
          <span className="font-display text-xs text-star tracking-widest">
            ZENITH ORBITAL STATION
          </span>
        </div>

        {/* Social Orbital Links & CV Download */}
        <div className="flex flex-wrap items-center justify-center gap-3 py-2">
          <a
            href="https://github.com/zxaviers"
            target="_blank"
            rel="noopener noreferrer"
            className="font-stat text-xs px-3 py-1.5 rounded bg-nebula/80 border border-white/10 hover:border-star text-starchart transition-colors"
          >
            ⚡ GitHub // @zxaviers
          </a>
          <a
            href="https://linkedin.com/in/rizky-mardhani1st"
            target="_blank"
            rel="noopener noreferrer"
            className="font-stat text-xs px-3 py-1.5 rounded bg-nebula/80 border border-white/10 hover:border-star text-starchart transition-colors"
          >
            💼 LinkedIn // Rizky Mardhani
          </a>
          <a
            href="https://instagram.com/sza.vy1st"
            target="_blank"
            rel="noopener noreferrer"
            className="font-stat text-xs px-3 py-1.5 rounded bg-nebula/80 border border-white/10 hover:border-star text-starchart transition-colors"
          >
            📸 Instagram // @sza.vy1st
          </a>
          <a
            href="/CV-Rizky-Mardhani.pdf"
            download
            className="font-stat text-xs px-3 py-1.5 rounded bg-comet/20 border border-comet/50 hover:bg-comet hover:text-void text-comet font-bold transition-all"
          >
            📄 Download Flight CV
          </a>
        </div>

        <p className="font-body text-base md:text-lg text-starchart/90">
          Made with ❤️ and stardust ✨
        </p>

        <p className="font-stat text-xs md:text-sm text-starchart/60">
          © {new Date().getFullYear()} Zenith // Crafted with precision by Rizky Mardhani
        </p>
      </div>
    </footer>
  )
}
