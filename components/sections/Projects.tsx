'use client'

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { Link } from '@/components/ui/AppLink'
import { FaArrowRight } from 'react-icons/fa'
import { useTranslation } from '@/hooks/useTranslation'
import { RevealText } from '@/components/ui/RevealText'
import { trackEvent } from '@/utils/analytics'
import { cn } from '@/utils/cn'
import { TEASER_PROJECTS, type ProjectEntry } from '@/data/projects'
import { EASE_SMOOTH, fadeUp } from '@/lib/motion'
import { SectionLabel } from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

/** Badges de preuve — pastille rouge signature + libellé traduit. */
function ProofBadges({
  badges,
  tr,
  className,
}: {
  badges?: string[]
  tr: (key: string) => string
  className?: string
}) {
  if (!badges || badges.length === 0) return null

  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {badges.map((badge) => (
        <li
          key={badge}
          className="inline-flex items-center gap-1.5 rounded-full border border-custom px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-custom-secondary"
        >
          <span className="h-1 w-1 rounded-full bg-[#8C0605] dark:bg-red-400" />
          {tr(`work.badges.${badge}`)}
        </li>
      ))}
    </ul>
  )
}

export type ProjectVariant = 'standard' | 'feature' | 'compact'

const TAG_CLASSNAME =
  'text-xs font-medium uppercase tracking-[0.14em] text-custom-muted transition-colors duration-300 group-hover:text-custom-title'

/**
 * Ligne projet éditoriale — utilisée sur la page Work (liste complète).
 * Trois variantes rythment le parcours : `standard` (alternance classique),
 * `feature` (projet signature, plein cadre) et `compact` (épilogue avant le CTA).
 */
