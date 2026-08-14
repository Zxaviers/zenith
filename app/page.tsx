import { Preloader } from '@/components/layout/Preloader'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { Navbar } from '@/components/layout/Navbar'
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
      <Navbar />

      <main className="scroll-smooth transition-all duration-300">
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
