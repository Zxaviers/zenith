import { Maintenance } from '@/components/sections/Maintenance'
import { Preloader } from '@/components/layout/Preloader'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { GlobalStarfield } from '@/components/layout/GlobalStarfield'
import { Hero } from '@/components/sections/Hero'
import { MissionControl } from '@/components/sections/MissionControl'
import { Constellation } from '@/components/sections/Constellation'
import { FlightPath } from '@/components/sections/FlightPath'
import { MissionLog } from '@/components/sections/MissionLog'
import { IoTWorkbench } from '@/components/sections/IoTWorkbench'
import { Transmission } from '@/components/sections/Transmission'

// Set to false when ready to launch the full portfolio
const IS_MAINTENANCE = false

export default function Home() {
  if (IS_MAINTENANCE) {
    return <Maintenance />
  }

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <GlobalStarfield starCount={160} />
      <Navbar />

      <main className="relative z-10 scroll-smooth transition-all duration-300">
        <Hero />
        <MissionControl />
        <Constellation />
        <FlightPath />
        <MissionLog />
        <IoTWorkbench />
        <Transmission />
      </main>

      <Footer />
    </>
  )
}
