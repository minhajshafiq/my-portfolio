'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { ComponentType } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '@/hooks/useTranslation'

import {
  SiNextdotjs,
  SiReact,
  SiSanity,
  SiSpringboot,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'

import {
  FaArrowRight,
  FaChartLine,
  FaCheck,
  FaCode,
  FaGlobe,
  FaRocket,
  FaSearch,
  FaTools,
} from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

type IconComponent = ComponentType<{ className?: string }>

type ServiceKey = 'website' | 'webapp' | 'growth'

type TechItem = {
  name: string
  icon: IconComponent
}

type QuickItem = {
  icon: IconComponent
  label: string
  value: string
}

type ServiceCard = {
  key: ServiceKey
  number: string
  icon: IconComponent
  badge: string
  title: string
  result: string
  bullets: string[]
  timeline: string
  techs: TechItem[]
  cta: string
  featured?: boolean
}

type ProcessStep = {
  number: string
  title: string
  description: string
}

type OfferCardProps = {
  variant: 'dark' | 'brand'
  badge: string
  title: string
  description: string
  items: string[]
  cta: string
  href?: string
}

const EASE_SMOOTH = [0.33, 1, 0.68, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

// TEXTES RACCOURCIS ET PLUS DIRECTS
const CONTENT = {
  fr: {
    intro: 'Des sites web et applications sur-mesure pour attirer plus de clients et automatiser votre activité.',
    fastTitle: 'Mon expertise :',
    quick: [
      { icon: FaGlobe, label: 'Création de site', value: 'Présence en ligne pro' },
      { icon: FaCode, label: 'Développement MVP', value: 'Lancement d\'application' },
      { icon: FaChartLine, label: 'Optimisation SEO', value: 'Plus de visibilité' },
      { icon: FaTools, label: 'Maintenance', value: 'Sécurité et mises à jour' },
    ],
    services: [
      {
        key: 'website',
        number: '01',
        icon: FaGlobe,
        badge: 'Essentiel',
        title: 'Site Vitrine Pro',
        result: 'Un site rapide et moderne pour convaincre vos visiteurs de vous contacter.',
        bullets: [
          'Design premium sur-mesure',
          'Adapté mobiles et tablettes',
          'Formulaire de contact / Réservation',
        ],
        timeline: '7–14 jours',
        techs: [
          { name: 'Next.js', icon: SiNextdotjs },
          { name: 'TypeScript', icon: SiTypescript },
          { name: 'Tailwind', icon: SiTailwindcss },
        ],
        cta: 'Obtenir mon site pro',
        featured: true,
      },
      {
        key: 'webapp',
        number: '02',
        icon: FaCode,
        badge: 'Sur-mesure',
        title: 'Application Web',
        result: 'Une interface fluide pour gérer vos données ou créer un espace client.',
        bullets: [
          'Espace d\'administration sécurisé',
          'Gestion de base de données',
          'Architecture robuste',
        ],
        timeline: '2–6 semaines',
        techs: [
          { name: 'React', icon: SiReact },
          { name: 'Supabase', icon: SiSupabase },
          { name: 'Spring Boot', icon: SiSpringboot },
        ],
        cta: 'Discuter de mon app',
      },
      {
        key: 'growth',
        number: '03',
        icon: FaRocket,
        badge: 'Abonnement',
        title: 'Suivi Mensuel',
        result: 'Je gère la technique de votre site pour que vous restiez concentré sur votre métier.',
        bullets: [
          'Mises à jour et sécurité',
          'Modifications à la demande',
          'Rapports de performance',
        ],
        timeline: 'Forfait mensuel',
        techs: [
          { name: 'SEO', icon: FaSearch },
          { name: 'Analytics', icon: FaChartLine },
        ],
        cta: 'Déléguer la technique',
      },
    ] satisfies ServiceCard[],
    process: [
      { number: '01', title: 'Cadrage', description: 'Définition claire de vos objectifs.' },
      { number: '02', title: 'Design', description: 'Création de la maquette visuelle.' },
      { number: '03', title: 'Développement', description: 'Code propre et performant.' },
      { number: '04', title: 'Lancement', description: 'Mise en ligne et ajustements.' },
    ],
    offers: {
      project: {
        badge: 'Création',
        title: 'Besoin d\'un nouveau site web ?',
        description: 'On crée ensemble une présence en ligne qui vous ressemble et qui convertit.',
        items: [
          'Analyse de vos besoins',
          'Design attractif',
          'Code optimisé SEO',
          'Lancement clé en main',
        ],
        cta: 'Lancer mon projet',
      },
      monthly: {
        badge: 'Sérénité',
        title: 'Un site toujours à jour, sans effort.',
        description: 'Un forfait mensuel pour gérer la maintenance, les petits bugs et les évolutions de votre site.',
        items: [
          'Hébergement & Sécurité',
          'Modifications de contenu',
          'Optimisations de vitesse',
          'Support prioritaire',
        ],
        cta: 'Découvrir le forfait',
      },
    },
  },
  en: {
    intro: 'Custom websites and web apps designed to attract clients and automate your business.',
    fastTitle: 'My expertise:',
    quick: [
      { icon: FaGlobe, label: 'Website Creation', value: 'Professional online presence' },
      { icon: FaCode, label: 'MVP Development', value: 'App launch' },
      { icon: FaChartLine, label: 'SEO Optimization', value: 'More visibility' },
      { icon: FaTools, label: 'Maintenance', value: 'Security and updates' },
    ],
    services: [
      {
        key: 'website',
        number: '01',
        icon: FaGlobe,
        badge: 'Essential',
        title: 'Pro Business Site',
        result: 'A fast, modern website to convince your visitors to contact you.',
        bullets: [
          'Custom premium design',
          'Mobile & tablet ready',
          'Contact / Booking forms',
        ],
        timeline: '7–14 days',
        techs: [
          { name: 'Next.js', icon: SiNextdotjs },
          { name: 'TypeScript', icon: SiTypescript },
          { name: 'Tailwind', icon: SiTailwindcss },
        ],
        cta: 'Get my pro website',
        featured: true,
      },
      {
        key: 'webapp',
        number: '02',
        icon: FaCode,
        badge: 'Custom',
        title: 'Web Application',
        result: 'A smooth interface to manage your data or create a customer portal.',
        bullets: [
          'Secure admin dashboard',
          'Database management',
          'Robust architecture',
        ],
        timeline: '2–6 weeks',
        techs: [
          { name: 'React', icon: SiReact },
          { name: 'Supabase', icon: SiSupabase },
          { name: 'Spring Boot', icon: SiSpringboot },
        ],
        cta: 'Discuss my app',
      },
      {
        key: 'growth',
        number: '03',
        icon: FaRocket,
        badge: 'Subscription',
        title: 'Monthly Support',
        result: 'I handle the technical side so you can focus on your business.',
        bullets: [
          'Updates and security',
          'On-demand changes',
          'Performance reports',
        ],
        timeline: 'Monthly fee',
        techs: [
          { name: 'SEO', icon: FaSearch },
          { name: 'Analytics', icon: FaChartLine },
        ],
        cta: 'Delegate the tech',
      },
    ] satisfies ServiceCard[],
    process: [
      { number: '01', title: 'Scoping', description: 'Clear definition of your goals.' },
      { number: '02', title: 'Design', description: 'Creating the visual layout.' },
      { number: '03', title: 'Development', description: 'Clean and performant code.' },
      { number: '04', title: 'Launch', description: 'Deployment and fine-tuning.' },
    ],
    offers: {
      project: {
        badge: 'Creation',
        title: 'Need a new website?',
        description: 'Let\'s build an online presence that represents you and converts.',
        items: [
          'Needs analysis',
          'Engaging design',
          'SEO optimized code',
          'Turnkey launch',
        ],
        cta: 'Start my project',
      },
      monthly: {
        badge: 'Peace of mind',
        title: 'Always up to date, zero effort.',
        description: 'A monthly package to handle maintenance, bugs, and website updates.',
        items: [
          'Hosting & Security',
          'Content modifications',
          'Speed optimization',
          'Priority support',
        ],
        cta: 'View monthly plans',
      },
    },
  },
}

function SectionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="services-orb absolute right-[4%] top-16 h-[clamp(15rem,24vw,28rem)] w-[clamp(15rem,24vw,28rem)] rounded-full bg-[#8C0605]/10 blur-3xl dark:bg-red-400/[0.08] lg:right-[10%] xl:right-[14%]" />
      <div className="services-orb absolute bottom-16 left-[2%] h-[clamp(14rem,20vw,24rem)] w-[clamp(14rem,20vw,24rem)] rounded-full bg-[#8C0605]/[0.08] blur-3xl dark:bg-red-400/[0.06] lg:left-[8%]" />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/18 to-transparent dark:from-black/20" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white/14 to-transparent dark:from-black/20" />
    </div>
  )
}

