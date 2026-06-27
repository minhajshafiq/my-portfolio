'use client'

import { motion } from 'framer-motion'
import type { ComponentType } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import {
  SiDocker,
  SiExpo,
  SiFirebase,
  SiGooglecloud,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiSpringboot,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import { FaCode, FaMobile, FaSearch, FaServer } from 'react-icons/fa'

type IconComponent = ComponentType<{ className?: string }>

type TechItem = {
  name: string
  icon: IconComponent
}

type MainService = {
  icon: IconComponent
  title: string
  descriptionKey: string
  techs: TechItem[]
}

type OfferCardProps = {
  variant: 'dark' | 'brand'
  badge: string
  title: string
  items: string[]
  cta?: string
}

const MAIN_SERVICES: MainService[] = [
  {
    icon: FaCode,
    title: 'Frontend',
    descriptionKey: 'services.frontend.description',
    techs: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind', icon: SiTailwindcss },
      { name: 'SEO', icon: FaSearch },
    ],
  },
  {
    icon: FaServer,
    title: 'Backend & Cloud',
    descriptionKey: 'services.backend.description',
    techs: [
      { name: 'Spring Boot', icon: SiSpringboot },
      { name: 'Supabase', icon: SiSupabase },
      { name: 'Firebase', icon: SiFirebase },
      { name: 'Google Cloud', icon: SiGooglecloud },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Docker', icon: SiDocker },
    ],
  },
  {
    icon: FaMobile,
    title: 'Mobile',
    descriptionKey: 'services.mobile.description',
    techs: [
      { name: 'React Native', icon: SiExpo },
      { name: 'Supabase', icon: SiSupabase },
      { name: 'Firebase', icon: SiFirebase },
    ],
  },
]

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

function OfferCard({ variant, badge, title, items, cta }: OfferCardProps) {
  const isBrand = variant === 'brand'

  return (
    <motion.div
      variants={fadeUp}
      className={[
        'group relative overflow-hidden rounded-[1.75rem] p-7 shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 md:p-8 lg:p-9',
        isBrand
          ? 'bg-[#8C0605] text-white shadow-[#8C0605]/10 dark:bg-red-400 dark:text-gray-950'
          : 'bg-gray-950 text-white shadow-black/10 dark:bg-black',
      ].join(' ')}
    >
      <div
        className={[
          'pointer-events-none absolute inset-0 transition-opacity duration-500 group-hover:opacity-90',
          isBrand
            ? 'bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.22),transparent_34%)]'
            : 'bg-[radial-gradient(circle_at_15%_15%,rgba(140,6,5,0.24),transparent_34%)] dark:bg-[radial-gradient(circle_at_15%_15%,rgba(248,113,113,0.15),transparent_34%)]',
        ].join(' ')}
      />

      <div className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />

      <div className="relative flex h-full flex-col">
        <span
          className={[
            'mb-3 block font-mono text-xs uppercase tracking-[0.22em]',
            isBrand ? 'text-white/65 dark:text-gray-950/60' : 'text-white/45',
          ].join(' ')}
        >
          {badge}
        </span>

        <h3 className="mb-5 max-w-[520px] text-2xl font-black leading-tight tracking-[-0.04em] md:text-[clamp(1.55rem,2vw,1.85rem)]">
          {title}
        </h3>

        <ul className="max-w-[560px] space-y-3">
          {items.map((item) => (
            <li
              key={item}
              className={[
                'flex items-start gap-3 text-sm leading-6',
                isBrand ? 'text-white/90 dark:text-gray-950/85' : 'text-gray-300',
              ].join(' ')}
            >
              <span
                className={[
                  'mt-0.5 font-black',
                  isBrand ? 'text-white/60 dark:text-gray-950/60' : 'text-red-400',
                ].join(' ')}
              >
                →
              </span>

              <span>{item}</span>
            </li>
          ))}
        </ul>

        {cta && (
          <a
            href="#contact"
            className="mt-7 inline-flex w-fit items-center rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#8C0605] transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-gray-950 dark:text-red-400"
          >
            {cta} →
          </a>
        )}
      </div>
    </motion.div>
  )
}

