import { Hero } from '@/components/widgets/Hero'
import { About } from '@/components/widgets/About'
import { Services } from '@/components/widgets/Services'
import { Projects } from '@/components/widgets/Projects'
import { Contact } from '@/components/widgets/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <About />
      {/* <Testimonials /> */}
      <Contact />
    </>
  )
}