function TechBadge({ tech }: { tech: TechItem }) {
  const TechIcon = tech.icon
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/75 px-3 py-1.5 text-xs font-semibold text-custom-secondary shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]">
      <TechIcon className="h-3.5 w-3.5" />
      {tech.name}
    </span>
  )
}

function QuickItemCard({ item }: { item: QuickItem }) {
  const QuickIcon = item.icon
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/70 p-4 shadow-[0_14px_38px_rgba(0,0,0,0.045)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8C0605] text-white shadow-[0_12px_26px_rgba(140,6,5,0.22)] dark:bg-red-400 dark:text-gray-950">
          <QuickIcon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-black tracking-[-0.03em] text-custom-title">
            {item.label}
          </p>
          <p className="truncate text-xs text-custom-secondary">
            {item.value}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function ServiceCardItem({ service, index }: { service: ServiceCard; index: number }) {
  const ServiceIcon = service.icon
  const isFeatured = service.featured

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.07, duration: 0.62, ease: EASE_SMOOTH }}
      whileHover={{ y: -6 }}
      className={[
        'group h-full',
        isFeatured ? 'lg:col-span-5' : '',
        !isFeatured && index === 1 ? 'lg:col-span-4' : '',
        !isFeatured && index === 2 ? 'md:col-span-2 lg:col-span-3' : '',
      ].join(' ')}
    >
      <div
        className={[
          'relative flex h-full min-h-[410px] flex-col overflow-hidden rounded-[1.5rem] border p-5 shadow-[0_16px_48px_rgba(0,0,0,0.055)] backdrop-blur-md transition-all duration-500 hover:shadow-[0_24px_70px_rgba(0,0,0,0.10)] md:p-6',
          isFeatured
            ? 'border-[#8C0605]/25 bg-[#8C0605] text-white shadow-xl shadow-[#8C0605]/30 dark:bg-red-400 dark:text-gray-950 scale-[1.02]' // Ajout d'une mise en avant subtile de l'échelle et de l'ombre
            : 'border-gray-200 bg-white/76 hover:border-[#8C0605]/30 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-red-400/35',
        ].join(' ')}
      >
        <div
          className={[
            'pointer-events-none absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100',
            isFeatured
              ? 'bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.20),transparent_34%)]'
              : 'bg-[radial-gradient(circle_at_90%_0%,rgba(140,6,5,0.08),transparent_34%)] dark:bg-[radial-gradient(circle_at_90%_0%,rgba(248,113,113,0.06),transparent_34%)]',
          ].join(' ')}
        />
        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div
              className={[
                'flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105',
                isFeatured
                  ? 'bg-white/15 text-white backdrop-blur-md dark:bg-gray-950/10 dark:text-gray-950'
                  : 'bg-[#8C0605] text-white shadow-[#8C0605]/20 dark:bg-red-400 dark:text-gray-950 dark:shadow-red-400/10',
              ].join(' ')}
            >
              <ServiceIcon className="h-5 w-5" />
            </div>
            <div className="text-right">
              <span
                className={[
                  'block font-mono text-xs font-black',
                  isFeatured ? 'text-white/65 dark:text-gray-950/60' : 'text-[#8C0605] dark:text-red-400',
                ].join(' ')}
              >
                {service.number}
              </span>
              <span
                className={[
                  'mt-1 block rounded-full border px-3 py-1.5 text-[11px] font-bold shadow-sm backdrop-blur-md',
                  isFeatured
                    ? 'border-white/15 bg-white/10 text-white/80 dark:border-gray-950/10 dark:bg-gray-950/10 dark:text-gray-950/75'
                    : 'border-gray-200 bg-white/75 text-custom-muted dark:border-white/10 dark:bg-white/[0.04]',
                ].join(' ')}
              >
                {service.timeline}
              </span>
            </div>
          </div>
          <span
            className={[
              'mb-3 block font-mono text-[11px] font-bold uppercase tracking-[0.22em]',
              isFeatured ? 'text-white/65 dark:text-gray-950/60' : 'text-[#8C0605] dark:text-red-400',
            ].join(' ')}
          >
            {service.badge}
          </span>
          <h3
            className={[
              'mb-3 font-black leading-[1.02] tracking-[-0.055em]',
              isFeatured ? 'max-w-[12ch] text-3xl text-white dark:text-gray-950 md:text-4xl' : 'text-2xl text-custom-title',
            ].join(' ')}
          >
            {service.title}
          </h3>
          <p
            className={[
              'mb-5 font-semibold leading-6 tracking-[-0.02em]',
              isFeatured ? 'max-w-[52ch] text-base text-white/86 dark:text-gray-950/80' : 'text-base text-custom-title',
            ].join(' ')}
          >
            {service.result}
          </p>
          <ul className="mb-6 space-y-2.5">
            {service.bullets.map((item) => (
              <li
                key={item}
                className={[
                  'flex items-start gap-2.5 text-sm leading-6',
                  isFeatured ? 'text-white/86 dark:text-gray-950/80' : 'text-custom-secondary',
                ].join(' ')}
              >
                <span
                  className={[
                    'mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full',
                    isFeatured ? 'bg-white/15 text-white dark:bg-gray-950/10 dark:text-gray-950' : 'bg-green-500/10 text-green-600 dark:text-green-400',
                  ].join(' ')}
                >
                  <FaCheck className="h-2.5 w-2.5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-2">
            {service.techs.map((tech) => (
              <TechBadge key={tech.name} tech={tech} />
            ))}
          </div>

          {/* CTA Modifié : Plus d'impact visuel pour le bouton principal */}
          <a
            href="#contact"
            className={[
              'mt-6 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold transition-all hover:-translate-y-1',
              isFeatured
                ? 'bg-white text-[#8C0605] shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] dark:bg-gray-950 dark:text-red-400'
                : 'bg-gray-950 text-white hover:bg-[#8C0605] dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200',
            ].join(' ')}
          >
            {service.cta}
            <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function OfferCard({ variant, badge, title, description, items, cta, href = '#contact' }: OfferCardProps) {
  const isBrand = variant === 'brand'

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5 }}
      className={[
        'group relative overflow-hidden rounded-[1.75rem] p-6 shadow-[0_18px_58px_rgba(0,0,0,0.08)] transition-all duration-500 md:p-7',
        isBrand
          ? 'bg-[#8C0605] text-white shadow-xl shadow-[#8C0605]/20 dark:bg-red-400 dark:text-gray-950'
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
            'mb-3 block font-mono text-[11px] uppercase tracking-[0.22em]',
            isBrand ? 'text-white/65 dark:text-gray-950/60' : 'text-white/45',
          ].join(' ')}
        >
          {badge}
        </span>
        <h3 className="mb-3 max-w-[560px] text-2xl font-black leading-tight tracking-[-0.045em] md:text-3xl">
          {title}
        </h3>
        <p
          className={[
            'mb-6 max-w-[560px] text-sm leading-6',
            isBrand ? 'text-white/78 dark:text-gray-950/75' : 'text-gray-400',
          ].join(' ')}
        >
          {description}
        </p>
        <ul className="max-w-[560px] flex-1 space-y-2.5">
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

        {/* CTA Modifié : Plus proéminent sur la carte Brand */}
        <a
          href={href}
          className={[
            'mt-7 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold transition-all hover:-translate-y-1',
            isBrand
              ? 'bg-white text-[#8C0605] shadow-lg hover:shadow-xl dark:bg-gray-950 dark:text-red-400'
              : 'bg-white text-gray-950 hover:bg-gray-200',
          ].join(' ')}
        >
          {cta}
          <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  )
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const { t, language } = useTranslation()
  const content = language === 'en' ? CONTENT.en : CONTENT.fr

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.services-orb', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }
      gsap.fromTo(
        '.process-line',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-line',
            start: 'top 85%',
            once: true,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="relative isolate overflow-hidden bg-custom-primary py-[clamp(4rem,5.5vw,6.5rem)]">
      <SectionBackground />
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
        <div className="mx-auto w-full max-w-[min(1120px,calc(100vw-5rem))] xl:max-w-[min(1160px,calc(100vw-7rem))] 2xl:max-w-[1160px]">

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
                  {'<'} {tr('services.title')} {'/>'}
                </span>
                <h2 className="max-w-[min(820px,100%)] text-4xl font-black leading-[0.94] tracking-[-0.065em] text-custom-title sm:text-5xl md:text-[clamp(3.35rem,5.4vw,5.2rem)] lg:text-[clamp(3.75rem,5vw,5.7rem)]">
                  {tr('services.heading')}
                </h2>
              </div>
              <div className="md:col-span-4 md:self-end">
                <p className="max-w-sm text-sm font-medium leading-6 text-custom-secondary md:text-[15px] md:leading-7">
                  {content.intro}
                </p>
              </div>
            </div>
            <div ref={lineRef} className="h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#8C0605]/30 via-gray-300 to-transparent dark:from-red-400/30 dark:via-white/10" />
            <div className="pointer-events-none absolute -bottom-7 right-0 hidden select-none text-[5.75rem] font-black leading-none tracking-[-0.08em] text-gray-950/[0.035] dark:text-white/[0.035] md:block">
              01
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.62, ease: EASE_SMOOTH }}
            className="mx-auto mb-6 w-full max-w-[min(1080px,100%)] overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white/66 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.045)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04] md:p-5"
          >
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#8C0605] dark:text-red-400">
                  Freelance services
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-[-0.05em] text-custom-title md:text-3xl">
                  {content.fastTitle}
                </h3>
              </div>
              <a
                href="#contact"
                className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#8C0605] dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200 md:mt-0"
              >
                Discuter de mon besoin
                <FaArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
            >
              {content.quick.map((item) => (
                <QuickItemCard key={item.label} item={item} />
              ))}
            </motion.div>
          </motion.div>

          <div className="mx-auto mb-10 grid w-full max-w-[min(1080px,100%)] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
            {content.services.map((service, index) => (
              <ServiceCardItem key={service.key} service={service} index={index} />
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.62, ease: EASE_SMOOTH }}
            className="mx-auto mb-10 w-full max-w-[min(1080px,100%)] overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white/66 shadow-[0_16px_48px_rgba(0,0,0,0.045)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]"
          >
            <div className="relative">
              <div className="process-line absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-[#8C0605] via-[#8C0605]/40 to-transparent dark:from-red-400" />
              <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">
                {content.process.map((step: ProcessStep) => (
                  <div key={step.number} className="p-5">
                    <span className="mb-4 block font-mono text-xs font-bold text-[#8C0605] dark:text-red-400">
                      {step.number}
                    </span>
                    <h4 className="mb-2 font-black tracking-[-0.035em] text-custom-title">
                      {step.title}
                    </h4>
                    <p className="text-sm leading-6 text-custom-secondary">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto grid w-full max-w-[min(1080px,100%)] grid-cols-1 gap-5 lg:grid-cols-2"
          >
            <OfferCard
              variant="dark"
              badge={content.offers.project.badge}
              title={content.offers.project.title}
              description={content.offers.project.description}
              items={content.offers.project.items}
              cta={content.offers.project.cta}
            />
            <OfferCard
              variant="brand"
              badge={content.offers.monthly.badge}
              title={content.offers.monthly.title}
              description={content.offers.monthly.description}
              items={content.offers.monthly.items}
              cta={content.offers.monthly.cta}
              href="#contact"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}