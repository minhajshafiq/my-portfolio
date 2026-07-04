'use client'

import { useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaArrowRight, FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { useLoader } from '@/hooks/useLoader'
import { useTranslation } from '@/hooks/useTranslation'
import { Magnetic } from '@/components/ui/Magnetic'
import { trackEvent } from '@/utils/analytics'

gsap.registerPlugin(ScrollTrigger)

const EASE_SMOOTH = [0.33, 1, 0.68, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

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

/** Rend une ligne de titre en colorant le point final en rouge */
function TitleLine({ text }: { text: string }) {
  const endsWithPeriod = text.endsWith('.')
  const body = endsWithPeriod ? text.slice(0, -1) : text

  return (
    <>
      {body}
      {endsWithPeriod && <span className="text-[#8C0605] dark:text-red-400">.</span>}
    </>
  )
}

export function Hero() {
  const { isLoading } = useLoader()
  const { t } = useTranslation()

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

    const ctx = gsap.context(() => {
      const lines = titleRef.current?.querySelectorAll('[data-title-line]')

      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1,
            stagger: 0.09,
            delay: 0.15,
            ease: 'power4.out',
          }
        )
      }

      // Sortie : le contenu s'éloigne et s'estompe quand on quitte le hero
      if (contentRef.current && sectionRef.current) {
        gsap.to(contentRef.current, {
          yPercent: -14,
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
          className="mx-auto flex min-h-[100svh] w-full max-w-[min(1180px,calc(100vw-2.5rem))] flex-col justify-center py-28 will-change-transform md:py-32"
        >
          {/* Availability */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.05, duration: 0.6, ease: EASE_SMOOTH }}
            className="mb-8 md:mb-10"
          >
            <div className="inline-flex items-center gap-2.5 border-b border-custom pb-3 pr-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-custom-secondary sm:text-sm">
                {tr('hero.available_for_work')}
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="mb-8 font-serif text-[clamp(2.9rem,9.5vw,7.5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-custom-title md:mb-10"
          >
            {titleLines.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <span
                  data-title-line
                  className={index === 1 ? 'block italic will-change-transform' : 'block will-change-transform'}
                >
                  <TitleLine text={line} />
                </span>
              </span>
            ))}
          </h1>

          {/* Description + role */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.55, duration: 0.65, ease: EASE_SMOOTH }}
              className="md:col-span-7"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#8C0605] dark:text-red-400">
                {tr('hero.role_line')}
              </p>

              <p className="max-w-[58ch] text-base leading-7 text-custom-secondary md:text-lg md:leading-8">
                {tr('hero.description')}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7, duration: 0.65, ease: EASE_SMOOTH }}
              className="flex flex-wrap items-center gap-5 md:col-span-5 md:justify-end"
            >
              <Magnetic>
                <button
                  type="button"
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
              </button>
            </motion.div>
          </div>

          {/* Bottom line: socials + scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-16 flex items-center justify-between border-t border-custom pt-6 md:mt-20"
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
