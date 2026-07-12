'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaArrowRight, FaPlus } from 'react-icons/fa'
import { useTranslation } from '@/hooks/useTranslation'
import { RevealText } from '@/components/ui/RevealText'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/cn'
import { EASE_SMOOTH, fadeUp } from '@/lib/motion'
import { SectionLabel } from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

type Offer = {
  situation: string
  title: string
  description: string
  bullets: string[]
}

type ProcessStep = {
  title: string
  description: string
}

function OfferRow({
  offer,
  index,
  isOpen,
  onToggle,
  ctaLabel,
}: {
  offer: Offer
  index: number
  isOpen: boolean
  onToggle: () => void
  ctaLabel: string
}) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: EASE_SMOOTH }}
      className="border-t border-custom last:border-b"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full cursor-pointer items-center gap-5 py-7 text-left md:gap-10 md:py-9"
      >
        <span
          className={cn(
            'font-serif text-sm font-medium transition-colors duration-300 md:text-base',
            isOpen ? 'text-[#8C0605] dark:text-red-400' : 'text-custom-muted'
          )}
        >
          {number}
        </span>

        <span className="flex-1">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-custom-muted">
            {offer.situation}
          </span>

          <span
            className={cn(
              'block font-serif text-2xl font-medium leading-tight tracking-[-0.02em] transition-colors duration-300 md:text-[clamp(1.8rem,3vw,2.6rem)]',
              isOpen
                ? 'text-[#8C0605] dark:text-red-400'
                : 'text-custom-title group-hover:text-[#8C0605] dark:group-hover:text-red-400'
            )}
          >
            {offer.title}
          </span>
        </span>

        <span
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
            isOpen
              ? 'rotate-45 border-[#8C0605] text-[#8C0605] dark:border-red-400 dark:text-red-400'
              : 'border-custom text-custom-muted group-hover:border-[#8C0605] group-hover:text-[#8C0605] dark:group-hover:border-red-400 dark:group-hover:text-red-400'
          )}
        >
          <FaPlus className="h-3 w-3" />
        </span>
      </button>

      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              'grid grid-cols-1 gap-8 pb-10 pl-0 transition-opacity duration-300 md:grid-cols-12 md:pl-[calc(2.5rem+1rem)] lg:pl-[4.5rem]',
              isOpen ? 'opacity-100 delay-150' : 'opacity-0'
            )}
          >
            <div className="md:col-span-6">
              <p className="max-w-[56ch] text-sm leading-7 text-custom-secondary md:text-[15px]">
                {offer.description}
              </p>

              <a
                href="#contact"
                onClick={() =>
                  trackEvent('service_interest', { service: offer.title, section: 'services' })
                }
                className="group/cta mt-7 inline-flex items-center gap-3 rounded-full bg-[#8C0605] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a70b0a] dark:bg-red-400 dark:text-gray-950 dark:hover:bg-red-300"
              >
                {ctaLabel}
                <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </a>
            </div>

            <ul className="space-y-3 md:col-span-6">
              {offer.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 border-b border-custom pb-3 text-sm leading-6 text-custom-secondary last:border-b-0"
                >
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#8C0605] dark:bg-red-400" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const processRef = useRef<HTMLDivElement>(null)

  const { t } = useTranslation()

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  const rawOffers = t('services.offers', { returnObjects: true })
  const offers: Offer[] = Array.isArray(rawOffers) ? (rawOffers as Offer[]) : []

  const rawProcess = t('services.process', { returnObjects: true })
  const processSteps: ProcessStep[] = Array.isArray(rawProcess) ? (rawProcess as ProcessStep[]) : []

  const handleToggle = (index: number) => {
    setOpenIndex((previous) => (previous === index ? null : index))
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>('[data-process-step]', processRef.current)

      if (steps.length === 0) return

      steps.forEach((step, index) => {
        const line = step.querySelector('[data-process-line]')
        const content = step.querySelector('[data-process-content]')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            once: true,
          },
          delay: (index % 4) * 0.12,
        })

        if (line) {
          tl.fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }
          )
        }

        if (content) {
          tl.fromTo(
            content,
            { y: 26, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.65, ease: 'power3.out' },
            '-=0.4'
          )
        }
      })
    }, processRef)

    return () => {
      ctx.revert()
    }
  }, [processSteps.length])

  return (
    <section
      id="services"
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
            className="mb-14 md:mb-20"
          >
            <SectionLabel>{tr('services.label')}</SectionLabel>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
              <RevealText
                as="h2"
                text={tr('services.heading')}
                className="font-serif text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.025em] text-custom-title md:col-span-8"
              />

              <p className="max-w-sm text-sm leading-6 text-custom-secondary md:col-span-4 md:justify-self-end md:text-[15px] md:leading-7">
                {tr('services.intro')}
              </p>
            </div>
          </motion.div>

          {/* Offers accordion */}
          <div className="mb-24 md:mb-32">
            {offers.map((offer, index) => (
              <OfferRow
                key={offer.title}
                offer={offer}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                ctaLabel={tr('services.cta')}
              />
            ))}
          </div>

          {/* Process */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: EASE_SMOOTH }}
          >
            <SectionLabel>{tr('services.process_label')}</SectionLabel>

            <h3 className="mb-12 max-w-[24ch] font-serif text-[clamp(1.9rem,4vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.02em] text-custom-title md:mb-16">
              {tr('services.process_heading')}
            </h3>

            <div
              ref={processRef}
              className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
            >
              {processSteps.map((step, index) => (
                <div key={step.title} data-process-step className="relative pt-6">
                  {/* Trait de base, toujours visible : le chemin existe avant même le scroll */}
                  <span className="absolute left-0 top-0 h-px w-full bg-custom-border/40" />
                  {/* Fil rouge : se dessine par-dessus, étape après étape */}
                  <span
                    data-process-line
                    className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-[#8C0605] dark:bg-red-400"
                  />

                  <div data-process-content>
                    <span className="mb-5 block font-serif text-sm font-medium text-[#8C0605] dark:text-red-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <h4 className="mb-3 font-serif text-xl font-medium tracking-[-0.01em] text-custom-title">
                      {step.title}
                    </h4>

                    <p className="text-sm leading-6 text-custom-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
