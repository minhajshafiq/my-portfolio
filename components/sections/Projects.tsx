'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaArrowRight, FaGithub } from 'react-icons/fa'
import { useTranslation } from '@/hooks/useTranslation'
import { RevealText } from '@/components/ui/RevealText'
import { trackEvent } from '@/utils/analytics'
import { cn } from '@/utils/cn'
import { HOME_PROJECTS, type ProjectEntry } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

const EASE_SMOOTH = [0.33, 1, 0.68, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export function ProjectRow({
  project,
  index,
  visitLabel,
  locale,
  tr,
}: {
  project: ProjectEntry
  index: number
  visitLabel: string
  locale: string
  tr: (key: string) => string
}) {
  const isReversed = index % 2 === 1
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.75, ease: EASE_SMOOTH }}
      className="group border-t border-custom py-12 md:py-16"
    >
      <Link
        href={`/${locale}/work/${project.slug}`}
        onClick={() => trackEvent('project_view', { project: project.slug })}
        className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12"
        aria-label={`${tr(`projects.${project.key}.title`)} — ${visitLabel}`}
      >
        {/* Image */}
        <div
          className={cn(
            'relative md:col-span-7',
            isReversed && 'md:order-2'
          )}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-custom-secondary">
            <div data-parallax-image className="absolute inset-0 will-change-transform">
              <Image
                src={project.image}
                alt={tr(`projects.${project.key}.title`)}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="scale-[1.12] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.16]"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={cn('md:col-span-5', isReversed && 'md:order-1')}>
          <div className="mb-5 flex items-baseline gap-4">
            <span className="font-serif text-sm font-medium text-[#8C0605] dark:text-red-400">
              {number}
            </span>

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-custom-muted">
              {tr(`projects.${project.key}.category`)}
            </span>
          </div>

          <h3 className="mb-4 font-serif text-3xl font-medium leading-[1.05] tracking-[-0.02em] text-custom-title md:text-[clamp(2.1rem,3.2vw,3rem)]">
            {tr(`projects.${project.key}.title`)}
          </h3>

          <p className="mb-6 max-w-[52ch] text-sm leading-6 text-custom-secondary md:text-[15px] md:leading-7">
            {tr(`projects.${project.key}.description`)}
          </p>

          <div className="mb-7 flex flex-wrap gap-x-4 gap-y-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-medium uppercase tracking-[0.14em] text-custom-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-bold text-custom-title">
            <span className="relative">
              {visitLabel}
              <span className="absolute -bottom-1 left-0 h-px w-full bg-custom-title/25 transition-colors duration-300 group-hover:bg-[#8C0605] dark:group-hover:bg-red-400" />
            </span>

            <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[#8C0605] dark:group-hover:text-red-400" />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

/**
 * Showcase épinglé (desktop) : l'image se cale à gauche pendant le scroll,
 * les projets défilent — wipe d'image + crossfade du texte à droite.
 */
function PinnedShowcase({
  locale,
  tr,
}: {
  locale: string
  tr: (key: string) => string
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const textColRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const wrapper = wrapperRef.current
      const frame = frameRef.current
      const textCol = textColRef.current

      if (!wrapper || !frame || !textCol) return

      const images = gsap.utils.toArray<HTMLElement>('[data-showcase-image]', wrapper)
      const innerImages = gsap.utils.toArray<HTMLElement>('[data-showcase-img-inner]', wrapper)
      const texts = gsap.utils.toArray<HTMLElement>('[data-showcase-text]', wrapper)

      // États initiaux : projet 1 visible, les autres masqués (wipe depuis le bas)
      images.forEach((image, index) => {
        gsap.set(image, {
          clipPath: index === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
        })
      })

      innerImages.forEach((inner, index) => {
        gsap.set(inner, { scale: index === 0 ? 1 : 1.15 })
      })

      texts.forEach((text, index) => {
        gsap.set(text, { autoAlpha: index === 0 ? 1 : 0, y: index === 0 ? 0 : 32 })
      })

      // Entrée : l'image arrive centrée puis se cale à gauche, le texte apparaît
      gsap.set(frame, { xPercent: 38, scale: 1.04 })
      gsap.set(textCol, { autoAlpha: 0, x: 48 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: `+=${HOME_PROJECTS.length * 90}%`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
        },
      })

      tl.to(frame, { xPercent: 0, scale: 1, duration: 1, ease: 'power2.out' })
        .to(textCol, { autoAlpha: 1, x: 0, duration: 0.7, ease: 'power2.out' }, '-=0.45')
        .to({}, { duration: 0.45 })

      // Transitions entre projets
      for (let i = 1; i < HOME_PROJECTS.length; i += 1) {
        tl.to(images[i], { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut' })
          .to(innerImages[i], { scale: 1, duration: 1, ease: 'power2.out' }, '<')
          .to(texts[i - 1], { autoAlpha: 0, y: -32, duration: 0.4, ease: 'power1.in' }, '<')
          .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '<0.35')
          .to(
            counterRef.current,
            { yPercent: -(100 / HOME_PROJECTS.length) * i, duration: 0.5, ease: 'power2.inOut' },
            '<'
          )
          .to({}, { duration: 0.45 })
      }

      // Barre de progression sur toute la durée
      if (progressRef.current) {
        gsap.set(progressRef.current, { scaleX: 0 })

        tl.to(progressRef.current, { scaleX: 1, duration: tl.duration(), ease: 'none' }, 0)
      }
    })

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex h-screen flex-col justify-center py-10">
        <div className="grid flex-none grid-cols-12 items-center gap-x-[clamp(2rem,4vw,4.5rem)]">
          {/* Image frame */}
          <div ref={frameRef} className="col-span-7 will-change-transform">
            <div className="relative h-[min(66vh,640px)] overflow-hidden rounded-xl bg-custom-secondary">
              {HOME_PROJECTS.map((project, index) => (
                <div
                  key={project.key}
                  data-showcase-image
                  className="absolute inset-0 will-change-[clip-path]"
                  style={{
                    zIndex: index,
                    clipPath: index === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
                  }}
                >
                  <div data-showcase-img-inner className="absolute inset-0 will-change-transform">
                    <Image
                      src={project.image}
                      alt={tr(`projects.${project.key}.title`)}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text column */}
          <div ref={textColRef} className="col-span-5 will-change-transform">
            <div className="relative h-[min(66vh,640px)]">
              {HOME_PROJECTS.map((project, index) => (
                <div
                  key={project.key}
                  data-showcase-text
                  className={cn(
                    'absolute inset-0 flex flex-col justify-center',
                    index > 0 && 'invisible opacity-0'
                  )}
                >
                  <div className="mb-5 flex items-baseline gap-4">
                    <span className="font-serif text-sm font-medium text-[#8C0605] dark:text-red-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-custom-muted">
                      {tr(`projects.${project.key}.category`)}
                    </span>
                  </div>

                  <h3 className="mb-5 font-serif text-[clamp(2.2rem,3.4vw,3.4rem)] font-medium leading-[1.03] tracking-[-0.02em] text-custom-title">
                    {tr(`projects.${project.key}.title`)}
                  </h3>

                  <p className="mb-6 max-w-[46ch] text-sm leading-7 text-custom-secondary md:text-[15px]">
                    {tr(`projects.${project.key}.description`)}
                  </p>

                  <div className="mb-8 flex flex-wrap gap-x-4 gap-y-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium uppercase tracking-[0.14em] text-custom-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/${locale}/work/${project.slug}`}
                    onClick={() => trackEvent('project_view', { project: project.slug })}
                    className="group/link inline-flex w-fit items-center gap-2 text-sm font-bold text-custom-title"
                  >
                    <span className="relative">
                      {tr('work.case')}
                      <span className="absolute -bottom-1 left-0 h-px w-full bg-custom-title/25 transition-colors duration-300 group-hover/link:bg-[#8C0605] dark:group-hover/link:bg-red-400" />
                    </span>

                    <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1.5 group-hover/link:text-[#8C0605] dark:group-hover/link:text-red-400" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Counter + progress */}
        <div className="mt-8 flex flex-none items-center gap-6">
          <div className="flex items-baseline gap-1.5 font-serif text-sm font-medium text-custom-title">
            <span className="block h-[1.25em] overflow-hidden">
              <span ref={counterRef} className="block will-change-transform">
                {HOME_PROJECTS.map((project, index) => (
                  <span key={project.key} className="block leading-[1.25em]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                ))}
              </span>
            </span>

            <span className="text-custom-muted">
              / {String(HOME_PROJECTS.length).padStart(2, '0')}
            </span>
          </div>

          <div className="h-px flex-1 bg-custom-title/10">
            <div
              ref={progressRef}
              className="h-px origin-left bg-[#8C0605] dark:bg-red-400"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  const { t, language } = useTranslation()

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  useEffect(() => {
    const mm = gsap.matchMedia()

    // Parallax des vignettes — uniquement quand la liste mobile est affichée
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      const images = sectionRef.current?.querySelectorAll('[data-parallax-image]')

      images?.forEach((image) => {
        gsap.fromTo(
          image,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: image.closest('article'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      })
    })

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-custom-primary py-[clamp(4.5rem,8vw,8rem)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
        <div className="mx-auto w-full max-w-[min(1180px,calc(100vw-2.5rem))]">
          {/* Section header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE_SMOOTH }}
            className="mb-10 md:mb-14 lg:mb-0"
          >
            <p className="mb-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#8C0605] dark:text-red-400">
              <span className="h-px w-10 bg-current" />
              {tr('work.label')}
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
              <RevealText
                as="h2"
                text={tr('work.heading')}
                className="font-serif text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.025em] text-custom-title md:col-span-8"
              />

              <p className="max-w-sm text-sm leading-6 text-custom-secondary md:col-span-4 md:justify-self-end md:text-[15px] md:leading-7">
                {tr('work.intro')}
              </p>
            </div>
          </motion.div>

          {/* Desktop : showcase épinglé */}
          <div className="hidden lg:block">
            <PinnedShowcase locale={language} tr={tr} />
          </div>

          {/* Mobile / tablette : liste éditoriale */}
          <div className="lg:hidden">
            {HOME_PROJECTS.map((project, index) => (
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

          {/* All projects link */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE_SMOOTH }}
            className="border-t border-custom pt-10 pb-12 lg:mt-4"
          >
            <Link
              href={`/${language}/work`}
              onClick={() => trackEvent('cta_click', { cta: 'all_projects' })}
              className="group inline-flex items-center gap-3 text-sm font-bold text-custom-title md:text-base"
            >
              <span className="relative">
                {tr('work.all_projects')}
                <span className="absolute -bottom-1 left-0 h-px w-full bg-custom-title/30 transition-colors duration-300 group-hover:bg-[#8C0605] dark:group-hover:bg-red-400" />
              </span>

              <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[#8C0605] dark:group-hover:text-red-400" />
            </Link>
          </motion.div>

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
