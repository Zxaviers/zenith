export function Footer() {
  return (
    <footer className="mt-0 border-t border-nebula/40 py-6 text-center text-sm text-starchart/70">
      <div className="flex flex-col items-center justify-center gap-2">
        <img src="/sprites/planetBiru.png" alt="" aria-hidden="true" className="h-8 w-8 pixel-asset" />
        <p className="font-body text-lg md:text-xl">Made with ❤️ and stardust ✨</p>
        <p className="font-body text-lg opacity-70 md:text-xl">
          © {new Date().getFullYear()} Zenith | Crafted by Rizky Mardhani
        </p>
      </div>
    </footer>
  )
}
