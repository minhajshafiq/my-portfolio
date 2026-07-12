import { AboutTeaser } from '@/features/about'
import { Contact } from '@/features/contact'
import { Hero, HomeOffers, Manifesto } from '@/features/home'
import { Projects } from '@/features/projects'
import { Services } from '@/features/services'
import { Marquee } from '@/components/ui/Marquee'

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Projects />
      <Marquee />
      <Services />
      <HomeOffers />
      <AboutTeaser />
      <Contact narrativeKey="contact.home_closing_line" />
    </>
  )
}
