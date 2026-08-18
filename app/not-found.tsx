import Link from 'next/link'
import { PixelButton } from '@/components/ui/PixelButton'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 font-display text-3xl text-teal">404</h1>
      <p className="mb-8 font-body text-lg text-ink-muted md:text-xl">
        This coordinate doesn&apos;t exist in this galaxy.
      </p>
      <Link href="/">
        <PixelButton variant="comet">Return to Base</PixelButton>
      </Link>
    </section>
  )
}