export function ProjectRow({
  project,
  index,
  visitLabel,
  locale,
  tr,
  variant = 'standard',
}: {
  project: ProjectEntry
  index: number
  visitLabel: string
  locale: string
  tr: (key: string) => string
  variant?: ProjectVariant
}) {
  const isFeature = variant === 'feature'
  const isCompact = variant === 'compact'
  const isReversed = variant === 'standard' && index % 2 === 1
  const number = String(index + 1).padStart(2, '0')

  const articleRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const imageMaskRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLSpanElement>(null)

  // Mise en scène du chapitre : numéro → image (reveal) → titre → texte → tags → CTA,
  // déclenchée quand le projet arrive au centre du viewport. L'image suit ensuite
  // légèrement le curseur (souris fine uniquement) pour une sensation premium.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    const cleanups: Array<() => void> = []

    const ctx = gsap.context(() => {
      if (!articleRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: articleRef.current,
          start: 'top 78%',
          once: true,
        },
      })

      tl.fromTo(eyebrowRef.current, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' })
        .fromTo(
          imageMaskRef.current,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: isFeature ? 1.2 : 0.95, ease: 'power4.out' },
          '-=0.1'
        )
        .fromTo(titleRef.current, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.55')
        .fromTo(
          descriptionRef.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.35'
        )
        .fromTo(
          tagsRef.current ? tagsRef.current.children : [],
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo(ctaRef.current, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.15')

      const wrap = imageWrapRef.current
      const mask = imageMaskRef.current
      const pointerMedia = window.matchMedia('(hover: hover) and (pointer: fine)')

      if (wrap && mask && pointerMedia.matches) {
        const xTo = gsap.quickTo(mask, 'x', { duration: 0.6, ease: 'power3.out' })
        const yTo = gsap.quickTo(mask, 'y', { duration: 0.6, ease: 'power3.out' })

        const onPointerMove = (event: PointerEvent) => {
          const bounds = wrap.getBoundingClientRect()
          const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5
          const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5

          xTo(relativeX * (isFeature ? 22 : 14))
          yTo(relativeY * (isFeature ? 16 : 10))
        }

        const onPointerLeave = () => {
          xTo(0)
          yTo(0)
        }

        wrap.addEventListener('pointermove', onPointerMove)
        wrap.addEventListener('pointerleave', onPointerLeave)

        cleanups.push(() => {
          wrap.removeEventListener('pointermove', onPointerMove)
          wrap.removeEventListener('pointerleave', onPointerLeave)
        })
      }
    }, articleRef)

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      ctx.revert()
    }
  }, [isFeature])

  const image = (
    <div
      ref={imageWrapRef}
      className={cn(
        'relative overflow-hidden rounded-xl bg-custom-secondary transition-shadow duration-500 ease-out',
        'group-hover:shadow-[0_30px_70px_-24px_rgba(140,6,5,0.35)]',
        isFeature ? 'aspect-[16/10] rounded-2xl md:aspect-[21/9]' : 'aspect-[16/10]'
      )}
      style={{ viewTransitionName: `project-image-${project.slug}` }}
    >
      <div ref={imageMaskRef} className="absolute inset-0 will-change-transform">
        <Image
          src={project.image}
          alt={tr(`projects.${project.key}.title`)}
          fill
          sizes={isFeature ? '(min-width: 768px) 1100px, 100vw' : '(min-width: 1024px) 640px, 100vw'}
          className="scale-[1.12] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.16]"
        />
      </div>
    </div>
  )

  const tags = (
    <div ref={tagsRef} className="mb-5 flex flex-wrap gap-x-4 gap-y-1.5">
      {project.technologies.map((tech) => (
        <span key={tech} className={TAG_CLASSNAME}>
          {tech}
        </span>
      ))}
    </div>
  )

  const cta = (
    <span ref={ctaRef} className="inline-flex items-center gap-2 text-sm font-bold text-custom-title">
      <span className="relative">
        {visitLabel}
        <span className="absolute -bottom-1 left-0 h-px w-full bg-custom-title/25 transition-colors duration-300 group-hover:bg-[#8C0605] dark:group-hover:bg-red-400" />
      </span>

      <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[#8C0605] dark:group-hover:text-red-400" />
    </span>
  )

  return (
    <article
      ref={articleRef}
      id={project.slug}
      className={cn('group border-t border-custom', isCompact ? 'py-9 md:py-11' : 'py-12 md:py-16')}
    >
      <Link
        href={`/${locale}/work/${project.slug}`}
        onClick={() => trackEvent('project_view', { project: project.slug })}
        className={cn('block', !isFeature && 'grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12')}
        aria-label={`${tr(`projects.${project.key}.title`)} — ${visitLabel}`}
      >
        {isFeature ? (
          <>
            <div ref={eyebrowRef} className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-sm font-medium text-[#8C0605] dark:text-red-400">{number}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-custom-muted">
                  {tr(`projects.${project.key}.category`)}
                </span>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-[#8C0605]/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8C0605] dark:border-red-400/30 dark:text-red-400">
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {tr('work.signature_badge')}
              </span>
            </div>

            <h3
              ref={titleRef}
              className="mb-7 font-serif text-[clamp(2.6rem,6.5vw,5.2rem)] font-medium leading-[0.98] tracking-[-0.03em] text-custom-title"
            >
              {tr(`projects.${project.key}.title`)}
            </h3>

            <div className="mb-8">{image}</div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
              <p
                ref={descriptionRef}
                className="max-w-[58ch] text-sm leading-6 text-custom-secondary md:col-span-7 md:text-[15px] md:leading-7"
              >
                {tr(`projects.${project.key}.description`)}
              </p>

              <div className="md:col-span-5">
                {tags}
                <ProofBadges badges={project.badges} tr={tr} className="mb-7" />
                {cta}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Image */}
            <div className={cn('relative', isCompact ? 'md:col-span-4' : 'md:col-span-7', isReversed && 'md:order-2')}>
              {image}
            </div>

            {/* Content */}
            <div className={cn(isCompact ? 'md:col-span-8' : 'md:col-span-5', isReversed && 'md:order-1')}>
              {isCompact && (
                <p className="mb-3 font-serif text-base italic leading-snug text-custom-secondary md:text-lg">
                  {tr('work.epilogue_note')}
                </p>
              )}

              <div ref={eyebrowRef} className="mb-5 flex items-baseline gap-4">
                <span className="font-serif text-sm font-medium text-[#8C0605] dark:text-red-400">
                  {number}
                </span>

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-custom-muted">
                  {tr(`projects.${project.key}.category`)}
                </span>
              </div>

              <h3
                ref={titleRef}
                className={cn(
                  'mb-4 font-serif font-medium leading-[1.05] tracking-[-0.02em] text-custom-title',
                  isCompact ? 'text-2xl md:text-[clamp(1.6rem,2.4vw,2.2rem)]' : 'text-3xl md:text-[clamp(2.1rem,3.2vw,3rem)]'
                )}
              >
                {tr(`projects.${project.key}.title`)}
              </h3>

              <p
                ref={descriptionRef}
                className="mb-6 max-w-[52ch] text-sm leading-6 text-custom-secondary md:text-[15px] md:leading-7"
              >
                {tr(`projects.${project.key}.description`)}
              </p>

              {tags}
              <ProofBadges badges={project.badges} tr={tr} className="mb-7" />
              {cta}
            </div>
          </>
        )}
      </Link>
    </article>
  )
}

/**
 * Vignette teaser (home) : format éditorial compact, cliquable vers la fiche.
 */
function TeaserCard({
  project,
  index,
  tr,
  locale,
  viewLabel,
}: {
  project: ProjectEntry
  index: number
  tr: (key: string) => string
  locale: string
  viewLabel: string
}) {
  const number = String(index + 1).padStart(2, '0')
  const reduceMotion = useReducedMotion()

  // Reveal éditorial : l'image s'ouvre par masque (comme les chapitres de la page
  // Work), les badges suivent. En reduced-motion : simple fondu.
  const imageReveal = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
        visible: { clipPath: 'inset(0% 0% 0% 0%)' },
      }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      // Galerie : la vignette survolée reste nette, les voisines s'estompent
      className="transition-[opacity,filter] duration-300 group-hover/cards:opacity-40 group-hover/cards:saturate-50 hover:!opacity-100 hover:!saturate-100"
    >
      <Link
        href={`/${locale}/work/${project.slug}`}
        onClick={() => trackEvent('project_view', { project: project.slug, source: 'home_teaser' })}
        aria-label={`${tr(`projects.${project.key}.title`)} — ${viewLabel}`}
        className="group block"
      >
        <motion.div
          variants={imageReveal}
          transition={{ duration: 0.85, ease: EASE_SMOOTH, delay: index * 0.12 }}
          className="relative aspect-[16/11] overflow-hidden rounded-xl bg-custom-secondary sm:aspect-[3/4]"
          style={{ viewTransitionName: `project-image-${project.slug}` }}
        >
          <Image
            src={project.image}
            alt={tr(`projects.${project.key}.title`)}
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.05]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

          <span className="absolute left-4 top-3.5 font-serif text-sm font-medium text-white/90">
            {number}
          </span>

          {/* Cue « Voir » */}
          <span className="absolute right-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-gray-950 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 dark:bg-white/95">
            {viewLabel}
            <FaArrowRight className="h-2.5 w-2.5" />
          </span>

          {/* Bas de carte */}
          <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
              {tr(`projects.${project.key}.category`)}
            </p>

            <h3 className="font-serif text-xl font-medium leading-tight text-white md:text-[1.6rem]">
              {tr(`projects.${project.key}.title`)}
            </h3>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: EASE_SMOOTH, delay: index * 0.12 + 0.35 }}
        >
          <ProofBadges badges={project.badges?.slice(0, 2)} tr={tr} className="mt-4" />
        </motion.div>
      </Link>
    </motion.div>
  )
}

