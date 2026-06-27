'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import Image from 'next/image'
import { FaArrowDown, FaGithub, FaLinkedinIn, FaPlay } from 'react-icons/fa'
import { SiExpo, SiNextdotjs, SiSpringboot, SiTypescript } from 'react-icons/si'
import { useLoader } from '@/hooks/useLoader'
import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/utils/cn'

type IconComponent = ComponentType<{ className?: string }>

type ValueProp = {
  emoji: string
  key: string
}

type TechItem = {
  icon: IconComponent
  name: string
  hoverClassName: string
}

type SocialLink = {
  icon: IconComponent
  href: string
  label: string
}

const VALUE_PROPS: ValueProp[] = [
  { emoji: '🚀', key: 'hero.value_apps' },
  { emoji: '📱', key: 'hero.value_web_mobile' },
  { emoji: '⚡', key: 'hero.value_clean_code' },
]

const TECH_STACK: TechItem[] = [
  {
    icon: SiNextdotjs,
    name: 'Next.js',
    hoverClassName: 'group-hover:text-black dark:group-hover:text-white',
  },
  {
    icon: SiExpo,
    name: 'React Native',
    hoverClassName: 'group-hover:text-[#4630EB]',
  },
  {
    icon: SiSpringboot,
    name: 'Spring',
    hoverClassName: 'group-hover:text-[#6DB33F]',
  },
  {
    icon: SiTypescript,
    name: 'TypeScript',
    hoverClassName: 'group-hover:text-[#3178C6]',
  },
]

const SOCIAL_LINKS: SocialLink[] = [
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

const DEV_REFERENCES = [
  'Hello World',
  'npm run dev',
  'git push origin main',
  'console.log("ship it")',
  '<Developer />',
  'const passion = true',
  'while (learning) build()',
  '200 OK',
]

const EASE_SMOOTH = [0.33, 1, 0.68, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
}

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
}

function TypingDevReference() {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = DEV_REFERENCES[phraseIndex]

    const isComplete = text === currentPhrase && !isDeleting
    const isEmpty = text.length === 0 && isDeleting

    const delay = isComplete ? 1150 : isEmpty ? 260 : isDeleting ? 34 : 66

    const timeout = window.setTimeout(() => {
      if (isComplete) {
        setIsDeleting(true)
        return
      }

      if (isEmpty) {
        setIsDeleting(false)
        setPhraseIndex((currentIndex) => (currentIndex + 1) % DEV_REFERENCES.length)
        return
      }

      const nextLength = isDeleting ? text.length - 1 : text.length + 1
      setText(currentPhrase.slice(0, nextLength))
    }, delay)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [text, phraseIndex, isDeleting])

  return (
    <span className="inline-flex items-center rounded-full border border-[#8C0605]/15 bg-[#8C0605]/5 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#8C0605] dark:border-red-400/15 dark:bg-red-400/10 dark:text-red-400 sm:text-sm">
      <span className="mr-2 text-custom-secondary/60">{'>'}</span>

      <span className="min-w-[11ch]">{text}</span>

      <motion.span
        aria-hidden="true"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
        className="ml-1 inline-block h-4 w-[2px] rounded-full bg-[#8C0605] dark:bg-red-400"
      />
    </span>
  )
}

