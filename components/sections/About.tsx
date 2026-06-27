'use client'

import { useEffect, useRef, useState } from 'react'
import type { ComponentType, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from '@/hooks/useTranslation'

import {
  FaArrowRight,
  FaCalendarAlt,
  FaDocker,
  FaDownload,
  FaGitAlt,
} from 'react-icons/fa'

import {
  SiExpo,
  SiFirebase,
  SiFigma,
  SiGooglecloud,
  SiNextdotjs,
  SiReact,
  SiSpringboot,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger)

type IconComponent = ComponentType<{ className?: string }>

type TechCategory = {
  name: string
  techs: {
    name: string
    icon: IconComponent
  }[]
}

type TimelineItem = {
  year: string
  title: string
  company: string
  type: 'experience' | 'formation'
  bullets: string[]
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    name: 'Frontend',
    techs: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind', icon: SiTailwindcss },
    ],
  },
  {
    name: 'Backend & Cloud',
    techs: [
      { name: 'Spring Boot', icon: SiSpringboot },
      { name: 'Supabase', icon: SiSupabase },
      { name: 'Firebase', icon: SiFirebase },
      { name: 'Google Cloud', icon: SiGooglecloud },
    ],
  },
  {
    name: 'Mobile & Tools',
    techs: [
      { name: 'React Native', icon: SiExpo },
      { name: 'Docker', icon: FaDocker },
      { name: 'Git', icon: FaGitAlt },
      { name: 'Figma', icon: SiFigma },
    ],
  },
]

const EASE_SMOOTH = [0.33, 1, 0.68, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

function SectionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[4%] top-16 h-[clamp(15rem,24vw,28rem)] w-[clamp(15rem,24vw,28rem)] rounded-full bg-[#8C0605]/10 blur-3xl dark:bg-red-400/[0.08] lg:right-[10%] xl:right-[14%]" />

      <div className="absolute bottom-16 left-[2%] h-[clamp(14rem,20vw,24rem)] w-[clamp(14rem,20vw,24rem)] rounded-full bg-[#8C0605]/8 blur-3xl dark:bg-red-400/[0.06] lg:left-[8%]" />

      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/18 to-transparent dark:from-black/20" />

      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white/14 to-transparent dark:from-black/20" />
    </div>
  )
}

function CardShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={[
        'relative h-full overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white/74 shadow-[0_16px_48px_rgba(0,0,0,0.055)] backdrop-blur-md',
        'transition-all duration-500 dark:border-white/10 dark:bg-white/[0.04]',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

export function About() {
  const [activeTab, setActiveTab] = useState<'experience' | 'formation'>('experience')
  const { t } = useTranslation()

  const sectionRef = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!photoRef.current) return

      gsap.fromTo(
        photoRef.current,
        {
          y: 32,
          opacity: 0,
          scale: 0.97,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: photoRef.current,
            start: 'top 84%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const timelineData: TimelineItem[] = [
    {
      year: tr('about.timeline.experiences.freelance.year'),
      title: tr('about.timeline.experiences.freelance.degree'),
      company: tr('about.timeline.experiences.freelance.school'),
      type: 'experience',
      bullets: [
        tr('about.timeline.experiences.freelance.bullet1'),
        tr('about.timeline.experiences.freelance.bullet2'),
        tr('about.timeline.experiences.freelance.bullet3'),
      ],
    },
    {
      year: tr('about.timeline.experiences.ukenoon.year'),
      title: tr('about.timeline.experiences.ukenoon.degree'),
      company: tr('about.timeline.experiences.ukenoon.school'),
      type: 'experience',
      bullets: [
        tr('about.timeline.experiences.ukenoon.bullet1'),
        tr('about.timeline.experiences.ukenoon.bullet2'),
        tr('about.timeline.experiences.ukenoon.bullet3'),
      ],
    },
    {
      year: '2024 - 2025',
      title: tr('about.timeline.formations.doranco.degree'),
      company: tr('about.timeline.formations.doranco.school'),
      type: 'formation',
      bullets: [
        tr('about.timeline.formations.doranco.bullet1'),
        tr('about.timeline.formations.doranco.bullet2'),
        tr('about.timeline.formations.doranco.bullet3'),
      ],
    },
    {
      year: '2022 - 2023',
      title: tr('about.timeline.formations.openclassrooms.degree'),
      company: tr('about.timeline.formations.openclassrooms.school'),
      type: 'formation',
      bullets: [
        tr('about.timeline.formations.openclassrooms.bullet1'),
        tr('about.timeline.formations.openclassrooms.bullet2'),
        tr('about.timeline.formations.openclassrooms.bullet3'),
      ],
    },
  ]

  const filteredTimeline = timelineData.filter((item) => item.type === activeTab)

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative isolate overflow-hidden bg-custom-primary py-[clamp(4rem,5.5vw,6.5rem)]"
    >
      <SectionBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
        <div className="mx-auto w-full max-w-[min(1120px,calc(100vw-5rem))] xl:max-w-[min(1160px,calc(100vw-7rem))] 2xl:max-w-[1160px]">
          {/* Section header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: EASE_SMOOTH }}
            className="relative mb-10 md:mb-12"
          >
            <div className="grid min-h-[clamp(12rem,20vh,17rem)] grid-cols-1 content-end gap-6 pb-9 pt-3 md:grid-cols-12 md:pb-10">
              <div className="md:col-span-8">
                <span className="mb-4 block font-mono text-xs uppercase tracking-[0.28em] text-[#8C0605] dark:text-red-400 sm:text-sm">
                  {'<'} {tr('about.title')} {'/>'}
                </span>

                <h2 className="max-w-[min(820px,100%)] text-4xl font-black leading-[0.94] tracking-[-0.065em] text-custom-title sm:text-5xl md:text-[clamp(3.35rem,5.4vw,5.2rem)] lg:text-[clamp(3.75rem,5vw,5.7rem)]">
                  {tr('about.subtitle')}
                </h2>
              </div>

              <div className="md:col-span-4 md:self-end">
                <p className="max-w-sm text-sm leading-6 text-custom-secondary md:text-[15px] md:leading-7">
                  {tr('about.role')}
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-[#8C0605]/30 via-gray-300 to-transparent dark:from-red-400/30 dark:via-white/10" />

            <div className="pointer-events-none absolute -bottom-7 right-0 hidden select-none text-[5.75rem] font-black leading-none tracking-[-0.08em] text-gray-950/[0.035] dark:text-white/[0.035] md:block">
              03
            </div>
          </motion.div>

          {/* Main grid */}
          <div className="mx-auto grid w-full max-w-[min(1080px,100%)] grid-cols-12 gap-5 lg:gap-5">
            {/* Photo card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, ease: EASE_SMOOTH }}
              className="col-span-12 lg:col-span-4 lg:row-span-2"
            >
              <div
                ref={photoRef}
                className="group relative h-full min-h-[420px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07070a] shadow-[0_24px_80px_rgba(0,0,0,0.20)] lg:min-h-[520px]"
              >
                <Image
                  src="/minhaj.jpg"
                  alt={tr('hero.photo_alt')}
                  fill
                  sizes="(min-width: 1280px) 380px, (min-width: 1024px) 34vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(140,6,5,0.18),transparent_34%)]" />

                <div className="absolute right-5 top-5 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                  Paris, FR 🇫🇷
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-green-500/20 bg-green-500/10 px-3.5 py-2 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>

                    <span className="text-xs font-semibold text-green-400">
                      {tr('contact.available_immediately')}
                    </span>
                  </div>

                  <h3 className="mb-2 text-3xl font-black tracking-[-0.05em] text-white md:text-4xl">
                    Minhaj Zubair
                  </h3>

                  <p className="mb-5 max-w-sm text-sm leading-6 text-white/70 md:text-base">
                    {tr('about.role')}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'Spring Boot', 'React Native'].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.62, ease: EASE_SMOOTH }}
              className="col-span-12 lg:col-span-8"
            >
              <CardShell className="p-5 md:p-6">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(140,6,5,0.08),transparent_34%)] dark:bg-[radial-gradient(circle_at_12%_18%,rgba(248,113,113,0.06),transparent_34%)]" />

                <div className="relative">
                  <span className="mb-3 block font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#8C0605] dark:text-red-400">
                    Profile
                  </span>

                  <h3 className="mb-5 max-w-[640px] text-2xl font-black tracking-[-0.045em] text-custom-title md:text-3xl">
                    {tr('about.profile.title')}
                  </h3>

                  <div className="max-w-[66ch] space-y-3 text-sm leading-6 text-custom-secondary md:text-[15px] md:leading-7">
                    <p>{tr('about.profile.paragraph1')}</p>
                    <p>{tr('about.profile.paragraph2')}</p>
                    <p>{tr('about.profile.paragraph3')}</p>
                  </div>

                  <div className="mt-5 max-w-[66ch] rounded-2xl border border-[#8C0605]/15 bg-[#8C0605]/5 p-4 dark:border-red-400/15 dark:bg-red-400/10">
                    <p className="text-sm font-semibold leading-6 text-[#8C0605] dark:text-red-400 md:text-[15px]">
                      {tr('about.profile.paragraph4')}
                    </p>
                  </div>
                </div>
              </CardShell>
            </motion.div>

            {/* Tech stack */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.05, duration: 0.62, ease: EASE_SMOOTH }}
              className="col-span-12 lg:col-span-8"
            >
              <CardShell className="p-5 md:p-6">
                <div className="relative">
                  <span className="mb-3 block font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#8C0605] dark:text-red-400">
                    Stack
                  </span>

                  <h3 className="mb-5 text-2xl font-black tracking-[-0.045em] text-custom-title md:text-3xl">
                    {tr('about.tech_stack_title')}
                  </h3>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    {TECH_CATEGORIES.map((category) => (
                      <div
                        key={category.name}
                        className="rounded-2xl border border-gray-200 bg-white/58 p-3.5 transition-colors hover:border-[#8C0605]/20 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-red-400/25"
                      >
                        <span className="mb-3 block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#8C0605] dark:text-red-400">
                          {category.name}
                        </span>

                        <div className="space-y-1.5">
                          {category.techs.map((tech) => {
                            const TechIcon = tech.icon

                            return (
                              <div
                                key={tech.name}
                                className="group flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-custom-secondary transition-colors hover:bg-[#8C0605]/5 hover:text-[#8C0605] dark:hover:bg-red-400/10 dark:hover:text-red-400"
                              >
                                <TechIcon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />

                                <span className="text-xs font-semibold md:text-[13px]">
                                  {tech.name}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardShell>
            </motion.div>

            {/* Timeline */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.06, duration: 0.62, ease: EASE_SMOOTH }}
              className="col-span-12 lg:col-span-4"
            >
              <CardShell className="p-5">
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start">
                  <h3 className="flex items-center gap-2 text-xl font-black tracking-[-0.04em] text-custom-title">
                    <FaCalendarAlt className="h-4 w-4 text-[#8C0605] dark:text-red-400" />
                    {tr('about.timeline.title')}
                  </h3>

                  <div className="flex w-fit rounded-full border border-gray-200 bg-white/70 p-1 dark:border-white/10 dark:bg-white/[0.04]">
                    <button
                      type="button"
                      onClick={() => setActiveTab('experience')}
                      className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${activeTab === 'experience'
                          ? 'bg-[#8C0605] text-white shadow-md dark:bg-red-400 dark:text-gray-950'
                          : 'text-custom-secondary hover:text-custom-title'
                        }`}
                    >
                      💼 XP
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('formation')}
                      className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${activeTab === 'formation'
                          ? 'bg-[#8C0605] text-white shadow-md dark:bg-red-400 dark:text-gray-950'
                          : 'text-custom-secondary hover:text-custom-title'
                        }`}
                    >
                      🎓 Edu
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    {filteredTimeline.map((item, index) => (
                      <motion.div
                        key={`${item.year}-${index}`}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.07 }}
                        className="relative border-l border-gray-200 pl-5 dark:border-white/10"
                      >
                        <div className="absolute -left-[6px] top-0 h-3 w-3 rounded-full border-2 border-white bg-[#8C0605] dark:border-[#101114] dark:bg-red-400" />

                        <span className="rounded-full bg-[#8C0605]/10 px-2.5 py-1 font-mono text-[10px] font-bold text-[#8C0605] dark:bg-red-400/10 dark:text-red-400">
                          {item.year}
                        </span>

                        <h4 className="mt-3 text-sm font-black leading-tight text-custom-title">
                          {item.title}
                        </h4>

                        <p className="mb-2 mt-1 text-xs text-custom-muted">
                          {item.company}
                        </p>

                        <ul className="space-y-1.5">
                          {item.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-2 text-[11px] leading-relaxed text-custom-secondary"
                            >
                              <span className="mt-0.5 text-[#8C0605] dark:text-red-400">
                                →
                              </span>

                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </CardShell>
            </motion.div>

            {/* CTA cards */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.08, duration: 0.62, ease: EASE_SMOOTH }}
              className="col-span-12 lg:col-span-8"
            >
              <div className="grid h-full grid-cols-1 gap-5">
                {/* CV card */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: EASE_SMOOTH }}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#171827] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.16)] md:p-7"
                >
                  {/* Pattern */}
                  <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:36px_36px]" />
                  </div>

                  {/* Glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/[0.05] blur-2xl" />
                  <div className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full border border-white/20" />

                  <div className="relative z-10">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-white/50">
                      PDF
                    </span>

                    <h3 className="mt-3 text-2xl font-black leading-[1.05] tracking-[-0.045em] text-white md:text-3xl">
                      {tr('about.cv.title')}
                    </h3>

                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
                      {tr('about.cv.description')}
                    </p>

                    <button
                      type="button"
                      onClick={() => window.open('/cv-minhaj_zubair.pdf', '_blank')}
                      className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-gray-950 transition-all hover:-translate-y-0.5 hover:bg-gray-100"
                    >
                      <FaDownload className="h-4 w-4" />
                      {tr('about.cv.button')}
                    </button>
                  </div>
                </motion.div>

                {/* Contact card */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: EASE_SMOOTH }}
                  className="relative overflow-hidden rounded-[1.75rem] bg-[#8C0605] p-6 shadow-[0_20px_70px_rgba(140,6,5,0.20)] dark:bg-red-400 md:p-7"
                >
                  {/* Texture / glow */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_34%)]" />
                  <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10 dark:bg-gray-950/10" />
                  <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-black/10 blur-3xl dark:bg-gray-950/10" />

                  <div className="relative z-10">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-white/70 dark:text-gray-950/60">
                      Let&apos;s talk
                    </span>

                    <h3 className="mt-3 text-2xl font-black leading-[1.05] tracking-[-0.045em] text-white dark:text-gray-950 md:text-3xl">
                      {tr('about.collaboration.title')}
                    </h3>

                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/82 dark:text-gray-950/75 md:text-base">
                      {tr('about.collaboration.description')}
                    </p>

                    <a
                      href="#contact"
                      className="group mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#8C0605] transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-gray-950 dark:text-red-400"
                    >
                      {tr('about.collaboration.button')}
                      <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}