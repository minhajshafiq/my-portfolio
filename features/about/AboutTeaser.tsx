'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaArrowRight } from 'react-icons/fa'
import { useTranslation } from '@/hooks/useTranslation'
import { RevealText } from '@/components/ui/RevealText'
import { EASE_SMOOTH, fadeUp } from '@/lib/motion'
import { SectionLabel } from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

export function AboutTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const photoInnerRef = useRef<HTMLDivElement>(null)
  const proofsRef = useRef<HTMLUListElement>(null)

  const { t } = useTranslation()

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  const rawProofs = t('about_teaser.proofs', { returnObjects: true })
  const proofs: string[] = Array.isArray(rawProofs) ? rawProofs.map(String) : []

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !photoInnerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        photoInnerRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  // Les 3 preuves de confiance arrivent en léger stagger — plus calme que les
  // reveals précédents (promesse, projets) : cette section humanise, elle ne doit
  // pas être spectaculaire.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !proofsRef.current) return

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-proof]', proofsRef.current)

      if (items.length === 0) return

      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: proofsRef.current,
            start: 'top 88%',
            once: true,
          },
        }
      )
    }, proofsRef)

    return () => {
      ctx.revert()
    }
  }, [proofs.length])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-custom-primary py-[clamp(4.5rem,8vw,8rem)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
        <div className="mx-auto grid w-full max-w-[min(1180px,calc(100vw-2.5rem))] grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
          {/* Photo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.75, ease: EASE_SMOOTH }}
            className="md:col-span-5"
          >
            <div className="group relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-xl">
              <div ref={photoInnerRef} className="absolute inset-0 will-change-transform">
                <Image
                  src="/minhaj.jpg"
                  alt={tr('hero.photo_alt')}
                  fill
                  sizes="(min-width: 768px) 420px, 100vw"
                  className="scale-[1.12] object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.16] group-hover:grayscale-0"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1, duration: 0.75, ease: EASE_SMOOTH }}
            className="md:col-span-7"
          >
            <SectionLabel>{tr('about_teaser.label')}</SectionLabel>

            <RevealText
              as="h2"
              text={tr('about_teaser.heading')}
              className="mb-7 font-serif text-[clamp(2.1rem,4.6vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.025em] text-custom-title"
            />

            <p className="mb-5 max-w-[58ch] text-sm leading-7 text-custom-secondary md:text-base md:leading-8">
              {tr('about_teaser.p1')}
            </p>

            <p className="mb-7 max-w-[58ch] text-sm leading-7 text-custom-secondary md:text-base md:leading-8">
              {tr('about_teaser.p2')}
            </p>

            {proofs.length > 0 && (
              <ul ref={proofsRef} className="mb-9 flex flex-col gap-3">
                {proofs.map((proof) => (
                  <li
                    key={proof}
                    data-proof
                    className="flex items-center gap-3 text-sm font-medium text-custom-title md:text-[15px]"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#8C0605] dark:bg-red-400" />
                    {proof}
                  </li>
                ))}
              </ul>
            )}

            <a
              href="#contact"
              className="group inline-flex items-center gap-3 text-sm font-bold text-custom-title md:text-base"
            >
              <span className="relative">
                {tr('about_teaser.cta')}
                <span className="absolute -bottom-1 left-0 h-px w-full bg-custom-title/30 transition-colors duration-300 group-hover:bg-[#8C0605] dark:group-hover:bg-red-400" />
              </span>

              <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[#8C0605] dark:group-hover:text-red-400" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
