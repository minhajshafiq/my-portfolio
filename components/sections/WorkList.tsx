'use client'

import { motion } from 'framer-motion'
import { FaArrowRight, FaGithub } from 'react-icons/fa'
import { useTranslation } from '@/hooks/useTranslation'
import { PROJECTS } from '@/data/projects'
import { ProjectRow } from './Projects'

const EASE_SMOOTH = [0.33, 1, 0.68, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export function WorkList() {
  const { t, language } = useTranslation()

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  return (
    <section className="relative bg-custom-primary pb-[clamp(4.5rem,8vw,8rem)] pt-[clamp(9rem,16vw,13rem)]">
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
            <p className="mb-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#8C0605] dark:text-red-400">
              <span className="h-px w-10 bg-current" />
              {tr('work.label')}
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
              <h1 className="font-serif text-[clamp(2.6rem,7vw,5.4rem)] font-medium leading-[1.02] tracking-[-0.025em] text-custom-title md:col-span-8">
                {tr('work.page_heading')}
              </h1>

              <p className="max-w-sm text-sm leading-6 text-custom-secondary md:col-span-4 md:justify-self-end md:text-[15px] md:leading-7">
                {tr('work.page_intro')}
              </p>
            </div>
          </motion.div>

          {/* All projects */}
          <div>
            {PROJECTS.map((project, index) => (
              <ProjectRow
                key={project.key}
                project={project}
                index={index}
                visitLabel={tr('work.case')}
                locale={language}
                tr={tr}
              />
            ))}
          </div>

          {/* GitHub */}
          <motion.div
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
  )
}
