'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '@/hooks/useTranslation'

gsap.registerPlugin(ScrollTrigger)

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  const { t } = useTranslation()

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  const words = tr('manifesto.text').split(' ')

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Le panneau sombre monte en scène
      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { scale: 0.94, y: 60 },
          {
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panelRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        )
      }

      // Les mots s'illuminent au scroll
      const wordElements = textRef.current?.querySelectorAll('[data-word]')

      if (!wordElements || wordElements.length === 0) return

      gsap.fromTo(
        wordElements,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 72%',
            end: 'bottom 48%',
            scrub: 0.4,
          },
        }
      )
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [words.length])

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative bg-custom-primary py-[clamp(2.5rem,5vw,5rem)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-4 md:px-6">
        <div
          ref={panelRef}
          className="relative overflow-hidden rounded-[2rem] bg-[#141210] px-6 py-[clamp(5.5rem,12vw,10rem)] will-change-transform sm:px-10 md:px-16"
        >
          {/* Lueur discrète */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#8C0605]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#8C0605]/15 blur-3xl" />

          <div className="relative mx-auto w-full max-w-[1000px]">
            <p className="mb-9 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
              <span className="h-px w-10 bg-current" />
              {tr('manifesto.label')}
            </p>

            <p
              ref={textRef}
              className="font-serif text-[clamp(1.75rem,4.4vw,3.4rem)] font-medium leading-[1.26] tracking-[-0.015em] text-[#FAF7F2]"
            >
              {words.map((word, index) => (
                <span key={`${word}-${index}`} data-word className="inline">
                  {word}
                  {index < words.length - 1 ? ' ' : ''}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
