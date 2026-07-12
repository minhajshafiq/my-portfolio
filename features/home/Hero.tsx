'use client'

import { useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/components/ui/AppLink'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaArrowRight, FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { useLoader } from '@/hooks/useLoader'
import { useTranslation } from '@/hooks/useTranslation'
import { Magnetic } from '@/components/ui/Magnetic'
import { trackEvent } from '@/lib/analytics'
import { HERO_PROJECT } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

const SOCIAL_LINKS = [
  {
    icon: FaGithub,
    href: 'https://github.com/minhajshafiq',
    label: 'GitHub',
  },
  {
    icon: FaLinkedinIn,
    href: 'https://www.linkedin.com/in/minhajshafiq/',
    label: 'LinkedIn',
  },
]

/**
 * Rend une ligne de titre : point final en rouge (élément signature) et
 * tiret cadratin rendu insécable pour ne jamais tomber seul sur une ligne mobile.
 */
function TitleLine({ text }: { text: string }) {
  const endsWithPeriod = text.endsWith('.')
  const body = endsWithPeriod ? text.slice(0, -1) : text

  // Colle le tiret au mot qui le précède (« mot — » -> « mot — »).
  const safeBody = body.replace(/ (—|-)/g, ' $1')

  if (!endsWithPeriod) {
    return <>{safeBody}</>
  }

  const lastSpaceIndex = safeBody.lastIndexOf(' ')
  const beforeLastWord = lastSpaceIndex >= 0 ? safeBody.slice(0, lastSpaceIndex + 1) : ''
  const lastWord = lastSpaceIndex >= 0 ? safeBody.slice(lastSpaceIndex + 1) : safeBody

  return (
    <>
      {beforeLastWord}
      <span className="whitespace-nowrap">
        {lastWord}
        {/* Point signature : disque rouge vivant qui ponctue le titre */}
        <span
          data-title-dot
          className="signature-dot ml-[0.05em] inline-block h-[0.15em] w-[0.15em] rounded-full bg-[#8C0605] align-baseline dark:bg-red-400"
        />
      </span>
    </>
  )
}

/**
 * Vitrine hero : un seul projet, en grand — un site client réel.
 * C'est la première preuve qu'un prospect voit ; les autres projets
 * vivent dans la section Projets plus bas (zéro doublon sur la home).
 */
function CaseReel({
  locale,
  tr,
}: {
  locale: string
  tr: (key: string) => string
}) {
  const lead = HERO_PROJECT

  return (
    <div
      data-hero-reel
      className="relative isolate w-full [perspective:1200px] will-change-transform lg:py-6"
    >
      {/* En-tête : label seul, le compteur n'a plus de sens avec une carte unique */}
      <div className="mb-4 flex items-center">
        <span className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-custom-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8C0605] dark:bg-red-400" />
          {tr('hero.reel_label')}
        </span>
      </div>

      {/* Carte unique */}
      <Link
        data-reel-card
        data-reel-lead
        data-depth="1"
        data-cursor-label={tr('hero.reel_view')}
        data-cursor-variant="project"
        href={`/${locale}/work/${lead.slug}`}
        onClick={() => trackEvent('project_view', { project: lead.slug, source: 'hero_reel' })}
        aria-label={`${tr(`projects.${lead.key}.title`)} — ${tr('hero.reel_view')}`}
        className="group relative block overflow-hidden rounded-2xl bg-custom-secondary shadow-[0_24px_80px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-out lg:[transform-style:preserve-3d]"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-[4/3]">
          <Image
            src={lead.image}
            alt={tr(`projects.${lead.key}.title`)}
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            priority
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-90" />

          {/* Cue « Voir » */}
          <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-gray-950 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 dark:bg-white/95">
            {tr('hero.reel_view')}
            <FaArrowRight className="h-2.5 w-2.5" />
          </span>

          {/* Titre + catégorie + badges */}
          <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
              {tr(`projects.${lead.key}.category`)}
            </p>

            <p className="mb-2.5 font-serif text-xl font-medium leading-tight text-white md:text-2xl">
              {tr(`projects.${lead.key}.title`)}
            </p>

            {lead.badges && lead.badges.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {lead.badges.slice(0, 2).map((badge) => (
                  <li
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm"
                  >
                    <span className="h-1 w-1 rounded-full bg-red-400" />
                    {tr(`work.badges.${badge}`)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Link>

      {/* Indice de continuité vers la section projets */}
      <div className="mt-4 flex items-center gap-2.5 text-xs font-medium text-custom-muted">
        <motion.span
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="h-1.5 w-1.5 rounded-full bg-[#8C0605] dark:bg-red-400"
        />
        {tr('hero.reel_hint')}
      </div>
    </div>
  )
}

export function Hero() {
  const { isLoading } = useLoader()
  const { t, language } = useTranslation()

  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const tr = useCallback(
    (key: string): string => {
      const value = t(key)
      return Array.isArray(value) ? value.join(' ') : String(value)
    },
    [t]
  )

  const rawLines = t('hero.title_lines', { returnObjects: true })
  const titleLines: string[] = Array.isArray(rawLines) ? rawLines.map(String) : [String(rawLines)]
  const titlePlain = titleLines.join(' ')

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.querySelector(sectionId)

    if (!element) return

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [])

  useEffect(() => {
    if (isLoading) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    const cleanups: Array<() => void> = []

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      const q = (selector: string) =>
        sectionRef.current?.querySelector<HTMLElement>(selector) ?? null

      // Chorégraphie d'entrée : badge → titre → rôle → CTAs, avec chevauchements
      // serrés — une seule timeline pour un rythme maîtrisé, pas des fades isolés.
      const intro = q('[data-hero-intro]')
      const copy = q('[data-hero-copy]')
      const ctas = q('[data-hero-ctas]')
      const reelColumn = q('[data-hero-reel-col]')
      const bottom = q('[data-hero-bottom]')

      if (intro) {
        tl.fromTo(
          intro,
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' },
          0
        )
      }

      // Reveal du titre ligne par ligne
      const lines = titleRef.current?.querySelectorAll('[data-title-line]')

      if (lines && lines.length > 0) {
        tl.fromTo(
          lines,
          { yPercent: 115 },
          { yPercent: 0, duration: 1, stagger: 0.09, ease: 'power4.out' },
          0.15
        )
      }

      if (copy) {
        tl.fromTo(
          copy,
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55, ease: 'power3.out' },
          0.62
        )
      }

      // Le bloc CTA est animé comme un tout : cibler ses enfants individuellement
      // entrerait en conflit avec Magnetic, qui possède les transforms de son div.
      if (ctas) {
        tl.fromTo(
          ctas,
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55, ease: 'power3.out' },
          0.78
        )
      }

      if (reelColumn) {
        tl.fromTo(reelColumn, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.45)
      }

      if (bottom) {
        tl.fromTo(bottom, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 1.05)
      }

      // Carte unique : reveal par masque, comme un rideau qui se lève
      const reel = sectionRef.current?.querySelector<HTMLElement>('[data-hero-reel]')
      const leadCard = sectionRef.current?.querySelector<HTMLElement>('[data-reel-lead]')

      if (leadCard) {
        tl.fromTo(
          leadCard,
          { clipPath: 'inset(0% 0% 100% 0%)', y: 24 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
          },
          0.5
        )
      }

      // Profondeur contrôlée : le screenshot réagit au curseur sans devenir nerveux.
      if (reel && leadCard) {
        gsap.set(leadCard, {
          force3D: true,
          transformStyle: 'preserve-3d',
        })

        const pointerMedia = window.matchMedia('(hover: hover) and (pointer: fine)')

        if (pointerMedia.matches) {
          const xTo = gsap.quickTo(leadCard, 'x', { duration: 0.65, ease: 'power3.out' })
          const yTo = gsap.quickTo(leadCard, 'y', { duration: 0.65, ease: 'power3.out' })
          const rotateXTo = gsap.quickTo(leadCard, 'rotationX', { duration: 0.8, ease: 'power3.out' })
          const rotateYTo = gsap.quickTo(leadCard, 'rotationY', { duration: 0.8, ease: 'power3.out' })

          const onPointerMove = (event: PointerEvent) => {
            const bounds = reel.getBoundingClientRect()
            const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5
            const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5

            xTo(relativeX * 30)
            yTo(relativeY * 22)
            rotateYTo(relativeX * -7)
            rotateXTo(relativeY * 5)
          }

          const onPointerLeave = () => {
            xTo(0)
            yTo(0)
            rotateXTo(0)
            rotateYTo(0)
          }

          reel.addEventListener('pointermove', onPointerMove)
          reel.addEventListener('pointerleave', onPointerLeave)

          cleanups.push(() => {
            reel.removeEventListener('pointermove', onPointerMove)
            reel.removeEventListener('pointerleave', onPointerLeave)
          })
        }
      }

      // Passage vers le showcase : le screenshot s'agrandit et sort,
      // comme s'il était aspiré par la section projets plus bas.
      if (leadCard && sectionRef.current) {
        gsap.to(leadCard, {
          xPercent: -34,
          yPercent: 42,
          scale: 1.16,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '45% top',
            end: 'bottom top',
            scrub: 0.7,
          },
        })
      }

      // Sortie : le contenu s'éloigne et s'estompe quand on quitte le hero
      if (contentRef.current && sectionRef.current) {
        gsap.to(contentRef.current, {
          yPercent: -12,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        })
      }
    }, sectionRef)

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      ctx.revert()
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-custom-primary"
      />
    )
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-custom-primary"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
        <div
          ref={contentRef}
          className="mx-auto flex min-h-[100svh] w-full max-w-[min(1240px,calc(100vw-2.5rem))] flex-col justify-center py-[clamp(5.25rem,10vh,7rem)] will-change-transform"
        >
          <div className="relative grid grid-cols-1 items-center gap-y-10 lg:grid-cols-12 lg:gap-x-[clamp(2.5rem,4vw,4.5rem)]">
            {/* Colonne texte */}
            <div className="lg:col-span-7">
              {/* Availability */}
              <div data-hero-intro className="mb-6 md:mb-8">
                <div className="inline-flex items-center gap-2.5 border-b border-custom pb-3 pr-6">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>

                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-custom-secondary sm:text-sm">
                    {tr('hero.available_for_work')}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1
                ref={titleRef}
                aria-label={titlePlain}
                className="mb-6 font-serif text-[clamp(2.65rem,6.2vw,5.6rem)] font-medium leading-[1.02] tracking-[-0.03em] text-custom-title md:mb-7"
              >
                {titleLines.map((line, index) => (
                  <span
                    key={line}
                    aria-hidden="true"
                    className="block overflow-hidden pb-[0.08em] -mb-[0.08em]"
                  >
                    <span
                      data-title-line
                      className={
                        index === 1
                          ? 'block italic will-change-transform'
                          : 'block will-change-transform'
                      }
                    >
                      <TitleLine text={line} />
                    </span>
                  </span>
                ))}
              </h1>

              {/* Role + description */}
              <div data-hero-copy className="mb-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#8C0605] dark:text-red-400">
                  {tr('hero.role_line')}
                </p>

                <p className="max-w-[54ch] text-base leading-7 text-custom-secondary md:text-lg md:leading-8">
                  {tr('hero.description')}
                </p>
              </div>

              {/* CTAs */}
              <div data-hero-ctas className="flex flex-wrap items-center gap-5">
                <Magnetic>
                  <button
                    type="button"
                    data-cursor-label={tr('hero.cta_primary')}
                    data-cursor-variant="cta"
                    onClick={() => {
                      trackEvent('cta_click', { cta: 'hero_primary', section: 'hero' })
                      scrollToSection('#contact')
                    }}
                    className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#8C0605] px-7 py-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#a70b0a] hover:shadow-[0_18px_40px_rgba(140,6,5,0.25)] dark:bg-red-400 dark:text-gray-950 dark:hover:bg-red-300 sm:text-base"
                  >
                    {tr('hero.cta_primary')}
                    <FaArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Magnetic>

                <button
                  type="button"
                  data-cursor-label={tr('hero.cta_secondary')}
                  data-cursor-variant="project"
                  onClick={() => {
                    trackEvent('cta_click', { cta: 'hero_secondary', section: 'hero' })
                    scrollToSection('#projects')
                  }}
                  className="group relative inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-custom-title sm:text-base"
                >
                  <span className="relative">
                    {tr('hero.cta_secondary')}
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-custom-title/30 transition-all duration-300 group-hover:bg-[#8C0605] dark:group-hover:bg-red-400" />
                  </span>
                  <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Colonne case reel */}
            <div data-hero-reel-col className="lg:col-span-5">
              <CaseReel locale={language} tr={tr} />
            </div>
          </div>

          {/* Bottom line: socials + scroll */}
          <div
            data-hero-bottom
            className="mt-10 flex items-center justify-between border-t border-custom pt-6 md:mt-14"
          >
            <div className="flex items-center gap-5">
              {SOCIAL_LINKS.map((link) => {
                const SocialIcon = link.icon

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-custom-muted transition-colors duration-300 hover:text-[#8C0605] dark:hover:text-red-400"
                    title={link.label}
                    aria-label={link.label}
                  >
                    <SocialIcon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>

            <button
              type="button"
              data-cursor-label={tr('hero.scroll')}
              data-cursor-variant="control"
              onClick={() => scrollToSection('#manifesto')}
              className="group flex cursor-pointer items-center gap-3 text-custom-muted transition-colors hover:text-custom-title"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.22em]">
                {tr('hero.scroll')}
              </span>

              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="block h-8 w-px bg-current"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
