'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight, FaGithub } from 'react-icons/fa'
import { useTranslation } from '@/hooks/useTranslation'
import { RevealText } from '@/components/ui/RevealText'
import { PROJECTS } from '@/data/projects'
import { ProjectRow, type ProjectVariant } from './Projects'
import { WorkHorizontalJourney } from './WorkHorizontalJourney'
import { Contact } from './Contact'
import { EASE_SMOOTH, fadeUp } from '@/lib/motion'
import { SectionLabel } from '@/components/ui/SectionLabel'

function getProjectVariant(index: number): ProjectVariant {
  if (PROJECTS[index]?.featured) return 'feature'
  if (index === PROJECTS.length - 1) return 'compact'
  return 'standard'
}

/** Traversée horizontale à partir du format PC (≥1024px) ; en dessous, format tablette → liste verticale. */
function useHorizontalJourney() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const update = () => setEnabled(query.matches && !motionQuery.matches)

    update()
    query.addEventListener('change', update)
    motionQuery.addEventListener('change', update)

    return () => {
      query.removeEventListener('change', update)
      motionQuery.removeEventListener('change', update)
    }
  }, [])

  return enabled
}

export function WorkList() {
  const { t, language } = useTranslation()
  const isHorizontalJourney = useHorizontalJourney()

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  const visitLabel = tr('work.case')

  return (
    <>
      <section
        id="work-index"
        className="relative bg-custom-primary pb-[clamp(4.5rem,8vw,8rem)] pt-[clamp(9rem,16vw,13rem)]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
          <div className="mx-auto w-full max-w-[min(1180px,calc(100vw-2.5rem))]">
            {/* Page header */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, ease: EASE_SMOOTH }}
              className="mb-14 md:mb-20"
            >
              <SectionLabel>{tr('work.label')}</SectionLabel>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
                <RevealText
                  as="h1"
                  text={tr('work.page_heading')}
                  className="font-serif text-[clamp(2.6rem,7vw,5.4rem)] font-medium leading-[1.02] tracking-[-0.025em] text-custom-title md:col-span-8"
                />

                <p className="max-w-sm text-sm leading-6 text-custom-secondary md:col-span-4 md:justify-self-end md:text-[15px] md:leading-7">
                  {tr('work.page_intro')}
                </p>
              </div>

              {/* Amorce du fil rouge : invite à démarrer le parcours */}
              <div className="mt-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-custom-muted md:mt-14">
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-1.5 w-1.5 rounded-full bg-[#8C0605] dark:bg-red-400"
                />
                {tr('work.scroll_hint')}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Projets : traversée horizontale épinglée (≥1024px) ou liste
            verticale éditoriale en repli (tablette/mobile / prefers-reduced-motion). */}
        <div id="work-projects">
          {isHorizontalJourney ? (
            <WorkHorizontalJourney tr={tr} locale={language} visitLabel={visitLabel} />
          ) : (
            <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
              <div className="mx-auto w-full max-w-[min(1180px,calc(100vw-2.5rem))]">
                {PROJECTS.map((project, index) => (
                  <ProjectRow
                    key={project.key}
                    project={project}
                    index={index}
                    visitLabel={visitLabel}
                    locale={language}
                    tr={tr}
                    variant={getProjectVariant(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
          <div className="mx-auto w-full max-w-[min(1180px,calc(100vw-2.5rem))]">
            {/* GitHub */}
            <motion.div
              id="work-more"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, ease: EASE_SMOOTH }}
              className="flex flex-col items-start justify-between gap-5 border-t border-custom pt-10 md:flex-row md:items-center"
            >
              <div>
                <p className="font-serif text-xl font-medium text-custom-title md:text-2xl">
                  {tr('work.github_title')}
                </p>

                <p className="mt-1 text-sm text-custom-secondary">
                  {tr('work.github_subtitle')}
                </p>
              </div>

              <a
                href="https://github.com/minhajshafiq"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-custom px-6 py-3.5 text-sm font-bold text-custom-title transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8C0605] hover:text-[#8C0605] dark:hover:border-red-400 dark:hover:text-red-400"
              >
                <FaGithub className="h-4 w-4" />
                {tr('work.github_cta')}
                <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <Contact narrativeLine={tr('work.closing_line')} />
    </>
  )
}
