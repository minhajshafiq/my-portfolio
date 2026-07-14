import { AboutTeaser } from '@/features/about'
import { Contact } from '@/features/contact'
import { FAQ, Hero, HomeOffers, Manifesto, Problems } from '@/features/home'
import { Projects } from '@/features/projects'
import { Services } from '@/features/services'
import { Marquee } from '@/components/ui/Marquee'

export default function Home() {
  return (
    <>
      <Hero />
      <Problems />
      <Manifesto />
      <Projects />
      <Marquee />
      <Services />
      <HomeOffers />
      <AboutTeaser />
      <FAQ />
      <Contact narrativeKey="contact.home_closing_line" />
    </>
  )
}
