import { Hero } from '@/components/sections/Hero'
import { Manifesto } from '@/components/sections/Manifesto'
import { Projects } from '@/components/sections/Projects'
import { Services } from '@/components/sections/Services'
import { AboutTeaser } from '@/components/sections/AboutTeaser'
import { Contact } from '@/components/sections/Contact'
import { Marquee } from '@/components/ui/Marquee'

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Projects />
      <Marquee />
      <Services />
      <AboutTeaser />
      <Contact narrativeKey="contact.home_closing_line" />
    </>
  )
}