export function Services() {
  const { t } = useTranslation()

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  const trList = (key: string): string[] => {
    const value = t(key, { returnObjects: true })
    return Array.isArray(value) ? value.map(String) : []
  }

  const companyItems = trList('services.companies.items')
  const freelanceItems = trList('services.freelance.items')

  return (
    <section
      id="services"
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
            <div className="grid min-h-[30vh] grid-cols-1 content-end gap-8 pb-12 pt-8 md:grid-cols-12 md:pb-16 lg:min-h-[38vh]">
              <div className="md:col-span-8">
                <span className="mb-5 block font-mono text-xs uppercase tracking-[0.28em] text-[#8C0605] dark:text-red-400 sm:text-sm">
                  {'<'} {tr('services.title')} {'/>'}
                </span>

                <h2 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-[-0.075em] text-custom-title sm:text-6xl md:text-7xl lg:text-[clamp(5rem,7.2vw,7rem)]">
                  {tr('services.heading')}
                </h2>
              </div>

              <div className="md:col-span-4 md:self-end">
                <p className="max-w-md text-base leading-relaxed text-custom-secondary md:text-lg">
                  Interfaces modernes, architecture propre et produits pensés pour être maintenables.
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-[#8C0605]/30 via-gray-300 to-transparent dark:from-red-400/30 dark:via-white/10" />

            <div className="pointer-events-none absolute -bottom-10 right-0 hidden select-none text-[8rem] font-black leading-none tracking-[-0.08em] text-gray-950/[0.035] dark:text-white/[0.035] md:block">
              01
            </div>
          </motion.div>

          {/* Services grid */}
          <div className="mx-auto mb-14 grid w-full max-w-[min(1120px,100%)] grid-cols-1 gap-5 md:mb-16 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
            {MAIN_SERVICES.map((service, index) => {
              const ServiceIcon = service.icon

              return (
                <motion.article
                  key={service.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.65,
                    ease: EASE_SMOOTH,
                  }}
                  className={[
                    'group h-full',
                    index === 2 ? 'md:col-span-2 xl:col-span-1' : '',
                  ].join(' ')}
                >
                  <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white/72 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.055)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#8C0605]/30 hover:shadow-[0_26px_80px_rgba(0,0,0,0.09)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-red-400/35 lg:p-7">
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#8C0605]/10 blur-3xl dark:bg-red-400/10" />
                    </div>

                    <div className="relative flex h-full flex-col">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8C0605] shadow-lg shadow-[#8C0605]/20 transition-transform duration-500 group-hover:scale-105 dark:bg-red-400 dark:shadow-red-400/10">
                        <ServiceIcon className="h-6 w-6 text-white dark:text-gray-950" />
                      </div>

                      <h3 className="mb-3 text-xl font-black tracking-[-0.035em] text-custom-title md:text-2xl">
                        {service.title}
                      </h3>

                      <p className="mb-7 max-w-[34ch] text-sm leading-6 text-custom-secondary">
                        {tr(service.descriptionKey)}
                      </p>

                      <div className="mt-auto flex flex-wrap gap-2">
                        {service.techs.map((tech) => {
                          const TechIcon = tech.icon

                          return (
                            <div
                              key={tech.name}
                              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/75 px-3 py-1.5 text-xs font-semibold text-custom-secondary shadow-sm backdrop-blur-md transition-all group-hover:border-[#8C0605]/15 dark:border-white/10 dark:bg-white/[0.04]"
                            >
                              <TechIcon className="h-3.5 w-3.5" />
                              <span>{tech.name}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>

          {/* Offers */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ staggerChildren: 0.12 }}
            className="mx-auto grid w-full max-w-[min(1040px,100%)] grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6"
          >
            <OfferCard
              variant="dark"
              badge={tr('services.companies.badge')}
              title={tr('services.companies.title')}
              items={companyItems}
            />

            <OfferCard
              variant="brand"
              badge={tr('services.freelance.badge')}
              title={tr('services.freelance.title')}
              items={freelanceItems}
              cta={tr('services.freelance.cta')}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}