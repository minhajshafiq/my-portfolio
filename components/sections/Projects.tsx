'use client'

import { motion } from 'framer-motion'
import type { ComponentType } from 'react'
import Image from 'next/image'
import { useTranslation } from '@/hooks/useTranslation'
import { LuxaShowcaseCard } from './LuxaShowcaseCard'

import {
  FaArrowRight,
  FaCameraRetro,
  FaExternalLinkAlt,
  FaGithub,
  FaHammer,
  FaLaptopCode,
  FaLeaf,
  FaMobileAlt,
  FaUtensils,
} from 'react-icons/fa'

import {
  SiClerk,
  SiExpo,
  SiFirebase,
  SiFramer,
  SiNextdotjs,
  SiPostgresql,
  SiSanity,
  SiSpringboot,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'

type IconComponent = ComponentType<{ className?: string }>

type Project = {
  id: number
  key: string
  title: string
  description: string
  image: string
  technologies: string[]
  results: string[]
  github: string | null
  demo: string
  category: string
  icon: IconComponent
  featured?: boolean
}

type FeaturedLabels = {
  featured: string
  keyResults: string
  viewProject: string
  sourceCode: string
}

const TECHNOLOGY_ICONS: Record<string, IconComponent> = {
  'React Native': SiExpo,
  'Next.js': SiNextdotjs,
  'Spring Boot': SiSpringboot,
  PostgreSQL: SiPostgresql,
  Firebase: SiFirebase,
  Clerk: SiClerk,
  'Tailwind CSS': SiTailwindcss,
  TypeScript: SiTypescript,
  'Framer Motion': SiFramer,
  Supabase: SiSupabase,
  Sanity: SiSanity,
  GSAP: ({ className }) => (
    <span className={className}>
      GS
    </span>
  ),
}

const EASE_SMOOTH = [0.33, 1, 0.68, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

function SectionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[4%] top-20 h-[clamp(18rem,28vw,34rem)] w-[clamp(18rem,28vw,34rem)] rounded-full bg-[#8C0605]/10 blur-3xl dark:bg-red-400/[0.08] lg:right-[10%] xl:right-[16%]" />

      <div className="absolute bottom-20 left-[2%] h-[clamp(16rem,24vw,28rem)] w-[clamp(16rem,24vw,28rem)] rounded-full bg-[#8C0605]/8 blur-3xl dark:bg-red-400/[0.06] lg:left-[8%] xl:left-[10%]" />

      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/25 to-transparent dark:from-black/20" />

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white/20 to-transparent dark:from-black/20" />
    </div>
  )
}

function TechBadge({ tech, dark = false }: { tech: string; dark?: boolean }) {
  const TechnologyIcon = TECHNOLOGY_ICONS[tech]

  return (
    <span
      className={
        dark
          ? 'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3.5 py-2 text-sm font-semibold text-white/85 backdrop-blur-md'
          : 'inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/75 px-3 py-1.5 text-xs font-semibold text-custom-secondary shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]'
      }
    >
      {TechnologyIcon && (
        <TechnologyIcon className={dark ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
      )}

      {tech}
    </span>
  )
}

function FeaturedProjectCard({
  project,
  labels,
}: {
  project: Project
  labels: FeaturedLabels
}) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: EASE_SMOOTH }}
      className="relative z-0 mb-16 md:mb-24 lg:mb-28"
    >
      <div className="group relative z-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[#07070a] p-2 shadow-[0_30px_100px_rgba(0,0,0,0.28)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(140,6,5,0.24),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(248,113,113,0.12),transparent_36%)]" />

        <div className="relative z-0 grid min-h-[620px] grid-cols-1 overflow-hidden rounded-[1.55rem] lg:min-h-[clamp(620px,52vw,720px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between gap-10 p-6 md:p-10 lg:p-12">
            <div>
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#8C0605] px-3.5 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow-[0_10px_30px_rgba(140,6,5,0.35)] dark:bg-red-400 dark:text-gray-950 dark:shadow-red-400/20">
                  {labels.featured}
                </span>

                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-sm font-semibold text-white/60 backdrop-blur-md">
                  {project.category}
                </span>
              </div>

              <h3 className="mb-5 max-w-xl text-4xl font-black leading-[0.95] tracking-[-0.06em] text-white md:text-[clamp(3.25rem,5vw,4.5rem)]">
                {project.title}
              </h3>

              <p className="mb-7 max-w-xl text-base leading-relaxed text-white/68 md:text-lg">
                {project.description}
              </p>

              <div className="mb-8 flex flex-wrap gap-2.5">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} tech={tech} dark />
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-md">
                <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-white/55">
                  {labels.keyResults}
                </h4>

                <ul className="space-y-3">
                  {project.results.map((result) => (
                    <li
                      key={result}
                      className="flex items-start gap-3 text-sm leading-relaxed text-white/72"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8C0605] dark:bg-red-400" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full bg-[#8C0605] px-6 py-3.5 font-bold text-white shadow-[0_18px_35px_rgba(140,6,5,0.35)] transition-colors hover:bg-[#a70b0a] dark:bg-red-400 dark:text-gray-950 dark:hover:bg-red-300"
              >
                <FaExternalLinkAlt className="h-4 w-4" />
                {labels.viewProject}
              </motion.a>

              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-6 py-3.5 font-bold text-white backdrop-blur-md transition-colors hover:bg-white/[0.14]"
                >
                  <FaGithub className="h-4 w-4" />
                  {labels.sourceCode}
                </motion.a>
              )}
            </div>
          </div>

          {/* Showcase */}
          <div className="relative z-0 min-h-[460px] overflow-hidden p-3 [transform:translateZ(0)] md:min-h-[560px] lg:min-h-full">
            <LuxaShowcaseCard
              demoUrl={project.demo}
              className="relative z-0 h-full min-h-[460px] overflow-hidden md:min-h-[540px] lg:min-h-full"
            />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ProjectIcon = project.icon

  return (
    <motion.article
      key={project.id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        delay: index * 0.08,
        duration: 0.65,
        ease: EASE_SMOOTH,
      }}
      className="group relative h-full"
    >
      <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white/76 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#8C0605]/25 hover:shadow-[0_30px_90px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-red-400/30">
        <div className="relative h-56 overflow-hidden lg:h-60">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1280px) 380px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-md">
              <ProjectIcon className="h-4 w-4" />
            </span>

            <span className="inline-flex h-10 shrink-0 items-center rounded-full border border-white/20 bg-white/15 px-4 text-xs font-bold leading-none text-white backdrop-blur-md">
              {project.category}
            </span>
          </div>

          <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-4">
            <h3 className="text-2xl font-black tracking-[-0.04em] text-white">
              {project.title}
            </h3>

            <div className="flex shrink-0 gap-2">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-950 shadow-lg transition-colors hover:bg-gray-100"
                  aria-label={`${project.title} GitHub`}
                >
                  <FaGithub className="h-4 w-4" />
                </motion.a>
              )}

              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#8C0605] text-white shadow-lg transition-colors hover:bg-[#a70b0a] dark:bg-red-400 dark:text-gray-950 dark:hover:bg-red-300"
                aria-label={`${project.title} demo`}
              >
                <FaExternalLinkAlt className="h-4 w-4" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100%-15rem)] flex-col p-6">
          <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-custom-secondary">
            {project.description}
          </p>

          <div className="mb-5 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}

            {project.technologies.length > 4 && (
              <span className="rounded-full border border-gray-200 bg-white/75 px-3 py-1.5 text-xs font-semibold text-custom-muted shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          <div className="mt-auto border-t border-gray-200 pt-5 dark:border-white/10">
            <ul className="space-y-2">
              {project.results.slice(0, 3).map((result) => (
                <li
                  key={result}
                  className="flex items-center gap-2 text-xs text-custom-muted"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#8C0605] dark:bg-red-400" />
                  <span className="line-clamp-1">{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const { t } = useTranslation()

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  const projects: Project[] = [
    {
      id: 1,
      key: 'luxa',
      title: tr('projects.luxa.title'),
      description: tr('projects.luxa.description'),
      image: '/luxa.jpg',
      technologies: ['React Native', 'Supabase', 'TypeScript'],
      results: [
        tr('projects.luxa.results.interface'),
        tr('projects.luxa.results.pockets'),
        tr('projects.luxa.results.statistics'),
      ],
      github: null,
      demo: 'https://pocketly-web-blush.vercel.app/',
      category: tr('projects.luxa.category'),
      icon: FaMobileAlt,
      featured: true,
    },
    {
      id: 2,
      key: 'mets_merveilles',
      title: tr('projects.mets_merveilles.title'),
      description: tr('projects.mets_merveilles.description'),
      image: '/metsmerveilles.webp',
      technologies: ['Next.js', 'Spring Boot', 'PostgreSQL', 'Firebase', 'Clerk'],
      results: [
        tr('projects.mets_merveilles.results.interface'),
        tr('projects.mets_merveilles.results.recipes'),
        tr('projects.mets_merveilles.results.search'),
      ],
      github: 'https://github.com/minhajshafiq/mets-merveilles',
      demo: 'https://front-mets-merveilles.vercel.app/',
      category: tr('projects.mets_merveilles.category'),
      icon: FaUtensils,
    },
    {
      id: 3,
      key: 'portfolio',
      title: tr('projects.portfolio.title'),
      description: tr('projects.portfolio.description'),
      image: '/portfolio.png',
      technologies: ['Next.js', 'GSAP', 'Framer Motion', 'Tailwind CSS'],
      results: [
        tr('projects.portfolio.results.performance'),
        tr('projects.portfolio.results.animations'),
        tr('projects.portfolio.results.seo'),
      ],
      github: 'https://github.com/minhajshafiq/my-portfolio',
      demo: 'https://www.minhajshafiq.com/',
      category: tr('projects.portfolio.category'),
      icon: FaLaptopCode,
    },
    {
      id: 4,
      key: 'unityvert',
      title: tr('projects.unityvert.title'),
      description: tr('projects.unityvert.description'),
      image: '/photos/unityvert.jpg',
      technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Sanity'],
      results: [
        tr('projects.unityvert.results.presence'),
        tr('projects.unityvert.results.design'),
        tr('projects.unityvert.results.contact'),
      ],
      github: null,
      demo: 'https://unityvert.fr/',
      category: tr('projects.unityvert.category'),
      icon: FaLeaf,
    },
    {
      id: 5,
      key: 'toiture_artisan',
      title: tr('projects.toiture_artisan.title'),
      description: tr('projects.toiture_artisan.description'),
      image: '/photos/toiture-artisan.png',
      technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Sanity'],
      results: [
        tr('projects.toiture_artisan.results.local_seo'),
        tr('projects.toiture_artisan.results.conversion'),
        tr('projects.toiture_artisan.results.trust'),
      ],
      github: null,
      demo: 'https://super-chebakia-99a719.netlify.app/',
      category: tr('projects.toiture_artisan.category'),
      icon: FaHammer,
    },
    {
      id: 6,
      key: 'photographe',
      title: tr('projects.photographe.title'),
      description: tr('projects.photographe.description'),
      image: '/photos/photographe.png',
      technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
      results: [
        tr('projects.photographe.results.gallery'),
        tr('projects.photographe.results.branding'),
        tr('projects.photographe.results.contact'),
      ],
      github: null,
      demo: 'https://photograph-portfolio-five.vercel.app/',
      category: tr('projects.photographe.category'),
      icon: FaCameraRetro,
    },
  ]

  const featuredProject = projects.find((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  const featuredLabels: FeaturedLabels = {
    featured: tr('projects.featured_badge'),
    keyResults: tr('projects.key_results'),
    viewProject: tr('projects.view_project'),
    sourceCode: tr('projects.source_code'),
  }

  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden bg-custom-primary py-[clamp(5.5rem,8vw,8.5rem)]"
    >
      <SectionBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
        <div className="mx-auto w-full max-w-[min(1180px,calc(100vw-5rem))] xl:max-w-[min(1240px,calc(100vw-7rem))] 2xl:max-w-[1240px]">
          {/* Section header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE_SMOOTH }}
            className="relative mb-12 md:mb-[4.5rem]"
          >
            <div className="grid min-h-[clamp(20rem,34vh,29rem)] grid-cols-1 content-end gap-8 pb-12 pt-8 md:grid-cols-12 md:pb-16">
              <div className="md:col-span-8">
                <span className="mb-5 block font-mono text-xs uppercase tracking-[0.28em] text-[#8C0605] dark:text-red-400 sm:text-sm">
                  {'<'} {tr('projects.title')} {'/>'}
                </span>

                <h2 className="max-w-[min(960px,100%)] text-5xl font-black leading-[0.9] tracking-[-0.075em] text-custom-title sm:text-6xl md:text-[clamp(4.5rem,8vw,6.75rem)] lg:text-[clamp(5.25rem,7vw,7.4rem)]">
                  {tr('projects.subtitle')}
                </h2>
              </div>

              <div className="md:col-span-4 md:self-end">
                <p className="max-w-md text-base leading-relaxed text-custom-secondary md:text-lg">
                  {tr('projects.intro')}
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-[#8C0605]/30 via-gray-300 to-transparent dark:from-red-400/30 dark:via-white/10" />

            <div className="pointer-events-none absolute -bottom-10 right-0 hidden select-none text-[8rem] font-black leading-none tracking-[-0.08em] text-gray-950/[0.035] dark:text-white/[0.035] md:block">
              02
            </div>
          </motion.div>

          {/* Featured project */}
          {featuredProject && (
            <FeaturedProjectCard
              project={featuredProject}
              labels={featuredLabels}
            />
          )}

          {/* Other projects header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: EASE_SMOOTH }}
            className="mx-auto mb-10 flex w-full max-w-[min(1120px,100%)] flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#8C0605] dark:text-red-400">
                Selected work
              </p>

              <h3 className="text-4xl font-black tracking-[-0.06em] text-custom-title md:text-5xl">
                Autres projets
              </h3>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-custom-secondary">
              Une sélection de projets web, vitrines et interfaces réalisés avec une attention particulière au design, à la performance et à la conversion.
            </p>
          </motion.div>

          {/* Other projects grid */}
          <div className="mx-auto grid w-full max-w-[min(1120px,100%)] grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {otherProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: EASE_SMOOTH }}
            className="mx-auto mt-16 w-full max-w-[min(1120px,100%)]"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white/76 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.06)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04] md:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(140,6,5,0.10),transparent_34%)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(248,113,113,0.08),transparent_34%)]" />

              <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <p className="text-xl font-black tracking-[-0.03em] text-custom-title">
                    {tr('projects.see_more_title')}
                  </p>

                  <p className="mt-1 text-sm text-custom-secondary">
                    {tr('projects.see_more_subtitle')}
                  </p>
                </div>

                <motion.a
                  href="https://github.com/minhajshafiq"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3.5 font-bold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100"
                >
                  <FaGithub className="h-5 w-5" />
                  {tr('projects.my_github')}
                  <FaArrowRight className="h-4 w-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}