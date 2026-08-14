import { Preloader } from '@/components/layout/Preloader'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { Navbar } from '@/components/layout/Navbar'
import { PilotSideDock } from '@/components/layout/PilotSideDock'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { MissionControl } from '@/components/sections/MissionControl'
import { Constellation } from '@/components/sections/Constellation'
import { FlightPath } from '@/components/sections/FlightPath'
import { MissionLog } from '@/components/sections/MissionLog'
import { SecretLevel } from '@/components/sections/SecretLevel'
import { Transmission } from '@/components/sections/Transmission'

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <div className="fixed inset-0 scanlines z-30 pointer-events-none opacity-30 mix-blend-overlay" aria-hidden="true" />
      <Navbar />
      <PilotSideDock />

      <main className="scroll-smooth xl:pl-44 transition-all duration-300">
        <Hero />
        <MissionControl />
        <Constellation />
        <FlightPath />
        <MissionLog />
        <SecretLevel />
        <Transmission />
      </main>

      <Footer />
    </>
  )
}