export function Hero() {
  const { isLoading } = useLoader()
  const { t } = useTranslation()

  const photoRef = useRef<HTMLDivElement>(null)

  const tr = useCallback(
    (key: string): string => {
      const value = t(key)
      return Array.isArray(value) ? value.join(' ') : String(value)
    },
    [t]
  )

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

    const ctx = gsap.context(() => {
      if (!photoRef.current) return

      gsap.fromTo(
        photoRef.current,
        {
          scale: 0.86,
          opacity: 0,
          rotate: -4,
          y: 24,
        },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          y: 0,
          duration: 1,
          delay: 0.25,
          ease: 'back.out(1.7)',
        }
      )
    })

    return () => {
      ctx.revert()
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-custom-primary"
      >
        <div className="pointer-events-none absolute right-10 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-[#8C0605]/10 to-transparent blur-3xl" />
      </section>
    )
  }

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-custom-primary"
    >
      {/* Background glow only - grid is now global in globals.css */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[6%] top-24 h-[clamp(22rem,30vw,34rem)] w-[clamp(22rem,30vw,34rem)] rounded-full bg-[#8C0605]/10 blur-3xl dark:bg-red-400/[0.08] lg:right-[12%] xl:right-[16%]" />

        <div className="absolute bottom-24 left-[4%] h-[clamp(18rem,24vw,28rem)] w-[clamp(18rem,24vw,28rem)] rounded-full bg-[#8C0605]/8 blur-3xl dark:bg-red-400/[0.06] lg:left-[8%] xl:left-[10%]" />

        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/35 to-transparent dark:from-white/[0.03]" />

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/25 to-transparent dark:from-black/20" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
        <div className="relative mx-auto w-full">
          <div className="mx-auto grid min-h-[100svh] w-full max-w-[min(1180px,calc(100vw-5rem))] grid-cols-1 items-center gap-y-14 py-24 md:py-28 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.78fr)] lg:gap-x-[clamp(2rem,4vw,4.5rem)] lg:py-24 xl:max-w-[min(1240px,calc(100vw-7rem))] 2xl:max-w-[1240px]">
            {/* Left content */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, ease: EASE_SMOOTH }}
              className="order-2 mx-auto w-full max-w-[720px] lg:order-1 lg:mx-0 lg:max-w-[min(680px,100%)] xl:max-w-[720px]"
            >
              {/* Availability */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.12, duration: 0.65, ease: EASE_SMOOTH }}
                className="mb-6 inline-flex items-center gap-3"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>

                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {tr('hero.available_for_work')}
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.22, duration: 0.65, ease: EASE_SMOOTH }}
                className="mb-5"
              >
                <div className="mb-5">
                  <TypingDevReference />
                </div>

                <h1 className="max-w-[min(760px,100%)] text-4xl font-black leading-[1.02] tracking-[-0.055em] text-custom-title sm:text-5xl md:text-[clamp(3.25rem,6vw,4.25rem)] lg:text-[clamp(3.6rem,5vw,5rem)]">
                  {tr('hero.greeting')}

                  <span className="block pb-2 bg-gradient-to-r from-[#8C0605] to-red-500 bg-clip-text text-transparent dark:from-red-400 dark:to-red-300">
                    Minhaj
                  </span>
                </h1>
              </motion.div>

              {/* Tagline */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.32, duration: 0.65, ease: EASE_SMOOTH }}
                className="mb-8"
              >
                <p className="mb-5 max-w-[min(640px,100%)] text-xl font-bold leading-tight tracking-[-0.035em] text-custom-title md:text-[clamp(1.4rem,2.1vw,1.8rem)]">
                  {tr('hero.tagline')}
                </p>

                <div className="flex flex-wrap gap-3">
                  {VALUE_PROPS.map((prop, index) => (
                    <motion.div
                      key={prop.key}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      transition={{
                        delay: 0.42 + index * 0.08,
                        duration: 0.5,
                        ease: EASE_SMOOTH,
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-sm font-semibold text-custom-secondary shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]"
                    >
                      <span>{prop.emoji}</span>
                      <span>{tr(prop.key)}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.46, duration: 0.65, ease: EASE_SMOOTH }}
                className="mb-8 max-w-[min(62ch,100%)] text-base leading-7 text-custom-secondary md:text-[17px] md:leading-8"
              >
                {tr('hero.description')}
              </motion.p>

              {/* Tech stack */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.56, duration: 0.65, ease: EASE_SMOOTH }}
                className="mb-8 flex max-w-[min(620px,100%)] flex-wrap gap-3"
              >
                {TECH_STACK.map((tech, index) => {
                  const TechIcon = tech.icon

                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.88, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        delay: 0.64 + index * 0.08,
                        duration: 0.45,
                        ease: EASE_SMOOTH,
                      }}
                      whileHover={{ y: -3, scale: 1.04 }}
                      className="group inline-flex cursor-default items-center gap-2 rounded-2xl border border-gray-200 bg-white/75 px-4 py-2.5 text-sm font-semibold text-custom-secondary shadow-sm backdrop-blur-md transition-all hover:border-[#8C0605]/20 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]"
                    >
                      <TechIcon
                        className={cn(
                          'h-5 w-5 text-custom-secondary transition-colors',
                          tech.hoverClassName
                        )}
                      />

                      <span>{tech.name}</span>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.74, duration: 0.65, ease: EASE_SMOOTH }}
                className="flex flex-wrap gap-3 sm:gap-4"
              >
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('#projects')}
                  className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#8C0605] px-6 py-3.5 text-sm font-bold text-white shadow-[0_18px_35px_rgba(140,6,5,0.26)] transition-all hover:bg-[#a70b0a] hover:shadow-[0_22px_45px_rgba(140,6,5,0.32)] sm:px-7 sm:py-4 sm:text-base"
                >
                  <FaPlay className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  {tr('hero.cta_projects')}
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('#contact')}
                  className="group inline-flex cursor-pointer items-center gap-3 rounded-full border border-gray-200 bg-white/75 px-6 py-3.5 text-sm font-bold text-custom-title shadow-[0_18px_35px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all hover:bg-white hover:shadow-[0_22px_45px_rgba(0,0,0,0.09)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] sm:px-7 sm:py-4 sm:text-base"
                >
                  {tr('hero.cta_contact')}
                  <span className="transition-transform duration-300 group-hover:rotate-12">
                    👋
                  </span>
                </motion.button>
              </motion.div>

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.95, duration: 0.55 }}
                className="mt-8 flex items-center gap-4"
              >
                <span className="text-sm font-medium text-custom-muted">
                  {tr('hero.find_me')}
                </span>

                {SOCIAL_LINKS.map((link) => {
                  const SocialIcon = link.icon

                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/70 text-custom-secondary shadow-sm backdrop-blur-md transition-all hover:border-[#8C0605]/20 hover:text-[#8C0605] dark:border-white/10 dark:bg-white/[0.04] dark:hover:text-red-400"
                      title={link.label}
                      aria-label={link.label}
                    >
                      <SocialIcon className="h-5 w-5" />
                    </motion.a>
                  )
                })}
              </motion.div>
            </motion.div>

            {/* Right photo */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, ease: EASE_SMOOTH }}
              className="order-1 flex justify-center lg:order-2 lg:justify-end"
            >
              <div className="relative w-fit">
                <div className="absolute -inset-6 rounded-[3rem] bg-[#8C0605]/15 blur-3xl dark:bg-red-400/10" />

                <div ref={photoRef} className="relative">
                  <div className="relative h-72 w-72 md:h-80 md:w-80 lg:h-[clamp(20rem,28vw,23rem)] lg:w-[clamp(20rem,28vw,23rem)] xl:h-96 xl:w-96">
                    <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#8C0605] via-red-500 to-[#8C0605] opacity-25 blur-sm dark:from-red-400 dark:via-red-500 dark:to-red-400" />

                    <div className="relative h-full w-full overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl dark:border-white/10">
                      <Image
                        src="/minhaj.jpg"
                        alt={tr('hero.photo_alt')}
                        fill
                        sizes="(min-width: 1280px) 384px, (min-width: 1024px) 360px, (min-width: 768px) 320px, 288px"
                        className="object-cover"
                        priority
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                    </div>

                    {/* Location badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        delay: 0.9,
                        type: 'spring',
                        stiffness: 120,
                        damping: 16,
                      }}
                      className="absolute -bottom-4 -left-4 rounded-2xl border border-gray-200 bg-white/90 px-4 py-2 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-[#101114]/90"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📍</span>

                        <span className="text-sm font-bold text-custom-title">
                          Paris, France
                        </span>
                      </div>
                    </motion.div>

                    {/* Experience badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: 12 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{
                        delay: 1,
                        type: 'spring',
                        stiffness: 120,
                        damping: 16,
                      }}
                      className="absolute -right-5 top-1/2 rounded-2xl bg-gradient-to-br from-[#8C0605] to-red-600 px-4 py-3 text-white shadow-xl dark:from-red-400 dark:to-red-500 dark:text-gray-950"
                    >
                      <span className="text-sm font-black">
                        {tr('hero.experience_badge')}
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Code card */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.05, duration: 0.55, ease: EASE_SMOOTH }}
                  className="absolute -bottom-10 -right-8 hidden lg:block"
                >
                  <div className="max-w-[220px] rounded-2xl border border-white/10 bg-gray-950 p-4 font-mono text-xs shadow-2xl">
                    <div className="mb-2 flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    </div>

                    <div className="text-gray-500">{'// passion'}</div>

                    <div>
                      <span className="text-green-400">const</span>
                      <span className="ml-2 text-white">mindset</span>
                      <span className="ml-2 text-gray-500">=</span>
                    </div>

                    <div className="ml-4 text-yellow-300">
                      &quot;build better&quot;
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.55 }}
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
          >
            <motion.button
              type="button"
              onClick={() => scrollToSection('#services')}
              whileHover={{ scale: 1.06 }}
              className="group flex cursor-pointer flex-col items-center gap-2 text-custom-muted transition-colors hover:text-[#8C0605] dark:hover:text-red-400"
            >
              <span className="text-xs font-bold uppercase tracking-[0.22em]">
                Scroll
              </span>

              <motion.span
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/75 shadow-lg backdrop-blur-md transition-all group-hover:border-[#8C0605]/20 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <FaArrowDown className="h-4 w-4" />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}