/**
 * Section projets (home) : teaser court — 3 vignettes + renvoi vers la page Work,
 * qui porte l'intégralité du portfolio.
 */
export function Projects() {
  const { t, language } = useTranslation()

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  // Les projets home hors hero : le site client du hero n'est pas re-montré ici.
  const teaser = TEASER_PROJECTS

  return (
    <section
      id="projects"
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
            className="mb-10 md:mb-14"
          >
            <SectionLabel>{tr('work.label')}</SectionLabel>

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

          {/* Teaser : 3 vignettes — group/cards pilote la mise en avant au hover */}
          <div className="group/cards grid grid-cols-1 gap-5 sm:grid-cols-3 md:gap-6">
            {teaser.map((project, index) => (
              <TeaserCard
                key={project.key}
                project={project}
                index={index}
                tr={tr}
                locale={language}
                viewLabel={tr('work.case')}
              />
            ))}
          </div>

          {/* Renvoi vers la page Work */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: EASE_SMOOTH }}
            className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-custom pt-10 md:mt-16 md:flex-row md:items-center"
          >
            <p className="max-w-xl text-sm leading-6 text-custom-secondary md:text-[15px] md:leading-7">
              {tr('work.home_cta_text')}
            </p>

            <Link
              href={`/${language}/work`}
              onClick={() => trackEvent('cta_click', { cta: 'all_projects', source: 'home_teaser' })}
              className="group inline-flex flex-none items-center gap-3 rounded-full bg-[#8C0605] px-7 py-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#a70b0a] hover:shadow-[0_18px_40px_rgba(140,6,5,0.25)] dark:bg-red-400 dark:text-gray-950 dark:hover:bg-red-300 md:text-base"
            >
              {tr('work.all_projects')}
              <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
