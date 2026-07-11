'use client'

import { motion } from 'framer-motion'
import { Link } from '@/components/ui/AppLink'
import { FaArrowRight, FaDownload, FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { useTranslation } from '@/hooks/useTranslation'
import { trackEvent } from '@/utils/analytics'
import { PROJECTS } from '@/data/projects'
import { EASE_SMOOTH, fadeUp } from '@/lib/motion'
import { SectionLabel } from '@/components/ui/SectionLabel'

const SKILL_GROUPS = [
  { key: 'frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP'] },
  { key: 'backend', items: ['Spring Boot', 'Java', 'PostgreSQL', 'Supabase', 'API REST'] },
  { key: 'mobile', items: ['React Native', 'Expo'] },
  { key: 'tools', items: ['Git', 'Docker', 'Figma', 'Agile / Scrum'] },
] as const

const EXPERIENCE_KEYS = ['freelance', 'ukenoon'] as const
const EDUCATION_KEYS = ['openclassrooms', 'doranco'] as const

function TimelineItem({
  baseKey,
  showYear,
  tr,
}: {
  baseKey: string
  showYear: boolean
  tr: (key: string) => string
}) {
  return (
    <div className="border-t border-custom pt-6">
      {showYear && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8C0605] dark:text-red-400">
          {tr(`${baseKey}.year`)}
        </p>
      )}

      <h3 className="font-serif text-lg font-medium text-custom-title md:text-xl">
        {tr(`${baseKey}.degree`)}
      </h3>

      <p className="mb-4 text-sm font-medium text-custom-muted">
        {tr(`${baseKey}.school`)}
      </p>

      <ul className="space-y-2">
        {['bullet1', 'bullet2', 'bullet3'].map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-3 text-sm leading-6 text-custom-secondary"
          >
            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#8C0605] dark:bg-red-400" />
            <span>{tr(`${baseKey}.${bullet}`)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function CvContent() {
  const { t, language } = useTranslation()

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  return (
    <section className="relative bg-custom-primary pb-[clamp(4.5rem,8vw,8rem)] pt-[clamp(9rem,14vw,12rem)]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
        <div className="mx-auto w-full max-w-[min(980px,calc(100vw-2.5rem))]">
          {/* Header */}
          <motion.header
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, ease: EASE_SMOOTH }}
            className="mb-16 md:mb-20"
          >
            <SectionLabel>{tr('cv.label')}</SectionLabel>

            <h1 className="mb-3 font-serif text-[clamp(2.6rem,7vw,5rem)] font-medium leading-[1.02] tracking-[-0.025em] text-custom-title">
              {tr('cv.heading')}
            </h1>

            <p className="mb-6 text-base font-semibold text-custom-secondary md:text-lg">
              {tr('cv.role')}
            </p>

            <p className="mb-4 max-w-[62ch] rounded-xl border border-[#8C0605]/20 bg-[#8C0605]/[0.05] px-5 py-4 text-sm font-medium leading-6 text-custom-title dark:border-red-400/20 dark:bg-red-400/[0.06] md:text-[15px]">
              {tr('cv.objective')}
            </p>

            <p className="mb-8 max-w-[62ch] text-sm leading-7 text-custom-secondary">
              {tr('cv.intro')}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/cv-minhaj_zubair.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('cv_download', {})}
                className="group inline-flex items-center gap-3 rounded-full bg-[#8C0605] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a70b0a] dark:bg-red-400 dark:text-gray-950 dark:hover:bg-red-300"
              >
                <FaDownload className="h-3.5 w-3.5" />
                {tr('cv.download')}
              </a>

              <a
                href="mailto:contact@minhajshafiq.com"
                onClick={() => trackEvent('email_click', { source_section: 'cv' })}
                className="inline-flex items-center gap-3 rounded-full border border-custom px-6 py-3.5 text-sm font-bold text-custom-title transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8C0605] hover:text-[#8C0605] dark:hover:border-red-400 dark:hover:text-red-400"
              >
                <FaEnvelope className="h-4 w-4" />
                {tr('cv.email_cta')}
              </a>

              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/minhajshafiq"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-custom-muted transition-colors hover:text-custom-title"
                >
                  <FaGithub className="h-5 w-5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/minhajshafiq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-custom-muted transition-colors hover:text-custom-title"
                >
                  <FaLinkedinIn className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.header>

          {/* Experience */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: EASE_SMOOTH }}
            className="mb-16"
          >
            <h2 className="mb-8 font-serif text-2xl font-medium tracking-[-0.02em] text-custom-title md:text-3xl">
              {tr('about.timeline.experience_tab')}
            </h2>

            <div className="space-y-10">
              {EXPERIENCE_KEYS.map((key) => (
                <TimelineItem
                  key={key}
                  baseKey={`about.timeline.experiences.${key}`}
                  showYear
                  tr={tr}
                />
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: EASE_SMOOTH }}
            className="mb-16"
          >
            <h2 className="mb-8 font-serif text-2xl font-medium tracking-[-0.02em] text-custom-title md:text-3xl">
              {tr('about.timeline.education_tab')}
            </h2>

            <div className="space-y-10">
              {EDUCATION_KEYS.map((key) => (
                <TimelineItem
                  key={key}
                  baseKey={`about.timeline.formations.${key}`}
                  showYear={false}
                  tr={tr}
                />
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: EASE_SMOOTH }}
            className="mb-16"
          >
            <h2 className="mb-8 font-serif text-2xl font-medium tracking-[-0.02em] text-custom-title md:text-3xl">
              {tr('cv.skills_title')}
            </h2>

            <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
              {SKILL_GROUPS.map((group) => (
                <div key={group.key} className="border-t border-custom pt-5">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-custom-muted">
                    {tr(`cv.skills.${group.key}`)}
                  </h3>

                  <p className="text-sm font-medium leading-7 text-custom-title">
                    {group.items.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Projects */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: EASE_SMOOTH }}
            className="mb-16"
          >
            <h2 className="mb-8 font-serif text-2xl font-medium tracking-[-0.02em] text-custom-title md:text-3xl">
              {tr('cv.projects_title')}
            </h2>

            <div>
              {PROJECTS.map((project) => (
                <Link
                  key={project.key}
                  href={`/${language}/work/${project.slug}`}
                  className="group flex items-center justify-between gap-6 border-t border-custom py-4 last:border-b"
                >
                  <div className="min-w-0">
                    <span className="block truncate font-serif text-base font-medium text-custom-title transition-colors group-hover:text-[#8C0605] dark:group-hover:text-red-400 md:text-lg">
                      {tr(`projects.${project.key}.title`)}
                    </span>

                    <span className="block truncate text-xs text-custom-muted">
                      {project.technologies.join(' · ')}
                    </span>
                  </div>

                  <FaArrowRight className="h-3 w-3 shrink-0 text-custom-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#8C0605] dark:group-hover:text-red-400" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: EASE_SMOOTH }}
            className="border-t border-custom pt-12"
          >
            <h2 className="mb-3 font-serif text-2xl font-medium tracking-[-0.02em] text-custom-title md:text-3xl">
              {tr('cv.contact_title')}
            </h2>

            <p className="mb-7 text-sm text-custom-secondary md:text-base">
              {tr('cv.contact_text')}
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <a
                href="mailto:contact@minhajshafiq.com"
                onClick={() => trackEvent('email_click', { source_section: 'cv_footer' })}
                className="group inline-flex items-center gap-3 rounded-full bg-[#8C0605] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a70b0a] dark:bg-red-400 dark:text-gray-950 dark:hover:bg-red-300"
              >
                <FaEnvelope className="h-4 w-4" />
                contact@minhajshafiq.com
              </a>

              <Link
                href={`/${language}`}
                className="group inline-flex items-center gap-2 text-sm font-bold text-custom-title"
              >
                <span className="relative">
                  {tr('cv.back')}
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-custom-title/30 transition-colors duration-300 group-hover:bg-[#8C0605] dark:group-hover:bg-red-400" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
